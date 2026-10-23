# Disponibilidade — relatório de entrega

Verificação realizada em 22/10/2026.

## 1. Status geral

**Implementação completa e validada localmente, inclusive executando o build de produção. Publicação na Vercel pendente.**

Calendário, seleção de estadia, consulta real aos feeds, validação no servidor e encaminhamento aos canais existentes estão funcionando. Hero, galerias, identidade, fontes, textos das demais seções e animações foram preservados.

A consulta de conta pela Vercel CLI 62.2.0 retornou `Worker timed out after 10 seconds`. Não foi possível confirmar o acesso à conta, configurar variáveis remotas ou publicar com segurança. Nenhum deploy ou push foi realizado. A porta 3000 já estava ocupada por outro projeto, que não foi interrompido.

[Prévia em desenvolvimento](http://localhost:3005/#disponibilidade) · [Build de produção local](http://localhost:3006/#disponibilidade)

## 2. Feeds reais

| Fonte | Resultado |
| --- | --- |
| `CABANA_RIO_AIRBNB_ICAL` | OK — HTTP e ICS válidos, calendário vazio válido |
| `CABANA_RIO_BOOKING_ICAL` | OK — HTTP e ICS válidos |
| `MIRANTE_CAETE_AIRBNB_ICAL` | OK — HTTP e ICS válidos |

São exatamente três fontes. A Cabana do Rio exige as duas fontes para confirmar disponibilidade; o Mirante exige somente o Airbnb informado. Não foi criado um quarto feed.

## 3. Dados processados

| Fonte | VEVENTs | Períodos relevantes | Após normalização |
| --- | ---: | ---: | ---: |
| Cabana do Rio / Airbnb | 0 | 0 | 0 |
| Cabana do Rio / Booking | 1 | 1 | 1 |
| Mirante / Airbnb | 1 | 1 | 1 |

Após unir as fontes da Cabana do Rio: **1 período**. Mirante: **1 período**. As contagens representam o momento da verificação e podem mudar nas próximas sincronizações.

## 4. Arquitetura

Variáveis privadas → fetch HTTPS no servidor → parser `ical.js` → datas civis e períodos `[start, end)` → normalização/merge → snapshot completo, incompleto ou erro → API sanitizada → calendário → validação da estadia no servidor → CTA.

- `GET /api/availability?cabin=rio` retorna o calendário da Cabana do Rio.
- `GET /api/availability?cabin=mirante` retorna o calendário do Mirante.
- Acrescentar `checkIn=AAAA-MM-DD&checkOut=AAAA-MM-DD` solicita a validação da estadia no servidor.
- Cabana inválida, parâmetros extras, parâmetros duplicados, datas passadas, datas inválidas, zero noites e entrada posterior à saída são rejeitados.
- O calendário cobre o mês atual e os 18 meses seguintes; períodos fora dessa janela não são confirmados automaticamente.
- Eventos all-day mantêm suas datas civis; horários UTC são interpretados em `America/Sao_Paulo`. Recorrências, EXDATE e exceções são processadas. TZID desconhecido sem definição no calendário falha de forma segura.

## 5. Arquivos

Criados:

- `src/lib/availability/types.ts`, `dates.ts`, `engine.ts`, `ical.ts`, `source.ts`, `snapshot.ts`, `server.ts`.
- `src/app/api/availability/route.ts`.
- `src/components/booking/stay-calendar.tsx`, `use-availability.ts`, `availability.css`.
- `tests/register.mjs`, `tests/availability.test.mjs`.
- Este relatório.

Modificados:

- `src/components/sections/booking-highlight-section.tsx`: substitui a consulta apenas por formulário pelo fluxo funcional com calendário.
- `src/components/data/availability.ts`: remove a preparação fictícia de quatro feeds e preserva a integração de datas das plataformas que já existia.
- `package.json` e `package-lock.json`: parser, correções de segurança e scripts de testes/typecheck.
- `AGENTS.md`: bloco de instruções regenerado automaticamente pelo Next.js atualizado.

## 6. Dependências

**Adicionada:** `ical.js@2.2.1`, parser RFC 5545 com suporte a recorrências e tipos TypeScript. Não foi instalada biblioteca de calendário, UI ou testes adicional. Os testes usam o runner nativo do Node e o TypeScript já existente no projeto.

**Atualizações de segurança:** Next.js e eslint-config-next de 16.2.9 para 16.4.2; duas dependências transitivas também receberam correções compatíveis. A versão anterior estava nas faixas vulneráveis dos avisos oficiais para [Windows](https://github.com/advisories/GHSA-p293-qw3h-jr36), [AVIF](https://github.com/advisories/GHSA-2xp9-vwfh-vxw4) e [SVG](https://github.com/advisories/GHSA-2464-fhr4-w9xw).

A auditoria com `npm audit --omit=dev` terminou com **zero vulnerabilidades**. A auditoria completa ainda aponta oito avisos altos em dependências de ferramentas de desenvolvimento; não foi aplicada uma atualização forçada ou downgrade incompatível para silenciá-los.

Não há migração de banco ou escrita nas plataformas. A reversão funcional é de código; deve preservar as correções de segurança e os valores privados fora do versionamento.

## 7. Cache e falhas

- Next Data Cache via `unstable_cache`, com revalidação de **300 segundos**. O projeto mantém Cache Components desativado; não foi introduzida uma migração de arquitetura.
- Cache por fonte e janela de consulta, independente dos cliques nos dias ou do período escolhido.
- Requisições externas paralelas, timeout de oito segundos, validação HTTP/ICS e limite de 2 MB por feed.
- Redirecionamentos externos não são seguidos.
- Resultados antigos retornados durante revalidação não confirmam disponibilidade: a idade da sincronização é conferida novamente no servidor.
- Falhas parciais, totais ou de configuração nunca se transformam em calendário livre.
- A API pública usa `Cache-Control: no-store`; não há cache de resposta no navegador escondendo o resultado da validação.
- Reutilização do cache confirmada por chamadas consecutivas mantendo o mesmo `lastUpdated`.

## 8. Segurança

Verificados:

- `.env.local` ignorado pelo Git e não versionado.
- Configuração de feeds somente no módulo servidor, protegido por `server-only`.
- Somente HTTPS e hosts das plataformas permitidas; o cliente não fornece URLs.
- Allowlist de cabanas e parâmetros da API.
- Nenhuma URL de feed, token, UID, resumo, descrição ou nome de hóspede na resposta pública.
- Erros públicos sanitizados, sem propagação das exceções dos provedores.
- Varredura por URLs privadas e componentes sensíveis dos tokens no código, arquivos versionados existentes, bundles cliente, HTML gerado e logs examinados: nenhum resultado.
- Nenhuma exposição nas respostas da API ou HTML servido.
- Nenhuma requisição do navegador diretamente aos feeds privados.

## 9. Interface

Desktop/tablet mostram dois meses; celular mostra um mês, com navegação própria e sem popover fora da viewport. Há indicação de noites bloqueadas, entrada, saída, intervalo selecionado, hover, foco e checkout possível no início de um bloqueio.

Estados implementados: carregando, sincronização completa, sincronização incompleta, erro, verificando estadia, disponível, indisponível e não foi possível confirmar. As últimas três respostas vêm da validação do servidor.

Trocar a cabana limpa seleção e resultado anteriores. Requisições antigas são canceladas para evitar resultados cruzados. Confirmação de estadia atualiza o snapshot do calendário. São mantidos os links existentes do Airbnb, Booking e WhatsApp, incluindo a integração de datas já presente no projeto. O WhatsApp recebe mensagem contextual com cabana, datas e noites.

O seletor de hóspedes foi omitido por ausência de documentação independente e confiável da capacidade no conteúdo atual. Não foram acrescentadas políticas, preços ou regras de hospedagem.

Microcopy informa que a disponibilidade depende da última sincronização e que a reserva só é confirmada no canal escolhido. O site não emite confirmação de reserva.

## 10. Testes

**22 testes automatizados aprovados**, cobrindo parsing, períodos duplicados, merge, adjacência, checkout exclusivo, datas inválidas/passadas, zero noites, intervalo reverso, feed vazio válido, feed inválido, recorrências/exceções, timezone, timeout, falha parcial, falha total, cache expirado e restrição dos destinos externos.

Para bloqueio 10→13, foram verificados: 09→10 sem conflito; 09→12 com conflito; 10→13 com conflito; 11→14 com conflito; 13→16 sem conflito.

No Chrome, com os feeds reais: calendário das duas cabanas, troca entre cabanas, checkout na borda de bloqueio, seleção conflitante impedida e resultado disponível vindo da API. Os cenários de loading, indisponível, erro e sincronização incompleta também foram exercitados com interceptação exclusivamente em uma sessão de teste isolada, sem alterar os feeds ou inserir dados fictícios na aplicação.

Responsividade verificada em 320, 375, 390, 430, 768, 1024 e 1440 px, sem transbordamento horizontal. Teclado, toque simulado, navegação de meses e movimento reduzido verificados. O hero pela LAN também foi revalidado. Não foram observados erros de execução no navegador.

## 11. Qualidade

| Check | Resultado |
| --- | --- |
| `npm test` | 22/22 aprovados |
| `npm run lint` | Aprovado |
| `npm run typecheck` | Aprovado |
| `npm run build` | Aprovado — Next.js 16.4.2 |
| Execução com `next start` | API, calendário e validação reais aprovados |
| Auditoria de dependências de produção | Zero vulnerabilidades |

O teste de build preservou a página inicial estática e criou somente a API de disponibilidade como rota dinâmica.

## 12. Produção / Vercel

Projeto local vinculado: `cabanas-do-rio`. A consulta à CLI retornou timeout, portanto publicação e variáveis remotas não foram confirmadas.

Antes de publicar, configure estas variáveis no projeto Vercel, em **Production** e, se necessário, **Preview**, usando os valores privados já disponíveis localmente:

```text
CABANA_RIO_AIRBNB_ICAL
CABANA_RIO_BOOKING_ICAL
MIRANTE_CAETE_AIRBNB_ICAL
```

Não use prefixo `NEXT_PUBLIC_`. Não crie um quarto feed. Depois de configurar as variáveis, faça um novo deployment. Não envie `.env.local` ao repositório.

A publicação permanece como ação manual pendente enquanto não houver acesso funcional à Vercel. Os testes de tela foram feitos por emulação no Chrome, não em aparelhos físicos. Não foi realizada medição de Core Web Vitals em produção.

## 13. Teste manual local

1. Na pasta do projeto, execute `npm ci` caso precise reinstalar as dependências do lockfile.
2. Mantenha as três variáveis no `.env.local`, sem revelar seus valores.
3. Execute `npm run dev -- --port 3005` e abra `http://localhost:3005/#disponibilidade`.
4. Escolha Cabana do Rio. Aguarde “Calendários consultados”, selecione entrada e saída sem atravessar marcações e clique em “Verificar disponibilidade”. Confira as noites e os CTAs.
5. Na verificação de 22/10, o intervalo bloqueado da Cabana do Rio permitiu checkout em 29/12/2026, impediu atravessar esse bloqueio e permitiu uma nova entrada em 02/01/2027. Navegue até esses meses para conferir; os feeds podem ser atualizados, portanto prevalecem as marcações atuais.
6. Troque para o Mirante, confirme que a seleção anterior foi limpa e escolha novas datas.
7. Use Tab para chegar ao calendário; use setas, Home/End e PageUp/PageDown; confirme os dias com Enter.
8. Reduza a tela até 320 px. Verifique um mês por vez, botões de navegação e CTA. Ative a preferência de movimento reduzido no sistema/navegador.
9. Para conferir falha de rede sem alterar os segredos, bloqueie a requisição `/api/availability` nas ferramentas do navegador e recarregue. O estado deve indicar impossibilidade de confirmar e oferecer canais existentes, sem indicar período disponível.
10. Execute `npm test`, `npm run lint`, `npm run typecheck` e `npm run build`.
11. Para executar o build aprovado, use `npm run start -- --port 3006` e abra `http://localhost:3006/#disponibilidade`.

Prévias: [desktop](C:/Users/joao0/.codex/visualizations/2026/10/15/01a1405d-07f0-7221-a7b0-6eb8e0b52989/availability-desktop.png) e [celular](C:/Users/joao0/.codex/visualizations/2026/10/15/01a1405d-07f0-7221-a7b0-6eb8e0b52989/availability-mobile.png).
