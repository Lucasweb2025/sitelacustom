/*
 * Testes das contas do efeito de rolagem (js/modules/math.js).
 * Para rodar: npm test
 *
 * Cada teste segue 3 passos:
 *   Preparar → os dados de entrada
 *   Agir     → chamar a função
 *   Conferir → ver se o resultado é o esperado
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import {
  limitarEntreZeroEUm,
  converterFaixa,
  calcularEstadoDoCapitulo,
  calcularSegundoDoVideo,
} from "../js/modules/math.js";

// Dois capítulos do mesmo tamanho: o 1º mostra a 1ª metade do vídeo, o 2º a 2ª metade.
const DOIS_CAPITULOS = [
  { peso: 1, inicioDoVideo: 0, fimDoVideo: 0.5 },
  { peso: 1, inicioDoVideo: 0.5, fimDoVideo: 1 },
];

test("limitarEntreZeroEUm prende o valor entre 0 e 1", () => {
  assert.equal(limitarEntreZeroEUm(-0.3), 0);
  assert.equal(limitarEntreZeroEUm(1.7), 1);
  assert.equal(limitarEntreZeroEUm(0.4), 0.4);
});

test("converterFaixa funciona como regra de três", () => {
  assert.equal(converterFaixa(0.5, 0, 1, 0, 100), 50);
  assert.equal(converterFaixa(0.5, 0, 1, 100, 0), 50);
});

test("converterFaixa para nas pontas quando o valor sai da faixa", () => {
  assert.equal(converterFaixa(2, 0, 1, 0, 100), 100);
  assert.equal(converterFaixa(-1, 0, 1, 0, 100), 0);
});

test("converterFaixa não quebra quando a faixa de entrada tem tamanho zero", () => {
  assert.equal(converterFaixa(5, 1, 1, 10, 20), 10);
});

test("no começo da cena: 1º capítulo, vídeo andando, texto escondido", () => {
  const estado = calcularEstadoDoCapitulo(0.1, DOIS_CAPITULOS, 0.5);

  assert.equal(estado.indiceDoCapitulo, 0);
  assert.ok(estado.progressoDoVideo > 0 && estado.progressoDoVideo < 1);
  assert.equal(estado.revelacaoDoTexto, 0);
  assert.equal(estado.emPausa, false);
});

test("no fim do 1º capítulo: vídeo parado e texto inteiro na tela", () => {
  const estado = calcularEstadoDoCapitulo(0.45, DOIS_CAPITULOS, 0.5);

  assert.equal(estado.indiceDoCapitulo, 0);
  assert.equal(estado.progressoDoVideo, 1);
  assert.equal(estado.revelacaoDoTexto, 1);
  assert.equal(estado.emPausa, true);
});

test("depois da metade da cena: 2º capítulo", () => {
  const estado = calcularEstadoDoCapitulo(0.6, DOIS_CAPITULOS, 0.5);
  assert.equal(estado.indiceDoCapitulo, 1);
});

test("no fim exato da cena continua no último capítulo", () => {
  const estado = calcularEstadoDoCapitulo(1, DOIS_CAPITULOS, 0.5);

  assert.equal(estado.indiceDoCapitulo, 1);
  assert.equal(estado.emPausa, true);
});

test("calcularSegundoDoVideo acha o segundo certo dentro do trecho", () => {
  // Vídeo de 10s, trecho de 20% a 60%, metade do trecho → 40% do vídeo → 4s
  const segundo = calcularSegundoDoVideo(10, { inicioDoVideo: 0.2, fimDoVideo: 0.6 }, 0.5);
  assert.ok(Math.abs(segundo - 4) < 1e-9);
});
