const markdown = require("snarkdown");

function buildPosts(text: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "text/xml");
  const items = doc.querySelectorAll("item");
  const updates = document.getElementById("updates");
  if (updates) {
    updates.innerHTML = "";
  }
  let i = 0;
  for (let j = 0; j < items.length; j++) {
    const item = items[j];
    const title = item.querySelector("title")?.innerHTML ?? "";
    const date = item.querySelector("pubDate")?.innerHTML ?? "";
    const description = item.querySelector("description")?.innerHTML ?? "";

    const feedItem = document.createElement("div");
    feedItem.className = "feed-item";
    const header = document.createElement("div");

    const dateElement = document.createElement("time");
    dateElement.className = "feed-date";
    dateElement.setAttribute("datetime", date);
    const humanDate = new Date(date).toLocaleDateString("ja-JP");
    dateElement.innerText = humanDate + ": ";
    header.appendChild(dateElement);

    const titleElement = document.createElement("span");
    titleElement.className = "feed-title";
    titleElement.innerText = title;
    header.appendChild(titleElement);

    feedItem.appendChild(header);

    if (description) {
      const descriptionElement = document.createElement("div");
      descriptionElement.className = "feed-desc";
      if (markdown) {
        descriptionElement.innerHTML = markdown(description);
      } else {
        descriptionElement.innerHTML = description;
      }
      feedItem.appendChild(descriptionElement);
    }

    if (updates) {
      updates.appendChild(feedItem);
      if (i++ < items.length - 1) {
        const hr = document.createElement("hr");
        updates.appendChild(hr);
      }
    }
  }
}

function fetchRss() {
  fetch("/rss.xml").then((response) => {
    if (response.ok) {
      response.text().then((text) => {
        buildPosts(text);
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fetchRss();
});
