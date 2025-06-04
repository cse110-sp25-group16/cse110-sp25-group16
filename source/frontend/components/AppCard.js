class AppCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const shadow = this.shadowRoot;

    const icon = this.getAttribute("icon") || "";
    const title = this.getAttribute("title") || "App Title";
    const description =
      this.getAttribute("description") || "App description goes here.";
    const link = this.getAttribute("link") || "#";

    const style = document.createElement("style");
    style.textContent = `
      .app-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-left: 10px;
        margin-right: 10px;
        width: 25vw;
        aspect-ratio: 16 / 9;
        height: auto;
        max-width: 480px;
        min-width: 64px;
        padding: 64px;
        border-radius: 16px;
        background: #12122E;
        background-image: url("./images/appiconback.jpeg");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        text-decoration: none;
        color: inherit;
        transition: transform 0.2s, box-shadow 0.2s;
      }

      .app-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
      }

      .app-card img {
        max-width: 400px;
        min-width: 48px;
        height: auto;
        border-radius: 12px;
        margin-bottom: 12px;
      }

      .app-card h3 {
        margin: 0;
        font-size: 1.2em;
        font-weight: 600;
        text-align: center;
        color: white;
      }

      .app-card p {
        margin: 8px 0 0;
        font-size: 0.9em;
        color: #555;
        text-align: center;
        color: white;
      }
    `;

    const wrapper = document.createElement("a");
    wrapper.classList.add("app-card");
    wrapper.href = link;
    wrapper.target = "_self";
    wrapper.rel = "noopener";

    wrapper.innerHTML = `
      <img src="${icon}" alt="App icon">
      <h3>${title}</h3>
      <p>${description}</p>
    `;

    shadow.innerHTML = ""; // clear if reconnected
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
  }
}
console.log("app-card defined");
customElements.define("app-card", AppCard);
