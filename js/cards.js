/**
 * CARDS ? edite nomes, textos e imagens aqui.
 */
const CARDS = {
  stats: {
    vehicleLabel: "Ferrari 296 GTB",
    thumb: MEDIA.shelby,
    items: [
      { value: "15h", label: "BATTERY LIFE" },
      { value: "300mi", label: "RANGE" },
      { value: "120mph", label: "TOP SPEED" },
    ],
  },

  features: [
    {
      id: "adaptive",
      title: "Adaptive Suspension",
      text: "Real time suspension adjustments deliver maximum control, precision, and driving confidence everywhere.",
      image: MEDIA.boxesWide,
    },
    {
      id: "digital",
      title: "Digital Performance",
      text: "Integrated driving analytics provide instant feedback for speed, balance, and lap optimization.",
      image: MEDIA.lavagemAction,
    },
    {
      id: "lighting",
      title: "Signature Lighting",
      text: "Distinctive LED lighting system creates an unforgettable presence during every night drive.",
      image: MEDIA.featureDetail,
    },
  ],

  /** Grade zig-zag refer?ncia ? texto e imagem alternados (6 c?lulas) */
  bentoGrid: [
    {
      type: "text",
      title: "Adaptive Suspension",
      text: "Real time suspension adjustments deliver maximum control, precision, and driving confidence everywhere.",
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
      alt: "Detalhe de ve?culo em destaque",
    },
    {
      type: "text",
      title: "Digital Performance",
      text: "Integrated driving analytics provide instant feedback for speed, balance, and lap optimization.",
      variant: "light",
    },
    {
      type: "text",
      title: "Signature Lighting",
      text: "Distinctive LED lighting system creates an unforgettable presence during every night drive.",
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
    "quem-somos": { dockIndex: 1 },
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
    film: { showBento: true, bentoRow: 2, dockIndex: 2 },
    lavagem: { showBento: true, bentoRow: 1, dockIndex: 3 },
    estetica: { showBento: true, bentoRow: 2, dockIndex: 4 },
    processo: { featureIndex: 2, dockIndex: 3 },
    excelencia: { stats: true, vehicleLabel: "L.A CUSTOM", thumb: MEDIA.aston, dockIndex: 4 },
  },
};
