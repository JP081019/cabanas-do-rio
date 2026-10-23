# Animações no ambiente de desenvolvimento pela LAN

## Causa comprovada

O Next.js 16.2.9 bloqueava o hostname da rede no WebSocket de desenvolvimento. O log do servidor registrou:

```text
Blocked cross-origin request to Next.js dev resource /_next/webpack-hmr from "192.168.0.34".
```

No navegador, o handshake retornava `ERR_INVALID_HTTP_RESPONSE`. O HTML e os 23 recursos JavaScript observados carregavam, mas a inicialização do React não concluía: o FAQ não recebia os eventos do React e o hero permanecia no estado inicial.

## Correção

Somente `next.config.ts` teve código de execução alterado. `allowedDevOrigins` agora inclui localhost, loopback e os endereços IPv4 privados das interfaces desta máquina, identificados no início do servidor. Não há wildcard que libere qualquer origem, nem IP da rede fixado no código.

O servidor já escutava em `0.0.0.0`; não foi necessário alterar o comando de desenvolvimento. Se o DHCP mudar o IP durante a sessão, reinicie o servidor para atualizar a lista.

## Investigação e verificação

| Item | Resultado |
| --- | --- |
| Next.js e allowedDevOrigins | Bloqueio de origem confirmado no log; corrigido na configuração |
| Hostname e bind do servidor | Escutando em todas as interfaces, na porta 3000 |
| localhost / 127.0.0.1 hardcoded | Nenhuma dependência em `src`; referências documentais e allowlist explícita |
| Motion / animações | Mesma versão e mesmos componentes, sem alterações |
| Secure context | Localhost é seguro e HTTP pela LAN não; a correção funciona mantendo HTTP na LAN, sem polyfills |
| Hidratação | Não concluía pela LAN antes; ativa nos dois endereços após a correção, sem erros de mismatch observados |
| Assets e chunks | Sem falhas de requisição observadas nas sessões comparadas |
| WebSocket / HMR / origin | Antes: handshake falhava pela LAN; depois: conectado e recebendo mensagens nas duas origens |
| Scroll, touch e wheel | Nenhum tratamento por hostname no código; scroll e swipe funcionam nas duas origens |
| IntersectionObserver | Barra de reserva responde à passagem do hero em ambas as origens |
| ResizeObserver e sticky | APIs presentes nas duas origens; layout, scroll e mudança de viewport verificados |
| prefers-reduced-motion | Preferência respeitada, inclusive após mudar durante a visita, nas duas origens |

O hero produziu valores idênticos nos dois endereços: no topo, `inset(28% 24% 22% round 2px)`; em 300 px, `inset(15.3684% 13.1729% 12.0752% round 1.09774px)`; em 850 e 950 px, `inset(0%)` e conteúdo com opacidade 1.

Também foram verificados FAQ, menu mobile, perspectiva da galeria e swipe da lightbox. Os testes foram feitos no Chrome desta máquina acessando os dois endereços, com viewport mobile emulada. Não foram observados erros de execução, requisições malsucedidas ou erros de console nas sessões após a correção.

Lint, TypeScript e build de produção aprovados. Design, textos, estilos e animações preservados.
