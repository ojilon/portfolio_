(function () {
  const BTN_ID = "theme-toggle";
  const LABEL_ID = "theme-toggle-label";
  const STORAGE_KEY = "ojilong-theme";
  const DARK_CLASS = "dark";

  const btn = document.getElementById(BTN_ID);
  const label = document.getElementById(LABEL_ID);
  if (!btn) return;

  const html = document.documentElement;
  const isDark = () => html.classList.contains(DARK_CLASS);

  function updateLabel() {
    if (!label) return;
    label.textContent = isDark() ? "Light mode" : "Dark mode";
    btn.setAttribute("aria-checked", String(isDark()));
  }

  function setTheme(theme) {
    if (theme === "dark") {
      html.classList.add(DARK_CLASS);
    } else {
      html.classList.remove(DARK_CLASS);
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // ignore
    }
    updateLabel();
  }

  btn.addEventListener("click", () => setTheme(isDark() ? "light" : "dark"));

  updateLabel();
})();
