import { getSiteUrl } from "./util/getSiteUrl";

describe("Basic Test", () => {
  it("should load our dev server", async () => {
    await page.goto(getSiteUrl("/"));
    await expect(page.title()).resolves.toMatch("Mew151.net");
  });
  it("should be able to make a testing URL", () => {
    expect(getSiteUrl("/index.html", 8081)).toBe(
      "http://127.0.0.1:8081/index.html"
    );
  });
  it("should ignore extra leading slashes in making testing URLs", () => {
    const expected = "http://127.0.0.1:8081/index.html";
    expect(getSiteUrl("index.html", 8081)).toBe(expected);
    expect(getSiteUrl("/////index.html", 8081)).toBe(expected);
  });
  it("should be able to configure port", () => {
    expect(getSiteUrl("index.html", 1337)).toBe(
      "http://127.0.0.1:1337/index.html"
    );
  });
});
