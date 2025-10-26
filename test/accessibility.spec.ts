import "expect-puppeteer";
import "html-validate/jest";
import { globSync } from "glob";
import { getSiteUrl } from "./util/getSiteUrl";

const htmlFiles = globSync("src/**/*.html");

describe("Accessibility", () => {
  test.each(htmlFiles)(
    "HTML Lang: %s",
    async (file) => {
      const relativeFileName = file.replace(/^src\//, "");
      await page.goto(getSiteUrl(relativeFileName));
      const lang = await page.$eval("html", (element) => {
        return element.lang;
      });
      expect(lang).toBeTruthy();
    },
    45000
  );
  test.each(htmlFiles)(
    "Main has id=main: %s",
    async (file) => {
      const relativeFileName = file.replace(/^src\//, "");
      await page.goto(getSiteUrl(relativeFileName));
      const navClass = await page.$("nav.explorer");
      if (navClass && !file.includes("nav-fallback.html")) {
        const mainId = await page.$eval("main", (element) => {
          return element.id;
        });
        expect(mainId).toBe("main");
      }
    },
    45000
  );
  test("Skip Link in nav", async () => {
    await page.goto(getSiteUrl("/"));
    const link = await page.$eval("nav a.skiplink", (element) => {
      return {
        tabindex: element.tabIndex,
        href: element.href,
      };
    });
    expect(link).toBeTruthy();
    expect(link.tabindex).toBe(0);
    expect(link.href).toContain("#main");
  }, 45000);
});
