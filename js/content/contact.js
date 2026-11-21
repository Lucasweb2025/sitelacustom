/*
 * ============================================================
 *  CONTATO DA L.A CUSTOM
 * ============================================================
 *  Usado pelo botão "Pedir orçamento" do visor de foto.
 *  (Os botões fixos do site, no index.html, têm o mesmo número.)
 *
 *  whatsapp: só números, com 55 (Brasil) + DDD + número.
 * ============================================================
 */

export const CONTATO = {
  whatsapp: "5511996741058",
};

/**
 * Monta o link do WhatsApp já com uma mensagem escrita.
 * Ex.: linkDoWhatsApp("Quero um orçamento de PPF")
 */
export function linkDoWhatsApp(mensagem) {
  return `https://wa.me/${CONTATO.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}
