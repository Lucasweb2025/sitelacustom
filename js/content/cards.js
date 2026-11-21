/*
 * ============================================================
 *  CARTÕES QUE APARECEM POR CIMA DOS VÍDEOS
 * ============================================================
 *  Além do título grande de cada capítulo, aparecem 3 tipos de
 *  cartão por cima do vídeo:
 *
 *  1. Ficha do carro (canto direito): foto pequena + 3 números
 *     (ex.: potência, 0-100, velocidade máxima).
 *  2. Grade "bento" (só na cena dos boxes): blocos de texto e foto
 *     que sobem em zigue-zague.
 *  3. Barra de serviços (canto esquerdo, embaixo): bolinhas PPF,
 *     WRAP, FILM, WASH, DETAIL. A bolinha do serviço da vez acende.
 *
 *  No final ("porCapitulo") fica a regra de qual cartão aparece em
 *  cada capítulo. O id do capítulo é o mesmo de js/content/scenes.js.
 * ============================================================
 */

import { FOTOS } from "./media.js";

export const CARTOES = {
  // Ficha do carro: valores padrão (cada capítulo pode trocar o nome e a foto)
  fichaDoCarro: {
    nomeDoVeiculo: "Ferrari 296 GTB",
    foto: FOTOS.shelby,
    numeros: [
      { valor: "830cv", rotulo: "POTÊNCIA" },
      { valor: "2.9s", rotulo: "0-100 KM/H" },
      { valor: "330km/h", rotulo: "VEL. MÁXIMA" },
    ],
  },

  // Grade bento da cena dos boxes. Vai em pares (2 por linha):
  // linha 0 = os 2 primeiros, linha 1 = os 2 seguintes, e assim por diante.
  // tipo "texto" mostra título e texto; tipo "foto" mostra uma imagem.
  // estilo: "warm" (dourado), "light" (claro) ou "dark" (escuro).
  gradeBento: [
    {
      tipo: "texto",
      titulo: "Ajuste de Precisão",
      texto: "Cada etapa é aplicada milímetro a milímetro, garantindo acabamento impecável e proteção duradoura em qualquer condição.",
      estilo: "warm",
    },
    { tipo: "foto", foto: FOTOS.boxesPanoramica, descricao: "Interior automotivo premium" },
    { tipo: "foto", foto: FOTOS.shelby, descricao: "Detalhe de veículo em destaque" },
    {
      tipo: "texto",
      titulo: "Acompanhamento Digital",
      texto: "Registro fotográfico e acompanhamento de cada etapa do serviço, do diagnóstico à entrega.",
      estilo: "light",
    },
    {
      tipo: "texto",
      titulo: "Iluminação Profissional",
      texto: "Sistema de iluminação técnica que garante precisão em cada detalhe, do polimento ao envelopamento.",
      estilo: "dark",
    },
    { tipo: "foto", foto: FOTOS.detalheAcabamento, descricao: "Detalhe de acabamento" },
  ],

  // Bolinhas da barra de serviços (na ordem em que aparecem)
  barraDeServicos: ["PPF", "WRAP", "FILM", "WASH", "DETAIL"],

  /*
   * O que aparece em cada capítulo:
   * - servicoAceso: qual bolinha da barra acende (0 = PPF, 1 = WRAP, ...)
   * - mostrarFicha: mostra a ficha do carro
   * - fichaGrande: ficha em tamanho grande, no meio da altura da tela
   * - nomeDoVeiculo / foto: trocam o nome e a foto da ficha neste capítulo
   * - mostrarBento: mostra a grade bento
   * - linhaDoBento: qual linha da grade fica em destaque
   */
  porCapitulo: {
    hero: { servicoAceso: 0 },
    destaque: {
      mostrarFicha: true,
      fichaGrande: true,
      nomeDoVeiculo: "Shelby GT500",
      foto: FOTOS.shelby,
      servicoAceso: 2,
    },
    "boxes-intro": { mostrarBento: true, linhaDoBento: 0, servicoAceso: 0 },
    ppf: { mostrarBento: true, linhaDoBento: 0, servicoAceso: 0 },
    envelopamento: { mostrarBento: true, linhaDoBento: 1, servicoAceso: 1 },
    processo: { mostrarFicha: true, nomeDoVeiculo: "L.A CUSTOM", foto: FOTOS.aston, servicoAceso: 4 },
    detalhamento: {
      mostrarFicha: true,
      nomeDoVeiculo: "Correção de pintura",
      foto: FOTOS.detalheAcabamento,
      servicoAceso: 3,
    },
  },
};
