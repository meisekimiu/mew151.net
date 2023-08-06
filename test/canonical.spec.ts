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

const PROTOCOL = "https://";
const DOMAIN = "www.mew151.net";

describe("Canonical URL Testing", () => {
  test.each(htmlFiles)("Canonical URL: %s", async (file) => {
    const relativeFileName = file.replace(/^src\//, "");
    const expectedCanonicalUrl = PROTOCOL + DOMAIN + "/" + relativeFileName;
    await page.goto(getSiteUrl(relativeFileName));
    const linkHref = await page.$eval('link[rel="canonical"]', (element) => {
      return element.href;
    });
    expect(linkHref).toBeTruthy();
    expect(linkHref).toBe(expectedCanonicalUrl);
  });
  test("Canonical URL: src/index.html", async () => {
    const expectedCanonicalUrl = PROTOCOL + DOMAIN + "/";
    await page.goto(getSiteUrl("/"));
    const linkHref = await page.$eval('link[rel="canonical"]', (element) => {
      return element.href;
    });
    expect(linkHref).toBeTruthy();
    expect(linkHref).toBe(expectedCanonicalUrl);
  });
});
