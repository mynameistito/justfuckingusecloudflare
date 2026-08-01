let savedTheme = null;
try {
  savedTheme = localStorage.getItem("jfu-theme");
} catch {
  // Storage can be disabled by browser privacy settings.
}

let theme = "dark";
if (savedTheme === "light" || savedTheme === "dark") {
  theme = savedTheme;
} else if (matchMedia("(prefers-color-scheme: light)").matches) {
  theme = "light";
}
document.documentElement.dataset.theme = theme;
document
  .querySelector('meta[name="theme-color"]')
  ?.setAttribute("content", theme === "light" ? "#f2efe7" : "#0c0c0b");
