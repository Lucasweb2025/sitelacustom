/*
 * ============================================================
 *  MONTAGEM DOS TEXTOS E CARTÕES NA PÁGINA
 * ============================================================
 *  Os títulos e cartões das cenas não estão escritos no index.html: eles são
 *  montados aqui, a partir do conteúdo de js/content/. Assim, para
 *  trocar um texto, basta mexer no conteúdo, sem tocar no HTML.
 *
 *  Os nomes de classe (ex.: "chapter-panel") são os que o CSS usa
 *  para dar o visual. Por isso eles continuam como estão.
 * ============================================================
 */

import { CARTOES } from "../content/cards.js";

/**
 * Protege o texto antes de colocá-lo na página.
 * Troca caracteres especiais (<, >, &, aspas) pelos seus códigos,
 * para que nenhum texto seja interpretado como código HTML.
 * (Proteção contra um tipo de ataque chamado XSS.)
 */
export function protegerTexto(texto) {
  return String(texto)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/**
 * Monta o bloco de texto grande de um capítulo:
 * número (01, 02...), sobretítulo, título em linhas e frase.
 */
function montarPainelDoCapitulo(capitulo, posicao) {
  const painel = document.createElement("article");
  painel.className = "chapter-panel";
  painel.dataset.chapterId = capitulo.id;

  const linhasDoTitulo = capitulo.titulo
    .map((linha, indiceDaLinha) => {
      const destaque =
        indiceDaLinha === capitulo.linhaEmDestaque ? " chapter-panel__title-line--accent" : "";
      return `<span class="chapter-panel__title-line${destaque}">${protegerTexto(linha)}</span>`;
    })
    .join("");

  const numero = String(posicao + 1).padStart(2, "0"); // 1 → "01"

  painel.innerHTML = `
    <span class="chapter-panel__num">${numero}</span>
    <p class="chapter-panel__eyebrow">${protegerTexto(capitulo.sobretitulo)}</p>
    <h2 class="chapter-panel__title">${linhasDoTitulo}</h2>
    <p class="chapter-panel__text">${protegerTexto(capitulo.texto)}</p>
  `;
  return painel;
}

/**
 * Coloca na cena os blocos de texto de todos os capítulos dela.
 * Devolve a lista de blocos, na mesma ordem dos capítulos.
 */
export function colocarPaineisNaCena(secao, capitulos) {
  const areaFixa = secao.querySelector(".scene__sticky");
  let recipiente = areaFixa.querySelector(".chapter-panels");

  if (!recipiente) {
    recipiente = document.createElement("div");
    recipiente.className = "chapter-panels";
    // Fica logo acima da camada escura que cobre o vídeo
    const camadaEscura = areaFixa.querySelector(".scene__overlay");
    areaFixa.insertBefore(recipiente, camadaEscura ? camadaEscura.nextSibling : null);
  }

  recipiente.innerHTML = "";
  return capitulos.map((capitulo, posicao) => {
    const painel = montarPainelDoCapitulo(capitulo, posicao);
    recipiente.appendChild(painel);
    return painel;
  });
}

/** Monta um bloco da grade bento (texto ou foto). */
function montarBlocoDoBento(bloco, posicao) {
  if (bloco.tipo === "texto") {
    return `
      <article class="bento-cell bento-cell--text bento-cell--${protegerTexto(bloco.estilo)}" data-bento-index="${posicao}">
        <h3 class="bento-cell__title">${protegerTexto(bloco.titulo)}</h3>
        <p class="bento-cell__text">${protegerTexto(bloco.texto)}</p>
      </article>`;
  }

  // Foto com legenda: a legenda aparece ao passar o mouse (veja css/sections.css)
  const legenda = bloco.legenda
    ? `<span class="bento-cell__legenda">${protegerTexto(bloco.legenda)}</span>`
    : "";

  return `
    <article class="bento-cell bento-cell--image" data-bento-index="${posicao}">
      <img src="${protegerTexto(bloco.foto)}" alt="${protegerTexto(bloco.descricao || "")}" loading="lazy" decoding="async" />
      ${legenda}
    </article>`;
}

/** Monta um destaque da ficha (valor grande + rótulo pequeno). */
export function montarDestaqueDaFicha(destaque) {
  return `
    <div class="glass-stat">
      <strong class="glass-stat__value">${protegerTexto(destaque.valor)}</strong>
      <span class="glass-stat__label">${protegerTexto(destaque.rotulo)}</span>
    </div>`;
}

/** Monta a ficha (título, foto e 3 destaques). */
function montarFicha() {
  const ficha = CARTOES.ficha;

  return `
    <div class="glass-stats" aria-hidden="true">
      <div class="glass-stats__label">
        <span class="glass-stats__mark">A</span>
        <span class="glass-stats__name">${protegerTexto(ficha.titulo)}</span>
      </div>
      <div class="glass-stats__grid">
        <div class="glass-stat glass-stat--thumb">
          <img src="${protegerTexto(ficha.foto)}" alt="" loading="lazy" decoding="async" />
        </div>
        <div class="glass-stats__destaques">${ficha.destaques.map(montarDestaqueDaFicha).join("")}</div>
      </div>
    </div>`;
}

/**
 * Monta a barra de serviços (PPF, Vinil, Película...).
 * Cada item é um botão; o clique é ligado em js/modules/navigation.js.
 */
function montarBarraDeServicos() {
  const botoes = CARTOES.barraDeServicos
    .map(
      (servico, posicao) =>
        `<button type="button" class="service-dock__item" data-dock-index="${posicao}">${protegerTexto(servico.rotulo)}</button>`
    )
    .join("");

  return `<nav class="service-dock" aria-label="Ir para um serviço">${botoes}</nav>`;
}

/**
 * Monta uma grade bento para cada capítulo que tiver uma
 * (veja "gradesBento" em js/content/cards.js).
 */
function montarGradesBento(capitulos) {
  return capitulos
    .filter((capitulo) => CARTOES.gradesBento[capitulo.id])
    .map(
      (capitulo) => `
        <div class="bento-grid" data-capitulo="${protegerTexto(capitulo.id)}" aria-hidden="true">
          ${CARTOES.gradesBento[capitulo.id].map(montarBlocoDoBento).join("")}
        </div>`
    )
    .join("");
}

/**
 * Coloca na cena os cartões que ficam por cima do vídeo:
 * barra de serviços, ficha e (só na cena dos boxes) as grades bento.
 */
export function colocarCartoesNaCena(secao, temGradeBento, capitulos) {
  const areaFixa = secao.querySelector(".scene__sticky");
  if (!areaFixa || areaFixa.querySelector(".scene-cards")) return; // já foram colocados

  const gradeBento = temGradeBento ? montarGradesBento(capitulos) : "";

  const camadaDeCartoes = document.createElement("div");
  camadaDeCartoes.className = "scene-cards";
  camadaDeCartoes.innerHTML = montarBarraDeServicos() + montarFicha() + gradeBento;

  areaFixa.appendChild(camadaDeCartoes);
}
