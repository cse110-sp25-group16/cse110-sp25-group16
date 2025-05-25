class NavBar extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
        <nav>
            <a href="../DailySpreadPage/dailyspread.html">Daily Spread</a>
            <a href="horoscope.html">Horoscope</a>
            <a href="mbti.html">MBTI</a>
          </ul>
        </nav>
      `;
  }
}

customElements.define('nav-bar', NavBar);
