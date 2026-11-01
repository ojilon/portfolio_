const filterRoot = document.querySelector<HTMLElement>("[data-notes-filter]");
if (filterRoot) {
  const cards = [...filterRoot.querySelectorAll<HTMLElement>("[data-note-card]")];
  const buttons = [...filterRoot.querySelectorAll<HTMLButtonElement>("[data-subject-pill]")];
  const topicSelect = filterRoot.querySelector<HTMLSelectElement>("[data-topic-select]");
  const emptyMessage = filterRoot.querySelector<HTMLElement>("[data-filter-empty]");

  function applyFilters() {
    const subject = buttons.find((button) => button.getAttribute("aria-pressed") === "true")?.dataset.subject ?? "All subjects";
    const topic = topicSelect?.value ?? "";
    let visibleCount = 0;
    cards.forEach((card) => {
      const subjectMatches = subject === "All subjects" || card.dataset.subject === subject;
      const topicMatches = !topic || card.dataset.topic === topic;
      const visible = subjectMatches && topicMatches;
      card.hidden = !visible;
      card.setAttribute("aria-hidden", String(!visible));
      if (visible) visibleCount += 1;
    });
    if (emptyMessage) emptyMessage.hidden = visibleCount > 0;
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((candidate) => {
        const active = candidate === button;
        candidate.setAttribute("aria-pressed", String(active));
        candidate.classList.toggle("active", active);
      });
      applyFilters();
    });
  });
  topicSelect?.addEventListener("change", applyFilters);
}
