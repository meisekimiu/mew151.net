const linkTransformations: { [key: string]: string } = {
  "https://blog.mew151.net/entries/ghostofhope.html": "ghostofhope.html",
  "https://blog.mew151.net/entries/intruders.html": "intruders.html",
  "https://blog.mew151.net/entries/dyingdog-review.html": "dyingdog.html",
};

const changeRelativeLinks = (article: HTMLElement, origin: string) => {
  const changeUrlAttribute = (
    article: HTMLElement,
    origin: string,
    type: "src" | "href"
  ) => {
    const links = Array.from(article.querySelectorAll(`[${type}]`));
    for (const link of links) {
      const href = link.getAttribute(type) ?? ".";
      if (!href.match(/^https?:\/\//)) {
        link.setAttribute(type, `${origin}/${href}`);
      }
      for (const match in linkTransformations) {
        if (href === match) {
          link.setAttribute(type, linkTransformations[href]);
        }
      }
    }
  };

  changeUrlAttribute(article, origin, "href");
  changeUrlAttribute(article, origin, "src");
};

const getSourceBaseUrl = (source: string): string => {
  const pieces = source.split("/");
  pieces.pop();
  return pieces.join("/");
};

document.addEventListener("DOMContentLoaded", async () => {
  const article = document.querySelector("article[data-source]");
  if (!article) {
    return;
  }
  const source = article.getAttribute("data-source");
  if (!source) {
    return;
  }
  const response = await fetch(source);
  if (!response.ok) {
    return;
  }
  const parser = new DOMParser();
  const doc = parser.parseFromString(await response.text(), "text/html");
  const remoteArticle = doc.querySelector("article");
  if (!remoteArticle) {
    return;
  }
  const removables = Array.from(
    remoteArticle.querySelectorAll("article > h2, article > time")
  );
  for (const el of removables) {
    remoteArticle.removeChild(el);
  }
  const articleOrigin = getSourceBaseUrl(source);
  changeRelativeLinks(remoteArticle, articleOrigin);
  article.innerHTML = remoteArticle.innerHTML;
});
