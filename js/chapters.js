/**
 * CAPÍTULOS DO SCROLL — edite aqui os textos e tempos do vídeo.
 *
 * videoStart / videoEnd = trecho do vídeo (0 a 1, onde 1 = fim do clipe)
 * weight = quanto scroll essa aba ocupa (maior = mais tempo na tela)
 *
 * Comportamento: ao rolar, o vídeo anda até videoEnd e PARA; a aba aparece.
 */
const SCENES = {
  entrance: {
    videoId: "video-entrada",
    selector: ".scene--entrance",
    scrollEnd: "+=240%",
    movePhase: 0.58,
    chapters: [
      {
        id: "hero",
        videoStart: 0,
        videoEnd: 0.28,
        weight: 1,
        eyebrow: "Customização premium",
        title: ["L.A", "CUSTOM"],
        titleAccent: 1,
        text: "PPF, envelopamento, film e estética automotiva no mais alto padrão.",
      },
      {
        id: "quem-somos",
        videoStart: 0.28,
        videoEnd: 0.62,
        weight: 1.2,
        eyebrow: "Quem somos",
        title: ["ESTÉTICA", "ALÉM DO", "COMUM"],
        titleAccent: 1,
        text: "A L.A Custom nasceu para elevar o padrão da customização automotiva em cada detalhe.",
      },
      {
        id: "destaque",
        videoStart: 0.62,
        videoEnd: 1,
        weight: 1,
        eyebrow: "Projeto em destaque",
        title: ["SHELBY", "GT500"],
        titleAccent: 0,
        text: "Acabamento premium, proteção e personalização em veículos de alto padrão.",
      },
    ],
  },

  boxes: {
    videoId: "video-boxes",
    selector: ".scene--boxes",
    scrollEnd: "+=320%",
    movePhase: 0.55,
    chapters: [
      {
        id: "boxes-intro",
        videoStart: 0,
        videoEnd: 0.14,
        weight: 1,
        eyebrow: "Nossa estrutura",
        title: ["BOXES", "PREMIUM"],
        titleAccent: 1,
        text: "Iluminação profissional e espaço dedicado para cada tipo de serviço.",
      },
      {
        id: "ppf",
        videoStart: 0.14,
        videoEnd: 0.3,
        weight: 1,
        eyebrow: "Serviço 01",
        title: ["PPF", "PROTEÇÃO"],
        titleAccent: 0,
        text: "Película de proteção de pintura contra riscos, pedras e agentes externos.",
      },
      {
        id: "envelopamento",
        videoStart: 0.3,
        videoEnd: 0.46,
        weight: 1,
        eyebrow: "Serviço 02",
        title: ["ENVELOPA", "MENTO"],
        titleAccent: 1,
        text: "Personalização total com vinil de alta performance e acabamento impecável.",
      },
      {
        id: "film",
        videoStart: 0.46,
        videoEnd: 0.58,
        weight: 0.9,
        eyebrow: "Serviço 03",
        title: ["FILM", "AUTOMOTIVO"],
        titleAccent: 0,
        text: "Privacidade, proteção UV e conforto térmico para você e seu veículo.",
      },
      {
        id: "lavagem",
        videoStart: 0.58,
        videoEnd: 0.74,
        weight: 1,
        eyebrow: "Serviço 04",
        title: ["LAVAGEM", "DETALHADA"],
        titleAccent: 1,
        text: "Higienização profunda interna e externa com produtos premium.",
      },
      {
        id: "estetica",
        videoStart: 0.74,
        videoEnd: 0.92,
        weight: 1,
        eyebrow: "Serviço 05",
        title: ["ESTÉTICA", "AUTOMOTIVA"],
        titleAccent: 0,
        text: "Polimento, vitrificação e correção de pintura com padrão de excelência.",
      },
    ],
  },

  wash: {
    videoId: "video-lavagem",
    selector: ".scene--wash",
    scrollEnd: "+=180%",
    movePhase: 0.58,
    chapters: [
      {
        id: "processo",
        videoStart: 0,
        videoEnd: 0.65,
        weight: 1,
        eyebrow: "Nosso processo",
        title: ["PRECISÃO", "EM CADA", "DETALHE"],
        titleAccent: 1,
        text: "Equipe especializada e iluminação profissional em todos os serviços.",
      },
      {
        id: "excelencia",
        videoStart: 0.65,
        videoEnd: 1,
        weight: 1,
        eyebrow: "Padrão L.A Custom",
        title: ["EXCELÊNCIA", "EM CADA BOX"],
        titleAccent: 0,
        text: "Do primeiro contato à entrega, seu veículo recebe o tratamento que merece.",
      },
    ],
  },
};
