import levenshtein from "fast-levenshtein";

const MAX_PERCENT = 0.25;
const MINIMUM_SUBSTR_LEN = 4;

document.addEventListener("DOMContentLoaded", () => {
  const generateDistanceScore = (path: string): number => {
    if (path.startsWith("https://")) {
      return Infinity;
    }
    const currentPath = window.location.pathname.replace(/^\//, "");
    const scores: number[] = [];
    if (path.endsWith(".html")) {
      scores.push(generateDistanceScore(path.substring(0, path.length - 5)));
    }
    scores.push(
      levenshtein.get(currentPath, path) -
        (currentPath.length > MINIMUM_SUBSTR_LEN && path.includes(currentPath)
          ? 10
          : 0)
    );
    return Math.min(...scores);
  };

  const run404Page = () => {
    if (window.location.pathname.replace(/\.html$/, "") === "/not_found") {
      const style = document.createElement("style");
      style.innerHTML = `.if-200{display:block !important;}.del-if-200{text-decoration:line-through;}`;
      document.head.appendChild(style);
      return;
    }
    fetch("/sitemap.html")
      .then((resp) => {
        resp
          .text()
          .then((text) => {
            const parser = new DOMParser();
            const sitemap = parser.parseFromString(text, "text/html");
            const closestLink = Array.from(
              sitemap.querySelectorAll("li a[href]")
            )
              .map((node) => {
                const href = node.getAttribute("href") as string;
                return {
                  title: (node as HTMLElement).innerText,
                  href,
                  score: generateDistanceScore(href),
                };
              })
              .sort((a, b) => a.score - b.score)
              .shift();
            if (
              closestLink &&
              closestLink.score <=
                Math.max(
                  window.location.pathname.length * MAX_PERCENT,
                  MINIMUM_SUBSTR_LEN
                )
            ) {
              const p = document.createElement("p");
              p.innerHTML = `Based on my calculations, it looks like you <em>might</em> have been trying to visit this page:<br /><a href="/${closestLink.href}">${closestLink.title} (<kbd>/${closestLink.href}</kbd>)</a><br /><br />Hope this helps?`;
              document.body.appendChild(p);
            }
          })
          .catch(() => {
            console.error("Error getting response text");
          });
      })
      .catch(() => {
        console.error("Error getting sitemap");
      });
  };
  run404Page();
});
