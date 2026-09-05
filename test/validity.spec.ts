import "html-validate/jest";
import { globSync } from "glob";
import { getPage } from "./util/getPage";

const skipFiles = [/src\/history\/archive/];

const htmlFiles = globSync("src/**/*.html").filter(
  (file) =>
    !skipFiles.reduce((result, skip) => result || !!file.match(skip), false),
);

describe("HTML Validity and Accessibility", () => {
  test.each(htmlFiles)(
    "HTML Validity: %s",
    async (file) => {
      const relativeFileName = file.replace(/^src\//, "");
      const pageContents = getPage(relativeFileName).documentElement.outerHTML;
      expect(pageContents).toHTMLValidate();
    },
    45000,
  );
});
