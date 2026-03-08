import { getPage } from "./util/getPage";

describe("Blogz", () => {
  test("Perfect Pop Star Academy RSS Feed", async () => {
    const doc = getPage("/blog/");
    const linkCollection = Array.from(
      doc.querySelector("main")!.querySelectorAll("li a[href]"),
    ).map((el) =>
      (el as HTMLAnchorElement).href.replace(/^(.+?)entries/, "entries"),
    );
    const rssDoc = getPage("/blog/blog.xml", "application/xml");
    const itemCollection = Array.from(
      rssDoc.querySelector("channel")!.querySelectorAll("item > link"),
    ).map((el) => el.innerHTML.replace(/^(.+?)entries/, "entries"));
    for (const link of linkCollection) {
      expect(itemCollection).toContain(link);
    }
  }, 45000);
  test("Squeeze Blog RSS Feed", async () => {
    const doc = getPage("/accordion/blog/");
    const linkCollection = Array.from(
      doc.querySelector("main")!.querySelectorAll("li a[href]"),
    ).map((el) =>
      (el as HTMLAnchorElement).href.replace(/^(.+?)posts/, "posts"),
    );
    const rssDoc = getPage("/accordion/blog/accordion.xml", "application/xml");
    const itemCollection = Array.from(
      rssDoc.querySelector("channel")!.querySelectorAll("item > link"),
    ).map((el) => el.innerHTML.replace(/^(.+?)posts/, "posts"));
    for (const link of linkCollection) {
      expect(itemCollection).toContain(link);
    }
  }, 45000);
});
