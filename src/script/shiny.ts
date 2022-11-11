const genShinies = () => {
  const shinies = Array.from(document.querySelectorAll("[data-shiny]"));
  const shinyCap = (window as any)["specialDay"] ? 100 : 4096;

  for (const m of shinies) {
    if (Math.floor(Math.random() * shinyCap) === 97) {
      const mew = m as HTMLImageElement;
      const src = mew.src;
      if (!src.endsWith("_s.png")) {
        mew.src = src.replace(/\.png$/, "_s.png");
        console.log("*sparkle*");
      }
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  genShinies();
});
