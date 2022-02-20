function setBackground(hour) {
  const date = new Date();

  const code = (date.getMonth()+1) + "/" + (date.getDate());
  const specialDates = [
    '1/1', // new year
    '1/5', // shion day
    '1/18', // mlk day
    '1/21', // takane day
    '1/26', // website birthday
    '2/5', // dorothy + leona day
    '2/18',  // website relaunch birthday
    '2/19', // legacy saturday
    '2/29', // leap day
    '3/3', // hinamatsuri
    '3/17', // st. patrick's day
    '3/21', // falulu day, spring
    '3/29', // hardy fox day
    '4/1', // april foolz
    '4/13', // in between dreams :)
    '4/19', // me birthday
    '5/4', // ??? birthday
    '5/6', // world accordion day
    '6/6', // aroma day
    '6/12', // konomi day
    '6/21', // summer solstice
    '7/4', // AX weekend day (lol)
    '7/25', // ??? birthday
    '7/30', // sophie day
    '8/1', // mahjong day
    '8/8', // mia day
    '8/11', // fuwari day
    '8/14', // bio3 prologue day
    '8/21', // bio3 start day
    '9/3', // aira + rizumu day
    '9/13', // mata nui day
    '9/21', // do you remember?
    '10/1', // mirei day
    '10/4', // ??? birthday
    '10/30', // halloween eve
    '10/31', // halloween
    '11/11', // ii pocky day
    '11/20', // lala day
    '12/21', // winter solstice
    '12/24', // christmas eve
    '12/25', // christmas
    '12/26', // boxing day
    '12/31', // new yearz eve
  ];
  if (specialDates.includes(code)) {
    const offset = date.getYear() + specialDates.indexOf(code) + date.getDate();
    const backgrounds = [
      '/style/backgrounds/checker.png',
      '/style/backgrounds/diamonds.png',
      '/style/backgrounds/grid.png',
      '/style/backgrounds/lodge.png',
      '/style/backgrounds/purple.png'
    ];
    let bg = backgrounds[offset % backgrounds.length];
    document.querySelector("body").style.backgroundImage = "url('" + bg + "')";
    document.querySelector("body").style.backgroundSize = "auto";
    return;
  }

  const minutes = date.getMinutes();
  const hours = hour ?? date.getHours();
  if ((hours >= 18 && hours < 19) || hours === 6 ) {
    document.querySelector("body").style.backgroundImage = "linear-gradient(#000, #110058, orangered)";
    return;
  } else if ((hours >= 19 && hours < 23) || hours === 5) {
    document.querySelector("html").style.backgroundColor = "#000";
    document.querySelector("body").style.backgroundImage = "url('/style/backgrounds/stars.png')";
    document.querySelector("body").style.backgroundSize = "auto";
    return;
  } else if (hours === 4 && minutes === 44) {
    document.querySelector("html").style.backgroundColor = "#000";
    document.querySelector("body").style.backgroundImage = "url('/style/backgrounds/giygas.png')";
    document.querySelector("body").style.backgroundSize = "auto";
    return;
  } else if (hours >= 23 || hours <= 4) {
    document.querySelector("html").style.backgroundColor = "#000";
    document.querySelector("body").style.backgroundImage = "url('/style/backgrounds/After_Dark_Flying_Toasters.png')";
    document.querySelector("body").style.backgroundSize = "auto";
    return;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setBackground();
  const windowBars = document.getElementsByClassName('window-bar');
  for (const bar of windowBars) {
    const buttons = document.createElement('div');
    buttons.className = 'window-buttons';
    const classes = ['button-minimize', 'button-maximize', 'button-close'];
    for (const className of classes) {
      const button = document.createElement('div');
      button.className = className;
      buttons.appendChild(button);
    }
    bar.appendChild(buttons);
  }
  if (window.location.host === "mew151.neocities.org") {
    const style = document.createElement("style");
    style.innerHTML = ".only-neocities {display: block !important;}";
    document.head.appendChild(style);
  }
});
