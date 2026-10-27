# Booking do Mirante: diagnóstico e validação

Verificação realizada em 27/10/2026, horário de Brasília.

## 1. Causa raiz comprovada

A produção está executando código anterior à inclusão do Booking no Mirante.

- O commit `4cca303dd5a4170bbf92e791466383b612b26ac2` adicionou `MIRANTE_CAETE_BOOKING_ICAL` ao `requiredFeeds.mirante`.
- A Vercel construiu esse commit no deployment `dpl_66x7XSDYUZP6j7RQsSNXJxhwPUbs`.
- Depois, dois redeploys do commit anterior, `af2e4cb68fab820cc91da549cc154f660fce2094`, substituíram essa versão em produção.
- O deployment de produção ativo consultado foi `dpl_E6KkhYWGde74E9Xf5pJMD6Rn2612`, com `source: redeploy` e SHA `af2e4cb…`.
- Nesse código antigo, `requiredFeeds.mirante` contém somente Airbnb. Consequentemente, `expectedSources` vale 1 e `complete: true` é calculado após processar apenas essa fonte. O Booking nem chega a ser consultado.

Isso reproduz exatamente a resposta do domínio `cabanas-do-rio.vercel.app`: os dois períodos do Airbnb com `complete: true`.

A variável de produção foi criada depois do deployment do commit `4cca303`. Portanto, simplesmente promover aquele deployment antigo também não é a solução recomendada: deve ser criado um novo deployment do código atual com as variáveis atuais.

## 2. Arquivos alterados

- `tests/availability-server.test.mjs`: seis testes novos exercitando configuração, servidor, fetch, parser, normalização e rota, com substituição apenas da fronteira de execução/cache do Next e do transporte HTTP.
- `tests/availability.test.mjs`: atualização da expectativa antiga que ainda tratava o Mirante como uma acomodação com somente uma fonte obrigatória.
- `docs/booking-mirante-diagnosis.md`: este relatório.

`src/lib/availability/server.ts` já estava modificado antes desta investigação, trocando a chave base de `v1` para `v2`. Essa alteração preexistente foi preservada. Nenhum arquivo da aplicação foi alterado por esta investigação.

## 3. Correção necessária

Publicar um novo deployment do código que contém o commit `4cca303` e as variáveis atuais de Production. O código local já consulta Airbnb e Booking para ambas as cabanas e passou pela validação real.

Não foi necessário alterar parser, validação de destinos, fetch, merge ou API. Não foram adicionadas datas ou URLs ao código da aplicação.

### Evidências do fluxo completo

- As quatro variáveis locais estão configuradas.
- A leitura autenticada das variáveis atuais de Production confirmou que `MIRANTE_CAETE_BOOKING_ICAL` está configurada, contém HTTPS e coincide com a variável local, sem revelar seu valor.
- Os dois feeds Booking possuem URLs distintas e são aceitos por `isAllowedFeedUrl`.
- As quatro respostas reais retornaram HTTP 200, sem redirecionamento.
- Airbnb retornou `text/calendar;charset=utf-8`; Booking retornou `text/calendar`.
- Tamanhos observados: Rio/Airbnb 433 bytes, Rio/Booking 593 bytes, Mirante/Airbnb 635 bytes e Mirante/Booking 821 bytes.
- Mirante/Booking: 3 VEVENTs, todos com `DTSTART;VALUE=DATE`, 3 períodos reconhecidos e preservados na janela de consulta.
- `SUMMARY:CLOSED - Not available` não é usado para descartar eventos. Apenas cancelamentos explícitos ou transparência explícita são ignorados.
- O parser preserva datas civis all-day, sem conversão por UTC, e o `DTEND` exclusivo.
- A normalização preserva períodos separados, remove duplicados e mescla sobreposições reais; períodos adjacentes mantêm sua fronteira.
- `assembleSnapshot` exige os dois resultados válidos e recentes para confirmar disponibilidade. Falhas permanecem sem confirmação.
- O fetch mantém timeout de oito segundos, limite de 2 MB, redirecionamentos recusados e `cache: no-store`. Erros retornam apenas códigos seguros.
- A API retorna apenas o snapshot sanitizado e usa `Cache-Control: no-store`.

## 4. Cache

Não há evidência de colisão entre feeds, e o cache não explica a ausência do Booking nessa versão de produção: a versão publicada sequer solicita essa fonte.

A documentação e a implementação do Next.js 16.4.2 instalado confirmam que a chave efetiva de `unstable_cache` inclui o texto da função, `keyParts` e os argumentos serializados. Neste projeto, os argumentos incluem nome da variável, plataforma e janela. Portanto, as quatro fontes têm identidades de cache distintas.

A troca preexistente para `cabanas-ical-v2` foi preservada, mas não constitui a correção da causa raiz. Não foi realizada limpeza global de cache, nem adicionada URL/token à chave. Após publicar o código correto, a nova combinação de argumentos do Booking do Mirante será consultada independentemente do Airbnb.

Chamadas consecutivas à API local de produção mantiveram `lastUpdated`, comprovando reutilização do cache. Os testes existentes de expiração e falha segura passaram.

## 5. Testes e resultados

- `npm test`: 28 testes aprovados, zero falhas.
- `npm run lint`: aprovado.
- `npm run typecheck`: aprovado.
- `npm run build`: aprovado, Next.js 16.4.2.
- `next start --port 3107`: servidor local executando o build de produção.
- API local com os quatro feeds reais: ambas as cabanas com `complete: true` e `status: complete`.
- Chamadas repetidas: cache reutilizado sem misturar fontes.
- Respostas reais da API: sem URLs, tokens, UID, descrição, resumo ou contagens internas de eventos.
- Três intervalos Booking consultados pela API: `unavailable`.
- Entradas em 22/11, 26/12 e 03/01, respeitando os intervalos consultados: `available`, confirmando o checkout exclusivo.
- Página inicial local: HTTP 200.
- Nenhum componente, estilo, texto, imagem, animação, layout, SEO ou navegação foi modificado. Não foi realizada uma nova auditoria visual do navegador.

Os seis testes novos cobrem duas fontes obrigatórias por cabana, eventos all-day, os cinco períodos do Mirante, API sanitizada, checkout exclusivo, períodos separados, duplicados/sobrepostos entre fontes, falha de cada fonte, variável ausente e isolamento do cache por fonte.

As datas conhecidas existem apenas como expectativas/fixtures de teste. A validação local de produção baixou os feeds reais; não substituiu dados da integração por fixtures.

## 6. Resultado do Mirante

`blockedPeriods` obtido da API local executando o build de produção com feeds reais:

```json
[
  { "start": "2026-10-31", "end": "2026-11-02" },
  { "start": "2026-11-05", "end": "2026-11-08" },
  { "start": "2026-11-20", "end": "2026-11-22" },
  { "start": "2026-12-24", "end": "2026-12-26" },
  { "start": "2026-12-27", "end": "2027-01-03" }
]
```

## 7. Cabana do Rio

Sem regressão na validação com os feeds reais: as duas fontes foram processadas, com `complete: true`, `status: complete` e os três períodos atuais preservados:

```json
[
  { "start": "2026-10-31", "end": "2026-11-02" },
  { "start": "2026-12-23", "end": "2026-12-25" },
  { "start": "2026-12-29", "end": "2027-01-02" }
]
```

## 8. Produção: etapa pendente

Nenhum push, deploy, promoção ou alteração de variável remota foi executado nesta investigação. A correção em produção ainda depende da publicação do código atual.

Na Vercel, crie um novo deployment da branch `main`, verificando que o commit escolhido é `4cca303` ou um descendente. Não use Redeploy nos deployments baseados em `af2e4cb`, pois isso publica novamente a versão que consulta apenas o Airbnb do Mirante. Mantenha `MIRANTE_CAETE_BOOKING_ICAL` em Production, sem prefixo `NEXT_PUBLIC_`.

Depois da publicação, confirme que o deployment ativo usa o commit correto e consulte `/api/availability?cabin=mirante` e `/api/availability?cabin=rio` nos domínios públicos. A variável já está correta; não precisa ser recriada.

Limitação adicional observada: `www.cabanasdorio.com.br` retornou `status: error`, enquanto `cabanas-do-rio.vercel.app` reproduziu os dois períodos do Airbnb. Não foi comprovada a causa dessa diferença entre os domínios, e nenhum ajuste de domínio foi realizado. Ambos precisam ser revalidados após o novo deployment; não se deve considerar a publicação concluída enquanto essa verificação não passar.
