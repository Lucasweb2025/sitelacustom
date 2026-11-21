/*
 * ============================================================
 *  CARREGAMENTO E CONTROLE DOS VÍDEOS
 * ============================================================
 *  Regras para o site ficar leve:
 *  1. Nenhum vídeo é baixado no celular (o site ainda é só para
 *     computador).
 *  2. O vídeo da entrada começa a baixar assim que a página abre
 *     (isso é feito direto no index.html).
 *  3. Os outros vídeos só são baixados quando a pessoa está
 *     chegando perto da cena deles.
 *  4. Cada vídeo é baixado uma vez só. Ao sair da cena, ele é só
 *     pausado; se a pessoa voltar, ele já está pronto.
 *
 *  O endereço de cada vídeo fica no index.html, no atributo
 *  data-src-desktop da tag <video>.
 * ============================================================
 */

/**
 * Espera o navegador saber a duração do vídeo.
 * Se der erro no download, segue em frente assim mesmo
 * (o site não pode travar por causa de um vídeo).
 */
function aguardarInformacoesDoVideo(video) {
  return new Promise((concluir) => {
    if (video.readyState >= 1) {
      concluir();
      return;
    }
    video.addEventListener("loadedmetadata", concluir, { once: true });
    video.addEventListener("error", concluir, { once: true });
  });
}

/**
 * Começa a baixar o vídeo, se ele ainda não estiver baixando.
 * Devolve uma "promessa" que termina quando a duração do vídeo é conhecida.
 */
export function carregarVideo(video) {
  const jaTemEndereco = Boolean(video.getAttribute("src"));
  const enderecoDoVideo = video.dataset.srcDesktop;

  if (!jaTemEndereco && enderecoDoVideo) {
    video.preload = "auto"; // baixa o vídeo inteiro, para a rolagem não esperar
    video.src = enderecoDoVideo;
  }
  return aguardarInformacoesDoVideo(video);
}

/**
 * Garante que o vídeo está carregado e devolve a duração dele em segundos.
 */
export async function prepararVideo(video) {
  await carregarVideo(video);
  return video.duration || 1;
}

/**
 * Fica de olho nos vídeos marcados com data-lazy no index.html e
 * começa a baixar cada um quando a pessoa está a 1,5 tela de distância.
 */
export function baixarVideosAoSeAproximar() {
  const observador = new IntersectionObserver(
    (avisos) => {
      avisos.forEach((aviso) => {
        if (!aviso.isIntersecting) return;
        carregarVideo(aviso.target);
        observador.unobserve(aviso.target); // já começou a baixar; não precisa mais vigiar
      });
    },
    { rootMargin: "150% 0px" }
  );

  document.querySelectorAll("video[data-lazy]").forEach((video) => observador.observe(video));
}

/**
 * Cria o "controle de busca" de um vídeo: a peça que leva o vídeo
 * até o segundo certo enquanto a pessoa rola.
 *
 * Por que isso precisa de cuidado: pedir ao vídeo para pular para
 * outro segundo ("buscar") leva alguns milissegundos. Se a rolagem
 * pedir um pulo novo antes de o anterior terminar, os pedidos se
 * acumulam e o vídeo trava. Então:
 * - os pedidos são agrupados, no máximo um por quadro da tela;
 * - enquanto um pulo não termina, só o pedido mais recente é guardado;
 * - mudanças menores que meio quadro do vídeo são ignoradas.
 *
 * Recebe:
 * - video: a tag <video>
 * - cenaEstaAtiva: função que diz se a cena está na tela agora
 * - diferencaMinima: menor mudança (em segundos) que vale um pulo
 */
export function criarControleDeBusca(video, cenaEstaAtiva, diferencaMinima) {
  let segundoPedido = null; // último segundo pedido pela rolagem e ainda não aplicado
  let quadroAgendado = null; // pedido já marcado para o próximo quadro da tela

  function aplicarPedido() {
    quadroAgendado = null;
    if (segundoPedido === null || !cenaEstaAtiva()) return;
    if (video.seeking) return; // o pulo anterior ainda não terminou; tenta de novo no "seeked"

    if (Math.abs(video.currentTime - segundoPedido) > diferencaMinima) {
      video.currentTime = segundoPedido;
    }
    segundoPedido = null;
  }

  function agendarAplicacao() {
    if (quadroAgendado !== null) return;
    quadroAgendado = requestAnimationFrame(aplicarPedido);
  }

  // Quando um pulo termina, aplica o pedido que ficou esperando (se houver).
  video.addEventListener("seeked", () => {
    if (segundoPedido !== null) agendarAplicacao();
  });

  return {
    irPara(segundo) {
      segundoPedido = segundo;
      agendarAplicacao();
    },
  };
}
