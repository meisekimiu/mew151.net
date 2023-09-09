import "expect-puppeteer";
import { globSync } from "glob";
import { getSiteUrl } from "./util/getSiteUrl";

const htmlFiles = globSync("src/**/*.html");

describe("HTML Validity and Accessibility", () => {
  test.each(htmlFiles)("HTML Lang: %s", async (file) => {
    const relativeFileName = file.replace(/^src\//, "");
    await page.goto(getSiteUrl(relativeFileName));
    const lang = await page.$eval("html", (element) => {
      return element.lang;
    });
    expect(lang).toBeTruthy();
  });
});
