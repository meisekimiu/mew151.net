import shuffle from "shuffle-array";

document.addEventListener("DOMContentLoaded", () => {
  // Apply footnotes correctly in case I messed shit up!
  const links: string[] = [];
  document.querySelectorAll("[data-footnote]").forEach((element) => {
    const href = element.getAttribute("href");
    if (!href) {
      return;
    }
    const linkIndex = links.findIndex((val) => val === href);
    const index = linkIndex !== -1 ? linkIndex + 1 : links.push(href);
    element.textContent = `[${index}]`;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Randomize the special thanks credits for some reason idk
  const list = document.querySelector("[data-randomize-list]");
  if (!list) {
    return;
  }
  const listElements = shuffle(Array.from(list.children));
  list.innerHTML = "";
  listElements.forEach((element) => {
    list.appendChild(element);
  });
});
