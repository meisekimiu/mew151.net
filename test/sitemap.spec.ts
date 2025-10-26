import "expect-puppeteer";
import { globSync } from "glob";
import { getSiteUrl } from "./util/getSiteUrl";

const skipFiles = [
  "src/not_found.html",
  "src/nav-fallback.html",
  "src/accordion/blog/posts/index.html",
  "src/index.html",
  /^src\/blog/,
  /^src\/portfolio/,
];

const htmlFiles = globSync("src/**/*.html").filter(
  (file) =>
    !skipFiles.reduce((result, skip) => result || !!file.match(skip), false)
);

describe("Sitemap verification", () => {
  let linkPaths: string[];
  beforeAll(async () => {
    await page.goto(getSiteUrl("/sitemap.html"));
    linkPaths = await page.$eval("main", (main) => {
      return Array.from(main.querySelectorAll("a[href]")).map(
        (element) => (element as HTMLAnchorElement).href
      );
    });
  });
  test.each(htmlFiles)(
    "Sitemap: %s",
    async (file) => {
      const expectedLinkPath = file
        .replace(/^src\//, "")
        .replace(/\/?index.html$/, "");
      const containsLink = linkPaths.reduce(
        (result, link) => result || link.endsWith(expectedLinkPath),
        false
      );
      expect(containsLink).toBeTruthy();
    },
    45000
  );
});
