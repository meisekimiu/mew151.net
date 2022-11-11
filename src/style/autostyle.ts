interface specialDate {
  code: string;
  reason: string;
}

function setBackground(hour?: number) {
  const date = new Date();

  const code = date.getMonth() + 1 + "/" + date.getDate();
  const specialDates = [
    { code: "1/1", reason: "new year" },
    { code: "1/5", reason: "shion day" },
    { code: "1/18", reason: "mlk day" },
    { code: "1/21", reason: "takane day" },
    { code: "1/26", reason: "classic website birthday" },
    { code: "2/5", reason: "dorothy + leona day" },
    { code: "2/18", reason: "website relaunch birthday" },
    { code: "2/19", reason: "legacy saturday" },
    { code: "2/29", reason: "leap day" },
    { code: "3/3", reason: "hinamatsuri" },
    { code: "3/17", reason: "st. patrick's day" },
    { code: "3/21", reason: "falulu day, spring" },
    { code: "3/29", reason: "hardy fox day" },
    { code: "4/1", reason: "april foolz" },
    { code: "4/13", reason: "in between dreams :)" },
    { code: "4/19", reason: "me birthday" },
    { code: "5/4", reason: "??? birthday" },
    { code: "5/6", reason: "world accordion day" },
    { code: "6/6", reason: "aroma day" },
    { code: "6/12", reason: "konomi day" },
    { code: "6/21", reason: "summer solstice" },
    { code: "7/4", reason: "AX weekend day (lol)" },
    { code: "7/25", reason: "??? birthday" },
    { code: "7/30", reason: "sophie day" },
    { code: "8/1", reason: "mahjong day" },
    { code: "8/8", reason: "mia day" },
    { code: "8/11", reason: "fuwari day" },
    { code: "8/14", reason: "bio3 prologue day" },
    { code: "8/21", reason: "bio3 start day" },
    { code: "9/3", reason: "aira + rizumu day" },
    { code: "9/13", reason: "mata nui day" },
    { code: "9/21", reason: "do you remember?" },
    { code: "10/1", reason: "mirei day" },
    { code: "10/4", reason: "??? birthday" },
    { code: "10/30", reason: "halloween eve" },
    { code: "10/31", reason: "halloween" },
    { code: "11/11", reason: "ii pocky day" },
    { code: "11/20", reason: "lala day" },
    { code: "12/21", reason: "winter solstice" },
    { code: "12/24", reason: "christmas eve" },
    { code: "12/25", reason: "christmas" },
    { code: "12/26", reason: "boxing day" },
    { code: "12/31", reason: "new yearz eve" },
  ];
  const codesList = specialDates.map((date) => date.code);
  if (codesList.includes(code)) {
    (window as any)["specialDay"] = true;
    // Subtract 1900 from date to emulate date.getYear() for full Y2K aesthetic lol
    const offset =
      date.getFullYear() - 1900 + codesList.indexOf(code) + date.getDate();
    const backgrounds = [
      "/style/backgrounds/checker.png",
      "/style/backgrounds/diamonds.png",
      "/style/backgrounds/grid.png",
      "/style/backgrounds/lodge.png",
      "/style/backgrounds/purple.png",
    ];
    let bg = backgrounds[offset % backgrounds.length];
    document.body.style.backgroundImage = "url('" + bg + "')";
    document.body.style.backgroundSize = "auto";
    return;
  }

  const minutes = date.getMinutes();
  const hours = hour ?? date.getHours();
  const html = document.querySelector("html") as HTMLHtmlElement; // Assert that it exists
  if ((hours >= 18 && hours < 19) || hours === 6) {
    document.body.style.backgroundImage =
      "linear-gradient(#000, #110058, orangered)";
    return;
  } else if ((hours >= 19 && hours < 23) || hours === 5) {
    html.style.backgroundColor = "#000";
    document.body.style.backgroundImage = "url('/style/backgrounds/stars.png')";
    document.body.style.backgroundSize = "auto";
    return;
  } else if (hours === 4 && minutes === 44) {
    html.style.backgroundColor = "#000";
    document.body.style.backgroundImage =
      "url('/style/backgrounds/giygas.png')";
    document.body.style.backgroundSize = "auto";
    return;
  } else if (hours >= 23 || hours <= 4) {
    html.style.backgroundColor = "#000";
    document.body.style.backgroundImage =
      "url('/style/backgrounds/After_Dark_Flying_Toasters.png')";
    document.body.style.backgroundSize = "auto";
    return;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setBackground();
  const windowBars = Array.from(document.getElementsByClassName("window-bar"));
  for (const bar of windowBars) {
    const buttons = document.createElement("div");
    buttons.className = "window-buttons";
    const classes = ["button-minimize", "button-maximize", "button-close"];
    for (const className of classes) {
      const button = document.createElement("div");
      button.className = className;
      buttons.appendChild(button);
    }
    bar.appendChild(buttons);
  }
  if (window.location.host === "mew151.neocities.org") {
    const style = document.createElement("style");
    style.innerHTML = ".only-neocities {display: block !important;}";
    style.innerHTML += ".only-mew151net {display: none !important;}";
    document.head.appendChild(style);
  }
});
