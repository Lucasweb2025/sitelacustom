/*
 * ============================================================
 *  FOTOS DO SITE
 * ============================================================
 *  As fotos ficam guardadas no Cloudinary (um serviço que hospeda
 *  imagens e já entrega cada uma no tamanho e formato mais leve
 *  para o navegador de quem está visitando).
 *
 *  Os VÍDEOS não ficam aqui: eles estão na pasta /videos do site
 *  e são indicados direto no index.html.
 *
 *  Para trocar uma foto: suba a nova imagem no Cloudinary, dentro
 *  da pasta "la-custom/site", e troque o nome abaixo.
 * ============================================================
 */

// Endereço base da conta no Cloudinary.
// "f_auto,q_auto" pede ao Cloudinary o melhor formato e qualidade automaticamente.
const ENDERECO_CLOUDINARY = "https://res.cloudinary.com/dcc2fweye/image/upload/f_auto,q_auto";

/**
 * Monta o link de uma foto do Cloudinary já no tamanho certo.
 * Exemplo: enderecoDaFoto(800, "aston") → foto "aston" com 800px de largura.
 */
function enderecoDaFoto(larguraEmPixels, nomeDaFoto) {
  return `${ENDERECO_CLOUDINARY},w_${larguraEmPixels}/la-custom/site/${nomeDaFoto}`;
}

// Lista das fotos usadas nos cartões do site (veja js/content/cards.js).
export const FOTOS = {
  boxesPanoramica: enderecoDaFoto(1200, "boxes-wide"),
  shelby: enderecoDaFoto(1000, "shelby"),
  detalheAcabamento: enderecoDaFoto(1000, "feature-detail"),
  aston: enderecoDaFoto(800, "aston"),
};
