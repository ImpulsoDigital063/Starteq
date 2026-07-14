# Starteq — Site (vitrine) · Estado / Handoff

_Última atualização: 14/07/2026._

## O que é
- **Site vitrine headless** da Starteq (loja de informática/games, Palmas-TO). Repo `starteq-palmas` (org `ImpulsoDigital063/Starteq`) → deploy `main` na Vercel → **starteq.vercel.app**.
- **Lê tudo do ComandaPRO** (o sistema em `C:/Users/Usuario/acai-system`) via API pública: `comandapro.net.br/api/loja/starteq/{produtos,pedido,montagem}`. O site NÃO tem banco próprio — catálogo, preço e estoque vêm do ComandaPRO.
- Vendido à parte pro Junior (dono da Starteq). **Contrato ainda não fechado** — parte do pacote pra vender a ideia. Ver `STARTEQ-DEV-STATUS.md` no repo do sistema.

## 🚦 Status (14/07/2026) — projeto salvo, apresentação adiada
Apresentação pro Junior adiada (ele ocupado + viajando). **Em espera.** Site funcional; fluxo site→sistema validado por teste hands-on (CIC).

## 🟢 Validado (teste CIC, compra real ponta a ponta)
- Home/vitrine carrega rápido, produtos reais (preço cheio + preço PIX -5% + parcelamento + badges OpenBox), categorias coerentes (GPU, CPU, mouse, teclado, monitor, cadeira), credibilidade (CNPJ, endereço, reviews, selos).
- Categoria → produto (specs, foto, preço) → carrinho (subtotal correto) → checkout.
- **Checkout cria pedido no sistema:** `POST comandapro.net.br/api/loja/starteq/pedido` → 201. O pedido cai **idêntico** (itens, qtd, cliente, telefone, valor) em `/admin/vendas` → "Pedidos do site pra confirmar", e ao confirmar no balcão vira venda no caixa. **Integração site→sistema está redonda.**
- **Mobile-first OK:** viewport correto, zero overflow horizontal.

## 🐞 Pendências de UI (trabalho NESTE repo — não é do sistema)
1. **"Adicionar ao carrinho" — corrida + sem feedback.** 1º clique após carregar às vezes não registra (nem badge, nem localStorage); cliques rápidos se perdem. **Falta feedback visual** (toast "Adicionado!" / mini-drawer do carrinho). Risco do cliente achar que adicionou e não adicionou. **Prioridade.**
2. **Preço PIX não aparece no carrinho/checkout.** A vitrine mostra "no PIX R$ X", mas o carrinho/checkout mostram só o cheio. O cliente finaliza vendo o cheio e paga -5% no PIX no balcão (paga menos, mas gera estranheza). Mostrar cheio + "no PIX R$ X" no carrinho, igual à vitrine.
3. **Lazy-load de fotos** — cards aparecem em branco antes de rolar. Trocar por placeholder/skeleton.

Nenhum bug de DADOS: itens/qtd/valores/cliente chegam perfeitos no sistema. As 3 acima são acabamento de UX do storefront.

## Infra
- Push: conta gh `ImpulsoDigital063`. Deploy automático `main` → Vercel (`starteq.vercel.app`).
- Depende da API do ComandaPRO no ar (`comandapro.net.br`). Slug do tenant: `starteq`.
