/* Dark mode is applied inline in <head> before paint to avoid a flash.
   This script sets the initial theme based on localStorage or prefers-color-scheme. */
(function () {
  const DARK_CLASS = "dark";
  const STORAGE_KEY = "ojilong-theme";

  function getSystemTheme(): "dark" | "light" {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme: "dark" | "light") {
    if (theme === "dark") {
      document.documentElement.classList.add(DARK_CLASS);
    } else {
      document.documentElement.classList.remove(DARK_CLASS);
    }
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const theme = stored === "dark" || stored === "light" ? stored : getSystemTheme();
    applyTheme(theme);
  } catch {
    applyTheme(getSystemTheme());
  }
})();
