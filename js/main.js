/*
 * ============================================================
 *  PONTO DE PARTIDA DO SITE
 * ============================================================
 *  Este é o primeiro arquivo de código que roda. Ele:
 *  1. liga a rolagem suave (biblioteca Lenis);
 *  2. liga o menu, os vídeos e as 4 cenas;
 *  3. no celular, não liga nada (o site ainda é só para computador).
 *
 *  As bibliotecas GSAP, ScrollTrigger e Lenis são carregadas no
 *  index.html, antes deste arquivo.
 * ============================================================
 */

import { CENAS } from "./content/scenes.js";
import { reduzirMovimento, ehComputador } from "./modules/environment.js";
import { baixarVideosAoSeAproximar } from "./modules/videos.js";
import { iniciarCena } from "./modules/scrollScene.js";
import { iniciarMenuDoTopo } from "./modules/header.js";
import { iniciarGaleria } from "./modules/gallery.js";
import { iniciarFaixasDeLogo } from "./modules/marquee.js";
import { ligarBotoesDeServico, suavizarLinksDoMenu } from "./modules/navigation.js";
import {
  iniciarAvisoDeRolagem,
  iniciarRevelacaoDasSecoes,
  travarSecaoNaTela,
} from "./modules/animations.js";

/*
 * AJUSTES DE SUAVIDADE (dá para mexer aqui)
 * - inerciaDaRolagem: quanto a página "desliza" depois de girar a roda
 *   do mouse. Menor = mais macio e mais lento (ex.: 0.05); maior =
 *   mais direto (ex.: 0.15).
 * - velocidadeDaRoda: quanto a página anda a cada giro da roda (1 = normal).
 * - atrasoDoVideo: quantos segundos o vídeo leva para alcançar a rolagem.
 *   Deixa o movimento do vídeo macio. 0 = vídeo grudado na rolagem.
 * - menorMudancaDoVideo: o vídeo só muda de quadro se a diferença for
 *   maior que isso (1/48s = meio quadro de um vídeo de 24 quadros/s).
 * - tempoComOsServicosNaTela: quanto a pessoa rola com os cards de serviço
 *   parados na tela ("+=60%" = 60% da altura da tela). Para os cards que
 *   aparecem por cima dos vídeos, ajuste em js/content/scenes.js.
 */
const AJUSTES = {
  inerciaDaRolagem: 0.075,
  velocidadeDaRoda: 0.9,
  atrasoDoVideo: 0.6,
  menorMudancaDoVideo: 1 / 48,
  tempoComOsServicosNaTela: "+=60%",
};

/**
 * Liga a rolagem suave (Lenis) e conecta ela ao GSAP, para as
 * animações acompanharem a rolagem macia, quadro a quadro.
 */
function ligarRolagemSuave() {
  const rolagemSuave = new Lenis({
    lerp: AJUSTES.inerciaDaRolagem,
    wheelMultiplier: AJUSTES.velocidadeDaRoda,
    smoothWheel: true,
  });

  rolagemSuave.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((tempo) => rolagemSuave.raf(tempo * 1000));
  gsap.ticker.lagSmoothing(0);

  window.lenis = rolagemSuave; // fica acessível no console, para testes
}

function iniciarSite() {
  if (!ehComputador) return;

  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ limitCallbacks: true });

  if (!reduzirMovimento) ligarRolagemSuave();

  // A galeria é montada antes de tudo, porque ela muda a altura da página
  iniciarGaleria();
  iniciarFaixasDeLogo();
  ligarBotoesDeServico();
  suavizarLinksDoMenu();
  baixarVideosAoSeAproximar();
  iniciarAvisoDeRolagem();

  const opcoesDasCenas = {
    suavizacao: reduzirMovimento ? false : AJUSTES.atrasoDoVideo,
    diferencaMinima: AJUSTES.menorMudancaDoVideo,
  };

  // As partes que ficam "presas" na tela são criadas na ordem em que aparecem
  // na página: cada uma empurra as de baixo, então a ordem importa.
  iniciarCena(CENAS.entrada, opcoesDasCenas);
  iniciarCena(CENAS.boxes, { ...opcoesDasCenas, temGradeBento: true });
  travarSecaoNaTela("#servicos", AJUSTES.tempoComOsServicosNaTela);
  iniciarCena(CENAS.lavagem, opcoesDasCenas);
  iniciarCena(CENAS.detalhamento, opcoesDasCenas);

  // O menu e as animações de entrada vêm DEPOIS: as partes presas aumentam o
  // tamanho da página, e quem é criado depois já calcula as posições certas.
  iniciarMenuDoTopo();
  iniciarRevelacaoDasSecoes();
  ScrollTrigger.refresh(); // recalcula as posições depois de montar tudo
}

// try/catch: se algo der errado nas animações, o site continua aparecendo
// (sem o efeito), em vez de ficar quebrado.
try {
  iniciarSite();
} catch (erro) {
  console.error("Erro ao iniciar as animações do site:", erro);
}
