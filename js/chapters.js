/**
 * CAPÍTULOS DO SCROLL — 6 paradas (desktop otimizado)
 *
 * videoStart / videoEnd = trecho do vídeo (0 a 1)
 * weight = quanto scroll essa aba ocupa
 */
const SCENES = {
  entrance: {
    videoId: "video-entrada",
    selector: ".scene--entrance",
    scrollEnd: "+=180%",
    movePhase: 0.55,
    chapters: [
      {
        id: "hero",
        videoStart: 0,
        videoEnd: 0.32,
        weight: 1,
        eyebrow: "Customização premium",
        title: ["L.A", "CUSTOM"],
        titleAccent: 1,
        text: "PPF, envelopamento, film e estética automotiva no mais alto padrão.",
      },
      {
        id: "destaque",
        videoStart: 0.42,
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
    scrollEnd: "+=200%",
    movePhase: 0.52,
    chapters: [
      {
        id: "boxes-intro",
        videoStart: 0,
        videoEnd: 0.22,
        weight: 1,
        eyebrow: "Nossa estrutura",
        title: ["BOXES", "PREMIUM"],
        titleAccent: 1,
        text: "Iluminação profissional e espaço dedicado para cada tipo de serviço.",
      },
      {
        id: "ppf",
        videoStart: 0.22,
        videoEnd: 0.48,
        weight: 1,
        eyebrow: "Serviço 01",
        title: ["PPF", "PROTEÇÃO"],
        titleAccent: 0,
        text: "Película de proteção de pintura contra riscos, pedras e agentes externos.",
      },
      {
        id: "envelopamento",
        videoStart: 0.48,
        videoEnd: 0.78,
        weight: 1,
        eyebrow: "Serviço 02",
        title: ["ENVELOPA", "MENTO"],
        titleAccent: 1,
        text: "Personalização total com vinil de alta performance e acabamento impecável.",
      },
    ],
  },

  wash: {
    videoId: "video-lavagem",
    selector: ".scene--wash",
    scrollEnd: "+=120%",
    movePhase: 0.55,
    chapters: [
      {
        id: "processo",
        videoStart: 0,
        videoEnd: 1,
        weight: 1,
        eyebrow: "Padrão L.A Custom",
        title: ["PRECISÃO", "EM CADA", "DETALHE"],
        titleAccent: 1,
        text: "Equipe especializada, iluminação profissional e excelência em cada entrega.",
      },
    ],
  },
};
