/*
 * ============================================================
 *  FOTOS DO SITE
 * ============================================================
 *  Existem dois lugares onde as fotos ficam:
 *
 *  1. Pasta /images do próprio site: fotos tiradas do Instagram
 *     da L.A Custom (@l.acustom), já cortadas e convertidas para
 *     WebP (formato leve). É o lugar preferido para fotos novas.
 *
 *  2. Cloudinary: um serviço que hospeda imagens. As fotos antigas
 *     do site (Shelby, capas dos vídeos) estão lá.
 *
 *  Os VÍDEOS não ficam aqui: eles estão na pasta /videos e são
 *  indicados direto no index.html.
 *
 *  Para colocar uma foto nova: veja o passo a passo no README
 *  (seção "Fotos").
 * ============================================================
 */

// Endereço base da conta no Cloudinary.
// "f_auto,q_auto" pede ao Cloudinary o melhor formato e qualidade automaticamente.
const ENDERECO_CLOUDINARY = "https://res.cloudinary.com/dcc2fweye/image/upload/f_auto,q_auto";

/**
 * Monta o link de uma foto do Cloudinary já no tamanho certo.
 * Exemplo: fotoDoCloudinary(800, "shelby") → foto "shelby" com 800px de largura.
 */
function fotoDoCloudinary(larguraEmPixels, nomeDaFoto) {
  return `${ENDERECO_CLOUDINARY},w_${larguraEmPixels}/la-custom/site/${nomeDaFoto}`;
}

// Lista das fotos usadas nos cartões (veja js/content/cards.js).
export const FOTOS = {
  // Do Cloudinary
  shelby: fotoDoCloudinary(1000, "shelby"),

  // Da pasta /images (vindas do Instagram @l.acustom)
  oficinaVistaAerea: "images/oficina-vista-aerea.webp",
  ppfEquipe: "images/ppf-equipe.webp",
  envelopamentoGt3: "images/envelopamento-gt3.webp",
  peliculasF150: "images/peliculas-f150.webp",
  coatingCeramico: "images/coating-ceramico.webp",
  skylineR33: "images/skyline-r33.webp",
  equipe: "images/equipe-renato-garcia.webp",

  // Fotos do carrossel (480 x 600), reaproveitadas nas grades bento
  galeria: {
    porsche911Cup: "images/galeria/porsche-911-cup.webp",
    porscheMacan: "images/galeria/porsche-macan.webp",
    porscheRodaBbs: "images/galeria/porsche-roda-bbs.webp",
    porschePrataFaixa: "images/galeria/porsche-prata-faixa.webp",
    porsche911Faixa: "images/galeria/porsche-911-faixa.webp",
    bmwM3Beaver: "images/galeria/bmw-m3-beaver.webp",
    skylineR33: "images/galeria/skyline-r33.webp",
  },
};
