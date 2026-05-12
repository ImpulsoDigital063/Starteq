// Mock posts do blog · estrutura espelha o que vai virar Supabase depois

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Build" | "Hardware" | "Setup" | "Tutorial" | "Mercado";
  author: string;
  date: string;        // ISO YYYY-MM-DD
  read_min: number;
  cover_emoji: string; // placeholder antes de ter imagem real
  body: string;        // markdown simples
};

export const POSTS: Post[] = [
  {
    slug: "como-montar-pc-gamer-1080p-sem-gastar-fortuna",
    title: "Como montar um PC gamer pra rodar tudo em 1080p sem gastar fortuna",
    excerpt:
      "Build até R$ 3.500 que entrega 100+ FPS em Valorant, Fortnite, CS2 e roda os AAA modernos em high. Combo CPU + GPU que mais entrega valor agora.",
    category: "Build",
    author: "Tripulação Starteq",
    date: "2026-05-10",
    read_min: 6,
    cover_emoji: "🎮",
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
    cover_emoji: "⚡",
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
    cover_emoji: "🧠",
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
    cover_emoji: "💡",
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
    cover_emoji: "⚡",
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
    cover_emoji: "🔧",
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
