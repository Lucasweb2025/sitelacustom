/*
 * ============================================================
 *  MENU DO TOPO
 * ============================================================
 *  - Abre e fecha o menu de celular (botão de duas barrinhas).
 *  - Acende no menu o link da parte do site que está na tela.
 * ============================================================
 */

// ids das seções do index.html que têm link no menu
const SECOES_DO_MENU = ["inicio", "servicos", "sobre", "contato"];

export function iniciarMenuDoTopo() {
  const botaoDoMenu = document.querySelector(".header__menu");
  const menuDeCelular = document.getElementById("mobile-menu");
  const links = [...document.querySelectorAll(".header__nav-link, .mobile-menu__link")];

  if (!botaoDoMenu || !menuDeCelular) return;

  function abrirOuFecharMenu(abrir) {
    botaoDoMenu.classList.toggle("is-open", abrir);
    botaoDoMenu.setAttribute("aria-expanded", String(abrir));
    menuDeCelular.classList.toggle("is-open", abrir);
    menuDeCelular.setAttribute("aria-hidden", String(!abrir));
    // Com o menu aberto, a página de trás não rola
    document.body.style.overflow = abrir ? "hidden" : "";
  }

  botaoDoMenu.addEventListener("click", () => {
    const estaAberto = botaoDoMenu.classList.contains("is-open");
    abrirOuFecharMenu(!estaAberto);
  });

  // Clicou num link: fecha o menu
  links.forEach((link) => link.addEventListener("click", () => abrirOuFecharMenu(false)));

  // Acende o link da seção que está no meio da tela
  SECOES_DO_MENU.forEach((idDaSecao) => {
    const secao = document.getElementById(idDaSecao);
    if (!secao) return;

    ScrollTrigger.create({
      trigger: secao,
      start: "top 40%",
      end: "bottom 60%",
      onToggle: (rolagem) => {
        if (!rolagem.isActive) return;
        links.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${idDaSecao}`);
        });
      },
    });
  });
}
