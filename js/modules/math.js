/*
 * ============================================================
 *  CONTAS DO EFEITO DE ROLAGEM
 * ============================================================
 *  Aqui ficam só contas, sem mexer na página. Por isso dá para
 *  testar cada função sozinha (entra um número, sai outro).
 *
 *  Uma ideia que aparece em todo o site é o "progresso": um número
 *  de 0 a 1 que diz quanto de algo já aconteceu.
 *  0 = nada, 0,5 = metade, 1 = tudo.
 * ============================================================
 */

/**
 * Prende um número entre 0 e 1.
 * Ex.: -0,3 vira 0; 1,7 vira 1; 0,4 continua 0,4.
 */
export function limitarEntreZeroEUm(valor) {
  return Math.min(1, Math.max(0, valor));
}

/**
 * Converte um número de uma faixa para outra, como uma regra de três.
 * Ex.: converterFaixa(0.5, 0, 1, 0, 100) → 50
 *      (metade do caminho de 0 a 1 é metade do caminho de 0 a 100).
 * Valores fora da faixa de entrada param na ponta mais próxima.
 */
export function converterFaixa(valor, entradaMinima, entradaMaxima, saidaMinima, saidaMaxima) {
  if (entradaMaxima === entradaMinima) return saidaMinima;
  const proporcao = limitarEntreZeroEUm((valor - entradaMinima) / (entradaMaxima - entradaMinima));
  return saidaMinima + (saidaMaxima - saidaMinima) * proporcao;
}

/**
 * Descobre em que capítulo da cena a pessoa está e o que mostrar nele.
 *
 * Recebe:
 * - progressoDaCena: quanto da cena já foi rolado (0 a 1)
 * - capitulos: a lista de capítulos da cena (js/content/scenes.js)
 * - faseDoVideo: que parte de cada capítulo é para o vídeo andar
 *
 * Devolve:
 * - indiceDoCapitulo: qual capítulo está na tela (0 = primeiro)
 * - progressoDoVideo: quanto do trecho de vídeo desse capítulo já passou (0 a 1)
 * - revelacaoDoTexto: quanto do texto já apareceu (0 = escondido, 1 = inteiro)
 * - emPausa: true quando o vídeo já parou e é a vez do texto
 */
export function calcularEstadoDoCapitulo(progressoDaCena, capitulos, faseDaCena) {
  const pesoTotal = capitulos.reduce((soma, capitulo) => soma + capitulo.peso, 0);
  let inicioDoCapitulo = 0;

  for (let indice = 0; indice < capitulos.length; indice++) {
    // Um capítulo pode ter a sua própria fase (ex.: o hero, com pausa mais curta)
    const faseDoVideo = capitulos[indice].faseDoVideo ?? faseDaCena;
    const tamanhoDoCapitulo = capitulos[indice].peso / pesoTotal;
    const fimDoCapitulo = inicioDoCapitulo + tamanhoDoCapitulo;
    const ehUltimo = indice === capitulos.length - 1;

    if (progressoDaCena >= inicioDoCapitulo && (progressoDaCena < fimDoCapitulo || ehUltimo)) {
      // Quanto deste capítulo já foi rolado (0 a 1)
      const progressoNoCapitulo = limitarEntreZeroEUm(
        (progressoDaCena - inicioDoCapitulo) / tamanhoDoCapitulo
      );

      return {
        indiceDoCapitulo: indice,
        // Na primeira parte do capítulo o vídeo anda; depois fica parado no fim do trecho.
        progressoDoVideo:
          progressoNoCapitulo < faseDoVideo ? progressoNoCapitulo / faseDoVideo : 1,
        // O texto começa a surgir um pouco antes de o vídeo parar.
        revelacaoDoTexto: converterFaixa(
          progressoNoCapitulo,
          faseDoVideo * 0.55,
          faseDoVideo * 0.95,
          0,
          1
        ),
        emPausa: progressoNoCapitulo >= faseDoVideo,
      };
    }

    inicioDoCapitulo = fimDoCapitulo;
  }

  // Segurança: se nada bateu, mostra o último capítulo completo.
  return {
    indiceDoCapitulo: capitulos.length - 1,
    progressoDoVideo: 1,
    revelacaoDoTexto: 1,
    emPausa: true,
  };
}

/**
 * Diz em que ponto da cena (0 a 1) um capítulo está com o texto e os
 * cartões totalmente na tela: o meio da pausa daquele capítulo.
 * Usado pelos botões da barra de serviços, para levar a pessoa direto lá.
 * Ex.: 2 capítulos iguais, fase 0,5 → o 1º fica pronto em 0,375 (metade
 * da pausa dele, que vai de 0,25 a 0,5).
 */
export function calcularProgressoParaVerCapitulo(capitulos, indiceDoCapitulo, faseDaCena) {
  const pesoTotal = capitulos.reduce((soma, capitulo) => soma + capitulo.peso, 0);
  const inicio = capitulos
    .slice(0, indiceDoCapitulo)
    .reduce((soma, capitulo) => soma + capitulo.peso / pesoTotal, 0);
  const capitulo = capitulos[indiceDoCapitulo];
  const tamanho = capitulo.peso / pesoTotal;
  const faseDoVideo = capitulo.faseDoVideo ?? faseDaCena;

  // meio da pausa: depois do vídeo andar, metade do tempo de pausa
  return inicio + tamanho * (faseDoVideo + (1 - faseDoVideo) / 2);
}

/**
 * Calcula em que segundo do vídeo ele deve estar.
 * Ex.: vídeo de 10s, capítulo que vai de 0,2 a 0,6 do vídeo,
 *      progresso 0,5 → metade do trecho → segundo 4.
 */
export function calcularSegundoDoVideo(duracaoEmSegundos, capitulo, progressoDoVideo) {
  const trecho = capitulo.fimDoVideo - capitulo.inicioDoVideo;
  return duracaoEmSegundos * (capitulo.inicioDoVideo + progressoDoVideo * trecho);
}
