const filterTabs = document.querySelectorAll(".filter-tab");
const caseCards = document.querySelectorAll(".case-card");
const copyButtons = document.querySelectorAll(".copy-button");

filterTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const filter = tab.dataset.filter;

    filterTabs.forEach((item) => {
      item.classList.toggle("is-active", item === tab);
    });

    caseCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.getElementById(button.dataset.copyTarget);

    if (!target) {
      return;
    }

    try {
      await navigator.clipboard.writeText(target.textContent.trim());
      const originalText = button.textContent;
      button.textContent = "已复制";

      window.setTimeout(() => {
        button.textContent = originalText;
      }, 1400);
    } catch {
      button.textContent = "请手动复制";
    }
  });
});

window.addEventListener("pointermove", (event) => {
  const x = Math.round((event.clientX / window.innerWidth) * 100);
  const y = Math.round((event.clientY / window.innerHeight) * 100);

  document.body.style.setProperty("--pointer-x", `${x}%`);
  document.body.style.setProperty("--pointer-y", `${y}%`);
});
