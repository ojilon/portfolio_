(function () {
  const SUBJECTS = ["All subjects", "Biology", "Chemistry"];
  const CONTAINER = document.querySelector('[data-notes-filter]');
  if (!CONTAINER) return;

  const cards = Array.from(CONTAINER.querySelectorAll('[data-note-card]'));
  const subjectPills = Array.from(CONTAINER.querySelectorAll('[data-subject-pill]'));
  const topicSelect = CONTAINER.querySelector('[data-topic-select]');

  // Build topic list from cards' data-topic attributes
  const topics = [...new Set(cards.map((c) => c.dataset.topic).filter(Boolean))].sort();
  if (topicSelect) {
    topics.forEach((t) => {
      const o = document.createElement("option");
      o.value = t;
      o.textContent = t;
      topicSelect.appendChild(o);
    });
  }

  function matchesSubject(card, subject) {
    if (subject === "All subjects") return true;
    return card.dataset.subject === subject;
  }
  function matchesTopic(card, topic) {
    if (!topic || topic === "All topics") return true;
    return card.dataset.topic === topic;
  }

  function filter() {
    const subject = subjectPills.find((p) => p.classList.contains("active"))?.dataset.subject ?? "All subjects";
    const topic = topicSelect ? topicSelect.value : "";
    cards.forEach((card) => {
      const show = matchesSubject(card, subject) && matchesTopic(card, topic);
      card.style.display = show ? "" : "none";
      card.setAttribute("aria-hidden", String(!show));
    });
  }

  subjectPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      subjectPills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      filter();
    });
  });

  if (topicSelect) {
    topicSelect.addEventListener("change", filter);
  }

  // Initialize
  filter();
})();
