/*
 * ============================================================
 *  VISOR DE FOTO (abre a foto grande ao clicar)
 * ============================================================
 *  Funciona em três lugares:
 *  - cards de serviço (seção "Serviços"): mostra a foto, o nome e o
 *    texto do serviço, com o botão "Pedir orçamento de ..." no WhatsApp;
 *  - fotos do carrossel "Projetos recentes": mostra a foto em tamanho
 *    grande, o nome do carro e o botão "Quero um projeto assim";
 *  - foto da equipe, na "Nossa história".
 *
 *  O visor é a tag <dialog id="visor-de-foto"> do index.html. Ela já
 *  cuida sozinha de: fechar com Esc, prender o foco do teclado dentro
 *  do visor e escurecer o fundo.
 * ============================================================
 */

import { linkDoWhatsApp } from "../content/contact.js";

// O que pode ser clicado para abrir o visor
// (as cópias do carrossel, que só existem para o loop, também abrem com o mouse)
const ITENS_CLICAVEIS = ".cartao-servico, .galeria__foto, .historia__foto";

/**
 * Lê, de cada tipo de item, o que o visor deve mostrar.
 * Devolve { foto, descricao, sobretitulo, titulo, texto, acao? }.
 */
function lerConteudo(item) {
  const imagem = item.querySelector("img");

  if (item.classList.contains("cartao-servico")) {
    const titulo = item.querySelector(".cartao-servico__titulo").textContent.trim();
    return {
      foto: imagem.getAttribute("src"),
      descricao: imagem.alt,
      sobretitulo: `Serviço ${item.querySelector(".cartao-servico__numero").textContent.trim()}`,
      titulo,
      texto: item.querySelector(".cartao-servico__detalhe").textContent.trim(),
      acao: {
        rotulo: `Pedir orçamento de ${titulo}`,
        link: linkDoWhatsApp(`Olá! Vim pelo site e quero um orçamento de ${titulo}.`),
      },
    };
  }

  if (item.classList.contains("galeria__foto")) {
    const carro = item.querySelector(".galeria__legenda strong").textContent.trim();
    return {
      foto: item.dataset.fotoGrande || imagem.getAttribute("src"),
      descricao: imagem.alt,
      sobretitulo: "Projeto L.A Custom",
      titulo: carro,
      texto: item.querySelector(".galeria__legenda span").textContent.trim(),
      acao: {
        rotulo: "Quero um projeto assim",
        link: linkDoWhatsApp(`Olá! Vi o projeto "${carro}" no site e quero um orçamento.`),
      },
    };
  }

  // Foto da equipe (Nossa história)
  return {
    foto: imagem.getAttribute("src"),
    descricao: imagem.alt,
    sobretitulo: "Nossa história",
    titulo: item.querySelector("figcaption strong").textContent.trim(),
    texto: item.querySelector("figcaption").lastChild.textContent.trim(),
  };
}

/** Preenche o visor com o conteúdo e abre. */
function abrirVisor(visor, conteudo) {
  const foto = visor.querySelector(".visor__foto");
  foto.src = conteudo.foto;
  foto.alt = conteudo.descricao;

  // textContent: o texto entra como texto puro (nunca como código)
  visor.querySelector(".visor__sobretitulo").textContent = conteudo.sobretitulo;
  visor.querySelector(".visor__titulo").textContent = conteudo.titulo;
  visor.querySelector(".visor__texto").textContent = conteudo.texto;

  const botao = visor.querySelector(".visor__acao");
  botao.hidden = !conteudo.acao;
  if (conteudo.acao) {
    botao.textContent = conteudo.acao.rotulo;
    botao.href = conteudo.acao.link;
  }

  visor.showModal();
  window.lenis?.stop(); // a página de trás não rola enquanto o visor está aberto
}

/** Liga o visor: cliques e teclado (Enter/Espaço) nos itens, e o fechamento. */
export function iniciarVisorDeFoto() {
  const visor = document.getElementById("visor-de-foto");
  if (!visor) return;

  function abrirPeloItem(item) {
    abrirVisor(visor, lerConteudo(item));
  }

  document.addEventListener("click", (evento) => {
    const item = evento.target.closest(ITENS_CLICAVEIS);
    if (item) abrirPeloItem(item);
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key !== "Enter" && evento.key !== " ") return;
    const item = evento.target.closest?.(ITENS_CLICAVEIS);
    if (!item) return;
    evento.preventDefault();
    abrirPeloItem(item);
  });

  // Fechar: no X ou clicando no fundo escuro (fora da foto)
  visor.querySelector(".visor__fechar").addEventListener("click", () => visor.close());
  visor.addEventListener("click", (evento) => {
    if (evento.target === visor) visor.close();
  });

  // Fechou (por qualquer caminho, inclusive Esc): a página volta a rolar
  visor.addEventListener("close", () => window.lenis?.start());
}
