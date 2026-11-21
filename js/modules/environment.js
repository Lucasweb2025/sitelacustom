/*
 * ============================================================
 *  INFORMAÇÕES SOBRE O APARELHO DE QUEM ESTÁ VISITANDO
 * ============================================================
 */

// A pessoa pediu ao sistema (Windows, Mac, celular) para reduzir animações?
// Isso é uma opção de acessibilidade (para quem sente enjoo com movimento).
// Se estiver ligada, o site mostra tudo sem animação.
export const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// A tela tem pelo menos 1024px de largura (computador)?
// Por enquanto, a experiência completa é só para computador;
// em telas menores aparece um aviso (veja css/desktop-only.css).
export const ehComputador = window.matchMedia("(min-width: 1024px)").matches;
