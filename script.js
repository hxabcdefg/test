const modeTabs = document.querySelectorAll(".mode-tab");
const modePanels = document.querySelectorAll(".mode-panel");
const counters = document.querySelectorAll("[data-count]");

modeTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const targetMode = tab.dataset.mode;

    modeTabs.forEach((item) => {
      const isCurrent = item === tab;
      item.classList.toggle("is-active", isCurrent);
      item.setAttribute("aria-selected", String(isCurrent));
    });

    modePanels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.panel === targetMode);
    });
  });
});

window.addEventListener("pointermove", (event) => {
  const x = Math.round((event.clientX / window.innerWidth) * 100);
  const y = Math.round((event.clientY / window.innerHeight) * 100);

  document.body.style.setProperty("--pointer-x", `${x}%`);
  document.body.style.setProperty("--pointer-y", `${y}%`);
});

const animateCounter = (counter) => {
  const target = Number(counter.dataset.count);
  const duration = 1200;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);

    counter.textContent = Math.round(target * eased);

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || entry.target.dataset.animated) {
        return;
      }

      entry.target.dataset.animated = "true";
      animateCounter(entry.target);
    });
  },
  { threshold: 0.55 },
);

counters.forEach((counter) => observer.observe(counter));
