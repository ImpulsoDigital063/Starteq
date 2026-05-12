# Starteq Tocantins · E-commerce

Site novo da Starteq Tocantins (Júnior · @starteq_to · Palmas-TO) desenvolvido pela **[Impulso Digital](https://impulsodigital063.com)**.

## Stack
- **Next.js 16.2** App Router + TypeScript + React 19
- **Tailwind v4** (paleta preto + amarelo Phoenix)
- **Supabase** (fase 2 · banco + auth + storage)
- **Asaas** (fase 2 · PIX nativo + cartão)
- Deploy **Vercel**

## Diferenciais cravados

1. **Compatibilidade validada** · ao escolher CPU AM5, só mostra mobos AM5 · DDR5 só com mobo DDR5 · fonte sugere wattagem mínima por TDP
2. **API consumível pela IA** do Júnior · ela para de mandar pra Kabum porque agora sabe o estoque real
3. **PIX nativo** (fase 2) · diferente do site antigo que só tinha cartão + boleto
4. **Same-day Palmas** · loja física na 104 Sul SE 05 Lt 19 Sala 07

## Endpoints da API (públicos · IA do Júnior consome)

```
GET  /api/products
GET  /api/products/:sku
POST /api/quote · body: { parts: ["sku1","sku2",...] }
```

Docs visuais em `/admin/api-ia` quando logar no painel.

## Comandos

```bash
npm run dev      # localhost:3000
npm run build    # build production
npm start        # serve build
```

---

Desenvolvido por **Impulso Digital** · Eduardo Barros · Palmas-TO
