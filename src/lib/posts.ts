// Mock posts do blog · estrutura espelha o que vai virar Supabase depois

import type { IconName } from "@/components/Icon";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Build" | "Hardware" | "Setup" | "Tutorial" | "Mercado";
  author: string;
  date: string;        // ISO YYYY-MM-DD
  read_min: number;
  cover_icon: IconName; // SVG cover via Icon component
  body: string;        // markdown simples
};

export const POSTS: Post[] = [
  {
    slug: "vale-a-pena-montar-pc-gamer-2026-crise-das-memorias",
    title: "Vale a pena montar PC gamer agora em 2026 (ou esperar)? A crise das memórias explicada",
    excerpt:
      "O preço de RAM e SSD explodiu em 2026 por causa da IA. Entenda por que subiu, quanto subiu de verdade (com fontes) e a decisão certa pra quem quer montar PC em Palmas: comprar agora ou esperar.",
    category: "Mercado",
    author: "Tripulação Starteq",
    date: "2026-07-08",
    read_min: 9,
    cover_icon: "tag",
    body: `Se você abriu o orçamento de um PC em 2026 e levou um susto com o preço da memória RAM e do SSD, não é impressão sua. O mercado vive a maior alta de preço de componentes em anos — apelidada de "crise das memórias" ou "Rammargedon". Antes de decidir montar agora ou esperar, entenda o que está acontecendo de verdade.

## O que subiu, e quanto

Os números são reais e assustadores:

- Um módulo de **DDR4 16GB** que era acessível chegou ao teto de **R$ 950** em janeiro de 2026 — uma alta que beira **300% em dois anos**. ([Adrenaline](https://www.adrenaline.com.br/hardware/preco-da-memoria-ddr5-dobra-modulos-de-16-e-32-gb-atingem-recorde-historico/))
- Um **SSD NVMe de 1TB** que custava cerca de R$ 350 em 2025 passou de **R$ 950**. ([Canaltech](https://canaltech.com.br/hardware/crise-das-memorias-como-escapar-do-preco-inflado-e-montar-um-pc/))
- No geral, memórias DRAM e SSDs encareceram **até 89% em 2026**. ([Última Ficha](https://ultimaficha.com.br/2026/06/23/memorias-dram-ssd-precos-2026/))

E tem um detalhe cruel: a **DDR4 (mais antiga) está subindo mais rápido que a DDR5**. No primeiro trimestre de 2026, a DDR4 subiu **+172%** contra **+76%** da DDR5. ([Adrenaline](https://www.adrenaline.com.br/hardware/precos-de-memorias-ddr4-estao-subindo-mais-rapido-do-que-os-de-ddr5/))

## Por que isso aconteceu

A resposta em uma palavra: **IA**. As fábricas de memória (Samsung, SK Hynix, Micron) redirecionaram a produção pra atender os data centers de inteligência artificial nos EUA e na China, que pagam mais e compram em volume gigante. O varejo — a gente, que monta PC em casa — ficou com as sobras. ([Promobit](https://www.promobit.com.br/blog/por-que-pecas-de-computador-estao-caras-2026/) · [Olhar Digital](https://olhardigital.com.br/2026/04/08/reviews/escassez-de-memoria-ram-para-ia-eleva-precos-de-ssds-no-mercado-global/))

A produção de DDR4 foi praticamente encerrada pra liberar linha pra DDR5 e memória de servidor — por isso o pente velho ficou raro e caro.

## Então: montar agora ou esperar?

A pergunta que todo mundo faz. A resposta honesta depende de duas coisas.

**A previsão de normalização é meados de 2027, com estabilização só em 2028.** ([Adrenaline](https://www.adrenaline.com.br/hardware/precos-altos-de-memorias-ram-ddr4-e-ddr5-podem-durar-ate-2028/)) Ou seja: **não é uma alta de semanas — é um platô de mais de um ano.** Esperar "o preço cair mês que vem" provavelmente não vai funcionar.

- **Se você PRECISA do PC agora** (trabalho, estudo, aquele jogo que os amigos já estão jogando): montar agora é a decisão racional. O preço não vai melhorar tão cedo, e cada mês parado é um mês sem usar.
- **Se é um upgrade que pode esperar** (você já tem um PC que roda o que precisa): dá pra segurar, priorizar peças que não subiram tanto (GPU, gabinete, fonte) e completar a memória depois.

## Como montar gastando menos no cenário atual

- **RAM: 16GB dual channel é o piso — não corte pra 8GB** só pra economizar, porque isso derruba desempenho e causa travadas. Melhor esperar um pouco e comprar os 16GB certos.
- **Reaproveite o que der:** se você já tem pentes de RAM ou um SSD de uma máquina antiga, aproveitar agora vale ouro.
- **Plataforma:** montando do zero, o argumento clássico "economizo indo de DDR4" perdeu força (a DDR4 subiu mais). Pra build novo, plataforma DDR5 (AMD AM5) faz mais sentido a longo prazo.
- **Onde o dinheiro rende:** GPU e fonte são onde o desempenho e a segurança da build moram — não é aqui que se corta.

## O papel de uma loja local nisso tudo

Num mercado com preço oscilando toda semana, comprar peça solta online vira roleta: o valor que você viu ontem pode não ser o de amanhã, e o frete pra Tocantins ainda entra por cima.

Na Starteq, em Palmas, a gente fecha o **orçamento da build com o preço da peça travado na hora** — você sabe exatamente quanto vai pagar, com a máquina montada à mão, testada e com garantia por peça. Sem surpresa de preço no meio do caminho.

## Resumo

A crise das memórias é real, tem causa (IA) e prazo longo (normalização só em 2027-2028). Esperar o preço despencar mês que vem é aposta furada. Se precisa do PC, monte com estratégia: 16GB de verdade, plataforma que dura, e o dinheiro nas peças que importam. Quer um orçamento com preço travado? Chama a Starteq no WhatsApp.

## Fontes

- Adrenaline — [Preço da memória DDR5 dobra: módulos de 16 e 32 GB atingem recorde](https://www.adrenaline.com.br/hardware/preco-da-memoria-ddr5-dobra-modulos-de-16-e-32-gb-atingem-recorde-historico/)
- Adrenaline — [Preços de DDR4 estão subindo mais rápido que DDR5](https://www.adrenaline.com.br/hardware/precos-de-memorias-ddr4-estao-subindo-mais-rapido-do-que-os-de-ddr5/)
- Adrenaline — [Preços altos de memórias podem durar até 2028](https://www.adrenaline.com.br/hardware/precos-altos-de-memorias-ram-ddr4-e-ddr5-podem-durar-ate-2028/)
- Canaltech — [Crise das memórias: como escapar do preço inflado](https://canaltech.com.br/hardware/crise-das-memorias-como-escapar-do-preco-inflado-e-montar-um-pc/)
- Promobit — [Por que peças de computador estão caras em 2026](https://www.promobit.com.br/blog/por-que-pecas-de-computador-estao-caras-2026/)
- Olhar Digital — [Escassez de RAM para IA eleva preços de SSDs](https://olhardigital.com.br/2026/04/08/reviews/escassez-de-memoria-ram-para-ia-eleva-precos-de-ssds-no-mercado-global/)`,
  },
  {
    slug: "melhor-placa-de-video-ate-2500-reais-2026",
    title: "Melhor placa de vídeo até R$ 2.500 em 2026: RTX 5060 vs RX 9060 XT vs Intel Arc B580",
    excerpt:
      "Comparativo real das três placas que dominam a faixa de R$ 2.500 em 2026 — desempenho, VRAM, DLSS/FSR/XeSS e qual entrega mais frame por real pra 1080p e 1440p.",
    category: "Hardware",
    author: "Tripulação Starteq",
    date: "2026-07-05",
    read_min: 8,
    cover_icon: "gamepad",
    body: `A faixa de até R$ 2.500 é onde mora a maioria dos gamers brasileiros — e em 2026 ela ficou disputada. Três placas brigam por esse dinheiro: a NVIDIA RTX 5060, a AMD RX 9060 XT 16GB e a Intel Arc B580. Cada uma tem um argumento forte. Vamos ao que importa.

## As três candidatas

| Placa | VRAM | Preço Brasil (R$) | Alvo |
|---|---|---|---|
| Intel Arc B580 | 12 GB | ~2.000–2.100 | 1080p com folga de VRAM |
| NVIDIA RTX 5060 | 8 GB GDDR7 | ~2.200–2.400 | 1080p ultra + DLSS 4 |
| AMD RX 9060 XT | 16 GB | ~2.500–2.980 | 1440p custo por frame |

Faixas de rua em julho/2026. ([TechTudo tier list](https://www.techtudo.com.br/noticias/2026/02/qual-a-melhor-placa-de-video-de-2026-veja-tier-list-e-escolha-para-o-seu-pc-edinfoeletro.ghtml) · [TerabyteShop](https://www.terabyteshop.com.br/blog/melhores-placas-video-custo-beneficio-2026))

## O ponto que decide tudo em 2026: VRAM

A regra que virou consenso entre os reviewers brasileiros neste ano é dura e direta: **não compre placa com menos de 12GB de VRAM pra jogar títulos AAA**. ([TerabyteShop](https://www.terabyteshop.com.br/blog/melhores-placas-video-custo-beneficio-2026)) Jogos novos estão estourando os 8GB em 1080p com texturas altas, causando quedas de FPS e travadas.

Isso coloca a **RTX 5060, com só 8GB, em desvantagem** de futuro — apesar de ser uma ótima placa hoje. A Arc B580 (12GB) e a RX 9060 XT (16GB) nascem mais preparadas pro que vem.

## Desempenho e tecnologias

- **RX 9060 XT 16GB** — apontada como a **"rainha do custo por frame"** de 2026, com cerca de **R$ 24,20 por frame** e desempenho até **22% acima da RTX 5060** em jogos sem ray tracing pesado. Os 16GB dão folga real pra 1440p. Usa FSR pra upscaling. ([TerabyteShop](https://www.terabyteshop.com.br/blog/melhores-placas-video-custo-beneficio-2026) · [André Indica](https://www.andreindica.com.br/guia/melhores-placas-de-video-2026/))
- **RTX 5060** — a mais equilibrada pra **1080p ultra** e a única das três com **DLSS 4 e Multi Frame Generation** (geração de quadros por IA), que aumenta muito a fluidez percebida em jogos compatíveis. O calcanhar são os 8GB. ([André Indica](https://www.andreindica.com.br/guia/melhores-placas-de-video-2026/))
- **Intel Arc B580** — a surpresa da faixa: **12GB de VRAM por preço de entrada** (~R$ 2.000), com upscaling XeSS. É a mais barata e a que mais entrega VRAM por real, mas o ecossistema Intel Arc ainda é o mais novo dos três (drivers evoluindo). ([TechTudo](https://www.techtudo.com.br/noticias/2026/02/qual-a-melhor-placa-de-video-de-2026-veja-tier-list-e-escolha-para-o-seu-pc-edinfoeletro.ghtml))

## Veredito por perfil

- **Melhor custo-benefício geral / quer 1440p:** RX 9060 XT 16GB. Mais frame por real e VRAM de sobra.
- **Só joga 1080p e quer DLSS/ecossistema NVIDIA:** RTX 5060 — sabendo que os 8GB pedem cautela em AAA futuros.
- **Orçamento mais apertado e quer VRAM:** Intel Arc B580 — 12GB baratos, se você topa uma plataforma mais nova.

## Antes de comprar

Placa de vídeo não vive sozinha: ela precisa de uma fonte adequada e de um processador que não segure o desempenho (gargalo). Se quiser, monte a build inteira no nosso [configurador](/montador) — ele valida a compatibilidade e calcula a fonte recomendada. E se tiver dúvida de qual das três encaixa no seu setup, chama a Starteq no WhatsApp que a gente avalia junto.

## Fontes

- TechTudo — [Tier list: melhor placa de vídeo de 2026](https://www.techtudo.com.br/noticias/2026/02/qual-a-melhor-placa-de-video-de-2026-veja-tier-list-e-escolha-para-o-seu-pc-edinfoeletro.ghtml)
- TerabyteShop — [Melhores placas de vídeo custo-benefício 2026](https://www.terabyteshop.com.br/blog/melhores-placas-video-custo-beneficio-2026)
- André Indica — [Guia: melhores placas de vídeo 2026](https://www.andreindica.com.br/guia/melhores-placas-de-video-2026/)`,
  },
  {
    slug: "onde-comprar-pc-gamer-palmas-tocantins-2026",
    title: "Onde comprar PC gamer em Palmas-TO em 2026 · guia completo",
    excerpt:
      "Comparativo das opções de loja de hardware gamer em Palmas: lojas físicas, marketplaces, importação direta. Onde compensa cada caminho e onde tem armadilha escondida.",
    category: "Mercado",
    author: "Tripulação Starteq",
    date: "2026-05-12",
    read_min: 7,
    cover_icon: "shopping-cart",
    body: `Procurar PC gamer em Palmas em 2026 ainda é um desafio. A maior parte das lojas locais vende periférico genérico e quase não tem peça de PC montado. Esse guia mapeia as 4 rotas reais que o gamer palmense tem hoje.

## 1. Loja física em Palmas

São poucas as lojas locais que carregam estoque real de hardware gamer. **A vantagem é poder ver a peça, montar na hora e voltar pra assistência** quando der ruim. A desvantagem é o estoque limitado · placas top como RTX 5070 raramente ficam expostas e geralmente são por encomenda.

A Starteq Tocantins opera nessa categoria · loja física no Plano Diretor Sul com PCs montados em vitrine, peças avulsas em estoque rotativo e oficina técnica integrada. Endereço: 104 Sul, SE 05, Lt. 19, Sala 07.

## 2. Marketplace nacional (Pichau, Kabum, Terabyte)

Preço competitivo, catálogo gigante, mas o frete pra Tocantins encarece em **R$ 80-180 por compra** e o prazo de entrega varia de 5 a 12 dias úteis. Se a peça vier com defeito, troca leva 20-30 dias.

Quando vale: build de R$ 8.000+ onde o frete dilui no total e o catálogo local não tem a peça específica. Quando NÃO vale: build de entrada onde o frete come 8-10% do investimento.

## 3. Mercado Livre (vendedor de Goiânia/Brasília)

Frete mais rápido (3-5 dias), mas atenção: muito vendedor "novo" sem reputação na categoria PC gamer. Caso de RMA · você fica refém do vendedor, sem garantia técnica real.

## 4. Importação direta (AliExpress, Amazon US)

Praticamente proibitivo em 2026 com a tributação da Receita. Imposto + frete internacional + risco de retenção · não compensa pra hardware novo.

## Comparativo

| Rota | Preço | Frete/Prazo | Pós-venda | Indicado |
|---|---|---|---|---|
| Loja Palmas | Mercado | Combinado no WhatsApp | Direto, presencial | Build entrada/médio |
| Pichau/Kabum | Baixo | R$ 100, 7 dias | Por email, 20d | Build top + paciência |
| Mercado Livre | Variável | R$ 50, 4 dias | Risco vendedor | Só com seller top |
| Importação | Caro c/ imposto | Indefinido | Inexistente | Não compensa |

## Onde o ouro está em Palmas

O que ninguém fala: o **PC montado por loja local sai mais barato no longo prazo** porque você economiza em hora de YouTube tentando entender qual peça é compatível, frete dobrado quando vem peça errada, e dias parados sem PC esperando o suporte responder.

Loja local boa entrega: peça validada, **assistência presencial em caso de defeito** (sem depender de suporte por e-mail que demora), parcelamento PIX e contato humano direto pra dúvida pré-venda.

## Resumo

Se você mora em Palmas-TO e quer PC gamer com tranquilidade · prioridade é loja local com técnico próprio. Se você já é experiente e tá montando build de R$ 10k+ · marketplace nacional pode compensar pelo catálogo. **Misturar as duas rotas (gabinete local + GPU online) é a estratégia mais inteligente** quando o orçamento é alto.`,
  },
  {
    slug: "assistencia-tecnica-pc-palmas-quando-vale-pena",
    title: "Assistência técnica de PC em Palmas · quando vale a pena e o que cobrar",
    excerpt:
      "Tabela real de preços de assistência técnica em Palmas-TO em 2026: formatação, troca de pasta térmica, recuperação de dados, upgrade. Quando dá pra fazer em casa e quando precisa de oficina.",
    category: "Tutorial",
    author: "Tripulação Starteq",
    date: "2026-05-11",
    read_min: 6,
    cover_icon: "wrench",
    body: `Em Palmas, a maioria das oficinas de PC ainda cobra por orçamento "no olho" sem tabela transparente. Esse post lista os preços de referência que a Starteq Tocantins pratica em 2026 e explica quando cada serviço faz sentido.

## Tabela de referência · Starteq Palmas-TO

| Serviço | Preço | Tempo | Faz em casa? |
|---|---|---|---|
| Diagnóstico completo | Grátis (na compra) / R$ 50 | 24h | Não |
| Formatação + Windows 11 + drivers | R$ 120 | 4h | Sim, com tutorial |
| Limpeza interna + pasta térmica | R$ 80 | 2h | Sim, com cuidado |
| Troca de fonte | R$ 60 + peça | 1h | Sim, fácil |
| Troca de cooler/water | R$ 100 + peça | 2h | Médio |
| Upgrade RAM/SSD | R$ 50 + peça | 30min | Sim, fácil |
| Recuperação de dados HDD/SSD | R$ 250-800 | 2-7 dias | Não |
| Reballing de BGA (GPU/Mobo) | R$ 350-500 | 3-5 dias | Não |
| Manutenção notebook gamer | R$ 180-280 | 24-48h | Não recomendado |

## Quando vale fazer em casa

**Formatar Windows, instalar SSD, trocar RAM** · tem tutorial bom no YouTube, é seguro e você aprende. Vale a economia.

**Limpar gabinete** · faz a cada 3 meses em Palmas (poeira + calor + ventilação tropical = receita pra superaquecimento). Pano de microfibra, ar comprimido em lata, pincel macio.

## Quando obrigatoriamente leva pra oficina

**Pasta térmica de CPU** · parece simples mas se você apertar errado o socket Intel/AMD pode dobrar pinos. R$ 80 paga a tranquilidade.

**Reballing de placa** · BGA exige bancada com forno térmico e estação de retrabalho. Tentativa em casa = destrói a placa.

**Recuperação de dados** · cliente que tenta DIY com software gratuito antes de levar pra oficina geralmente piora o caso. Se o dado importa, leva direto.

## Sinal de oficina suspeita em Palmas

- **Orçamento sem diagnóstico** · sério, sempre pedem diagnóstico antes
- **Não devolve as peças trocadas** · você tem direito de levar embora as antigas
- **Cobra sem mostrar a peça defeituosa** · pede pra ver com seus olhos
- **Não emite NFe ou recibo** · ilegal e te deixa sem garantia
- **Promete prazo curto demais** · reballing em 24h é praticamente impossível

## A regra dos R$ 50

Se o serviço custa menos de R$ 50, geralmente é venda casada pra empurrar uma peça que talvez não precise. Diagnóstico **deve ser gratuito** quando o cliente já é da casa ou está comprando algo · cobrar diagnóstico em cima de venda de peça é prática antiga que tá saindo do mercado.

Na Starteq diagnóstico é gratuito sempre que você sai com a peça da loja · cobramos só se você quiser laudo técnico e levar pra outro lugar.

## Resumo

Pra coisas simples (formatação, RAM, SSD) · faz em casa e poupa R$ 100-150. Pra coisas que envolvem pasta térmica, BGA ou dados sensíveis · oficina especializada com bancada e seguro do serviço sai mais barato no longo prazo.`,
  },
  {
    slug: "pc-gamer-trabalho-remoto-escolher-orcamento",
    title: "PC gamer pra trabalho remoto · como escolher sem gastar a mais",
    excerpt:
      "Build que serve pra trabalhar em casa de dia e jogar de noite. CPU certa, RAM ideal, GPU que não atrapalha a carteira. Foco pra freelancer e CLT remoto em Palmas-TO.",
    category: "Build",
    author: "Tripulação Starteq",
    date: "2026-05-09",
    read_min: 5,
    cover_icon: "cpu",
    body: `Cada vez mais cliente da Starteq chega com a mesma necessidade: "preciso de um PC que sirva pra trabalhar de dia e jogar de noite". Esse é o sweet spot de 2026 pra quem mora em Palmas e migrou pro home office.

## O equívoco comum

Muita gente compra ou só "PC de trabalho" (que limita demais nas horas de jogo) ou só "PC gamer top" (que custa caro à toa pro trabalho típico de escritório). A build ideal mistura os dois mundos.

## Build híbrida · R$ 4.500-5.500

**Setup recomendado:**
- **CPU:** AMD Ryzen 5 7600 (R$ 1.290) · iGPU integrada Vega 2 · roda monitor secundário sem peso pra GPU
- **Mobo:** ASRock B650M-HDV/M.2 (R$ 890) · suporta DDR5 e tem M.2 NVMe Gen4
- **RAM:** Kingston Fury Beast 32GB DDR5 5200MHz (R$ 690) · 32GB é o sweet spot pra multi-tarefa
- **GPU:** RTX 4060 (R$ 1.990) · roda jogos 1080p Ultra e acelera renderização (Premiere/After Effects)
- **SSD:** Kingston KC3000 1TB NVMe Gen4 (R$ 590) · velocidade pra projeto pesado
- **Fonte:** Corsair RM650x 650W Gold (R$ 590) · margem pra upgrade futuro
- **Gabinete:** Lian Li Lancool 216 (R$ 690) · airflow excelente em Palmas

Total à vista PIX: **R$ 6.730**. Em 10x sem juros: R$ 734/mês.

## Por que essa combinação

**32GB de RAM** é o divisor de água em 2026: roda Chrome com 30 abas + VSCode + Zoom + Figma + Spotify sem soluço · e ainda sobra pra background quando vai jogar à noite.

**SSD NVMe Gen4 de 1TB** elimina o gargalo de "vou abrir o projeto, fazer um café, volto e ainda tá carregando". Em renderização de vídeo, diferença pra HDD é absurda.

**RTX 4060** parece overkill pra trabalho mas é o que destrava aceleração de Photoshop AI, Premiere/DaVinci, modelos de IA local (Stable Diffusion, LLM local). E à noite roda Valorant a 240fps + Fortnite Ultra.

## O que NÃO comprar pra essa pegada

- **Ryzen 3 ou i3:** processador de 4 núcleos engasga em multi-tarefa pesada
- **16GB RAM:** vai te frustrar em 6 meses quando começar a fazer reunião + IDE + editor de design
- **GPU integrada apenas:** não acelera renderização nem aguenta jogos modernos
- **HDD pra disco principal:** Windows 11 fica insuportável

## Quem realmente precisa upgrade pra 1440p / 4K

Designer, editor de vídeo, dev front-end que vê 2-3 monitores · 1440p ultrawide compensa MUITO. Se você é desse perfil, troca a GPU pra **RTX 4070 Super (+R$ 2.700)** e monitor ultrawide 34" (R$ 2.200).

## Cliente real Starteq

Caso típico: dev fullstack remoto, R$ 9k/mês, fez build híbrida e relatou ganho de 1-2h/dia de produtividade vs notebook de 8GB. Em 4 meses já tinha pago o PC só na economia de café e tempo de espera.

## Resumo

Se o seu trabalho é remoto e você tá pensando em jogar nas horas vagas, a build híbrida R$ 5-7k entrega MUITO mais valor que comprar "PC de trabalho R$ 3k" e arrepender em 6 meses.`,
  },
  {
    slug: "monte-pc-gamer-online-vs-loja-fisica-palmas",
    title: "Monte seu PC online vs ir na loja física · qual é melhor em Palmas",
    excerpt:
      "Configurador online de PC ('Monte seu PC') vs ir presencialmente numa loja em Palmas. Custo, prazo, garantia, riscos. O que faz sentido pra cada perfil de comprador.",
    category: "Mercado",
    author: "Tripulação Starteq",
    date: "2026-05-07",
    read_min: 6,
    cover_icon: "package",
    body: `Em 2026, todo gamer de Palmas se faz a mesma pergunta antes de comprar: clico no "Monte seu PC" do site ou vou na loja física? Esse post compara os dois caminhos sem viés.

## Vantagem do "Monte seu PC" online

- **Comparar com calma:** você pesquisa cada peça em 3 abas, vê review, lê comentário
- **Sem pressão de vendedor:** ninguém empurrando combo pré-montado
- **Histórico do orçamento:** salva carrinho, volta amanhã, ajusta
- **Comparativo de preço:** facilmente cruza com Pichau, Kabum, Mercado Livre

## Vantagem da loja física em Palmas

- **Vê a peça antes:** sente o peso, vê a cor, mede o gabinete
- **Sai com tudo no carro:** não tem prazo de entrega
- **Garantia direta:** vai lá, mostra o defeito, sai com peça nova
- **Vendedor técnico:** alguém que entende validação te orienta se a build faz sentido
- **Suporte pós-venda real:** caso 99% dos clientes não pensa nisso na hora da compra

## O risco escondido do "monte online"

A maior dor do gamer comprando peça avulsa online é descobrir, depois de montar, que **alguma coisa não dá boot**. Pode ser: RAM incompatível com a placa, fonte com cabo errado, gabinete com 1cm a menos do que aguenta a GPU.

Em 2026, isso continua acontecendo. Você compra 7 peças, perde a tarde inteira montando, sobra um cabo, não dá boot. Aí descobre que aquela placa-mãe específica não roda essa RAM em XMP, ou que essa GPU não cabe nesse gabinete.

## A nossa solução: configurador validado

A Starteq tem o /montador no site dela exatamente pra resolver esse problema. Cada combinação é validada peça a peça:

- Socket CPU x Mobo · checagem
- Chipset x BIOS update · alerta se precisa
- TDP CPU x Cooler · cálculo de capacidade
- Wattagem total x Fonte · margem 20%+ de segurança
- Dimensões GPU x Gabinete · checagem física
- DDR4 vs DDR5 · bloqueio se houver conflito

Você monta online E tem garantia de que vai funcionar. O melhor dos dois mundos.

## Qual perfil escolhe cada caminho

| Perfil | Caminho indicado |
|---|---|
| Primeira build na vida | Loja física + ajuda do vendedor |
| Build de R$ 3-5k | Configurador online validado + retira na loja |
| Build top R$ 8k+ | Monte online + entrega + setup técnico em casa |
| Quer mexer todo dia / overclock | Loja física + relacionamento de longo prazo |
| Mora longe de Palmas (interior TO) | Configurador online + frete |

## Resumo

A decisão "online vs loja" depende menos de preço e mais de **quanto risco você quer assumir**. Quem fez 0 build na vida e vai usar diariamente, vale ir presencial e construir relacionamento. Quem já tá no segundo PC e sabe o que quer, o configurador online com validação automática é mais eficiente.

Independente da rota, **a regra de ouro é nunca comprar sem validação de compatibilidade**. Site Starteq faz isso. Mercado Livre não.`,
  },
  {
    slug: "como-montar-pc-gamer-1080p-sem-gastar-fortuna",
    title: "Como montar um PC gamer pra rodar tudo em 1080p sem gastar fortuna",
    excerpt:
      "Build até R$ 3.500 que entrega 100+ FPS em Valorant, Fortnite, CS2 e roda os AAA modernos em high. Combo CPU + GPU que mais entrega valor agora.",
    category: "Build",
    author: "Tripulação Starteq",
    date: "2026-05-10",
    read_min: 6,
    cover_icon: "gamepad",
    body: `Em 2026 não é difícil montar um PC gamer 1080p de alto nível por menos de 3.500. O segredo está no combo CPU + GPU equilibrado.

## Combo recomendado

- **CPU:** AMD Ryzen 5 5600 (R$ 690 no PIX) · 6 núcleos · cooler box incluído
- **Mobo:** ASUS Prime B550M-K (R$ 690)
- **RAM:** Corsair Vengeance 16GB DDR4 3600MHz (R$ 350)
- **GPU:** GALAX RTX 4060 1-Click OC (R$ 2.290)
- **SSD:** Kingston NV2 500GB NVMe (R$ 249)
- **Fonte:** Corsair CV650 650W Bronze (R$ 390)
- **Gabinete:** Rise Mode Z3 Glass ATX RGB (R$ 419)

Total à vista PIX: R$ 5.078. Cabe em 10x sem juros de R$ 553 no cartão.

## Por que essa combinação

A RTX 4060 entrega 100+ FPS em todos os esports atuais em 1080p. O Ryzen 5 5600 não é gargalo nessa GPU. 16GB DDR4 é o piso confortável pra jogo em 2026. SSD NVMe pra Windows + 2-3 jogos pesados.

## O que NÃO comprar nessa faixa

- Fontes genéricas sem certificação 80+
- Gabinete sem ventoinha frontal (térmico vira problema em Palmas)
- RAM 2133/2400MHz (gargalha CPU AMD)

## Como adaptar pro seu orçamento

- **R$ 4.500:** mantém tudo, troca SSD pra 1TB · R$ 419 a mais
- **R$ 6.500:** sobe pra Ryzen 7 7700 + B650M DDR5 · pula pra 1440p tranquilo
- **R$ 8.500:** RTX 4070 Super entra · agora é setup de elite

Quer testar a build no /montador? A compatibilidade é validada peça a peça. Sem chance de comprar errado.`,
  },
  {
    slug: "rtx-5070-vs-4070-super-vale-a-pena",
    title: "RTX 5070 vs 4070 Super em 2026 · qual vale a pena de verdade",
    excerpt:
      "Comparativo com dados reais: specs, desempenho em 1440p, DLSS 4 e preço no Brasil. Spoiler — a placa nova tem MENOS núcleos que a antiga, e isso muda tudo.",
    category: "Hardware",
    author: "Tripulação Starteq",
    date: "2026-06-20",
    read_min: 8,
    cover_icon: "zap",
    body: `A RTX 5070 (arquitetura Blackwell) chegou pra ser a placa de 1440p da geração. Mas quando você olha os números reais, aparece uma surpresa: em força bruta, ela quase empata com a 4070 Super do ano anterior. Vamos ao que os reviews de verdade mostram.

## Especificações lado a lado

| Spec | RTX 4070 Super | RTX 5070 |
|---|---|---|
| Arquitetura | Ada Lovelace | Blackwell |
| Núcleos CUDA | 7.168 | 6.144 |
| VRAM | 12GB GDDR6X (21 Gbps) | 12GB GDDR7 (28 Gbps) |
| Barramento | 192-bit | 192-bit |
| TDP | 220W | 250W |
| Preço de lançamento (EUA) | US$ 599 | US$ 549 |

O detalhe que salta aos olhos: **a RTX 5070 tem MENOS núcleos CUDA que a 4070 Super** (6.144 contra 7.168). Ela compensa com clocks maiores, cores de nova geração e memória GDDR7, que entrega cerca de **33% mais banda**. ([Tom's Hardware](https://www.tomshardware.com/pc-components/gpus/nvidia-geforce-rtx-4070-super-review-boosted-clocks-and-core-counts-for-the-same-dollar599-as-the-vanilla-4070) · [Hostbor](https://hostbor.com/rtx-5070-vs-4070s-comparison/))

## Desempenho real (segundo as reviews)

- **1440p rasterização nativa:** praticamente empate — a 5070 fica ~1–2% à frente, trocando de líder jogo a jogo. ([Tom's Guide](https://www.tomsguide.com/computing/gpus/nvidia-geforce-rtx-5070-review))
- **4K:** ~5% mais rápida em média. ([Hostbor](https://hostbor.com/rtx-5070-vs-4070s-comparison/))
- **Ray tracing:** aí sim abre vantagem, ~10–15% sobre a 4070 Super. ([Hyper Cyber](https://hypercyber.com/blogs/news/rtx-5070-fps-benchmarks-how-does-it-stack-up-in-real-gaming))

O Tom's Guide chegou a chamar a 5070 de "filho do meio esquisito" da linha — geração modesta em desempenho puro. ([Tom's Guide](https://www.tomsguide.com/computing/gpus/nvidia-geforce-rtx-5070-review))

## O verdadeiro diferencial: DLSS 4

Onde a 5070 realmente separa é no **DLSS 4 com Multi Frame Generation** — exclusivo da linha RTX 50. Ele gera até **3 quadros por frame renderizado**, elevando muito a fluidez percebida em jogos compatíveis. A 4070 Super não roda esse recurso. ([TweakTown](https://www.tweaktown.com/reviews/10997/nvidia-geforce-rtx-5070-founders-edition-dlss-4-is-still-game-changer-in-1440p/index.html))

Vale a ressalva honesta: boa parte do "salto" de FPS que aparece no marketing são quadros gerados por IA. Em rasterização nativa, o empate com a geração anterior é real.

## Preço no Brasil

O sugerido de lançamento no Brasil saiu em **R$ 5.499,99**, mas o preço de rua caiu bastante ao longo do ciclo: o menor valor registrado foi **R$ 3.314** (maio/2026), com a faixa realista girando em torno de **R$ 3.300–4.500** dependendo do modelo. ([Canaltech](https://canaltech.com.br/hardware/qual-e-o-preco-sugerido-das-geforce-rtx-5070-no-brasil-veja-para-nao-pagar-caro/) · [Hardware Barato](https://www.hardwarebarato.com/produtos/placas-de-video/rtx-5070))

## O elefante na sala: 12GB

A crítica mais pesada das reviews é a mesma pra ambas: **12GB de VRAM em barramento 192-bit em 2026**. Enquanto isso, a AMD entrega 16GB por menos dinheiro (RX 9060 XT). VRAM virou argumento de compra mais decisivo que os próprios núcleos.

## Veredito

- **Vale a 5070** se você joga com ray tracing, quer DLSS 4 / Multi Frame Generation, ou vai segurar a build por anos.
- **A 4070 Super ainda compete** — principalmente usada/em promoção — pra quem foca rasterização pura e não faz questão do DLSS 4.
- Pra quem prioriza **custo por frame**, olhe também a RX 9060 XT 16GB (veja nosso comparativo de placas até R$ 2.500).

Quer ver as opções no [montador](/montador) com a fonte recomendada calculada automaticamente? É só montar.

## Fontes

- Tom's Hardware — [RTX 4070 Super review](https://www.tomshardware.com/pc-components/gpus/nvidia-geforce-rtx-4070-super-review-boosted-clocks-and-core-counts-for-the-same-dollar599-as-the-vanilla-4070)
- Tom's Guide — [RTX 5070 review](https://www.tomsguide.com/computing/gpus/nvidia-geforce-rtx-5070-review)
- Hostbor — [RTX 5070 vs 4070 Super](https://hostbor.com/rtx-5070-vs-4070s-comparison/)
- Canaltech — [Preço sugerido da RTX 5070 no Brasil](https://canaltech.com.br/hardware/qual-e-o-preco-sugerido-das-geforce-rtx-5070-no-brasil-veja-para-nao-pagar-caro/)
- Hardware Barato — [Histórico de preço RTX 5070](https://www.hardwarebarato.com/produtos/placas-de-video/rtx-5070)`,
  },
  {
    slug: "ddr5-vs-ddr4-vale-a-pena-mudar",
    title: "DDR5 é mesmo tão melhor que DDR4? Spoiler: depende",
    excerpt:
      "Diferença real em jogos (por resolução), em produtividade, o efeito da crise das memórias e quando o upgrade pra DDR5 faz sentido. Com números e fontes.",
    category: "Hardware",
    author: "Tripulação Starteq",
    date: "2026-06-15",
    read_min: 7,
    cover_icon: "cpu",
    body: `"DDR5 é muito melhor que DDR4?" A resposta honesta é: depende do que você faz e da resolução em que joga. Em alguns cenários o ganho é real; em outros, é margem de erro. Vamos aos números de reviews de verdade.

## Em jogos, o ganho depende da resolução

O segredo é entender que memória rápida só ajuda quando a CPU é o gargalo — ou seja, em resoluções mais baixas:

| Cenário | Ganho do DDR5 sobre DDR4 |
|---|---|
| 1080p com CPU forte (CPU-bound) | ~15–20% de média |
| 1080p — média geral dos jogos | ~4% média / ~10% nos 1% lows |
| 1440p e 4K (GPU-bound) | menos de 5% — praticamente empate |

Fonte: [TechSpot — DDR5 vs DDR4 gaming](https://www.techspot.com/review/3059-ddr5-vs-ddr4-gaming/) · [Club386](https://www.club386.com/ddr4-vs-ddr5-pc/)

Resumindo: quem joga em **1440p ou 4K quase não sente diferença**. O ganho grande só aparece a 1080p com CPU sobrando — e mesmo assim varia muito por jogo (tem título que sobe 27%, outro que não muda nada).

## Em produtividade, aí sim DDR5 abre distância

- Render em Premiere/DaVinci: **15–25% mais rápido**.
- Blender / 3ds Max: até **+40%** (o dobro de banda de memória pesa muito).
- Compilar código, compressão, IA: DDR5 na frente.

Fonte: [Servermall](https://servermall.com/blog/ddr4-vs-ddr5-ram-performance-comparison-and-key-differences/)

## O fator 2026: a crise das memórias mudou a conta

O argumento clássico "economizo indo de DDR4" perdeu força. Por causa da alta de preços (a IA sugando a produção), a **DDR4 está subindo mais rápido que a DDR5**: +172% contra +76% no primeiro trimestre de 2026, porque as fábricas praticamente pararam de produzir DDR4. Um módulo DDR4 16GB bateu **R$ 950**; um kit DDR5 32GB (2x16) ficou em torno de **R$ 864–918**. ([Adrenaline](https://www.adrenaline.com.br/hardware/precos-de-memorias-ddr4-estao-subindo-mais-rapido-do-que-os-de-ddr5/))

Ou seja: pra build nova, apostar em DDR4 só pra "economizar" já não é o atalho que era.

## Quando é obrigatoriamente DDR5 (ou DDR4)

- **AMD AM5 (Ryzen 7000/8000/9000): só existe DDR5.** Não há placa AM5 com DDR4. ([Socket AM5](https://en.wikipedia.org/wiki/Socket_AM5))
- **Intel LGA1700 (12ª/13ª/14ª gen): aceita as duas** — é a única rota pra aproveitar DDR4 hoje, útil se você já tem os pentes.

## Curiosidade: CL alto não é lento

Muita gente vê "DDR5-6000 CL30" e acha que é mais lento que "DDR4-3200 CL16" porque o número CL é maior. Errado. O que importa é a latência em nanossegundos: **DDR5-6000 CL30 = ~10 ns, igualzinho a DDR4-3200 CL16 (~10 ns)**. O CL parece maior só porque cada ciclo de clock é mais curto. ([Kingspec](https://www.kingspectech.com/blogs/posts/what-cl-for-ddr5-ram)) O ponto ideal de uma build gamer/produtividade em 2026 é **DDR5-6000 CL30**.

## Conclusão

Não pague mais por DDR5 só pelo número maior — pague por uma build que aproveita. Joga 1440p/4K e só quer jogar? A diferença é pequena. Edita vídeo, renderiza, compila? DDR5 compensa. Montando do zero numa plataforma AM5? Já vem DDR5 de fábrica. Na dúvida, monta no [montador](/montador) que a gente já filtra a memória compatível com a placa.

## Fontes

- TechSpot — [DDR5 vs DDR4 Gaming](https://www.techspot.com/review/3059-ddr5-vs-ddr4-gaming/)
- Club386 — [DDR4 vs DDR5](https://www.club386.com/ddr4-vs-ddr5-pc/)
- Servermall — [DDR4 vs DDR5 performance](https://servermall.com/blog/ddr4-vs-ddr5-ram-performance-comparison-and-key-differences/)
- Adrenaline — [Preços de DDR4 subindo mais rápido que DDR5](https://www.adrenaline.com.br/hardware/precos-de-memorias-ddr4-estao-subindo-mais-rapido-do-que-os-de-ddr5/)
- Kingspec — [O que é CL na DDR5](https://www.kingspectech.com/blogs/posts/what-cl-for-ddr5-ram)`,
  },
  {
    slug: "setup-gamer-palmas-4-dicas-quarto-epico",
    title: "Setup de gamer em Palmas · 4 dicas pra deixar o quarto mais épico",
    excerpt:
      "Iluminação, mesa, cadeira, som ambiente. O básico que separa setup de gamer de mesa do café. Adaptado pro clima de Palmas.",
    category: "Setup",
    author: "Tripulação Starteq",
    date: "2026-05-02",
    read_min: 4,
    cover_icon: "image",
    body: `Tem PC top mas o setup parece de escritório? Dá uma olhada nesses 4 detalhes.

## 1. Iluminação ambiente

Fita LED RGB atrás do monitor faz mais diferença que dentro do gabinete. Reduz fadiga visual e dá imersão.
Investimento: R$ 80-150.

## 2. Mesa profunda (mínimo 60cm)

Mesa rasa é o erro mais comum. Você fica com teclado e mouse colados no monitor, pulso dói, postura quebra.
60cm é o mínimo. 70-80cm é o ideal.

## 3. Cadeira com apoio lombar

Cadeira "gamer" colorida sem apoio lombar é golpe. O que importa é regulagem de altura, encosto reclinável e firmeza no apoio das costas.

## 4. Ventilação · OBRIGATÓRIA em Palmas

Calor de Palmas mata setup. Coloca um ventilador de mesa ou de chão apontado pra parte de trás do gabinete · queda de 5-10°C na CPU. Em junho-julho dispensa, mas no resto do ano é diferença de FPS estável vs FPS oscilando.

## Bônus

Headphone over-ear · pad de mouse grande (90×40cm) · USB hub na borda da mesa. Tudo isso vira luxo barato.`,
  },
  {
    slug: "pc-gamer-consome-quanto-energia-vale-solar",
    title: "Quanto consome um PC gamer rodando 8h/dia? Vale energia solar?",
    excerpt:
      "Cálculo real do consumo de uma build R$ 5k rodando 8h/dia · quanto pesa na conta de luz em Palmas · ponto onde solar começa a fazer sentido.",
    category: "Mercado",
    author: "Tripulação Starteq",
    date: "2026-04-28",
    read_min: 6,
    cover_icon: "zap",
    body: `Pergunta que volta toda semana no WhatsApp. Vamos colocar número real.

## Consumo típico de PC gamer atual

- **Build R$ 5k** (Ryzen 5 + RTX 4060): ~350W em jogo pesado · ~150W idle/web
- **Build R$ 8k** (Ryzen 7 + RTX 4070 Super): ~450W em jogo · ~180W idle
- **Build R$ 12k** (Ryzen 9 + RTX 5070): ~550W em jogo · ~200W idle

## Cálculo na conta de luz Palmas (tarifa Energisa ~R$ 0.95/kWh)

Build R$ 8k · 8h/dia mistas (4h jogo + 4h web/estudo):
- Consumo médio: 300W
- 8h × 300W = 2,4 kWh/dia
- 30 dias × 2,4 = 72 kWh/mês
- 72 × 0,95 = **R$ 68/mês**

Build R$ 12k mesmo uso: ~R$ 95/mês.

## Vale solar pra gamer?

Painel pequeno (1-2 kWp) cobre o PC + ar-condicionado de quarto sem dificuldade. Em Palmas (que tem irradiação solar das mais altas do BR), o payback é mais rápido que no Sudeste.

Se sua conta de luz já passa R$ 250/mês e tem espaço no telhado, solar começa a fazer sentido. **A gente conhece quem instala bem em Palmas** (chama no WhatsApp pra indicação).

## Resumo

PC gamer NÃO é o grande vilão da conta. O vilão é o ar-condicionado e o chuveiro. Foca aí primeiro.`,
  },
  {
    slug: "fps-caiu-5-checagens-antes-de-culpar-o-jogo",
    title: "Por que tua FPS caiu? 5 checagens antes de culpar o jogo",
    excerpt:
      "Fix gratuito que resolve 80% dos casos. Antes de pensar em upgrade ou reinstalar Windows, passa por essa lista.",
    category: "Tutorial",
    author: "Tripulação Starteq",
    date: "2026-04-22",
    read_min: 5,
    cover_icon: "wrench",
    body: `Antes de gastar dinheiro com upgrade ou pensar que o jogo "tá quebrado", passa por essa lista.

## 1. Drivers da GPU atualizados?

GeForce Experience (NVIDIA) ou Adrenalin (AMD) · clica em "Verificar atualizações". 30% dos casos de FPS baixo resolvem aqui.

## 2. Temperatura da GPU e CPU

Baixa o HWMonitor (gratuito). Roda o jogo. Olha se passa de 85°C em alguma peça.

Se passa, é hora de:
- Limpar poeira do gabinete (faz isso a cada 3 meses em Palmas)
- Trocar pasta térmica da CPU (a cada 1-2 anos)
- Adicionar ventoinha extra no gabinete

## 3. Background do Windows

CTRL+SHIFT+ESC pra abrir o Task Manager. Aba Processes. Tem alguma coisa comendo CPU ou GPU?

Suspeitos comuns: Discord overlay, OBS rodando à toa, software de RGB pesado (Razer/Corsair), antivírus em scan.

## 4. Resolução e configurações do jogo

Você tá rodando em resolução nativa do monitor? Filtragem antialiasing tá no máximo? Ray tracing ligado em GPU que não aguenta?

Cada jogo tem um preset que vale mais que outro pra desempenho. Procura no YouTube "best settings [nome do jogo] [sua GPU]".

## 5. Windows precisando reiniciar

Sério. Windows que tá rodando há 5 dias acumula lixo. Reinicia a máquina antes de qualquer fix complexo.

## Se passou de tudo e ainda tá ruim

Aí provavelmente é gargalo real de hardware. Aí sim a gente conversa upgrade · CPU ou GPU. Manda mensagem no WhatsApp que avaliamos sua build antes de comprar peça.`,
  },
];

export function findPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 3): Post[] {
  const current = findPost(slug);
  if (!current) return POSTS.slice(0, limit);
  return POSTS.filter((p) => p.slug !== slug && p.category === current.category).slice(0, limit);
}
