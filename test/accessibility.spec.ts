import { globSync } from "glob";
import { getPage } from "./util/getPage";

const htmlFiles = globSync("src/**/*.html");

describe("Accessibility", () => {
  test.each(htmlFiles)(
    "HTML Lang: %s",
    async (file) => {
      const relativeFileName = file.replace(/^src\//, "");
      const doc = getPage(relativeFileName);
      const lang = doc.querySelector("html")?.lang;
      expect(lang).toBeTruthy();
    },
    45000,
  );
  test.each(htmlFiles)(
    "Main has id=main: %s",
    async (file) => {
      const relativeFileName = file.replace(/^src\//, "");
      const doc = getPage(relativeFileName);
      const navClass = doc.querySelector("nav.explorer");
      if (navClass && !file.includes("nav-fallback.html")) {
        expect(doc.querySelector("main#main")).toBeTruthy();
      }
    },
    45000,
  );
});
