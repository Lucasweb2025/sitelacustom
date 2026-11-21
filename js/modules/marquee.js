/*
 * ============================================================
 *  FAIXAS QUE ANDAM SOZINHAS (logo em loop e carrossel)
 * ============================================================
 *  O movimento é feito pelo CSS (css/sections.css), que é o jeito
 *  mais leve. Aqui o código só:
 *  - monta as faixas com a logo entre as seções;
 *  - liga e desliga o movimento conforme a faixa aparece ou some
 *    da tela (fora da tela, nada anda: economiza processamento).
 *
 *  Como o loop infinito funciona: o conteúdo é repetido duas vezes,
 *  uma atrás da outra. A faixa anda até a metade (onde começa a
 *  cópia) e recomeça, sem ninguém perceber a emenda.
 * ============================================================
 */

const LOGOS_POR_FAIXA = 8;

/**
 * Liga a classe que faz o elemento andar só enquanto ele está na tela
 * (com uma folga de 100px, para já estar andando quando aparecer).
 */
export function animarSoNaTela(elemento, classeDeMovimento) {
  const observador = new IntersectionObserver(
    ([aviso]) => elemento.classList.toggle(classeDeMovimento, aviso.isIntersecting),
    { rootMargin: "100px 0px" }
  );
  observador.observe(elemento);
}

/** Monta uma sequência de logos separadas por um losango dourado. */
function montarSequenciaDeLogos() {
  const item = `
    <span class="faixa-logos__item">
      <img src="images/logo-lacustom.webp" alt="" width="360" height="78" loading="lazy" decoding="async" />
    </span>
    <span class="faixa-logos__separador">◆</span>`;
  return item.repeat(LOGOS_POR_FAIXA);
}

/**
 * Preenche cada elemento com data-faixa-logos (no index.html) com a
 * logo da L.A Custom passando em loop. Fica na emenda entre uma seção
 * e a próxima cena, para disfarçar a troca.
 */
export function iniciarFaixasDeLogo() {
  document.querySelectorAll("[data-faixa-logos]").forEach((faixa) => {
    const sequencia = montarSequenciaDeLogos();
    faixa.innerHTML = `<div class="faixa-logos__trilho">${sequencia}${sequencia}</div>`;
    animarSoNaTela(faixa, "faixa-logos--em-movimento");
  });
}
