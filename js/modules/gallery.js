/*
 * ============================================================
 *  GALERIA "PROJETOS RECENTES" (carrossel que anda sozinho)
 * ============================================================
 *  Como o movimento infinito funciona:
 *  cada faixa tem as fotos repetidas duas vezes, uma atrás da outra.
 *  A faixa anda até a metade (onde começa a cópia) e volta ao início
 *  sem ninguém perceber, porque a imagem nesse ponto é igual.
 *
 *  O movimento em si é feito pelo CSS (css/sections.css), que é o
 *  jeito mais leve. Aqui o código só:
 *  - monta as fotos a partir de js/content/gallery.js;
 *  - pausa as faixas quando a galeria sai da tela (economiza bateria
 *    e processamento).
 * ============================================================
 */

import { GALERIA } from "../content/gallery.js";
import { protegerTexto } from "./templates.js";
import { animarSoNaTela } from "./marquee.js";

/** Monta uma foto da galeria com a legenda (nome do carro + detalhe). */
function montarFotoDaGaleria(item, ehCopia) {
  // A cópia é só para o efeito infinito: leitores de tela e o teclado a ignoram.
  const ocultarDaAcessibilidade = ehCopia ? ' aria-hidden="true"' : "";
  const textoAlternativo = ehCopia ? "" : protegerTexto(item.descricao);

  return `
    <figure class="galeria__foto"${ocultarDaAcessibilidade}>
      <img src="${protegerTexto(item.foto)}" alt="${textoAlternativo}" width="480" height="600" loading="lazy" decoding="async" />
      <figcaption class="galeria__legenda">
        <strong>${protegerTexto(item.carro)}</strong>
        <span>${protegerTexto(item.detalhe)}</span>
      </figcaption>
    </figure>`;
}

/** Monta uma faixa: as fotos + a cópia delas (para o movimento sem fim). */
function montarFaixa(itens, sentido) {
  const originais = itens.map((item) => montarFotoDaGaleria(item, false)).join("");
  const copias = itens.map((item) => montarFotoDaGaleria(item, true)).join("");

  return `
    <div class="galeria__faixa galeria__faixa--${sentido}">
      <div class="galeria__trilho">${originais}${copias}</div>
    </div>`;
}

/**
 * Coloca a galeria na página, dentro do elemento com data-galeria
 * (no index.html), e liga a pausa automática fora da tela.
 */
export function iniciarGaleria() {
  const recipiente = document.querySelector("[data-galeria]");
  if (!recipiente) return;

  recipiente.innerHTML =
    montarFaixa(GALERIA.primeiraFaixa, "esquerda") + montarFaixa(GALERIA.segundaFaixa, "direita");

  // As faixas só andam enquanto a galeria está na tela
  animarSoNaTela(recipiente, "galeria--em-movimento");
}
