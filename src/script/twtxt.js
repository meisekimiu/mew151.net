function makeBlog(tweets) {
  const blog = document.getElementById("microblog");
  blog.innerHTML = '';
  for (const tweet of tweets) {
    const entry = document.createElement("div");
    entry.id = `${tweet.date - 0}`;
    entry.style = "border-bottom: 1px solid #000; padding: 1em;";
    entry.className = "twtxt-tweet";

    const date = document.createElement("time");
    date.setAttribute("datetime", tweet.date.toISOString());
    date.innerText = tweet.date.toLocaleString("ja-JA");
    date.style = "font-size: 0.8em; font-style: italic; font-color: #333;"
    entry.appendChild(date);

    const content = document.createElement("div");
    content.className = "twtxt-content";
    content.innerHTML = tweet.text;
    entry.appendChild(content);

    blog.appendChild(entry);
  }
}

function expandWordle(text) {
  const matches = text.match(/(.+?)Wordle \d+ (\d|X)\/\d\*?/i)
  if (matches && matches.length > 0) {
    const wordleHeader = matches[0];
    const wordleBody = text.substr(matches[0].length).trim();
    const wordleTurns = wordleBody.split(/\s+\/?\s*/).join("<br />");
    return `<p>${wordleHeader}<br />
    <br />
    ${wordleTurns}`;
  }
  return text;
}

function buildTweets(text) {
  const lines = text.split("\n");
  const tweets = [];
  for (const line of lines) {
    if (line.trim()[0] === '#' || line.trim().length === 0) {
      continue;
    }
    const pieces = line.split("\t");
    const date = new Date(pieces.shift());
    if (isNaN(date.getDate())) {
      continue;
    }
    const text = pieces.join("\t");
    if (tweets.length > 0 && tweets[tweets.length - 1].date + 0 === date + 0) {
      tweets[tweets.length - 1].text += "\n\n" + text;
    } else {
      tweets.push({
        date: date,
        text: text,
      });
    }
  }
  console.log(tweets);
  tweets.sort((a, b) => b.date - a.date);
  return tweets.map((tweet) => {
    return {
      date: tweet.date,
      text: markdown ? expandWordle(markdown.toHTML(tweet.text)) : expandWordle(tweet.text),
    }
  });
}

function fetchBlog() {
  fetch("https://mew151.net/twtxt.txt").then((response) => {
    response.text().then((text) => {
      makeBlog(buildTweets(text));
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fetchBlog();
});
