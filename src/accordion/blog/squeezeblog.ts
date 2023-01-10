document.addEventListener("DOMContentLoaded", () => {
  const SEVEN_DAYS = 604800000;
  const addNewStamp = (node: Element) => {
    if (!node.parentElement) {
      return;
    }
    const newStamp = document.createElement("img");
    newStamp.src = "new2.gif";
    newStamp.alt = "New!";
    newStamp.title = "This post is from the last week";
    const link = node.parentElement.querySelector("a");
    if (link) {
      link.before(newStamp);
    } else {
      node.parentElement.insertBefore(newStamp, node.parentElement.firstChild);
    }
  };
  const checkForNewEntries = () => {
    const times = Array.from(
      document.querySelectorAll("ul.blog-archive li time[datetime]")
    );
    let newCount = 0;
    for (const time of times) {
      const postTime = new Date(time.getAttribute("datetime") as string);
      if (postTime > new Date(new Date().getTime() - SEVEN_DAYS)) {
        addNewStamp(time);
        if (++newCount >= 3) {
          break;
        }
      }
    }
  };
  checkForNewEntries();
});
