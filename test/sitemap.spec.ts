import { globSync } from "glob";
import { getPage } from "./util/getPage";

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
    !skipFiles.reduce((result, skip) => result || !!file.match(skip), false),
);

describe("Sitemap verification", () => {
  let linkPaths: string[];
  beforeAll(async () => {
    linkPaths = Array.from(
      getPage("/sitemap.html").querySelectorAll("main a[href]"),
    ).map((el) => el.getAttribute("href")!);
  });
  test.each(htmlFiles)(
    "Sitemap: %s",
    async (file) => {
      const expectedLinkPath = file
        .replace(/^src\//, "")
        .replace(/\/?index.html$/, "");
      const containsLink = linkPaths.reduce(
        (result, link) => result || link.endsWith(expectedLinkPath),
        false,
      );
      try {
        expect(containsLink).toBeTruthy();
      } catch {
        throw new Error(`Expected ${expectedLinkPath} to be linked in sitemap`);
      }
    },
    45000,
  );
});
