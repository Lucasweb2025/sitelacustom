/*
 * ============================================================
 *  O MOTOR DE CADA CENA
 * ============================================================
 *  Junta tudo numa cena:
 *  - "prende" a cena na tela enquanto a pessoa rola (pin), para o
 *    vídeo andar no lugar em vez de a página descer;
 *  - a cada movimento da rolagem, calcula o capítulo atual, leva o
 *    vídeo ao segundo certo e atualiza textos e cartões;
 *  - na cena em modo "loop", o vídeo só toca sozinho e a rolagem
 *    controla apenas textos e cartões.
 *
 *  "ScrollTrigger" é a parte do GSAP que observa a rolagem e diz,
 *  de 0 a 1, quanto da cena já foi percorrido ("progress").
 * ============================================================
 */

import { calcularEstadoDoCapitulo, calcularSegundoDoVideo } from "./math.js";
import { prepararVideo, criarControleDeBusca } from "./videos.js";
import { colocarPaineisNaCena, colocarCartoesNaCena } from "./templates.js";
import {
  animarTextoDoCapitulo,
  atualizarCartoesDaCena,
  criarTransicoesDaCena,
} from "./animations.js";

/**
 * Liga o efeito de rolagem em uma cena.
 *
 * Recebe:
 * - cena: a configuração da cena (js/content/scenes.js)
 * - opcoes.temGradeBento: se a cena mostra a grade bento
 * - opcoes.suavizacao: quantos segundos o vídeo leva para "alcançar"
 *   a rolagem (deixa o movimento macio). false = sem suavização.
 * - opcoes.diferencaMinima: menor mudança de tempo que vale mover o vídeo
 */
export function iniciarCena(cena, opcoes) {
  const secao = document.querySelector(cena.seletor);
  const video = document.getElementById(cena.idDoVideo);
  if (!secao || !video) return;

  const videoEmLoop = cena.modo === "loop";

  colocarCartoesNaCena(secao, opcoes.temGradeBento);
  const paineis = colocarPaineisNaCena(secao, cena.capitulos);
  const atualizarTransicoes = criarTransicoesDaCena(secao);

  let duracaoDoVideo = 1;
  let cenaAtiva = false;
  let capituloAnterior = -1;

  const controleDeBusca = criarControleDeBusca(video, () => cenaAtiva, opcoes.diferencaMinima);

  // Quando a cena entra na tela (descendo ou voltando)
  function aoEntrarNaCena() {
    cenaAtiva = true;
    prepararVideo(video).then((duracao) => {
      duracaoDoVideo = duracao;
      if (videoEmLoop && cenaAtiva) {
        video.play().catch(() => {}); // se o navegador bloquear, fica só a imagem parada
      }
    });
  }

  // Quando a cena sai da tela: só pausa o vídeo (ele continua baixado)
  function aoSairDaCena() {
    cenaAtiva = false;
    video.pause();
  }

  // A cada movimento da rolagem dentro da cena
  function aoRolar(rolagem) {
    if (!cenaAtiva) {
      // A página pode abrir já dentro da cena (ex.: a entrada, no topo). Nesse caso o
      // aviso de "entrou na cena" não chega, então a cena é ativada aqui, na 1ª rolagem.
      if (!rolagem.isActive) return;
      aoEntrarNaCena();
    }

    const progressoDaCena = rolagem.progress;
    atualizarTransicoes(progressoDaCena);

    const estado = calcularEstadoDoCapitulo(progressoDaCena, cena.capitulos, cena.faseDoVideo);
    const capitulo = cena.capitulos[estado.indiceDoCapitulo];

    if (!videoEmLoop) {
      controleDeBusca.irPara(
        calcularSegundoDoVideo(duracaoDoVideo, capitulo, estado.progressoDoVideo)
      );
    }

    // Mudou de capítulo: esconde os textos dos outros capítulos
    if (estado.indiceDoCapitulo !== capituloAnterior) {
      paineis.forEach((painel, indice) => {
        if (indice !== estado.indiceDoCapitulo) painel.classList.remove("is-active");
      });
      capituloAnterior = estado.indiceDoCapitulo;
    }

    animarTextoDoCapitulo(paineis[estado.indiceDoCapitulo], estado.revelacaoDoTexto);
    atualizarCartoesDaCena(secao, capitulo.id, estado.revelacaoDoTexto, estado.emPausa);
  }

  video.pause();
  animarTextoDoCapitulo(paineis[0], 0); // começa com o texto escondido

  ScrollTrigger.create({
    trigger: secao,
    start: "top top", // começa quando o topo da cena encosta no topo da tela
    end: cena.distanciaDeRolagem,
    pin: true, // prende a cena na tela durante a rolagem
    scrub: opcoes.suavizacao,
    anticipatePin: 1,
    onEnter: aoEntrarNaCena,
    onEnterBack: aoEntrarNaCena,
    onLeave: aoSairDaCena,
    onLeaveBack: aoSairDaCena,
    onUpdate: aoRolar,
  });
}
