try {
  const savedTheme = localStorage.getItem("jfu-theme");
  let theme = "dark";
  if (savedTheme === "light" || savedTheme === "dark") {
    theme = savedTheme;
  } else if (matchMedia("(prefers-color-scheme: light)").matches) {
    theme = "light";
  }
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]').content =
    theme === "light" ? "#f2efe7" : "#0c0c0b";
} catch {
  const theme = matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]').content =
    theme === "light" ? "#f2efe7" : "#0c0c0b";
}
