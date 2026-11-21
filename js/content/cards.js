/*
 * ============================================================
 *  CARTÕES QUE APARECEM POR CIMA DOS VÍDEOS
 * ============================================================
 *  Além do título grande de cada capítulo, aparecem 3 tipos de
 *  cartão por cima do vídeo:
 *
 *  1. Ficha (canto direito): uma foto + 3 destaques
 *     (um valor grande e um rótulo pequeno embaixo).
 *  2. Grade "bento" (só na cena dos boxes): blocos de texto e foto.
 *     Cada capítulo tem a SUA grade (estrutura, PPF, vinil), para
 *     o conteúdo não se repetir. Ao passar o mouse numa foto, ela
 *     aproxima e mostra uma legenda.
 *  3. Barra de serviços (canto esquerdo, embaixo): botões que levam
 *     a pessoa direto para cada serviço. O do capítulo atual fica aceso.
 *
 *  No final ("porCapitulo") fica a regra do que aparece em cada
 *  capítulo. O id do capítulo é o mesmo de js/content/scenes.js.
 *
 *  Dica de escrita: valores curtos (até ~7 letras) cabem melhor
 *  na ficha. Fale do BENEFÍCIO para o cliente, não só do serviço.
 * ============================================================
 */

import { FOTOS } from "./media.js";

/* ---------- Destaques das fichas ---------- */

const PROVAS_DA_MARCA = [
  { valor: "+17", rotulo: "ANOS DE MERCADO" },
  { valor: "86 mil", rotulo: "SEGUIDORES NO INSTAGRAM" },
  { valor: "SEMA", rotulo: "LAS VEGAS 2026" },
];

const PROCESSO_DE_LAVAGEM = [
  { valor: "Espuma", rotulo: "PRÉ-LAVAGEM SEM ATRITO" },
  { valor: "Detalhe", rotulo: "RODAS, FRISOS E VÃOS" },
  { valor: "Secagem", rotulo: "SEM MARCAS NA PINTURA" },
];

const CORRECAO_DE_PINTURA = [
  { valor: "Polido", rotulo: "TÉCNICO, SEM HOLOGRAMA" },
  { valor: "Coating", rotulo: "CERÂMICO" },
  { valor: "Brilho", rotulo: "DE CARRO NOVO" },
];

/* ---------- Grades bento (uma por capítulo da cena dos boxes) ----------
 * Vão em pares (2 por linha). tipo "texto" mostra título e texto;
 * tipo "foto" mostra uma imagem com legenda.
 * estilo dos textos: "warm" (vinho), "light" (claro) ou "dark" (escuro). */

const BENTO_ESTRUTURA = [
  {
    tipo: "texto",
    titulo: "Um box para cada carro",
    texto: "Boxes de vidro isolados: sem poeira, sem pressa e sem dividir espaço com outro serviço.",
    estilo: "warm",
  },
  {
    tipo: "foto",
    foto: FOTOS.oficinaVistaAerea,
    descricao: "Vista de cima da oficina da L.A Custom com vários carros nos boxes",
    legenda: "Nossa casa em Moema, vista de cima.",
  },
  {
    tipo: "foto",
    foto: FOTOS.galeria.porsche911Cup,
    descricao: "Porsche 911 branco de pista sob a iluminação hexagonal",
    legenda: "Luz hexagonal: o detalhe que ninguém vê, a gente vê.",
  },
  {
    tipo: "texto",
    titulo: "Você acompanha tudo",
    texto: "Fotos de cada etapa, do diagnóstico à entrega. Você sabe exatamente o que está sendo feito no seu carro.",
    estilo: "light",
  },
  {
    tipo: "texto",
    titulo: "Luz que não perdoa",
    texto: "A iluminação técnica revela cada detalhe da pintura. Nenhum defeito passa despercebido.",
    estilo: "dark",
  },
  {
    tipo: "foto",
    foto: FOTOS.galeria.porscheMacan,
    descricao: "Porsche Macan prata pronto para a entrega",
    legenda: "Porsche Macan pronto para voltar para casa.",
  },
];

const BENTO_PPF = [
  {
    tipo: "texto",
    titulo: "Invisível de verdade",
    texto: "Película transparente: a cor original continua lá, só que blindada contra o dia a dia.",
    estilo: "warm",
  },
  {
    tipo: "foto",
    foto: FOTOS.ppfEquipe,
    descricao: "Equipe da L.A Custom aplicando PPF em um Porsche preto",
    legenda: "Aplicação à mão, peça por peça.",
  },
  {
    tipo: "foto",
    foto: FOTOS.galeria.skylineR33,
    descricao: "Nissan Skyline GT-R R33 prata visto de trás",
    legenda: "Skyline GT-R R33: veio do Japão e saiu protegido.",
  },
  {
    tipo: "texto",
    titulo: "Pedrisco é com ela",
    texto: "Estrada, obra, garagem apertada: o impacto fica na película, não na sua pintura.",
    estilo: "light",
  },
  {
    tipo: "texto",
    titulo: "A água escorre",
    texto: "A superfície repele água e sujeira. Lavar fica mais rápido e o brilho dura mais.",
    estilo: "dark",
  },
  {
    tipo: "foto",
    foto: FOTOS.galeria.porscheRodaBbs,
    descricao: "Roda de um Porsche branco de pista",
    legenda: "Cada recorte pensado para não aparecer.",
  },
];

const BENTO_VINIL = [
  {
    tipo: "texto",
    titulo: "Qualquer cor",
    texto: "Fosco, acetinado ou brilho. Até cores que não existem de fábrica.",
    estilo: "warm",
  },
  {
    tipo: "foto",
    foto: FOTOS.galeria.bmwM3Beaver,
    descricao: "BMW M3 envelopado em branco, rosa e roxo com a marca Beaver",
    legenda: "BMW M3 com a Beaver: arte do capô ao para-choque.",
  },
  {
    tipo: "foto",
    foto: FOTOS.envelopamentoGt3,
    descricao: "Porsche 911 GT3 RS azul com capô preto",
    legenda: "GT3 RS: capô preto, personalidade inteira.",
  },
  {
    tipo: "texto",
    titulo: "Detalhes que mudam tudo",
    texto: "Teto, capô, faixas, retrovisores: pequenas mudanças, carro novo.",
    estilo: "light",
  },
  {
    tipo: "texto",
    titulo: "Volta ao original",
    texto: "Enjoou? O vinil sai sem marcar e a pintura de fábrica continua lá, intacta.",
    estilo: "dark",
  },
  {
    tipo: "foto",
    foto: FOTOS.galeria.porschePrataFaixa,
    descricao: "Porsche 911 prata com faixa vermelha, visto de cima",
    legenda: "Faixa de competição no Porsche 911.",
  },
];

export const CARTOES = {
  // Ficha: valores iniciais (cada capítulo troca título, foto e destaques)
  ficha: {
    titulo: "L.A Custom",
    foto: FOTOS.shelby,
    destaques: PROVAS_DA_MARCA,
  },

  // Uma grade bento por capítulo (o id é o mesmo de js/content/scenes.js)
  gradesBento: {
    "boxes-intro": BENTO_ESTRUTURA,
    ppf: BENTO_PPF,
    envelopamento: BENTO_VINIL,
  },

  /*
   * Botões da barra de serviços (na ordem em que aparecem).
   * - rotulo: o texto do botão
   * - cartao: qual card da seção "Serviços" o botão mostra. É o valor do
   *   atributo data-servico do card no index.html. O site rola até lá e
   *   deixa o card aceso por um instante.
   */
  barraDeServicos: [
    { rotulo: "PPF", cartao: "ppf" },
    { rotulo: "Vinil", cartao: "envelopamento" },
    { rotulo: "Película", cartao: "peliculas" },
    { rotulo: "Lavagem", cartao: "lavagem" },
    { rotulo: "Detalhe", cartao: "detail" },
  ],

  /*
   * O que aparece em cada capítulo:
   * - servicoAceso: qual botão da barra acende (0 = PPF, 1 = Vinil, ...)
   * - mostrarFicha: mostra a ficha
   * - fichaGrande: ficha em tamanho grande, no meio da altura da tela
   * - titulo / foto / destaques: o que a ficha mostra neste capítulo
   * - mostrarBento: mostra a grade bento do capítulo (veja gradesBento)
   */
  porCapitulo: {
    hero: { servicoAceso: 0 },
    destaque: {
      mostrarFicha: true,
      fichaGrande: true,
      titulo: "Shelby GT500",
      foto: FOTOS.shelby,
      destaques: PROVAS_DA_MARCA,
      servicoAceso: 0,
    },
    "boxes-intro": { mostrarBento: true, servicoAceso: 0 },
    ppf: { mostrarBento: true, servicoAceso: 0 },
    envelopamento: { mostrarBento: true, servicoAceso: 1 },
    processo: {
      mostrarFicha: true,
      titulo: "Lavagem técnica",
      foto: FOTOS.galeria.porsche911Faixa,
      destaques: PROCESSO_DE_LAVAGEM,
      servicoAceso: 3,
    },
    detalhamento: {
      mostrarFicha: true,
      titulo: "Correção de pintura",
      foto: FOTOS.coatingCeramico,
      destaques: CORRECAO_DE_PINTURA,
      servicoAceso: 4,
    },
  },
};
