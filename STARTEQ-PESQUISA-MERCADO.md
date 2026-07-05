# Starteq — Pesquisa de Mercado (AT celular/eletrônicos/informática)

> Consolidado de 6 agentes de pesquisa (concorrentes BR, players globais, dores-núcleo caixa/OS/estoque, fluxo+Brasil fiscal/legal, UI/UX). Data: 05/07/2026.
> Regra dura aplicada em toda a pesquisa: só afirmação com fonte; lacuna marcada como "não encontrado".

---

## 1. As 3 dores do Júnior (dono) — o eixo de tudo

1. **Fechar caixa** — o sistema atual (GestãoClick) não bate: a venda da OS não aparece no fechamento do PDV.
2. **Mandar OS pro técnico** — despacho confiável, técnico saber que tem OS nova.
3. **Estoque** — controle de peças, baixa no uso, não duplicar/sumir.
4. **(anexa) Comissão** — sistema atual computa comissão sobre venda de produto no meio da assistência. No Starteq a base é **blindada: só mão de obra (`service_value`)**.

---

## 2. Concorrentes brasileiros

| Sistema | Preço/mês | Foco | Caixa | Despacho técnico | Estoque | Nota |
|---|---|---|---|---|---|---|
| **GestãoClick** (incumbente do Júnior) | R$119–379 | ERP genérico | ❌ OS não aparece no fechamento | via agenda, não atribuição | alerta mín; instável desde nov/25 | RA1000 9,3; NFe completa. Comissão = manual |
| **OS Digital+** | R$54–137 | Vertical eletrônicos | tempo real (sem fechamento formal) | não visto | menção genérica | assinatura digital, alerta "OS parada +5d", financeiro visual |
| **AgoraOS** | R$347–947 | ERP forte em OS | conciliação, sem fechamento | **o mais forte** (app "In Loco", mapa) | **baixa automática** | QR PIX, comissão multi-técnico, NFe+NFSe. Caro |
| **InforOS** | R$69–149 | Vertical puro | sem menção | fila + responsável | sincroniza c/ vendas | comissão, portal (Plus), WhatsApp. NFe "em dev". App só responsivo |
| **Nuvem Gestor** | R$129–379 | Genérico | sem "fechamento" | alerta e-mail/SMS | histórico de compras | NFe completa, comissão. Sem WhatsApp/app |
| **SystemOS** | R$59–497 | Vertical | — | roteamento c/ IA | — | portal, WhatsApp, preço público |
| **AssistênciaPro** | oculto | Vertical celular | sem "fechamento" | fraco (balcão) | **forte**: por compatibilidade, checklist marca, leitor cód. barras | comissão, NFS-e, WhatsApp |
| **Consert** | não achado | mobile-first técnico | tela não exposta | app dedicado | tela não exposta | laudo IA, **comissão transparente na tela do técnico** |
| **FpqSystem** | R$395 vitalício | Desktop offline | caixa + contas | cadastra técnico, sem despacho | alerta reposição | barato, sem cloud/app/WhatsApp. Pós-venda rígido |
| **Auvo** | sob consulta | Field service | ❌ não faz caixa balcão | **forte** + app campo | ⚠️ fraqueza confessa (Capterra) | não é loja de conserto, é técnico externo |
| **SIGE Lite** | grátis + add-ons | Genérico | PDV | — | add-on | queixas graves (dados apagados, propaganda enganosa) |

**Descartados (não existem como software de AT):** SmartGSM (desbloqueio IMEI), Sysmo (supermercado), Bravos, iGerente, SOS Sistemas, Ordersys (holandês), Assist Card (seguro viagem).

**Faixa de preço do mercado BR:** R$30–70 básico · R$70–150 intermediário · R$150–300 completo.

**Leitura decisiva:** ninguém domina o Reclame Aqui (perfis vazios / <10 reclamações). Mercado **sem líder consolidado de reputação** — porta aberta.

---

## 3. Benchmark global (o que importar)

| Sistema | Preço | Feature "uau" |
|---|---|---|
| **RepairShopr/Syncro** | US$60–150 | Auto-triagem/despacho por **skill do técnico** (aprende quem conserta o quê); "My Queue"; painel de fila na loja (TV) |
| **RepairDesk** | US$99–149 | **Caixa maduro**: Z-Report, till por cédula, **trava logout até reconciliar**; IMEI no intake; integração direta c/ fornecedor de peças |
| **RepairQ** | US$75–150 | Buy/sell/trade; assinatura digital; multi-fornecedor; **BI de produtividade** (turn time, rework rate) |
| **Fixably** | cotação | GSX Apple (serial → garantia); **portal do cliente com stepper**; **edição inline** (menos cliques); UI mais moderna |
| **Orderry** | US$39–199 | **WhatsApp 2-way nativo**; assinatura; app do técnico; PO management; BI de margem por reparo/peça |
| **SmartGSM.app** | demo | **Kanban de OS de verdade**; bancada rica (IMEI/senha, **padrão de desbloqueio 3x3**, checklist toggle); "AI Diagnose" |

**11 features do mundo que raramente existem no BR:** reconciliação de caixa c/ Z-Report + trava, auto-despacho por skill, painel de fila na loja, integração c/ fornecedor de peças, IMEI propagado, portal c/ tracking, assinatura digital no balcão, WhatsApp 2-way, validação de garantia do fabricante, app do técnico offline, BI de margem por reparo.

---

## 4. Os 3 GAPS de mercado = a cunha do Starteq

Confirmados por **convergência de vários agentes** — é onde ninguém (BR) faz bem:

### GAP 1 — Fechamento de caixa por turno com separação físico × recebível
Nenhum dos ~11 sistemas BR faz fechamento por operador/turno; todos têm só "fluxo de caixa" genérico. O erro nº1 do GestãoClick: mistura cartão/recebível futuro na contagem de espécie → caixa nunca bate.
**Starteq:** dinheiro físico e recebível (cartão D+30 / PIX) são **entidades separadas**. Cartão nunca entra na meta "bateu"; vira recebível com data de crédito. Divergência gera registro de auditoria com responsável + justificativa (nunca "ajusta sozinho"); acima de teto exige 2ª aprovação. OS e Caixa na **mesma fonte de verdade**.

### GAP 2 — Comissão blindada, amarrada ao pagamento
Ninguém faz certo. GestãoClick larga o cálculo na mão do cliente e computa comissão sobre venda de produto no meio da OS.
**Starteq:** comissão **só sobre `service_value`** de OS **quitada** (não sobre peça, não sobre venda de balcão). Dois relatórios: **apurada** (OS fechada) × **a pagar** (dinheiro recebido, considerando D+30). Estorno em devolução. Reforço fiscal: a separação peça×serviço já é obrigatória por lei (NF-e/ICMS na peça, NFS-e/ISS no serviço).

### GAP 3 — Bancada do técnico mobile-first + kanban de OS + despacho confiável
Só SmartGSM (rico) e Consert (mobile) tocam; a combinação completa ninguém tem. RepairShopr nem garante notificação ao atribuir.
**Starteq:** kanban de OS por status (arrastar = muda status), bancada mobile-first (IMEI/senha, padrão de desbloqueio, checklist toggle, peças, laudo IA), atribuição automática por menor carga + especialidade, **notificação confiável ao técnico**.

**Diferenciais adicionais que ninguém entrega:** rastreio peça→IMEI (garantia/recall por lote), split contábil peça×serviço nativo, estoque com **foto + badge visual de baixo estoque**, alerta proativo de OS parada, portal do cliente com stepper via WhatsApp, campo de senha cifrado (LGPD).

---

## 5. Brasil — fiscal/legal (o que o sistema precisa respeitar)

- **Duas notas por conserto com peça:** NFS-e (ISS, mão de obra, item 14.01 LC 116) + NF-e/NFC-e (ICMS, peça). A OS **não** é documento fiscal. Rota técnica de emissão mais forte: **Focus NFe** (API, +1.200 municípios).
- **Garantia legal:** 90 dias (CDC art. 26, II) contados do término do serviço. Rastrear por OS/IMEI; alertar retorno dentro do prazo.
- **Orçamento:** validade de 10 dias (art. 40 §1º); não pode executar sem autorização. Fluxo "link WhatsApp → aprova → executa" cobre.
- **Termo de OS** precisa: estado físico na entrada (avarias/IMEI/acessórios), ciência de risco de perda de dados + recomendação de backup, valor/prazo, cláusula de estadia, assinatura cliente+técnico.
- **LGPD:** AT é operadora de dados (responsabilidade solidária por vazamento). Senha do aparelho = campo cifrado, acesso restrito. Backup prévio é responsabilidade do cliente (termo assinado fortalece a loja). Retenção ~5 anos (garantia + fiscal).

---

## 6. Lista de ferramentas do Starteq — priorizada

### [ESSENCIAL v1] — sem isto não opera nem é legal
1. **OS com máquina de status** (Entrada → Diagnóstico → Aguardando peça → Em reparo → Pronto → Entregue/Cancelado) — **kanban** como visão padrão + toggle tabela.
2. **Cadastro de aparelho c/ IMEI/série + histórico** (puxa atendimentos anteriores).
3. **Check-in guiado numa tela** — grid de tipo de aparelho → marca/modelo → IMEI/senha → checklist de avarias + fotos + assinatura.
4. **Termo de OS juridicamente completo** (estado, ciência de perda de dados, autorização, assinatura digital).
5. **Orçamento + aprovação por link WhatsApp** (validade 10 dias).
6. **Estoque de peças c/ baixa automática na OS** (no ato de usar, não no faturamento) + foto + badge de baixo estoque.
7. **Caixa com fechamento por turno** — físico × recebível separados; OS e caixa na mesma fonte; read-after-write (λ.prova-na-fonte).
8. **Comissão blindada** — só `service_value` de OS quitada; apurada × a pagar.
9. **Notificações WhatsApp por status** (orçamento, pronto).
10. **Garantia rastreada (90d) por OS/IMEI.**
11. **Emissão de nota — NFS-e + NF-e/NFC-e separadas** (via Focus NFe).

### [IMPORTANTE v2]
12. Bancada/app do técnico mobile-first (padrão de desbloqueio, checklist toggle, laudo IA).
13. Despacho automático (menor carga + especialidade) + notificação confiável ao técnico.
14. Portal/consulta do cliente por link (stepper de status).
15. Comissão transparente na tela do técnico (só a dele — λ.garcom-app-so-pedidos).
16. Relatórios (OS por técnico/período, faturamento, ticket médio, produtividade).
17. Senha do aparelho cifrada + cláusula LGPD no termo.

### [DIFERENCIAL] — nenhum concorrente entrega
18. Rastreio peça→IMEI (garantia/recall por lote).
19. Split contábil peça×serviço nativo na OS (liga à separação fiscal ICMS/ISS).
20. QR PIX dinâmico conciliado por OS.
21. Alerta proativo de OS parada há +X dias.
22. Custo médio ponderado nativo (gap do mercado inteiro).

---

## 7. Diretrizes de UI (princípio: FACILITA, menos cliques — λ.menos-cliques)

- Sidebar **ícone + LABEL** agrupada por intenção (fugir da navbar só-ícone do Syncro/Fixably).
- **Kanban de OS** como padrão + cor de status semântica (azul=entrada, roxo=reparo, laranja=aguardando, verde=pronto, cinza=entregue, vermelho=atrasado).
- Card/linha de OS atrasada muda de fundo sozinha.
- Bancada e check-in = **mobile-first** (técnico no cel); caixa e estoque podem adensar no desktop (tri-modal <640/640-1023/≥1024).
- **Edição inline**, sem modal empilhado.
- Fechamento de caixa em UMA tela: 3 números grandes (Entradas/Saídas/Saldo) → quebra por forma de pagamento → transações colapsadas.
- Indicador de "quem está mexendo nesta OS" (gap real do Syncro).
- Fugir do "747" (excesso de config do RepairDesk): caminho quente na frente, config enterrada.

---

## 8. Lacunas honestas da pesquisa
- Preço R$ de OS Digital+ (Online OS), Consert, AssistênciaPro, ReparaOS: não capturados (JS/oculto).
- Texto oficial do CDC não lido no Planalto (bloqueio) — citações via fontes secundárias convergentes.
- Modelo pronto de cláusula LGPD para AT e split peça/serviço nativo: não existem no mercado = onde o Starteq inova.

---

## 9. Emissor de nota fiscal (avaliação 05/07/2026)

Setup do Júnior: **Simples Nacional completo** → precisa NFC-e (peça balcão) + NF-e + NFS-e (serviço). Não se fala direto com a SEFAZ — usa-se um emissor/API que assina com certificado A1 e transmite. Ponto crítico da escolha: **cobertura de NFS-e para Palmas-TO** (municipal, provedor WebISS/WEBISS20).

| Emissor | Palmas-TO NFS-e | Preço | Webhook | Reputação | Veredito |
|---|---|---|---|---|---|
| **Focus NFe** | ✅ confirmado (guia dedicado, WebISS, homologação) | público R$59,90–89,90/mês (3 notas no plano) | ✅ | RA amostra pequena (Acras Tec.) | ✅ **RECOMENDADO** |
| PlugNotas (TecnoSpeed) | ✅ confirmado (IBGE 1721000, WEBISS20) | opaco (bilhetagem/ilimitado) | ✅ | Regular 6,6; queixas de NFS-e | 🥈 vice |
| Nuvem Fiscal | ✅ (irrelevante) | por cota | ❌ | — | ❌ ENCERRA 31/07/2026 |
| eNotas / Nota Gateway | ❌ não confirmado | opaco/por-CNPJ | ✅ | RA1000 (mira infoproduto; eNotas nem faz NFC-e) | ❌ fora |

**Recomendado: Focus NFe** — Palmas confirmado + preço público barato + 3 notas num plano + A1 server-side + webhook + CSOSN. PlugNotas é plano B (motor NFS-e mais amplo, contingência offline "NeverStop", mas preço opaco e suporte "Regular").

**Arquitetura:** módulo fiscal atrás de uma abstração/adapter (Focus e PlugNotas têm mesmo formato REST/JSON+A1+webhook) → trocar emissor = trocar adapter. Capacidade de plataforma (serve ComandaPRO tb via NFC-e).

**Offline:** emissão exige internet (SEFAZ) → enfileira e dispara ao reconectar; recibo interno sai na hora, nota oficial sincroniza depois.

**Gate antes de assinar (λ.prova-na-fonte comercial):** confirmação POR ESCRITO do comercial de que o CNPJ do Júnior emite NFS-e homologada HOJE no WebISS Palmas + piloto em homologação real antes de comprometer o cliente. Página de marketing não é prova.

**Pré-requisitos do cliente (o gargalo real, não o código):** certificado A1, CNPJ+inscrição estadual, cadastro na prefeitura (NFS-e), CSC/token (NFC-e), e dado fiscal por produto (NCM/CFOP/CST-CSOSN/origem — vem do contador).
