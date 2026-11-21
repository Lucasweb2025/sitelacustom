/*
 * ============================================================
 *  CENAS DO SITE (os "capítulos" da rolagem)
 * ============================================================
 *  O site é dividido em 4 cenas. Cada cena tem um vídeo de fundo
 *  e um ou mais "capítulos": blocos de texto grande que aparecem
 *  conforme a pessoa rola a página.
 *
 *  Como funciona o efeito:
 *  - Enquanto a pessoa rola, o vídeo avança junto com a rolagem
 *    (rolou para baixo, o vídeo anda; rolou para cima, ele volta).
 *  - Em cada capítulo, o vídeo anda primeiro e depois "para" para
 *    o texto aparecer.
 *
 *  O QUE CADA CAMPO SIGNIFICA:
 *  - idDoVideo ........ id do vídeo no index.html
 *  - seletor .......... qual <section> do index.html é essa cena
 *  - distanciaDeRolagem quanto a pessoa precisa rolar para passar pela
 *                       cena. "+=180%" = 1,8 vezes a altura da tela.
 *                       Número maior = cena mais demorada.
 *  - faseDoVideo ...... dentro de cada capítulo, que parte da rolagem
 *                       é usada para o vídeo andar (0,55 = 55%). O resto
 *                       é a pausa em que o texto fica na tela.
 *  - modo: "loop" ..... o vídeo toca sozinho, sem seguir a rolagem
 *                       (usado na cena do carro amarelo).
 *
 *  Em cada capítulo:
 *  - inicioDoVideo / fimDoVideo: que trecho do vídeo esse capítulo mostra,
 *    de 0 (começo) a 1 (fim). Ex.: 0.38 = 38% do vídeo.
 *  - peso: quanto de rolagem esse capítulo ocupa em relação aos outros.
 *  - sobretitulo: texto pequeno acima do título.
 *  - titulo: cada item da lista vira uma linha do título grande.
 *  - linhaEmDestaque: qual linha do título fica dourada (0 = primeira).
 *  - texto: frase abaixo do título.
 *
 *  Para mudar um texto do site, basta editar aqui.
 * ============================================================
 */

export const CENAS = {
  // Cena 1: entrada (fachada da loja e o Shelby GT500)
  entrada: {
    idDoVideo: "video-entrada",
    seletor: ".scene--entrance",
    distanciaDeRolagem: "+=180%",
    faseDoVideo: 0.55,
    capitulos: [
      {
        id: "hero",
        inicioDoVideo: 0,
        fimDoVideo: 0.38,
        peso: 1,
        sobretitulo: "Customização premium",
        titulo: ["L.A", "CUSTOM"],
        linhaEmDestaque: 1,
        texto: "PPF, envelopamento, film e estética automotiva no mais alto padrão.",
      },
      {
        id: "destaque",
        inicioDoVideo: 0.38,
        fimDoVideo: 0.94,
        peso: 1,
        sobretitulo: "Projeto em destaque",
        titulo: ["SHELBY", "GT500"],
        linhaEmDestaque: 0,
        texto: "Acabamento premium, proteção e personalização em veículos de alto padrão.",
      },
    ],
  },

  // Cena 2: os boxes da oficina e os serviços de PPF e envelopamento
  boxes: {
    idDoVideo: "video-boxes",
    seletor: ".scene--boxes",
    distanciaDeRolagem: "+=200%",
    faseDoVideo: 0.52,
    capitulos: [
      {
        id: "boxes-intro",
        inicioDoVideo: 0,
        fimDoVideo: 0.28,
        peso: 1,
        sobretitulo: "Nossa estrutura",
        titulo: ["BOXES", "PREMIUM"],
        linhaEmDestaque: 1,
        texto: "Iluminação profissional e espaço dedicado para cada tipo de serviço.",
      },
      {
        id: "ppf",
        inicioDoVideo: 0.28,
        fimDoVideo: 0.58,
        peso: 1,
        sobretitulo: "Serviço 01",
        titulo: ["PPF", "PROTEÇÃO"],
        linhaEmDestaque: 0,
        texto: "Película de proteção de pintura contra riscos, pedras e agentes externos.",
      },
      {
        id: "envelopamento",
        inicioDoVideo: 0.58,
        fimDoVideo: 1,
        peso: 1,
        sobretitulo: "Serviço 02",
        titulo: ["ENVELOPA", "MENTO"],
        linhaEmDestaque: 1,
        texto: "Personalização total com vinil de alta performance e acabamento impecável.",
      },
    ],
  },

  // Cena 3: lavagem (o carro amarelo). O vídeo toca sozinho, em loop.
  lavagem: {
    idDoVideo: "video-lavagem",
    seletor: ".scene--wash",
    modo: "loop",
    distanciaDeRolagem: "+=120%",
    faseDoVideo: 0.55,
    capitulos: [
      {
        id: "processo",
        inicioDoVideo: 0,
        fimDoVideo: 1,
        peso: 1,
        sobretitulo: "Padrão L.A Custom",
        titulo: ["PRECISÃO", "EM CADA", "DETALHE"],
        linhaEmDestaque: 1,
        texto: "Equipe especializada, iluminação profissional e excelência em cada entrega.",
      },
    ],
  },

  // Cena 4: correção de pintura
  detalhamento: {
    idDoVideo: "video-detalhamento",
    seletor: ".scene--detail",
    distanciaDeRolagem: "+=110%",
    faseDoVideo: 0.55,
    capitulos: [
      {
        id: "detalhamento",
        inicioDoVideo: 0,
        fimDoVideo: 1,
        peso: 1,
        sobretitulo: "Serviço 03",
        titulo: ["CORREÇÃO", "DE PINTURA"],
        linhaEmDestaque: 0,
        texto: "Polimento técnico e vitrificação para acabamento espelhado e proteção duradoura.",
      },
    ],
  },
};
