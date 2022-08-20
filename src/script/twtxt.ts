interface Tweet {
  date: Date;
  text: string;
}

const snarkdown = require("snarkdown");

function makeBlog(tweets: Tweet[]) {
  const blog = document.getElementById("microblog");
  if (blog) {
    blog.innerHTML = "";
    for (const tweet of tweets) {
      const entry = document.createElement("div");
      entry.id = `${tweet.date.getTime() - 0}`;
      entry.setAttribute(
        "style",
        "border-bottom: 1px solid #000; padding: 1em;"
      );
      entry.className = "twtxt-tweet";

      const date = document.createElement("time");
      date.setAttribute("datetime", tweet.date.toISOString());
      date.innerText = tweet.date.toLocaleString("ja-JA");
      date.setAttribute(
        "style",
        "font-size: 0.8em; font-style: italic; font-color: #333;"
      );
      entry.appendChild(date);

      const content = document.createElement("div");
      content.className = "twtxt-content";
      content.innerHTML = tweet.text;
      entry.appendChild(content);

      blog.appendChild(entry);
    }
  }
}

function buildTweets(text: string) {
  const lines = text.split("\n");
  const tweets: Tweet[] = [];
  for (const line of lines) {
    if (line.trim()[0] === "#" || line.trim().length === 0) {
      continue;
    }
    const pieces = line.split("\t");
    const date = new Date(pieces.shift() ?? "");
    if (isNaN(date.getDate())) {
      continue;
    }
    const text = pieces.join("\t");
    if (
      tweets.length > 0 &&
      tweets[tweets.length - 1].date.getTime() + 0 === date.getTime() + 0
    ) {
      tweets[tweets.length - 1].text += "\n\n" + text;
    } else {
      tweets.push({
        date: date,
        text: text,
      });
    }
  }
  tweets.sort((a, b) => b.date.getTime() - a.date.getTime());
  return tweets.map((tweet) => {
    return {
      date: tweet.date,
      text: snarkdown ? snarkdown(tweet.text) : tweet.text,
    };
  });
}

function fetchBlog() {
  const dateString = Math.floor(new Date().getMinutes() / 30);
  fetch(`https://mew151.net/twtxt.txt?t=${dateString}`).then((response) => {
    response.text().then((text) => {
      makeBlog(buildTweets(text));
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fetchBlog();
});
