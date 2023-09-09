function addSkipLink(element: Element | null) {
  if (element) {
    const link = document.createElement("a");
    link.className = "skiplink";
    link.innerText = "Skip Navigation";
    link.href = "#main";
    link.tabIndex = 0;
    link.onfocus = () => {
      link.style.position = "static";
    };
    element.after(link);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const maybePluralizeWithZ = (str: string): string => {
    if (!str.endsWith("s") || Math.random() < 0.9) {
      return str;
    }
    return str.substring(0, str.length - 1) + "z";
  };
  const navigation = [
    {
      name: "Main Website",
      items: [
        {
          icon: "/img/nav/msie1-1.png",
          name: "Homepage",
          link: "/index.html",
        },
        {
          icon: "/img/nav/monitor_moon.png",
          name: "About",
          link: "/about.html",
        },
        {
          icon: "/img/nav/journal.png",
          name: "Journal",
          link: "/journal.html",
        },
        {
          icon: "/img/nav/html2-2.png",
          name: "Shrines",
          link: "/shrines.html",
        },
        // {
        //   icon: "/img/nav/cd_audio_cd-0.png",
        //   name: "Music",
        //   link: "/music.html",
        // },
        {
          icon: "/img/nav/accordion.png",
          name: "Accordion",
          link: "/accordion",
        },
        {
          icon: "/img/nav/console_prompt-0.png",
          name: "Cyberspace",
          link: "/cyber",
        },
        {
          icon: "/img/nav/recycle_bin_full-0.png",
          name: "Random Stuff",
          link: "/random",
        },
        {
          icon: "/img/nav/connected_world-0.png",
          name: "Links",
          link: "/links.html",
        },
        {
          icon: "/img/nav/help_book_cool-4.png",
          name: "Sitemap",
          link: "/sitemap.html",
        },
      ],
    },
    {
      name: "Sub-Sites",
      items: [
        {
          icon: "/img/nav/eve.png",
          name: "{ bios }",
          link: "/subsite/bios.html",
        },
        {
          icon: "/img/nav/hac.png",
          name: "Home Age Conversations",
          link: "/subsite/hac.html",
        },
        {
          icon: "/img/nav/joystick_alt-0.png",
          name: "Natalie's Gamez Archive",
          link: "/subsite/games.html",
        },
        {
          icon: "/img/nav/blog.png",
          name: "Perfect Pop Star Academy",
          link: "/subsite/blog.html",
        },
      ],
    },
    {
      name: "Find Me Elsewhere",
      items: [
        {
          icon: "/img/nav/joystick-4.png",
          name: "Itch.io",
          link: "https://meisekimiu.itch.io",
        },
        {
          icon: "/img/nav/github.png",
          name: "Github",
          rel: "me",
          link: "https://github.com/meisekimiu",
        },
      ],
    },
  ];

  const nav = document.getElementsByTagName("nav")[0];
  if (nav) {
    nav.innerHTML = "";
    let skipLinkAdded = false;
    for (const section of navigation) {
      const header = document.createElement("div");
      header.className = "navigation-header";
      header.innerHTML = `<strong>${section.name}</strong><hr />`;
      if (!skipLinkAdded) {
        addSkipLink(header.firstElementChild);
        skipLinkAdded = true;
      }
      nav.appendChild(header);
      const body = document.createElement("div");
      body.className = "navigation-group";
      for (const item of section.items) {
        const link = document.createElement("a");
        let href = item.link;
        link.setAttribute("href", href);
        if (item.rel) {
          link.setAttribute("rel", item.rel);
        }
        const container = document.createElement("div");
        container.className = "icon";
        const icon = document.createElement("img");
        let src = item.icon;
        icon.setAttribute("src", src);
        icon.setAttribute("alt", item.name);
        container.appendChild(icon);
        const text = document.createElement("span");
        text.innerText = maybePluralizeWithZ(item.name);
        container.appendChild(text);
        link.appendChild(container);
        body.appendChild(link);
      }
      nav.appendChild(body);
    }
  } else {
    // No nav found
  }
});
