interface SiteUpdate {
  updated: Date;
  link: string;
  categories: string[];
}

document.addEventListener("DOMContentLoaded", () => {
  const SEVEN_DAYS = 604800000;
  const appendStamp = (node: Element) => {
    const newStamp = document.createElement("img");
    newStamp.src = "/shrines/rz/img/new2.gif";
    newStamp.alt = "New!";
    newStamp.title = "This has been updated in the last week";
    node.after(newStamp);
  };
  const addNewStamp = (update: SiteUpdate) => {
    const links: HTMLAnchorElement[] = Array.from(
      document.querySelectorAll("dt a")
    );
    const updatePath = new URL(update.link).pathname;
    for (const link of links) {
      if (link.hasAttribute("href")) {
        const linkPath = link.href.match(/^https?:\/\//)
          ? new URL(link.href).pathname
          : new URL(link.href, window.location.href).pathname;
        console.log(linkPath);
        if (linkPath === updatePath) {
          appendStamp(link);
          continue;
        }
      }
      if (link.hasAttribute("data-rss-category")) {
        const category = `${link.getAttribute("data-rss-category")}`;
        if (update.categories.includes(category)) {
          appendStamp(link);
        }
      }
    }
    // if (!node.parentElement) {
    //   return;
    // }
    // const newStamp = document.createElement("img");
    // newStamp.src = "new2.gif";
    // newStamp.alt = "New!";
    // newStamp.title = "This has been updated in the last week";
    // const link = node.parentElement.querySelector("a");
    // if (link) {
    //   link.before(newStamp);
    // } else {
    //   node.parentElement.insertBefore(newStamp, node.parentElement.firstChild);
    // }
  };
  const getFeed = async () => {
    const res = await fetch("/shrines/rz/rss.xml");
    const parser = new DOMParser();
    const feed = parser.parseFromString(await res.text(), "text/xml");
    return Array.from(feed.querySelectorAll("item")).map((item) => {
      const date = item.querySelector("pubDate")?.innerHTML ?? "2022-02-19";
      const link =
        item.querySelector("link")?.innerHTML ?? "https://www.example.com";
      const categories = Array.from(item.querySelectorAll("category")).map(
        (cat) => cat.innerHTML
      );
      return {
        updated: new Date(date),
        link,
        categories,
      };
    });
  };
  const checkForNewEntries = async () => {
    const feed = await getFeed();
    let newCount = 0;
    for (const update of feed) {
      if (update.updated > new Date(new Date().getTime() - SEVEN_DAYS)) {
        addNewStamp(update);
        if (++newCount >= 3) {
          break;
        }
      }
    }
  };
  checkForNewEntries();
});
