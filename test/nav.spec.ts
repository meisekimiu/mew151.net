import "expect-puppeteer";
import { getSiteUrl } from "./util/getSiteUrl";

interface NavLink {
  image: string | undefined;
  link: string;
}

describe("Navigation", () => {
  test("JS and Fallback Nav Parity", async () => {
    await page.goto(getSiteUrl("/"));
    const navLinks = await page.$eval("nav .navigation-group", (group) =>
      Array.from(group.querySelectorAll("a")).map((element) => {
        const obj: NavLink = {
          image: element.querySelector("img")?.src,
          link: element.href,
        };
        return obj;
      })
    );
    await page.goto(getSiteUrl("/nav-fallback.html"));
    const fallbackLinks = await page.$eval(".navigation-group", (group) =>
      Array.from(group.querySelectorAll("a")).map((element) => {
        const obj: NavLink = {
          image: element.querySelector("img")?.src,
          link: element.href,
        };
        return obj;
      })
    );
    for (const navLink of navLinks) {
      expect(
        fallbackLinks.find(
          (link) => link.image === navLink.image && link.link === navLink.link
        )
      ).toBeTruthy();
    }
    expect(fallbackLinks.length).toBeGreaterThan(navLinks.length);
  });
  test("Fallback Nav opens in parent frame", async () => {
    await page.goto(getSiteUrl("/nav-fallback.html"));
    const linkCount = await page.$eval(
      ".navigation-group",
      (group) => group.querySelectorAll("a").length
    );
    const linkParentCount = await page.$eval(
      ".navigation-group",
      (group) => group.querySelectorAll('a[target="_parent"]').length
    );
    expect(linkParentCount).toBe(linkCount);
  });
});
