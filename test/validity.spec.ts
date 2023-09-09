import "expect-puppeteer";
import "html-validate/jest";
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
  test.each(htmlFiles)("HTML Validity: %s", async (file) => {
    const relativeFileName = file.replace(/^src\//, "");
    await page.goto(getSiteUrl(relativeFileName));
    const pageContents = await page.content();
    if (file.includes("accordion/quiz.html")) {
      // Skip HTML validation for this file because fixes need to be in NeoQuiz
      // :3.........
      return;
    }
    expect(pageContents).toHTMLValidate();
  });
});
