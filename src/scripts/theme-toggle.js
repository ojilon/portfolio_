(() => {
  const button = document.getElementById("theme-toggle");
  const label = document.getElementById("theme-toggle-label");
  const root = document.documentElement;
  const storageKey = "ojilong-theme";
  if (!button) return;

  const isDark = () => root.classList.contains("dark");
  function updateState() {
    const dark = isDark();
    const nextAction = dark ? "Light mode" : "Dark mode";
    if (label) label.textContent = nextAction;
    button.setAttribute("aria-checked", String(dark));
    button.setAttribute("aria-label", nextAction);
  }
  button.addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    root.classList.toggle("dark", next === "dark");
    try {
      window.localStorage.setItem(storageKey, next);
    } catch {
      // The toggle still works for this page when storage is unavailable.
    }
    updateState();
  });
  updateState();
})();
