/*
 * ============================================================
 *  NAVEGAÇÃO: BOTÕES DE SERVIÇO E LINKS DO MENU
 * ============================================================
 *  - Botões da barra de serviços (PPF, Vinil, Película, Lavagem,
 *    Detalhe), que aparecem por cima dos vídeos: levam a pessoa
 *    até o card daquele serviço na seção "Serviços" e deixam o
 *    card aceso por um instante.
 *  - Links do menu do topo (#historia, #servicos...): em vez de
 *    "pular", a página desliza até a parte escolhida.
 * ============================================================
 */

import { CARTOES } from "../content/cards.js";

const TEMPO_DO_CARD_ACESO_MS = 2600;
const DURACAO_DA_ROLAGEM_S = 1.6;

/**
 * Rola a página com suavidade até um elemento.
 * - distanciaDoTopo: quantos pixels deixar entre o topo da tela e o elemento
 */
function rolarAte(elemento, distanciaDoTopo = 0) {
  if (window.lenis) {
    window.lenis.scrollTo(elemento, { offset: -distanciaDoTopo, duration: DURACAO_DA_ROLAGEM_S });
  } else {
    elemento.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/** Acende um card de serviço por alguns segundos (veja .cartao-servico--destacado no CSS). */
function acenderCard(cartao) {
  cartao.classList.add("cartao-servico--destacado");
  window.setTimeout(
    () => cartao.classList.remove("cartao-servico--destacado"),
    TEMPO_DO_CARD_ACESO_MS
  );
}

/** Leva a pessoa até o card de serviço indicado pelo botão (pela posição dele na barra). */
function irParaServico(posicaoDoBotao) {
  const servico = CARTOES.barraDeServicos[posicaoDoBotao];
  if (!servico) return;

  const cartao = document.querySelector(`.cartao-servico[data-servico="${servico.cartao}"]`);
  if (!cartao) return;

  // Deixa o card a ~1/4 da altura da tela, bem à vista
  rolarAte(cartao, window.innerHeight * 0.25);
  window.setTimeout(() => acenderCard(cartao), DURACAO_DA_ROLAGEM_S * 1000);
}

/**
 * Liga os botões da barra de serviços. Um único "ouvinte" na página
 * atende todos os botões de todas as cenas (eles são criados pelo código).
 */
export function ligarBotoesDeServico() {
  document.addEventListener("click", (evento) => {
    const botao = evento.target.closest(".service-dock__item");
    if (!botao) return;
    irParaServico(Number(botao.dataset.dockIndex));
  });
}

/** Faz os links do menu (href="#...") deslizarem até a seção, em vez de pular. */
export function suavizarLinksDoMenu() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (evento) => {
      const destino = document.querySelector(link.getAttribute("href"));
      if (!destino) return;
      evento.preventDefault();
      rolarAte(destino);
    });
  });
}
