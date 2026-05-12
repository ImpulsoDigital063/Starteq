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
| Loja Palmas | Mercado | Mesmo dia | Direto, presencial | Build entrada/médio |
| Pichau/Kabum | Baixo | R$ 100, 7 dias | Por email, 20d | Build top + paciência |
| Mercado Livre | Variável | R$ 50, 4 dias | Risco vendedor | Só com seller top |
| Importação | Caro c/ imposto | Indefinido | Inexistente | Não compensa |

## Onde o ouro está em Palmas

O que ninguém fala: o **PC montado por loja local sai mais barato no longo prazo** porque você economiza em hora de YouTube tentando entender qual peça é compatível, frete dobrado quando vem peça errada, e dias parados sem PC esperando o suporte responder.

Loja local boa entrega: peça validada, **mesmo-dia de manutenção em caso de defeito**, parcelamento PIX e contato humano direto pra dúvida pré-venda.

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
    title: "RTX 5070 vs 4070 Super · qual vale a pena agora",
    excerpt:
      "Comparativo direto entre as duas placas mais quentes do momento. FPS real em 1440p, custo-benefício, e quando faz sentido esperar a próxima geração.",
    category: "Hardware",
    author: "Tripulação Starteq",
    date: "2026-05-08",
    read_min: 8,
    cover_icon: "zap",
    body: `A RTX 5070 entrou no mercado prometendo desempenho de 4070 Super com mais eficiência energética. Vamos pro real.

## Especificações lado a lado

| Spec | RTX 4070 Super | RTX 5070 |
|---|---|---|
| TDP | 220W | 250W |
| VRAM | 12GB GDDR6X | 12GB GDDR7 |
| Preço médio | R$ 4.690 | R$ 5.890 |
| FPS médio 1440p Ultra | 110 | 125 |

## Quando ir de 4070 Super

- Orçamento até R$ 5.000
- Fonte 650W-750W já existente
- Não vai usar ray tracing pesado

## Quando ir de 5070

- Quer 4K nativo em alguns jogos
- Tem fonte 850W ou mais
- Vai segurar a build por 3+ anos sem upgrade

## Conclusão

Pra maioria dos gamers em 2026, a **4070 Super continua sendo o sweet spot**. A 5070 só compensa pra quem mira 4K ou ray tracing pesado · diferença de ~R$ 1.200 não justifica os 15% extras de FPS na maioria dos cenários.

Quer ver as duas no /montador com fonte recomendada calculada automaticamente? Clica lá.`,
  },
  {
    slug: "ddr5-vs-ddr4-vale-a-pena-mudar",
    title: "DDR5 é mesmo tão melhor que DDR4? Spoiler: depende",
    excerpt:
      "Diferença real em jogos, em renderização, e quando o upgrade pra DDR5 faz sentido (e quando é só queimar dinheiro).",
    category: "Hardware",
    author: "Tripulação Starteq",
    date: "2026-05-05",
    read_min: 5,
    cover_icon: "cpu",
    body: `DDR5 não é uma revolução universal. Em alguns cenários melhora muito, em outros é diferença de margem.

## Onde DDR5 ganha

- **Edição de vídeo / renderização 3D:** ganho real de 15-25%
- **CPUs Ryzen 7000+ e Intel 14ª/15ª:** plataforma já é otimizada
- **Multi-tarefa pesada:** vários programas abertos simultaneamente

## Onde DDR4 ainda é suficiente

- **Jogos em 1080p e 1440p:** diferença típica de 1-5 FPS
- **Uso geral (office, web, leve):** zero perceptível
- **Build até R$ 4.000:** investir o dinheiro em GPU melhor compensa mais

## Custo-benefício atualizado

Kingston Fury Beast 16GB DDR4 3200MHz: R$ 290
Kingston Fury Beast 16GB DDR5 5200MHz: R$ 390

Diferença de R$ 100 por kit. Pra gamer 1080p, o dinheiro fica melhor numa SSD maior ou numa GPU step acima.

## Quando obrigatoriamente DDR5

- CPU AM5 (Ryzen 7000/8000/9000) — não tem opção
- Intel 14ª/15ª com mobo DDR5 — também sem volta

## Conclusão

Não pague mais por DDR5 só pelo número maior. Pague pra build que aproveita ela.`,
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
