import { getPage } from "./util/getPage";

interface NavLink {
  image: string | undefined;
  link: string;
}

describe("Navigation", () => {
  // TODO: Mave nav to and then import nav data from mew151-components to test this.

  // test("JS and Fallback Nav Parity", async () => {
  //   await page.goto(getSiteUrl("/"));
  //   const navLinks = await page.$eval("nav .navigation-group", (group) =>
  //     Array.from(group.querySelectorAll("a")).map((element) => {
  //       const obj: NavLink = {
  //         image: element.querySelector("img")?.src,
  //         link: element.href,
  //       };
  //       return obj;
  //     })
  //   );
  //   await page.goto(getSiteUrl("/nav-fallback.html"));
  //   const fallbackLinks = await page.$eval(".navigation-group", (group) =>
  //     Array.from(group.querySelectorAll("a")).map((element) => {
  //       const obj: NavLink = {
  //         image: element.querySelector("img")?.src,
  //         link: element.href,
  //       };
  //       return obj;
  //     })
  //   );
  //   for (const navLink of navLinks) {
  //     expect(
  //       fallbackLinks.find(
  //         (link) => link.image === navLink.image && link.link === navLink.link
  //       )
  //     ).toBeTruthy();
  //   }
  //   expect(fallbackLinks.length).toBeGreaterThan(navLinks.length);
  // }, 45000);

  test("Fallback Nav opens in parent frame", async () => {
    const doc = getPage("/nav-fallback.html");
    const links = Array.from(doc.querySelectorAll(".navigation-group a"));
    links.forEach((link) => {
      expect(link.getAttribute("target")).toBe("_parent");
    });
  }, 45000);
});
