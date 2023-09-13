if (window.NeoQuiz) {
  const quiz = new NeoQuiz({
    metadata: {
      title: "What kind of accordion are you?",
      description:
        "There are many different types of accordions out there! Piano accordions, chromatic button accordions, diatonic button accordions, and probably more! All of these can have different configurations as well! Why not take a quiz to find out what kind of accordion YOU are?!",
      image: "quiz/images/title.jpg",
      altText:
        "Two different types of accordions: A free bass piano accordion and a russian bayan accordion.",
      imageAttribution:
        '<a href="https://commons.wikimedia.org/wiki/File:A_convertor_free-bass_piano-accordion_and_a_Russian_bayan.jpg">Photo</a> by Henry Doktorski / <a href="https://creativecommons.org/licenses/by-sa/3.0/deed.en">CC BY-SA 3.0</a>',
    },
    questions: [
      {
        title:
          "You're invited to a potluck party! What kind of food do you bring?",
        image: "quiz/images/Concert_Chromatic_Accordion.jpeg",
        imageAttribution:
          '<a href="https://commons.wikimedia.org/wiki/File:Concert_Chromatic_Accordion.jpeg" target="_blank">Photo</a> by Frncdnd / <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.en" target="_blank">CC-BY-SA 4.0</a>',
        altText: "A chromatic button accordion",
        answers: [
          {
            text: "Just some chips or another kind of salty snack.",
            values: {
              piano: 1.5,
              stradella: 2,
            },
          },
          {
            text: "I'm going to bring the booze!",
            values: {
              freebass: 1,
              concertina: 2,
              bsystem: 1,
              csystem: 0.5,
              stradella: 0.5,
            },
          },
          {
            text: "I found a new recipe online I want to make!",
            values: {
              csystem: 1,
              bsystem: 1,
              freebass: 1,
            },
          },
          {
            text: "I'm going to make my old family recipe.",
            values: {
              bsystem: 1,
              csystem: 0.5,
              diatonic: 2,
              stradella: 1,
            },
          },
          {
            text: "Soda pop.",
            values: {
              stradella: 1,
              csystem: 1,
              piano: 1,
            },
          },
          {
            text: "I'll just bring plates/cups/napkins/etc...",
            values: {
              csystem: 2,
              piano: 1,
              stradella: 2,
            },
          },
          {
            text: "Nothing.",
            values: {
              toy: 2,
              freebass: 0.5,
              concertina: 0.5,
            },
          },
        ],
      },
      {
        title:
          "If you had to enroll in a music program in school, what would you want to take?",
        image: "quiz/images/Tabanyi_Mihaly_Hohner_Gola_Accordion.jpg",
        imageAttribution:
          '<a href="https://commons.wikimedia.org/wiki/File:Tab%C3%A1nyi_Mih%C3%A1ly_Hohner_Gola_Accordion.jpg" target="_blank">Photo</a> by Matepyt / <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.en" target="_blank">CC-SA-BY 4.0</a>',
        altText: "A Hohner piano accordion",
        answers: [
          {
            text: "Marching Band! (And yes, I'm definitely going to band camp too!)",
            values: {
              stradella: 2,
              piano: 1,
              toy: 1,
              csystem: 0.5,
            },
          },
          {
            text: "Concert Band. I wish to play in a classical ensemble.",
            values: {
              piano: 2,
              csystem: 0.5,
              stradella: 1,
            },
          },
          {
            text: "Jazz Band! I am going to play the lick.",
            values: {
              bsystem: 1,
              csystem: 1,
              freebass: 2,
            },
          },
          {
            text: "Music Theory. I want to learn all those music terms.",
            values: {
              csystem: 2,
              bsystem: 1,
            },
          },
          {
            text: "I want to learn how to make digital music!",
            values: {
              diatonic: 2,
            },
          },
          {
            text: "I am going to drop out lmao",
            values: {
              toy: 2,
              concertina: 0.5,
            },
          },
        ],
      },
      {
        title: "What kind of keyboard layout do you use on your computer?",
        image: "quiz/images/508px-Kouvola_Casotto_Accordion.jpg",
        imageAttribution:
          '<a href="https://commons.wikimedia.org/wiki/File:Kouvola_Casotto_Accordion.jpg" target="_blank">Photo</a> by Tetopa / <a href="https://creativecommons.org/licenses/by/3.0/deed.en" target="_blank">CC-BY-3.0</a>',
        altText: "A chromatic button accordion",
        answers: [
          {
            text: "QWERTY",
            values: {
              piano: 2,
              stradella: 1.5,
            },
          },
          {
            text: "QWERTZ",
            values: {
              bsystem: 1.75,
              csystem: 1,
            },
          },
          {
            text: "AZERTY",
            values: {
              csystem: 2,
              stradella: 1.5,
            },
          },
          {
            text: "DVORAK",
            values: {
              csystem: 1.5,
              bsystem: 1.5,
              freebass: 0.5,
              stradella: 0.5,
            },
          },
          {
            text: "COLEMAK",
            values: {
              freebass: 1.5,
              bsystem: 1.75,
              csystem: 1.25,
              concertina: 0.5,
            },
          },
          {
            text: "I mainly use my phone (or voice to text) these days",
            values: {
              diatonic: 1.75,
              piano: 0.75,
              stradella: 1,
            },
          },
          {
            text: "I only communicate through semaphores.",
            values: {
              concertina: 2,
              toy: 1,
            },
          },
          {
            text: "Other (these layouts are all English-centric!)",
            values: {
              diatonic: 1.5,
              bsystem: 1.5,
              csystem: 1.5,
              freebass: 1.5,
            },
          },
        ],
      },
      {
        title:
          "It's karaoke night and it's your turn to sing! What kind of song are you going to sing?",
        image: "quiz/images/bellows_shake_meme.png",
        altText:
          'Meme of people at a party. An accordionist is sitting in the corner and thinking "They don\'t know how hard the bellow shake is"',
        answers: [
          {
            text: "Classic Rock",
            values: {
              piano: 2,
              stradella: 2,
            },
          },
          {
            text: "The Latest Pop Music",
            values: {
              diatonic: 2,
            },
          },
          {
            text: "A song from my favorite show/game",
            values: {
              piano: 1.5,
            },
          },
          {
            text: "Sea Shanty",
            values: {
              concertina: 3,
            },
          },
          {
            text: "A song that lets me show off my voice",
            values: {
              freebass: 1,
              csystem: 1,
              bsystem: 1,
            },
          },
          {
            text: 'Rick Astley\'s "Never Gonna Give You Up"',
            values: {
              stradella: 1,
              piano: 1.5,
              csystem: 0.5,
              toy: 3,
            },
          },
        ],
      },
      {
        title:
          'Continuing with the karaoke theme, how would you... "direct" karaoke night?',
        image: "quiz/images/Soinu_txikia_edo_trikitixa.jpg",
        imageAttribution:
          '<a href="https://commons.wikimedia.org/wiki/File:Soinu_txikia_edo_trikitixa.jpg" target="_blank"> by Soinuenea / <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.en" target="_blank">CC-BY-SA 4.0</a>',
        altText: "An old diatonic accordion",
        answers: [
          {
            text: "I make sure we all plan multiple songs ahead so all the songs flow together.",
            values: {
              csystem: 2,
              bsystem: 1,
              stradella: 1.5,
            },
          },
          {
            text: "I don't care about any kind of \"flow\" when it comes to the songs. I'll sing whatever I want, whenever!",
            values: {
              piano: 1,
              diatonic: 2,
              freebass: 1,
            },
          },
          {
            text: "I will pick bad songs to ruin the night",
            values: {
              toy: 2,
            },
          },
          {
            text: "I will only pick sea shanties",
            values: {
              concertina: 2,
            },
          },
        ],
      },
      {
        title: "Pick a SpongeBob Squarepants character.",
        image: "quiz/images/spongebob.jpg",
        altText:
          "Characters from Spongebob Squarepants: Mr. Krabs, Patrick Star, Spongebo Squarepants, Sandy Cheeks, Squidward.",
        answers: [
          {
            text: "Spongebob Squarepants",
            values: {
              piano: 2,
              stradella: 1.5,
            },
          },
          {
            text: "Squidward Tentacles",
            values: {
              csystem: 0.5,
              bsystem: 2,
            },
          },
          {
            text: "Patrick Star",
            values: {
              piano: 1,
              diatonic: 1,
            },
          },
          {
            text: "Sandy Cheeks",
            values: {
              csystem: 2,
              stradella: 1,
            },
          },
          {
            text: "Plankton",
            values: {
              freebass: 1,
              diatonic: 2,
              toy: 0.5,
            },
          },
          {
            text: "Mr. Krabs",
            values: {
              concertina: 2,
              diatonic: 1,
            },
          },
          {
            text: "The Realistic Fish Head",
            values: {
              toy: 3,
            },
          },
          {
            text: "I don't know any of these characters",
            values: {},
          },
        ],
      },
      {
        title: "Where would you like to go on vacation?",
        image: "quiz/images/quiz.png",
        imageAttribution:
          '<a href="https://twitter.com/DollipDaze/status/1279112751990833154" target="_blank">Tweet by @DollipDaze</a>',
        altText: `Tweet from @DollipDaze:
every single "what avatar element are you" personality quiz is like
question 1. where would you like to go on vacation?
A). a place with lots of fire
B). a place with lots of water
C). a place with lots of earth
D). a place with lots of air`,
        answers: [
          {
            text: "A place with lots of fire",
            values: {
              diatonic: 1,
            },
          },
          {
            text: "A place with lots of water",
            values: {
              csystem: 1,
              concertina: 1,
            },
          },
          {
            text: "A place with lots of earth",
            values: {
              piano: 1.5,
            },
          },
          {
            text: "A place with lots of air",
            values: {
              bsystem: 1,
              toy: 0.5,
            },
          },
        ],
      },
      {
        title: "Did you enjoy the quiz?",
        shuffleAnswers: false,
        image: "quiz/images/random-anime-screenshot.png",
        altText: "The Pair Friends from Pretty Rhythm Rainbow Live",
        answers: [
          "Yes. ^.^",
          "It was fine...",
          {
            text: "Why do all internet quizzes have these kinds of questions at the end? Does this affect my score? Why do you people put these here???? WHY????",
            values: {
              toy: 0.25,
            },
          },
        ],
      },
    ],
    results: [
      {
        id: "piano_stradella",
        name: "Piano Accordion",
        image: "quiz/images/results/piano_stradella.png",
        description:
          "You are a piano accordion, with the standard stradella bass system! The right (treble) side of the accordion uses a standard piano layout, letting anyone who knows how to play piano pick it up pretty quickly. The left (bass) side of the accordion uses the stradella bass system, which is the standard bass system on accordions responsible for the trademark \"oom-pah-pah\" sound you hear. Overall, a pretty standard accordion, but there's a reason why it's so popular!",
      },
      {
        id: "piano_freebass",
        name: "Piano Accordion with Free Bass",
        image: "quiz/images/results/piano_freebass.png",
        description:
          "You are a piano accordion, but with free bass on the left side! The right (treble) side of the accordion uses a standard piano layout, letting anyone who knows how to play piano pick it up pretty quickly. The left side uses a free bass system. This is different from the more standard stradella bass system, but it makes the instrument a lot more versatile. This instrument probably much has the range of a full size piano. It is a lot harder to play though.",
      },
      {
        id: "piano_converter",
        name: "Piano Accordion (Free Bass Converter)",
        image: "quiz/images/results/piano_converter.png",
        description:
          "You are a piano accordion with free bass converter registers! The right (treble) side of the accordion uses a standard piano layout, letting anyone who knows how to play piano pick it up pretty quickly. The left (bass) side has registers for both the stradella bass system and the free bass system. You can switch between them with a press of a button! These types of accordions tend to be pricier, but they're incredibly versatile.",
      },
      {
        id: "csystem_stradella",
        name: "Chromatic Button Accordion, C-System",
        image: "quiz/images/results/csystem_stradella.png",
        description:
          'You are a chromatic button accordion! On the right (treble) side of the instrument, the buttons are arranged with the C-system. This system is closer to that of a piano keyboard. Chromatic button accordions can fit more buttons than a piano accordion, and their buttons are arranged in a systematic way that makes playing certain phrases easier than a piano. This accordion uses the stradella bass system on the left side, which is the standard bass system on accordions responsible for the trademark "oom-pah-pah" sound you hear. ',
      },
      {
        id: "csystem_freebass",
        name: "Chromatic Button Accordion, C-System (Free Bass)",
        image: "quiz/images/results/csystem_freebass.png",
        description:
          "You are a chromatic button accordion! On the right (treble) side of the instrument, the buttons are arranged with the C-system. This system is closer to that of a piano keyboard. Chromatic button accordions can fit more buttons than a piano accordion, and their buttons are arranged in a systematic way that makes playing certain phrases easier than a piano. This accordion uses a combination of the free bass system and the stradella bass system. The first few rows are free bass, while the rest are stradella bass. This is an uncommon arrangement, but gives a lot of versatility to the instrument!",
      },
      {
        id: "csystem_converter",
        name: "Chromatic Button Accordion, C-System (Free Bass Converter)",
        image: "quiz/images/results/csystem_converter.png",
        description:
          "You are a chromatic button accordion! On the right (treble) side of the instrument, the buttons are arranged with the C-system. This system is closer to that of a piano keyboard. Chromatic button accordions can fit more buttons than a piano accordion, and their buttons are arranged in a systematic way that makes playing certain phrases easier than a piano. The left (bass) side has registers for both the stradella bass system and the free bass system. You can switch between them with a press of a button! These types of accordions tend to be pricier, but they're incredibly versatile.",
      },
      {
        id: "bsystem_stradella",
        name: "Chromatic Button Accordion, B-System",
        image: "quiz/images/results/bsystem_stradella.png",
        description:
          'You are a chromatic button accordion! On the right (treble) side of the instrument, the buttons are arranged with the B-system. This system (also sometimes called "The Bayan System") makes playing chromatic phrases particularly easy. Chromatic button accordions can fit more buttons than a piano accordion, and their buttons are arranged in a systematic way that makes playing certain phrases easier than a piano. This accordion uses the stradella bass system on the left side, which is the standard bass system on accordions responsible for the trademark "oom-pah-pah" sound you hear.',
      },
      {
        id: "bsystem_freebass",
        name: "Chromatic Button Accordion, B-System (Free Bass Converter)",
        image: "quiz/images/results/bsystem_converter.png",
        description:
          'You are a chromatic button accordion! On the right (treble) side of the instrument, the buttons are arranged with the B-system. This system (also sometimes called "The Bayan System") makes playing chromatic phrases particularly easy. Chromatic button accordions can fit more buttons than a piano accordion, and their buttons are arranged in a systematic way that makes playing certain phrases easier than a piano. The left (bass) side has registers for both the stradella bass system and the free bass system. You can switch between them with a press of a button! These types of accordions tend to be pricier, but they\'re incredibly versatile.',
      },
      {
        id: "bsystem_converter",
        name: "Chromatic Button Accordion, B-System (Free Bass Converter)",
        image: "quiz/images/results/bsystem_converter.png",
        description:
          'You are a chromatic button accordion! On the right (treble) side of the instrument, the buttons are arranged with the B-system. This system (also sometimes called "The Bayan System") makes playing chromatic phrases particularly easy. Chromatic button accordions can fit more buttons than a piano accordion, and their buttons are arranged in a systematic way that makes playing certain phrases easier than a piano. The left (bass) side has registers for both the stradella bass system and the free bass system. You can switch between them with a press of a button! These types of accordions tend to be pricier, but they\'re incredibly versatile.',
      },
      {
        id: "diatonic",
        name: "Diatonic Button Accordion",
        image: "quiz/images/results/diatonic.png",
        description:
          "You are a Diatonic Button Accordion! Diatonic button accordions are smaller than other kinds of accordions, but they're more versatile than you think! On other types of accordions, pressing one key or button will always play the same note, regardless of whether you are pushing or pulling on the bellows. On diatonic button accordions, different notes are played depending on which direction you're going, allowing for more notes to be fit into a smaller accordion.",
      },
      {
        id: "concertina",
        name: "Concertina",
        image: "quiz/images/results/concertina.png",
        description:
          "You are a concertina! This is a small accordion-like instrument. Now go sail the seven seas, matey! Arrrr...",
      },
      {
        id: "toy",
        name: "Toy Accordion",
        image: "quiz/images/results/toy.png",
        description: "You are silly and live for chaos.",
      },
      {
        id: "fire",
        name: "Fire",
        description:
          "Your Avatar element is Fire! Hey wait... this is an accordion quiz... how did you get this result?",
      },
    ],
  });
  quiz.addResultFunction((r, v) => {
    const piano = v.get("piano") ?? 0;
    const bsystem = v.get("bsystem") ?? 0;
    const csystem = v.get("csystem") ?? 0;
    const diatonic = v.get("diatonic") ?? 0;
    const concertina = v.get("concertina") ?? 0;
    const toy = v.get("toy") ?? 0;
    const stradella = v.get("stradella") ?? 0;
    const freebass = v.get("freebass") ?? 0;
    const nonjokes = piano + bsystem + csystem + diatonic;
    if (concertina >= nonjokes && concertina > toy) {
      return r.find((result) => result.id === "concertina") ?? null;
    }
    if (toy >= nonjokes) {
      return r.find((result) => result.id === "toy") ?? null;
    }
    const chromatic_button = (bsystem + csystem) / 2;
    if (diatonic >= piano && diatonic >= chromatic_button) {
      if (
        (diatonic > piano && diatonic > chromatic_button) ||
        Math.random() > 0.5
      ) {
        return r.find((result) => result.id === "diatonic") ?? null;
      }
    }
    let id;
    const potential_ids = [];
    if (piano >= bsystem && piano >= csystem) {
      potential_ids.push("piano");
    }
    if (bsystem >= piano && bsystem >= csystem) {
      potential_ids.push("bsystem");
    }
    if (csystem >= piano && csystem >= bsystem) {
      potential_ids.push("csystem");
    }
    id = potential_ids[Math.floor(Math.random() * potential_ids.length)];
    const subtype_deviation = Math.abs(stradella - freebass) / 2;
    if (subtype_deviation < 1.5) {
      id += "_converter";
    } else {
      if (stradella > freebass) {
        id += "_stradella";
      } else {
        id += "_freebass";
      }
    }
    return r.find((result) => result.id === id) ?? null;
  });
  (() => {
    document.addEventListener("DOMContentLoaded", () => {
      quiz.bindTo(document.getElementById("quiz"));
    });
  })();
}
