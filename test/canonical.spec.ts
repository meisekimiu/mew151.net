import { globSync } from "glob";
import { getPage } from "./util/getPage";

const skipFiles = [
  "src/not_found.html",
  "src/nav-fallback.html",
  "src/accordion/blog/posts/index.html",
  "src/index.html",
  "src/ai/index.html",
  /^src\/blog/,
  /^src\/portfolio/,
];

const htmlFiles = globSync("src/**/*.html").filter(
  (file) =>
    !skipFiles.reduce((result, skip) => result || !!file.match(skip), false),
);

const PROTOCOL = "https://";
const DOMAIN = "www.mew151.net";

describe("Canonical URL Testing", () => {
  test.each(htmlFiles)(
    "Canonical URL: %s",
    async (file) => {
      const relativeFileName = file.replace(/^src\//, "");
      const expectedCanonicalUrl = PROTOCOL + DOMAIN + "/" + relativeFileName;
      const doc = getPage(relativeFileName);
      const linkHref = doc.querySelector('link[rel="canonical"]');
      expect(linkHref).toBeTruthy();
      expect(linkHref?.getAttribute("href")).toBe(expectedCanonicalUrl);
    },
    45000,
  );
  test("Canonical URL: src/index.html", async () => {
    const expectedCanonicalUrl = PROTOCOL + DOMAIN;
    const doc = getPage("/");
    const linkHref = doc.querySelector('link[rel="canonical"]');
    expect(linkHref).toBeTruthy();
    expect(linkHref?.getAttribute("href")).toBe(expectedCanonicalUrl);
  }, 45000);
});
