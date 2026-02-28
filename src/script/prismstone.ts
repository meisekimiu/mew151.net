interface BlogItem {
  link: string;
  pubDate: Date;
  contentWarning?: string;
  text: string;
  title: string;
}

const snarkdownlib = require("snarkdown");

/**
 * Fetch my social's RSS and return it as an XML Document object.
 */
async function fetchPrism(): Promise<Document> {
  const response = await fetch("https://prismst.one/@natalie.rss");
  const parser = new DOMParser();
  const document = parser.parseFromString(
    await response.text(),
    "application/xml",
  );
  return document;
}

function extractBlogItemsFromRssDocument(document: Document): BlogItem[] {
  return Array.from(document.querySelectorAll("item")).map(
    itemElementToBlogItem,
  );
}

function filterOutDuplicatedBlogEntries(entries: BlogItem[]): BlogItem[] {
  const deleteEntries: BlogItem[] = [];
  const processText = (entry: BlogItem) => {
    return entry.text
      .split(/<hr>(?:.+?)\(@(?:[^@]+?)@(?:[^@]+?)\) (?:says|replies): <br>/g)
      .map((t) => t.trim())
      .join("<br>");
  };
  for (const entry of entries) {
    const processedEntry = processText(entry);
    const moreRecentEntry = entries.find(
      (e) =>
        e.link !== entry.link &&
        processText(e).includes(processedEntry) &&
        e.title.includes("replies") &&
        e.text.includes("<hr>"),
    );
    if (moreRecentEntry) {
      deleteEntries.push(entry);
    }
  }
  return reverseAndFormatReplyChains(
    entries.filter((e) => !deleteEntries.includes(e)),
  );
}

function reverseAndFormatReplyChains(entries: BlogItem[]): BlogItem[] {
  for (const entry of entries) {
    if (entry.title.includes("replies") && entry.text.includes("<hr>")) {
      const pieces = entry.text.split("<hr>").reverse();
      entry.text = pieces.join("<hr>");
    }
  }
  return entries;
}

function itemElementToBlogItem(element: Element): BlogItem {
  const link = element.querySelector("guid")?.textContent ?? "";
  const pubDate = new Date(element.querySelector("pubDate")?.textContent ?? 0);
  const contentWarning =
    element.querySelector("description")?.textContent ?? undefined;
  let text =
    element
      .getElementsByTagName("content:encoded")[0]
      ?.innerHTML.trim()
      .replace(/^<\!\[CDATA\[/, "")
      .replace(/\]\]>$/, "")
      .replace(/<span (?:.+?)><\/span>/, "")
      .trim() ?? "";
  if (contentWarning) {
    text = text.replace(new RegExp(contentWarning + "<br>", "g"), "");
  }
  text = snarkdownlib(text);
  const title = element.querySelector("title")?.textContent ?? "";
  return { link, pubDate, contentWarning, text, title };
}

function blogItemToHtml(item: BlogItem): HTMLElement {
  const element = document.createElement("div");
  element.id = `${item.pubDate.getTime() - 0}`;
  element.className = "twtxt-tweet";
  element.setAttribute("style", "border-bottom: 1px solid #000; padding: 1em;");
  element.className = "twtxt-tweet";

  const date = document.createElement("time");
  date.setAttribute("datetime", item.pubDate.toISOString());
  date.innerText = item.pubDate.toLocaleString("ja-JA");
  date.setAttribute(
    "style",
    "font-size: 0.8em; font-style: italic; font-color: #333;",
  );
  element.appendChild(date);

  const content = document.createElement("div");
  content.className = "twtxt-content";
  if (item.contentWarning) {
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.innerHTML = item.contentWarning;
    details.appendChild(summary);
    const text = document.createElement("div");
    text.innerHTML = getReblogElements(item.text).innerHTML;
    details.appendChild(text);
    content.appendChild(details);
  } else {
    content.innerHTML = getReblogElements(item.text).innerHTML;
  }
  element.appendChild(content);

  return element;
}

function getReblogElements(text: string): HTMLElement {
  const regex = /^(.+?)\((@(?:[^@]+?)@(?:[^@]+?))\) (?:says|replies): <br>/;
  const regexg = /^(.+?)\((@(?:[^@]+?)@(?:[^@]+?))\) (?:says|replies): <br>/g;
  if (!text.includes("<hr>")) {
    const element = document.createElement("div");
    element.innerHTML = text;
    return element;
  }
  const postInfos = text
    .split("<hr>")
    .map((post) => {
      const userMatches = post.match(regex);
      if (userMatches) {
        const displayName = userMatches[1];
        const handle = userMatches[2];
        if (handle !== "@natalie@prismst.one") {
          return {
            me: false,
            displayName,
            handle,
            text: post.replace(regexg, ""),
          };
        }
      }
      return {
        me: true,
        displayName: "Natalie",
        handle: "@natalie@prismst.one",
        text: post.replace(regexg, ""),
      };
    })
    .filter((post) => post.text.length);
  const onlyMeThread =
    postInfos.filter((p) => p.me).length === postInfos.length;
  const posts = postInfos.map((postInfo) => {
    const post = document.createElement("div");
    post.className = "reblog";
    const poster = document.createElement("span");
    poster.innerHTML = `${postInfo.displayName} <span class="handle">${postInfo.handle}</span>`;
    poster.className = postInfo.me ? "webmaster-name" : "oomfie-name";
    if (!onlyMeThread) {
      post.appendChild(poster);
    }
    const text = document.createElement("div");
    text.className = "reblog-post-content";
    text.innerHTML = postInfo.text;
    post.appendChild(text);
    return post;
  });
  const wholePost = document.createElement("div");
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    wholePost.appendChild(post);
    if (i < posts.length - 1) {
      const divider = document.createElement("hr");
      divider.className = "reblog-divider";
      wholePost.appendChild(divider);
    }
  }
  return wholePost;
}

function buildSocialFeed(items: BlogItem[]): void {
  const root = document.getElementById("microblog")!;
  root.innerHTML = "";
  items.forEach((item) => {
    root.appendChild(blogItemToHtml(item));
  });
}

async function loadPrismStoneFeedAndBuildMicroBlog() {
  buildSocialFeed(
    filterOutDuplicatedBlogEntries(
      extractBlogItemsFromRssDocument(await fetchPrism()),
    ),
  );
}

document.addEventListener("DOMContentLoaded", () => {
  loadPrismStoneFeedAndBuildMicroBlog();
});
