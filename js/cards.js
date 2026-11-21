/**
 * CARDS — edite nomes, textos e imagens aqui.
 */
const CARDS = {
  stats: {
    vehicleLabel: "Ferrari 296 GTB",
    thumb: MEDIA.shelby,
    items: [
      { value: "830cv", label: "POTÊNCIA" },
      { value: "2.9s", label: "0-100 KM/H" },
      { value: "330km/h", label: "VEL. MÁXIMA" },
    ],
  },

  bentoGrid: [
    {
      type: "text",
      title: "Ajuste de Precisão",
      text: "Cada etapa é aplicada milímetro a milímetro, garantindo acabamento impecável e proteção duradoura em qualquer condição.",
      variant: "warm",
    },
    {
      type: "image",
      image: MEDIA.boxesWide,
      alt: "Interior automotivo premium",
    },
    {
      type: "image",
      image: MEDIA.shelby,
      alt: "Detalhe de veículo em destaque",
    },
    {
      type: "text",
      title: "Acompanhamento Digital",
      text: "Registro fotográfico e acompanhamento de cada etapa do serviço, do diagnóstico à entrega.",
      variant: "light",
    },
    {
      type: "text",
      title: "Iluminação Profissional",
      text: "Sistema de iluminação técnica que garante precisão em cada detalhe, do polimento ao envelopamento.",
      variant: "dark",
    },
    {
      type: "image",
      image: MEDIA.featureDetail,
      alt: "Detalhe de acabamento",
    },
  ],

  serviceDock: [
    { id: "ppf", label: "PPF" },
    { id: "wrap", label: "WRAP" },
    { id: "film", label: "FILM" },
    { id: "wash", label: "WASH" },
    { id: "detail", label: "DETAIL" },
  ],

  byChapter: {
    hero: { dockIndex: 0 },
    destaque: {
      stats: true,
      statsProminent: true,
      vehicleLabel: "Shelby GT500",
      thumb: MEDIA.shelby,
      dockIndex: 2,
    },
    "boxes-intro": { showBento: true, bentoRow: 0, dockIndex: 0 },
    ppf: { showBento: true, bentoRow: 0, dockIndex: 0 },
    envelopamento: { showBento: true, bentoRow: 1, dockIndex: 1 },
    processo: { stats: true, vehicleLabel: "L.A CUSTOM", thumb: MEDIA.aston, dockIndex: 4 },
    detalhamento: {
      stats: true,
      vehicleLabel: "Correção de pintura",
      thumb: MEDIA.featureDetail,
      dockIndex: 3,
    },
  },
};
