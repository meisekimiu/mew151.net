import "html-validate/jest";
import { globSync } from "glob";
import { getPage } from "./util/getPage";

const htmlFiles = globSync("src/**/*.html");

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
