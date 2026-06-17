const modeTabs = document.querySelectorAll(".mode-tab");
const modePanels = document.querySelectorAll(".mode-panel");
const counters = document.querySelectorAll("[data-count]");
const scenarioFilters = document.querySelectorAll(".scenario-filter");
const scenarioCards = document.querySelectorAll(".scenario-card");
const copyButtons = document.querySelectorAll("[data-copy]");

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

scenarioFilters.forEach((filterButton) => {
  filterButton.addEventListener("click", () => {
    const filter = filterButton.dataset.filter;

    scenarioFilters.forEach((item) => {
      item.classList.toggle("is-active", item === filterButton);
    });

    scenarioCards.forEach((card) => {
      const categories = card.dataset.category.split(" ");
      const isVisible = filter === "all" || categories.includes(filter);
      card.classList.toggle("is-hidden", !isVisible);
    });
  });
});

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const originalText = button.textContent;

    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      button.textContent = "已复制";
    } catch (error) {
      button.textContent = "请手动复制";
    }

    window.setTimeout(() => {
      button.textContent = originalText;
    }, 1400);
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

if ("IntersectionObserver" in window) {
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
} else {
  counters.forEach((counter) => {
    counter.textContent = counter.dataset.count;
  });
}
