import "expect-puppeteer";
import "html-validate/jest";
import { globSync } from "glob";
import { getSiteUrl } from "./util/getSiteUrl";

const htmlFiles = globSync("src/**/*.html");

describe("HTML Validity and Accessibility", () => {
  test.each(htmlFiles)("HTML Validity: %s", async (file) => {
    const relativeFileName = file.replace(/^src\//, "");
    await page.goto(getSiteUrl(relativeFileName));
    const pageContents = await page.content();
    expect(pageContents).toHTMLValidate();
  });
});
