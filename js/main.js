gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ limitCallbacks: true });

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isMobile = window.matchMedia("(max-width: 767px)").matches;
const isLiteMode = prefersReducedMotion || isMobile;

const PERF = {
  scrubSmooth: isLiteMode ? 1.2 : 0.6,
  scrubMinDelta: isLiteMode ? 0.12 : 0.05,
  scrubThrottleMs: isLiteMode ? 140 : 60,
};

if (isLiteMode) {
  document.documentElement.classList.add("lite-mode");
}

const lenis =
  isLiteMode || prefersReducedMotion
    ? null
    : new Lenis({
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

if (lenis) {
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

function getVideoSrc(video) {
  const mobile = video.dataset.srcMobile;
  const desktop = video.dataset.srcDesktop;
  return isMobile && mobile ? mobile : desktop;
}

function ensureVideoLoaded(video) {
  if (!video) return Promise.resolve();
  if (video.readyState >= 1 && video.dataset.ready === "true") return Promise.resolve();

  const src = getVideoSrc(video);
  if (!src) return waitForVideo(video);

  if (video.dataset.ready !== "true") {
    video.src = src;
    video.load();
    video.dataset.ready = "true";
  }
  return waitForVideo(video);
}

function waitForVideo(video) {
  return new Promise((resolve) => {
    if (!video) {
      resolve();
      return;
    }
    if (video.readyState >= 1) {
      resolve();
      return;
    }
    video.addEventListener("loadedmetadata", () => resolve(), { once: true });
    video.addEventListener("error", () => resolve(), { once: true });
  });
}

function observeLazyVideos() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        ensureVideoLoaded(entry.target).then(() => ScrollTrigger.refresh());
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "35% 0px" }
  );
  document.querySelectorAll("video[data-lazy]").forEach((v) => observer.observe(v));
}

function clamp01(value) {
  return Math.min(1, Math.max(0, value));
}

function mapRange(value, inMin, inMax, outMin, outMax) {
  if (inMax === inMin) return outMin;
  return outMin + (outMax - outMin) * clamp01((value - inMin) / (inMax - inMin));
}

function buildChapterPanel(chapter, index) {
  const panel = document.createElement("article");
  panel.className = "chapter-panel";
  panel.dataset.chapterId = chapter.id;

  const titleLines = chapter.title
    .map((line, lineIndex) => {
      const accent =
        lineIndex === chapter.titleAccent ? " chapter-panel__title-line--accent" : "";
      return `<span class="chapter-panel__title-line${accent}">${line}</span>`;
    })
    .join("");

  panel.innerHTML = `
    <span class="chapter-panel__num">${String(index + 1).padStart(2, "0")}</span>
    <p class="chapter-panel__eyebrow">${chapter.eyebrow}</p>
    <h2 class="chapter-panel__title">${titleLines}</h2>
    <p class="chapter-panel__text">${chapter.text}</p>
  `;
  return panel;
}

function renderChapterPanels(sceneKey, sceneConfig) {
  const section = document.querySelector(sceneConfig.selector);
  if (!section) return [];

  let container = section.querySelector(".chapter-panels");
  if (!container) {
    container = document.createElement("div");
    container.className = "chapter-panels";
    const sticky = section.querySelector(".scene__sticky");
    const overlay = sticky.querySelector(".scene__overlay");
    sticky.insertBefore(container, overlay ? overlay.nextSibling : null);
  }

  container.innerHTML = "";
  const panels = sceneConfig.chapters.map((chapter, index) => {
    const panel = buildChapterPanel(chapter, index);
    container.appendChild(panel);
    return panel;
  });

  return panels;
}

function getChapterState(globalProgress, chapters, movePhase) {
  const totalWeight = chapters.reduce((sum, chapter) => sum + chapter.weight, 0);
  let accumulated = 0;

  for (let index = 0; index < chapters.length; index++) {
    const chapter = chapters[index];
    const chapterSize = chapter.weight / totalWeight;
    const chapterStart = accumulated;
    const chapterEnd = accumulated + chapterSize;

    if (globalProgress >= chapterStart && (globalProgress < chapterEnd || index === chapters.length - 1)) {
      const localProgress = clamp01((globalProgress - chapterStart) / chapterSize);
      const videoProgress =
        localProgress < movePhase ? localProgress / movePhase : 1;
      const panelReveal = mapRange(localProgress, movePhase * 0.55, movePhase * 0.95, 0, 1);

      return {
        chapterIndex: index,
        videoProgress,
        panelReveal,
        isHolding: localProgress >= movePhase,
      };
    }

    accumulated = chapterEnd;
  }

  const lastIndex = chapters.length - 1;
  return {
    chapterIndex: lastIndex,
    videoProgress: 1,
    panelReveal: 1,
    isHolding: true,
  };
}

function animatePanelLetters(panel, reveal) {
  if (!panel) return;

  const lines = panel.querySelectorAll(".chapter-panel__title-line");
  const eyebrow = panel.querySelector(".chapter-panel__eyebrow");
  const text = panel.querySelector(".chapter-panel__text");
  const num = panel.querySelector(".chapter-panel__num");

  const show = reveal > 0.08;
  panel.classList.toggle("is-active", show);

  if (prefersReducedMotion) {
    gsap.set([num, eyebrow, ...lines, text], { opacity: show ? 1 : 0, y: 0 });
    return;
  }

  gsap.set(num, { opacity: reveal, y: mapRange(reveal, 0, 1, 12, 0) });
  gsap.set(eyebrow, { opacity: reveal, y: mapRange(reveal, 0, 1, 20, 0) });

  lines.forEach((line, lineIndex) => {
    const delay = lineIndex * 0.12;
    const lineReveal = clamp01((reveal - delay) / (1 - delay));
    gsap.set(line, {
      opacity: lineReveal,
      y: mapRange(lineReveal, 0, 1, 36, 0),
    });
  });

  gsap.set(text, {
    opacity: mapRange(reveal, 0.35, 1, 0, 1),
    y: mapRange(reveal, 0.35, 1, 18, 0),
  });
}

function createBlendUpdater(section) {
  const video = section.querySelector(".scene__video");
  const exitBlend = section.querySelector(".scene__blend--exit");
  const enterBlend = section.querySelector(".scene__blend--enter");

  return (progress) => {
    if (enterBlend) {
      gsap.set(enterBlend, { opacity: mapRange(progress, 0.02, 0.2, 1, 0) });
    }
    if (exitBlend) {
      gsap.set(exitBlend, { opacity: mapRange(progress, 0.68, 0.92, 0, 1) });
    }
    if (video && !isLiteMode) {
      const fadeOut = mapRange(progress, 0.78, 0.98, 1, 0.82);
      const fadeIn = enterBlend ? mapRange(progress, 0.02, 0.22, 0.82, 1) : 1;
      gsap.set(video, { opacity: Math.min(fadeOut, fadeIn) });
    }
  };
}

function buildBentoCell(cell, index) {
  if (cell.type === "text") {
    return `
      <article class="bento-cell bento-cell--text bento-cell--${cell.variant}" data-bento-index="${index}">
        <h3 class="bento-cell__title">${cell.title}</h3>
        <p class="bento-cell__text">${cell.text}</p>
      </article>`;
  }

  return `
    <article class="bento-cell bento-cell--image" data-bento-index="${index}">
      <img src="${cell.image}" alt="${cell.alt || ""}" loading="lazy" />
    </article>`;
}

function renderSceneCards(section, sceneKey) {
  const sticky = section.querySelector(".scene__sticky");
  if (!sticky || sticky.querySelector(".scene-cards")) return;

  const bentoMarkup =
    sceneKey === "boxes"
      ? `<div class="bento-grid" aria-hidden="true">
      ${CARDS.bentoGrid.map((cell, i) => buildBentoCell(cell, i)).join("")}
    </div>`
      : "";

  const wrapper = document.createElement("div");
  wrapper.className = "scene-cards";
  wrapper.innerHTML = `
    <div class="service-dock" aria-hidden="true">
      ${CARDS.serviceDock
        .map(
          (item, i) =>
            `<span class="service-dock__item" data-dock-index="${i}">${item.label}</span>`
        )
        .join("")}
    </div>
    <div class="glass-stats" aria-hidden="true">
      <div class="glass-stats__label">
        <span class="glass-stats__mark">A</span>
        <span class="glass-stats__name">${CARDS.stats.vehicleLabel}</span>
      </div>
      <div class="glass-stats__grid">
        <div class="glass-stat glass-stat--thumb">
          <img src="${CARDS.stats.thumb}" alt="" loading="lazy" />
        </div>
        ${CARDS.stats.items
          .map(
            (item) => `
          <div class="glass-stat">
            <strong class="glass-stat__value">${item.value}</strong>
            <span class="glass-stat__label">${item.label}</span>
          </div>`
          )
          .join("")}
      </div>
    </div>
    ${bentoMarkup}
  `;

  sticky.appendChild(wrapper);
}

function updateBentoGrid(root, show, reveal, activeRow) {
  const grid = root.querySelector(".bento-grid");
  if (!grid) return;

  const cells = [...grid.querySelectorAll(".bento-cell")];
  const gridReveal = show ? mapRange(reveal, 0.25, 1, 0, 1) : 0;

  const yPercent = isMobile ? 0 : -50;

  if (!show || gridReveal <= 0.02) {
    grid.classList.remove("is-visible");
    gsap.set(grid, { opacity: 0, yPercent, y: 120 });
    cells.forEach((cell) => {
      cell.classList.remove("is-active");
      gsap.set(cell, { opacity: 0, y: 72 });
    });
    return;
  }

  grid.classList.add("is-visible");
  gsap.set(grid, {
    opacity: gridReveal,
    yPercent,
    y: mapRange(gridReveal, 0, 1, 110, 0),
  });

  cells.forEach((cell, index) => {
    const row = Math.floor(index / 2);
    const stagger = index * 0.07;
    const cellReveal = clamp01((gridReveal - stagger) / Math.max(0.01, 1 - stagger));
    const isActive = activeRow === undefined || row === activeRow;

    cell.classList.toggle("is-active", isActive && cellReveal > 0.5);

    gsap.set(cell, {
      opacity: cellReveal * (isActive ? 1 : 0.55),
      y: mapRange(cellReveal, 0, 1, 64, 0),
    });
  });
}

function updateSceneCards(section, chapterId, reveal) {
  const root = section.querySelector(".scene-cards");
  if (!root) return;

  const config = CARDS.byChapter[chapterId] || {};
  const stats = root.querySelector(".glass-stats");
  const dockItems = [...root.querySelectorAll(".service-dock__item")];
  const statsName = root.querySelector(".glass-stats__name");
  const statsThumb = root.querySelector(".glass-stat--thumb img");

  const showStats = Boolean(config.stats) && !config.showBento;
  const showBento = Boolean(config.showBento);
  const cardReveal = mapRange(reveal, 0.45, 1, 0, 1);

  if (statsName && config.vehicleLabel) {
    statsName.textContent = config.vehicleLabel;
  }

  if (statsThumb) {
    const thumbSrc = config.thumb || CARDS.stats.thumb;
    if (statsThumb.getAttribute("src") !== thumbSrc) {
      statsThumb.setAttribute("src", thumbSrc);
    }
  }

  if (stats) {
    const prominent = Boolean(config.statsProminent);
    const centerY = prominent && !isMobile;
    stats.classList.toggle("is-visible", showStats && cardReveal > 0.1);
    stats.classList.toggle("glass-stats--prominent", prominent && showStats);
    gsap.set(stats, {
      opacity: showStats ? cardReveal : 0,
      yPercent: centerY ? -50 : 0,
      y: showStats ? mapRange(cardReveal, 0, 1, prominent ? 80 : 28, 0) : prominent ? 80 : 28,
      scale: showStats ? mapRange(cardReveal, 0, 1, prominent ? 0.9 : 0.96, 1) : prominent ? 0.9 : 0.96,
    });
  }

  updateBentoGrid(root, showBento, reveal, config.bentoRow);

  dockItems.forEach((item, index) => {
    item.classList.toggle("is-active", index === config.dockIndex);
    gsap.set(item, {
      opacity: mapRange(reveal, 0.2, 0.8, 0.4, 1),
    });
  });
}

function initChapterScene(sceneKey, sceneConfig) {
  const section = document.querySelector(sceneConfig.selector);
  const video = document.getElementById(sceneConfig.videoId);
  renderSceneCards(section, sceneKey);
  const panels = renderChapterPanels(sceneKey, sceneConfig);
  const updateBlends = createBlendUpdater(section);
  const scrollEnd = isMobile ? sceneConfig.scrollEnd.mobile : sceneConfig.scrollEnd.desktop;

  let duration = 1;
  let lastScrubAt = 0;
  let pendingTime = null;
  let rafId = null;
  let lastChapterIndex = -1;

  const applyScrubTime = () => {
    rafId = null;
    if (pendingTime === null) return;
    if (Math.abs(video.currentTime - pendingTime) > PERF.scrubMinDelta) {
      video.currentTime = pendingTime;
    }
    pendingTime = null;
  };

  const scheduleScrub = (targetTime) => {
    pendingTime = targetTime;
    if (rafId !== null) return;
    rafId = requestAnimationFrame(applyScrubTime);
  };

  return ensureVideoLoaded(video).then(() => {
    duration = video.duration || 1;
    video.pause();
    video.currentTime = 0;

    if (panels[0]) animatePanelLetters(panels[0], 0);

    return ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: scrollEnd,
      pin: true,
      scrub: prefersReducedMotion ? false : PERF.scrubSmooth,
      anticipatePin: 1,
      onEnter: () => ensureVideoLoaded(video),
      onUpdate: (self) => {
        const progress = self.progress;
        updateBlends(progress);

        const state = getChapterState(
          progress,
          sceneConfig.chapters,
          sceneConfig.movePhase
        );
        const chapter = sceneConfig.chapters[state.chapterIndex];
        const targetTime =
          duration *
          (chapter.videoStart +
            state.videoProgress * (chapter.videoEnd - chapter.videoStart));

        const now = performance.now();
        if (now - lastScrubAt >= PERF.scrubThrottleMs) {
          lastScrubAt = now;
          scheduleScrub(targetTime);
        } else {
          scheduleScrub(targetTime);
        }

        if (state.chapterIndex !== lastChapterIndex) {
          panels.forEach((panel, index) => {
            if (index !== state.chapterIndex) {
              panel.classList.remove("is-active");
            }
          });
          lastChapterIndex = state.chapterIndex;
        }

        animatePanelLetters(panels[state.chapterIndex], state.panelReveal);
        updateSceneCards(section, chapter.id, state.panelReveal);
      },
      onLeave: () => video.pause(),
      onEnterBack: () => ensureVideoLoaded(video),
    });
  });
}

function initHeaderMenu() {
  const menuBtn = document.querySelector(".header__menu");
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = [...document.querySelectorAll(".header__nav-link, .mobile-menu__link")];
  const sections = ["inicio", "servicos", "sobre", "contato"];

  if (!menuBtn || !mobileMenu) return;

  const closeMenu = () => {
    menuBtn.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("is-open");
    mobileMenu.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  menuBtn.addEventListener("click", () => {
    const isOpen = menuBtn.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    mobileMenu.classList.toggle("is-open", isOpen);
    mobileMenu.setAttribute("aria-hidden", String(!isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => closeMenu());
  });

  sections.forEach((id) => {
    const section = document.getElementById(id);
    if (!section) return;

    ScrollTrigger.create({
      trigger: section,
      start: "top 40%",
      end: "bottom 60%",
      onToggle: (self) => {
        if (!self.isActive) return;
        navLinks.forEach((link) => {
          const href = link.getAttribute("href");
          link.classList.toggle("is-active", href === `#${id}`);
        });
      },
    });
  });
}

function initCtaReveal() {
  const section = document.querySelector(".cta-section");
  gsap.from(section.querySelectorAll(".cta-section__inner > *"), {
    opacity: 0,
    y: 28,
    duration: 0.9,
    stagger: 0.12,
    ease: "power3.out",
    scrollTrigger: { trigger: section, start: "top 78%" },
  });
}

async function init() {
  try {
    initHeaderMenu();
    observeLazyVideos();
    await ensureVideoLoaded(document.getElementById("video-entrada"));

    const hint = document.querySelector(".scene__hint");
    if (hint) {
      ScrollTrigger.create({
        trigger: ".scene--entrance",
        start: "top top",
        end: "+=12%",
        scrub: true,
        onUpdate: (self) => gsap.set(hint, { opacity: 1 - self.progress }),
      });
    }

    await initChapterScene("entrance", SCENES.entrance);
    await Promise.all([
      initChapterScene("boxes", SCENES.boxes),
      initChapterScene("wash", SCENES.wash),
    ]);
    initCtaReveal();
    ScrollTrigger.refresh();
  } catch (error) {
    console.error("Erro ao iniciar animações:", error);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
