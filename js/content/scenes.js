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
 *  - faseDoVideo (opcional): substitui a fase da cena só neste capítulo.
 *
 *  Para mudar um texto do site, basta editar aqui.
 * ============================================================
 */

export const CENAS = {
  // Cena 1: entrada (fachada da loja e o Shelby GT500)
  entrada: {
    idDoVideo: "video-entrada",
    seletor: ".scene--entrance",
    distanciaDeRolagem: "+=260%",
    faseDoVideo: 0.5,
    capitulos: [
      {
        id: "hero",
        inicioDoVideo: 0,
        fimDoVideo: 0.38,
        peso: 0.85,
        // Pausa curta: aqui não tem cartões, então o vídeo segue quase direto
        // (uma pausa longa no hero parecia uma "travadinha").
        faseDoVideo: 0.8,
        sobretitulo: "Proteção e estética automotiva",
        titulo: ["L.A", "CUSTOM"],
        linhaEmDestaque: 1,
        texto: "Seu carro é a extensão de quem você é. Há mais de 17 anos, cuidamos dele como se fosse o nosso.",
      },
      {
        id: "destaque",
        inicioDoVideo: 0.38,
        fimDoVideo: 0.94,
        peso: 1,
        sobretitulo: "Projeto em destaque",
        titulo: ["SHELBY", "GT500"],
        linhaEmDestaque: 0,
        texto: "Proteção invisível. Presença impossível de ignorar.",
      },
    ],
  },

  // Cena 2: os boxes da oficina e os serviços de PPF e envelopamento
  boxes: {
    idDoVideo: "video-boxes",
    seletor: ".scene--boxes",
    distanciaDeRolagem: "+=290%",
    faseDoVideo: 0.48,
    capitulos: [
      {
        id: "boxes-intro",
        inicioDoVideo: 0,
        fimDoVideo: 0.28,
        peso: 1,
        sobretitulo: "Nossa estrutura",
        titulo: ["BOXES", "PREMIUM"],
        linhaEmDestaque: 1,
        texto: "Ambientes dedicados, luz técnica e controle total. O lugar certo para o carro que você não entrega a qualquer um.",
      },
      {
        id: "ppf",
        inicioDoVideo: 0.28,
        fimDoVideo: 0.58,
        peso: 1,
        sobretitulo: "Serviço 01",
        titulo: ["PPF", "PROTEÇÃO"],
        linhaEmDestaque: 0,
        texto: "Uma película invisível que encara pedrisco, risco e sol no lugar da sua pintura. E ainda faz a água escorrer.",
      },
      {
        id: "envelopamento",
        inicioDoVideo: 0.58,
        fimDoVideo: 1,
        peso: 1,
        sobretitulo: "Serviço 02",
        titulo: ["ENVELOPA", "MENTO"],
        linhaEmDestaque: 1,
        texto: "Nova cor, novo acabamento, nova personalidade. Sem tocar na pintura original, e dá para voltar atrás quando quiser.",
      },
    ],
  },

  // Cena 3: lavagem (o carro amarelo). O vídeo toca sozinho, em loop.
  lavagem: {
    idDoVideo: "video-lavagem",
    seletor: ".scene--wash",
    modo: "loop",
    distanciaDeRolagem: "+=170%",
    faseDoVideo: 0.45,
    capitulos: [
      {
        id: "processo",
        inicioDoVideo: 0,
        fimDoVideo: 1,
        peso: 1,
        sobretitulo: "Padrão L.A Custom",
        titulo: ["PRECISÃO", "EM CADA", "DETALHE"],
        linhaEmDestaque: 1,
        texto: "Lavagem técnica, produtos de primeira linha e uma equipe que conhece o seu carro pelo nome.",
      },
    ],
  },

  // Cena 4: correção de pintura
  detalhamento: {
    idDoVideo: "video-detalhamento",
    seletor: ".scene--detail",
    distanciaDeRolagem: "+=160%",
    faseDoVideo: 0.45,
    capitulos: [
      {
        id: "detalhamento",
        inicioDoVideo: 0,
        fimDoVideo: 1,
        peso: 1,
        sobretitulo: "Serviço 03",
        titulo: ["CORREÇÃO", "DE PINTURA"],
        linhaEmDestaque: 0,
        texto: "Polimento técnico que apaga marcas e devolve o brilho de fábrica. Com o coating cerâmico, ele fica assim por muito mais tempo.",
      },
    ],
  },
};
