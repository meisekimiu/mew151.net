import { getPage } from "./util/getPage";

describe("Basic Test", () => {
  it("should be able to load a page through jsdom", async () => {
    const document = getPage("/");
    expect(document.title).toMatch("Mew151.net");
  });
});
