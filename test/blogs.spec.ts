import "expect-puppeteer";
import { getSiteUrl } from "./util/getSiteUrl";

describe("Blogz", () => {
  test("Perfect Pop Star Academy RSS Feed", async () => {
    await page.goto(getSiteUrl("/blog/"));
    const linkCollection = await page.$eval("main", (list) => {
      return Array.from(list.querySelectorAll("li a[href]")).map((el) =>
        (el as HTMLAnchorElement).href.replace(/^(.+?)entries/, "entries")
      );
    });
    await page.goto(getSiteUrl("/blog/blog.xml"));
    const itemCollection = await page.$eval("channel", (channel) => {
      return Array.from(channel.querySelectorAll("item > link")).map((el) =>
        el.innerHTML.replace(/^(.+?)entries/, "entries")
      );
    });
    for (const link of linkCollection) {
      expect(itemCollection).toContain(link);
    }
  });
  test("Squeeze Blog RSS Feed", async () => {
    await page.goto(getSiteUrl("/accordion/blog"));
    const linkCollection = await page.$eval(".blog-archive", (list) => {
      return Array.from(list.querySelectorAll("li a[href]")).map((el) =>
        (el as HTMLAnchorElement).href.replace(/^(.+?)posts/, "posts")
      );
    });
    await page.goto(getSiteUrl("accordion/blog/accordion.xml"));
    const itemCollection = await page.$eval("channel", (channel) => {
      return Array.from(channel.querySelectorAll("item > link")).map((el) =>
        el.innerHTML.replace(/^(.+?)posts/, "posts")
      );
    });
    for (const link of linkCollection) {
      expect(itemCollection).toContain(link);
    }
  });
});
