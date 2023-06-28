// This is very much copy/pasted from messy PHP code I wrote over 10 years ago.
// I apologize for how bad this looks.

const uname1 = [
  "The",
  "Kawaii",
  "Chibi",
  "Desu",
  "Neko",
  "Nani",
  "Nya",
  "Baka",
  "Ai",
  "Sakura",
  "Rawr",
  "Rainbow",
  "Deco",
  "Lolita",
  "Gohan",
  "Otaku",
  "Domo",
  "Cool",
  "Crazy",
  "Anime",
  "Manga",
  "Gamer",
  "i",
  "Royal",
  "Super",
  "Cute",
  "Kitsune",
  "Love",
  "Violent",
  "Japan",
  "Nihon",
  "1337",
  "Party",
  "Sugoi",
  "School",
  "You",
  "J",
  "Sushi",
  "Japanese",
  "Mighty",
  "Strawberry",
  "Ichigo",
  "Ichi",
  "Victory",
  "San",
  "Zero",
  "Lol",
  "Rofl",
  "omg",
  "zomg",
  "nico",
  "kira",
  "X",
  "Fanfic",
  "Japan",
  "Video",
  "Demon",
  "Hentai",
  "Ecchi",
  "Ero",
  "Twilight",
  "Digital",
  "Mega",
  "Pantsu",
  "Tentacle",
  "Juicy",
  "Inuyasha",
  "Sonic",
  "Naruto",
  "Bleach",
  "Vocaloid",
  "Miku",
  "Pokemon",
  "Pikachu",
  "Kawaii",
  "Moshi",
  "Sailor",
  "Sexy",
  "Alpaca",
  "Creamy",
  "Juicy",
  "Ramen",
  "Cutey",
  "Pretty",
  "Epic",
  "Trashy",
  "Your",
  "Le",
  "Sussy",
  "Hashtag",
  "Dreamy",
  "Bocchi",
  "No",
  "Wonder",
  "Arch",
  "Ita",
  "Aho",
  "Angelic",
  "Non",
  "Yuru",
  "Strong",
  "Anti",
  "Pro",
  "Tamagotchi",
  "Lovely",
  "Za",
  "Solar",
  "Spooky",
  "Under",
  "Tokyo",
  "Kyoto",
  "Nippon",
  "Akiba",
];

const uname2 = [
  "Neko",
  "Kawaii",
  "Nya",
  "The",
  "Hoshi",
  "Yume",
  "Koi",
  "Sakura",
  "Rawr",
  "Rainbow",
  "Aishiteru",
  "Fashion",
  "Otaku",
  "Domo",
  "Yaoi",
  "Yuri",
  "Henshin",
  "Cupcake",
  "Cookie",
  "Anime",
  "Manga",
  "8-Bit",
  "Cute",
  "Kitsune",
  "Love",
  "Mad",
  "Insane",
  "Japan",
  "Nihon",
  "Party",
  "Sugoi",
  "Dojo",
  "Sushi",
  "Seppuku",
  "Zero",
  "OMG",
  "zOMG",
  "LOL",
  "Power",
  "Nico",
  "Kira",
  "Desu",
  "Spy",
  "Chainsaw",
  "Time",
  "Sparkle",
  "Dash",
  "Pony",
  "Hentai",
  "Ero",
  "Pantsu",
  "Tentacle",
  "Nihon",
  "Pinku",
  "Faith",
  "Hatsune",
  "Rose",
  "Pokemon",
  "chu",
  "Yaoi",
  "Moshi",
  "Panda",
  "Taco",
  "Random",
  "Vampire",
  "Moon",
  "Gir",
  "Pocky",
  "Ramune",
  "Universe",
  "Justice",
  "Crystal",
  "Rush",
  "Trash",
  "Waifu",
  "Sussy",
  "Gaming",
  "Denpa",
  "Tokimeki",
  "Dance",
  "Gay",
  "Trans",
  "Homosexual",
  "Queer",
  "Ace",
  "Computer",
  "Techno",
  "Cyber",
  "Osu",
  "Dreamy",
  "Pilled",
  "Vapor",
  "Neo",
  "Punch",
  "Nintendo",
  "Swan",
  "Linux",
  "Clueless",
  "Effervescent",
  "Non",
  "Gender",
  "Web",
  "Stardust",
  "Cringe",
  "Mew",
];

const uname3 = Array.from(
  new Set([
    "Guy",
    "Boy",
    "Dude",
    "Nya",
    "King",
    "Prince",
    "Kun",
    "Sama",
    "San",
    "Senpai",
    "Otaku",
    "Person",
    "God",
    "Sensei",
    "Man",
    "Being",
    "Wolf",
    "Neko",
    "Dog",
    "Inu",
    "Kitsune",
    "Noob",
    "Warrior",
    "Ninja",
    "Samurai",
    "Bishonen",
    "Shonen",
    "Pirate",
    "Captain",
    "Lover",
    "Fighter",
    "Master",
    "P",
    "Pony",
    "Bro",
    "Fan",
    "Hedgehog",
    "Clown",
    "Jo",
    "Trash",
    "Sucks",
    "Impostor",
    "Crewmate",
    "Kuma",
    "Usagi",
    "Maid",
    "Tan",
    "Girl",
    "Gal",
    "Lady",
    "Queen",
    "Princess",
    "Chan",
    "Tan",
    "Nya",
    "Sama",
    "San",
    "Senpai",
    "Otaku",
    "Person",
    "God",
    "Sensei",
    "Woman",
    "Being",
    "Wolf",
    "Neko",
    "Cat",
    "Dog",
    "Inu",
    "Kitsune",
    "Noob",
    "Warrior",
    "Ninja",
    "Geisha",
    "Maiko",
    "Bishoujo",
    "Shoujo",
    "Pirate",
    "Captain",
    "Lover",
    "Fighter",
    "Imouto",
    "Pony",
    "Fan",
    "Chan",
    "Moon",
    "Gem",
    "Trash",
    "Hime",
    "Sucks",
    "Nexus",
    "Gamer",
    "Sister",
    "Brother",
    "Sibling",
    "Catgirl",
    "Catboy",
    "Foxgirl",
    "Fox",
    "Idol",
    "Wave",
    "Core",
    "Rock",
    "Yippee",
    "City",
    "Creature",
    "Gentleman",
    "Lord",
    "Crusader",
    "Adventure",
    "Punk",
    "Nerd",
  ])
);

const rand = (min: number, max: number) =>
  Math.floor(min + Math.random() * (max - min + 1));

const strrev = (str: string) => str.split("").reverse().join("");

const str_repeat = (str: string, times: number) =>
  new Array(times).fill(str).join("");

const generateXs = (username: string, forced: boolean = false) => {
  if (!rand(0, 6) || forced) {
    let last = 0;
    let xes = "";
    const num = rand(1, 3);
    for (let i = 0; i < num; i++) {
      xes += rand(0, 3) ? (last ? "X" : "x") : rand(0, 1) ? "x" : "X";
    }
    const glue = rand(0, 1) ? "_" : rand(0, 3) ? "__" : "";
    return xes + glue + username + glue + strrev(xes);
  }
  return username;
};

const generateUsername = (useXs: boolean = false) => {
  let flag1 = true,
    flag2 = true;
  let username = "";
  const glue = rand(0, 1) ? "_" : !rand(0, 3) ? "-" : "";
  const suffix = rand(0, 3)
    ? ""
    : rand(0, 3)
    ? str_repeat(rand(1, 9).toString(), rand(1, 5))
    : rand(1, 65535);
  if (rand(0, 5)) {
    username += uname1[rand(0, uname1.length - 1)] + glue;
    flag1 = false;
  }
  if (!rand(0, 256)) {
    // Remember how someone changed their middle name to this
    username += "Nicomaki";
  } else {
    username += uname2[rand(0, uname2.length - 1)];
  }
  if (rand(0, 11)) {
    username += glue + uname3[rand(0, uname3.length - 1)];
    flag2 = false;
  }
  if ((flag1 && flag2) || useXs) {
    username += rand(0, 3)
      ? str_repeat(rand(1, 9).toString(), rand(1, 5))
      : rand(1, 65535);
    username = generateXs(username, true);
  } else {
    if (rand(0, 12) || username.length >= 32) {
      if (rand(0, 10)) {
        username += suffix;
      } else {
        // NEW FEATURE! Add random year from 1990-2006
        username += rand(1990, 2006).toString();
      }
      username = generateXs(username);
    } else {
      // NEW FEATURE! Old Discord style usernames:
      username += "#" + rand(0, 9999).toString().padStart(4, "0");
    }
  }
  if (rand(0, 1000) === 42) {
    username = "I AM NOT A WEEABOO!!!11!";
  }
  return username;
};

// End PHP port nightmare

const fillUsernames = () => {
  const container = document.getElementById("results");
  if (container) {
    container.innerHTML = "";
    for (let i = 0; i < 21; i++) {
      const username = document.createElement("div");
      username.className = "username";
      username.innerHTML = generateUsername();
      container.appendChild(username);
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  fillUsernames();
  document
    .getElementById("generate-button")
    ?.addEventListener("click", fillUsernames);
  const copyright = document.getElementById("copyright");
  if (copyright) {
    const currentYear = new Date().getFullYear();
    copyright.innerHTML = `&copy; 2013-${currentYear} <del>Mew151</del> <strong><ins>${generateUsername(
      true
    )}</ins></strong> all kawaiis belong to their rightful owners`;
  }
});
