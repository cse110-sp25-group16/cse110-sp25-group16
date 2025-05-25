class NavBar extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
        <nav>
          <ul class="navbar">
            <li><a href="tarot.html">Tarot</a></li>
            <li><a href="horoscope.html">Horoscope</a></li>
            <li><a href="mbti.html">MBTI</a></li>
          </ul>
        </nav>
      `;
  }
}

customElements.define('nav-bar', NavBar);
