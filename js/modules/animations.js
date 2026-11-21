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
import { montarDestaqueDaFicha } from "./templates.js";

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
 * Mostra a grade bento do capítulo atual e esconde as dos outros capítulos
 * (cada capítulo da cena dos boxes tem a sua grade, com conteúdo próprio).
 */
function atualizarGradesBento(camadaDeCartoes, idDoCapitulo, mostrar, revelacao) {
  camadaDeCartoes.querySelectorAll(".bento-grid").forEach((grade) => {
    const ehDoCapitulo = grade.dataset.capitulo === idDoCapitulo;
    atualizarGradeBento(grade, mostrar && ehDoCapitulo, revelacao);
  });
}

/**
 * Mostra ou esconde uma grade bento. Os blocos sobem um depois do outro,
 * já 100% visíveis (sem transparência), como pedido.
 */
function atualizarGradeBento(grade, mostrar, revelacao) {
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
    const atraso = indice * 0.07; // cada bloco entra um pouquinho depois do anterior
    const revelacaoDoBloco = limitarEntreZeroEUm(
      (revelacaoDaGrade - atraso) / Math.max(0.01, 1 - atraso)
    );

    bloco.classList.toggle("is-active", revelacaoDoBloco > 0.5);
    gsap.set(bloco, {
      opacity: revelacaoDoBloco,
      y: converterFaixa(revelacaoDoBloco, 0, 1, 64, 0),
    });
  });
}

/**
 * Troca o título, a foto e os destaques da ficha conforme o capítulo.
 * Só mexe na página quando algo realmente mudou (evita trabalho a cada rolagem).
 */
function atualizarConteudoDaFicha(camadaDeCartoes, regras) {
  const titulo = camadaDeCartoes.querySelector(".glass-stats__name");
  const foto = camadaDeCartoes.querySelector(".glass-stat--thumb img");
  const areaDosDestaques = camadaDeCartoes.querySelector(".glass-stats__destaques");

  if (titulo && regras.titulo && titulo.textContent !== regras.titulo) {
    titulo.textContent = regras.titulo;
  }

  if (foto) {
    const novaFoto = regras.foto || CARTOES.ficha.foto;
    if (foto.getAttribute("src") !== novaFoto) foto.setAttribute("src", novaFoto);
  }

  if (areaDosDestaques && regras.destaques) {
    const chaveDosDestaques = regras.destaques.map((d) => d.valor).join("|");
    if (areaDosDestaques.dataset.atual !== chaveDosDestaques) {
      areaDosDestaques.innerHTML = regras.destaques.map(montarDestaqueDaFicha).join("");
      areaDosDestaques.dataset.atual = chaveDosDestaques;
    }
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

/** Acende o botão do serviço do capítulo atual na barra de serviços. */
function atualizarBarraDeServicos(camadaDeCartoes, servicoAceso) {
  camadaDeCartoes.querySelectorAll(".service-dock__item").forEach((botao, indice) => {
    const aceso = indice === servicoAceso;
    botao.classList.toggle("is-active", aceso);
    if (aceso) botao.setAttribute("aria-current", "true");
    else botao.removeAttribute("aria-current");
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

  atualizarGradesBento(camadaDeCartoes, idDoCapitulo, mostrarBento, revelacao);
  atualizarBarraDeServicos(camadaDeCartoes, regras.servicoAceso);
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

/**
 * Deixa uma seção "presa" na tela por um trecho da rolagem, para a pessoa
 * ter tempo de ver os cards (e passar o mouse neles) antes de seguir.
 *
 * - seletor: qual seção prender (ex.: "#servicos")
 * - distancia: por quanto tempo de rolagem ela fica presa ("+=60%" = 60% da altura da tela)
 *
 * A seção prende quando o fim dela encosta no fim da tela, ou seja, quando
 * ela já está inteira visível (ou, se for maior que a tela, quando os cards
 * do fim dela estão na tela).
 */
export function travarSecaoNaTela(seletor, distancia) {
  const secao = document.querySelector(seletor);
  if (!secao) return;

  ScrollTrigger.create({
    trigger: secao,
    start: "bottom bottom",
    end: distancia,
    pin: true,
  });
}

/**
 * Faz os elementos marcados com data-revelar (no index.html) aparecerem
 * subindo quando chegam na tela: a história, os cards de serviço, a frase
 * entre as cenas e o bloco de orçamento.
 * Elementos dentro do mesmo grupo entram um depois do outro.
 */
export function iniciarRevelacaoDasSecoes() {
  if (reduzirMovimento) return; // sem animação: tudo já aparece normal

  document.querySelectorAll("[data-revelar-grupo]").forEach((grupo) => {
    gsap.from(grupo.querySelectorAll("[data-revelar]"), {
      opacity: 0,
      y: 36,
      duration: 0.9,
      stagger: 0.12, // cada item entra 0,12s depois do anterior
      ease: "power3.out",
      scrollTrigger: { trigger: grupo, start: "top 78%" },
    });
  });
}
