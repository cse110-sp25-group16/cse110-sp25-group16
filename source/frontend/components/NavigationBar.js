class NavigationBar extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    const bgImg = this.getAttribute("bgImg");

    // Style
    const style = document.createElement("style");
    style.textContent = `
      nav {
        background-image: url("${bgImg}");
        color: white;
        padding-left: 1.5em;
        padding-right: 1.5em;
        padding-top: 1em;
        padding-bottom: 1em;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: sans-serif;
      }

      .brand {
        font-weight: bold;
        font-size: 2em;
        padding: 0em;
        font-family: "Noto Serif", serif;
        background-color: rgba(15, 16, 28, 0.52);
      }
    
      .links {
        display: flex;
        margin-left: auto;
      }

      .links a {
        color: white;
        font-size: 1.5em;
        margin-left: 1.5em;
        padding: 0em;
        text-decoration: none;
        font-family: "Noto Serif", serif;
        background-color:rgba(15, 16, 28, 0.52);
      }

      .links a:hover {
        text-decoration: underline;
      }
    `;

    // Template
    const nav = document.createElement("nav");

    const brand = document.createElement("div");
    brand.classList.add("brand");
    brand.textContent = "Pocket Diviner";

    const links = document.createElement("div");
    links.classList.add("links");

    const rawLinks = this.getAttribute("links");

    console.log("rawlinks:" + rawLinks);

    if (rawLinks) {
      try {
        const linkArray = JSON.parse(rawLinks);
        linkArray.forEach((link) => {
          const a = document.createElement("a");
          a.href = link.href;
          a.textContent = link.label;
          links.appendChild(a);
        });
      } catch (err) {
        console.error("Invalid links JSON:", rawLinks, err);
      }
    }

    nav.appendChild(brand);
    nav.appendChild(links);
    shadow.appendChild(style);
    shadow.appendChild(nav);
  }
}

customElements.define("navigation-bar", NavigationBar);
