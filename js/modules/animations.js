/*
 * ============================================================
 *  ANIMAÇÕES QUE SEGUEM A ROLAGEM
 * ============================================================
 *  Aqui fica o "como aparece": os textos que sobem e surgem, os
 *  cartões que entram, o escurecimento entre uma cena e outra.
 *
 *  Quase tudo recebe um número de 0 a 1 ("revelação"):
 *  0 = escondido, 1 = totalmente visível. Valores no meio deixam
 *  o elemento meio transparente e um pouco mais para baixo, e é
 *  isso que dá a sensação de "subir e aparecer" enquanto se rola.
 *
 *  "gsap" é a biblioteca de animação usada no site (GreenSock).
 *  gsap.set(elemento, {...}) muda o visual do elemento na hora.
 * ============================================================
 */

import { CARTOES } from "../content/cards.js";
import { converterFaixa, limitarEntreZeroEUm } from "./math.js";
import { reduzirMovimento } from "./environment.js";

/**
 * Faz o bloco de texto de um capítulo aparecer aos poucos:
 * primeiro o número e o sobretítulo, depois cada linha do título
 * (uma depois da outra) e por último a frase.
 */
export function animarTextoDoCapitulo(painel, revelacao) {
  if (!painel) return;

  const numero = painel.querySelector(".chapter-panel__num");
  const sobretitulo = painel.querySelector(".chapter-panel__eyebrow");
  const linhasDoTitulo = painel.querySelectorAll(".chapter-panel__title-line");
  const frase = painel.querySelector(".chapter-panel__text");

  const visivel = revelacao > 0.08;
  painel.classList.toggle("is-active", visivel);

  // Sem animação: aparece ou some de uma vez.
  if (reduzirMovimento) {
    gsap.set([numero, sobretitulo, ...linhasDoTitulo, frase], { opacity: visivel ? 1 : 0, y: 0 });
    return;
  }

  // y = deslocamento para baixo, em pixels (vai diminuindo até 0 enquanto aparece)
  gsap.set(numero, { opacity: revelacao, y: converterFaixa(revelacao, 0, 1, 12, 0) });
  gsap.set(sobretitulo, { opacity: revelacao, y: converterFaixa(revelacao, 0, 1, 20, 0) });

  linhasDoTitulo.forEach((linha, indice) => {
    const atraso = indice * 0.12; // cada linha começa um pouquinho depois da anterior
    const revelacaoDaLinha = limitarEntreZeroEUm((revelacao - atraso) / (1 - atraso));
    gsap.set(linha, {
      opacity: revelacaoDaLinha,
      y: converterFaixa(revelacaoDaLinha, 0, 1, 36, 0),
    });
  });

  gsap.set(frase, {
    opacity: converterFaixa(revelacao, 0.35, 1, 0, 1),
    y: converterFaixa(revelacao, 0.35, 1, 18, 0),
  });
}

/**
 * Cria a função que faz a passagem suave entre uma cena e outra:
 * a cena escurece no fim e clareia no começo, para não ter "corte seco".
 */
export function criarTransicoesDaCena(secao) {
  const video = secao.querySelector(".scene__video");
  const escurecimentoDeSaida = secao.querySelector(".scene__blend--exit");
  const escurecimentoDeEntrada = secao.querySelector(".scene__blend--enter");

  return function atualizarTransicoes(progressoDaCena) {
    if (escurecimentoDeEntrada) {
      gsap.set(escurecimentoDeEntrada, {
        opacity: converterFaixa(progressoDaCena, 0.02, 0.2, 1, 0),
      });
    }
    if (escurecimentoDeSaida) {
      gsap.set(escurecimentoDeSaida, {
        opacity: converterFaixa(progressoDaCena, 0.78, 0.96, 0, 0.55),
      });
    }
    if (video) {
      const apagandoNoFim = converterFaixa(progressoDaCena, 0.84, 0.98, 1, 0.94);
      const acendendoNoInicio = escurecimentoDeEntrada
        ? converterFaixa(progressoDaCena, 0.02, 0.18, 0.94, 1)
        : 1;
      gsap.set(video, { opacity: Math.min(apagandoNoFim, acendendoNoInicio) });
    }
  };
}

/**
 * Mostra ou esconde a grade bento. Os blocos sobem um depois do outro,
 * e a linha em destaque fica mais forte que as outras.
 */
function atualizarGradeBento(camadaDeCartoes, mostrar, revelacao, linhaEmDestaque) {
  const grade = camadaDeCartoes.querySelector(".bento-grid");
  if (!grade) return;

  const blocos = [...grade.querySelectorAll(".bento-cell")];
  const revelacaoDaGrade = mostrar ? converterFaixa(revelacao, 0.25, 1, 0, 1) : 0;
  const centralizarNaAltura = -50; // a grade fica centralizada na altura da tela

  // Escondida
  if (revelacaoDaGrade <= 0.02) {
    grade.classList.remove("is-visible");
    gsap.set(grade, { opacity: 0, yPercent: centralizarNaAltura, y: 120 });
    blocos.forEach((bloco) => {
      bloco.classList.remove("is-active");
      gsap.set(bloco, { opacity: 0, y: 72 });
    });
    return;
  }

  // Aparecendo
  grade.classList.add("is-visible");
  gsap.set(grade, {
    opacity: revelacaoDaGrade,
    yPercent: centralizarNaAltura,
    y: converterFaixa(revelacaoDaGrade, 0, 1, 110, 0),
  });

  blocos.forEach((bloco, indice) => {
    const linhaDoBloco = Math.floor(indice / 2); // 2 blocos por linha
    const atraso = indice * 0.07;
    const revelacaoDoBloco = limitarEntreZeroEUm(
      (revelacaoDaGrade - atraso) / Math.max(0.01, 1 - atraso)
    );
    const emDestaque = linhaEmDestaque === undefined || linhaDoBloco === linhaEmDestaque;

    bloco.classList.toggle("is-active", emDestaque && revelacaoDoBloco > 0.5);
    gsap.set(bloco, {
      opacity: revelacaoDoBloco * (emDestaque ? 1 : 0.55),
      y: converterFaixa(revelacaoDoBloco, 0, 1, 64, 0),
    });
  });
}

/** Troca o nome e a foto da ficha do carro conforme o capítulo. */
function atualizarConteudoDaFicha(camadaDeCartoes, regras) {
  const nome = camadaDeCartoes.querySelector(".glass-stats__name");
  const foto = camadaDeCartoes.querySelector(".glass-stat--thumb img");

  if (nome && regras.nomeDoVeiculo) {
    nome.textContent = regras.nomeDoVeiculo;
  }
  if (foto) {
    const novaFoto = regras.foto || CARTOES.fichaDoCarro.foto;
    if (foto.getAttribute("src") !== novaFoto) foto.setAttribute("src", novaFoto);
  }
}

/** Mostra ou esconde a ficha do carro (normal ou grande). */
function atualizarVisibilidadeDaFicha(ficha, mostrar, grande, revelacao) {
  const deslocamentoInicial = grande ? 80 : 28; // de quantos pixels abaixo ela sobe
  const tamanhoInicial = grande ? 0.9 : 0.96; // começa um pouco menor e cresce

  ficha.classList.toggle("is-visible", mostrar && revelacao > 0.1);
  ficha.classList.toggle("glass-stats--prominent", grande && mostrar);
  gsap.set(ficha, {
    opacity: mostrar ? revelacao : 0,
    yPercent: grande ? -50 : 0,
    y: mostrar ? converterFaixa(revelacao, 0, 1, deslocamentoInicial, 0) : deslocamentoInicial,
    scale: mostrar ? converterFaixa(revelacao, 0, 1, tamanhoInicial, 1) : tamanhoInicial,
  });
}

/** Acende a bolinha do serviço do capítulo atual na barra de serviços. */
function atualizarBarraDeServicos(camadaDeCartoes, servicoAceso, revelacao) {
  camadaDeCartoes.querySelectorAll(".service-dock__item").forEach((bolinha, indice) => {
    bolinha.classList.toggle("is-active", indice === servicoAceso);
    gsap.set(bolinha, { opacity: converterFaixa(revelacao, 0.2, 0.8, 0.4, 1) });
  });
}

/**
 * Atualiza todos os cartões da cena para o capítulo atual,
 * seguindo as regras de js/content/cards.js ("porCapitulo").
 */
export function atualizarCartoesDaCena(secao, idDoCapitulo, revelacao, emPausa) {
  const camadaDeCartoes = secao.querySelector(".scene-cards");
  if (!camadaDeCartoes) return;

  const regras = CARTOES.porCapitulo[idDoCapitulo] || {};
  const mostrarBento = Boolean(regras.mostrarBento);
  const mostrarFicha = Boolean(regras.mostrarFicha) && !mostrarBento;
  // A ficha só entra depois que o vídeo parou
  const revelacaoDaFicha = emPausa ? converterFaixa(revelacao, 0.35, 1, 0, 1) : 0;

  atualizarConteudoDaFicha(camadaDeCartoes, regras);

  const ficha = camadaDeCartoes.querySelector(".glass-stats");
  if (ficha) {
    atualizarVisibilidadeDaFicha(ficha, mostrarFicha, Boolean(regras.fichaGrande), revelacaoDaFicha);
  }

  atualizarGradeBento(camadaDeCartoes, mostrarBento, revelacao, regras.linhaDoBento);
  atualizarBarraDeServicos(camadaDeCartoes, regras.servicoAceso, revelacao);
}

/** O aviso "Role para entrar" some assim que a pessoa começa a rolar. */
export function iniciarAvisoDeRolagem() {
  const aviso = document.querySelector(".scene__hint");
  if (!aviso) return;

  ScrollTrigger.create({
    trigger: ".scene--entrance",
    start: "top top",
    end: "+=12%",
    scrub: true,
    onUpdate: (rolagem) => gsap.set(aviso, { opacity: 1 - rolagem.progress }),
  });
}

/** O bloco "Agende seu orçamento" aparece subindo quando chega na tela. */
export function iniciarEntradaDoOrcamento() {
  const secao = document.querySelector(".cta-section");
  if (!secao) return;

  gsap.from(secao.querySelectorAll(".cta-section__inner > *"), {
    opacity: 0,
    y: 28,
    duration: 0.9,
    stagger: 0.12, // cada item entra 0,12s depois do anterior
    ease: "power3.out",
    scrollTrigger: { trigger: secao, start: "top 78%" },
  });
}
