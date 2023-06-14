describe("Basic Test", () => {
  it("should load our dev server", async () => {
    await page.goto("http://127.0.0.1:8081");
    await expect(page.title()).resolves.toMatch("Mew151.net");
  });
});
