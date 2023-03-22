type Theme = "light" | "dark" | "muffins";
let initialThemeSet = false;

function getTheme(): Theme {
  const currentTheme = getCurrentBodyTheme();
  if (currentTheme) {
    return currentTheme;
  }
  const darkPreference = localStorage.getItem("theme");
  if (darkPreference) {
    if (darkPreference.toLocaleLowerCase() === "dark") {
      return "dark";
    } else {
      return "light";
    }
  }
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

function getCurrentBodyTheme(): Theme | null {
  if (location.search.toLocaleLowerCase().substring(1) === "muffins") {
    return "muffins";
  }
  const classList = Array.from(document.body.classList).filter(
    (name) => name === "light" || name === "dark" || name === "muffins"
  );
  const className = classList.pop() as Theme;
  return className ?? null;
}

function saveTheme(theme: Theme): void {
  localStorage.setItem("theme", theme);
}

function setTheme(theme: Theme): void {
  document.body.className = theme;
  if (initialThemeSet) {
    document.body.classList.add("transition");
  }
  initialThemeSet = true;
}

function toggleTheme(): void {
  const theme = getTheme();
  const newTheme = theme === "dark" ? "light" : "dark";
  setTheme(newTheme);
  saveTheme(newTheme);

  const themeToggleButtons = Array.from(
    document.querySelectorAll(".theme-switcher")
  );
  for (const button of themeToggleButtons) {
    const btn = button as HTMLElement;
    btn.innerText = newTheme === "dark" ? "☀️" : "🌙";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const theme: Theme = getTheme();
  setTheme(theme);
  saveTheme(theme);

  if (theme === "muffins") {
    const description = document.querySelector(".about-me h2") as HTMLElement;
    if (description) {
      description.innerText = description.innerText.replace(/game/i, "Ditzy");
      description.innerText = description.innerText.replace(
        /software/i,
        "MUFFIN"
      );
    }

    const links = Array.from(document.querySelectorAll("a[href]"));
    for (const linkNode of links) {
      const link = linkNode as HTMLAnchorElement;
      if (link.href.startsWith(location.protocol + "//" + location.host)) {
        link.href = link.href + "?muffins";
      }
    }
  }

  const themeToggleButtons = Array.from(
    document.querySelectorAll(".theme-switcher")
  );
  for (const button of themeToggleButtons) {
    const btn = button as HTMLElement;
    btn.innerText = theme === "dark" ? "☀️" : "🌙";
    if (theme === "muffins") {
      btn.style.display = "none";
    } else {
      btn.addEventListener("click", toggleTheme);
    }
  }
});
