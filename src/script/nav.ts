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
      name: "~mew151.net/",
      icon: "/img/nav/motif/folder_home.png",
      items: [
        {
          icon: "/img/nav/motif/penguin.png",
          name: "Homepage",
          link: "/index.html",
        },
        {
          icon: "/img/nav/motif/generic-pc.png",
          name: "About",
          link: "/about.html",
        },
        {
          icon: "/img/nav/motif/Palm-m500-icon.png",
          name: "Posts",
          link: "/journal.html",
        },
        {
          icon: "/img/nav/motif/folder-download.png",
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
          icon: "/img/nav/motif/terminal.png",
          name: "Cyberspace",
          link: "/cyber",
        },
        {
          icon: "/img/nav/motif/Cartoon_Disk_Pink_1_32x32x8.png",
          name: "Random Stuff",
          link: "/random",
        },
        {
          icon: "/img/nav/motif/applications-internet.png",
          name: "Links",
          link: "/links.html",
        },
        {
          icon: "/img/nav/motif/edit-find.png",
          name: "Sitemap",
          link: "/sitemap.html",
        },
      ],
    },
    {
      name: "sub-sites/",
      icon: "/img/nav/motif/folder.png",
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
          icon: "/img/nav/motif/GameBoy_3_1_32x32x8.png",
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
      name: "external-links/",
      icon: "/img/nav/motif/folder_html.png",
      items: [
        {
          icon: "/img/nav/motif/Gravis-Joystick-icon.png",
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
      header.innerHTML = `<strong>${section.name}</strong>`;
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
