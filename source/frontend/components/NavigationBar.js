class NavigationBar extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    // Style
    const style = document.createElement('style');
    style.textContent = `
      nav {
        background-color: transparent;
        color: white;
        padding-left: 1em;
        padding-right: 1.5em;
        padding-top: 0em;
        padding-bottom: 0em;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: sans-serif
      }

      .brand {
        font-weight: bold;
        font-size: 2em;
        padding: 0em;
        padding-left: 0.5em;
        font-family: "Noto Serif", serif
      }
    
      .links {
        display: flex;
        margin-left: auto
      }

      .links a {
        color: white;
        font-size: 1.5em;
        margin-left: 1.5em;
        padding: 0em;
        text-decoration: none;
        font-family: "Noto Serif", serif;
        background-color:rgba(15, 16, 28, 0.52)
      }

      .links a:hover {
        text-decoration: underline
      }

      .hamburger {
        display: none;
        background: none;
        border: none;
        font-size: 2em;
        color: white;
        cursor: pointer;
        margin-left: 1em
      }

      @media (max-width: 700px) {
        .links {
          display: none;
          flex-direction: column;
          width: 100%;
          background: rgba(15, 16, 28, 0.95);
          position: absolute;
          top: 60px;
          left: 0;
          z-index: 100
        }
        .brand {
          font-size: 2em;
        }
        .links.show {
          display: flex;
          flex-direction: column;
          align-items: center
        }
        .links a {
          margin-left: 0;
          margin-top: 1em;
          margin-bottom: 1em
        }
        .hamburger {
          display: block
        }
        nav {
          position: relative;
          background-color: rgb(20, 26, 51)
        }
      }
    `;

    // Template

    let prefix = this.getAttribute('prefix');

    if (!prefix) prefix = '';

    const nav = document.createElement('nav');

    const logo = document.createElement('img');
    logo.src = prefix + './images/logo-gold.png';

    const brand = document.createElement('div');
    brand.classList.add('brand');
    brand.textContent = 'Pocket Diviner';

    const links = document.createElement('div');
    links.classList.add('links');

    const rawLinks = this.getAttribute('links');

    console.log('rawlinks:' + rawLinks);

    const hamburger = document.createElement('button');
    hamburger.classList.add('hamburger');
    hamburger.innerHTML = '&#9776;'; // Unicode hamburger icon

    if (rawLinks) {
      try {
        const linkArray = JSON.parse(rawLinks);
        linkArray.forEach((link) => {
          const a = document.createElement('a');
          a.href = link.href;
          a.textContent = link.label;
          links.appendChild(a);
        });
      } catch (err) {
        console.error('Invalid links JSON:', rawLinks, err);
      }
    } else {
      try {
        const linkArray = [
          { href: './index.html', label: 'Home' },
          { href: './DailySpreadPage/dailyspread.html', label: 'Tarot Cards' },
          {
            href: './DailyHoroscopePage/horoscopePage.html',
            label: 'Horoscope',
          },
          {
            href: './ArchivePage/archive.html',
            label: 'Archive',
          },
          { href: './settings.html', label: 'Profile' },
        ];
        linkArray.forEach((link) => {
          const a = document.createElement('a');
          a.href = prefix + link.href;
          a.textContent = link.label;
          links.appendChild(a);
        });
      } catch (err) {
        console.error('Invalid links JSON:', rawLinks, err);
      }
    }

    nav.appendChild(logo);
    nav.appendChild(brand);
    nav.appendChild(hamburger);
    nav.appendChild(links);
    shadow.appendChild(style);
    shadow.appendChild(nav);

    hamburger.addEventListener('click', () => {
      links.classList.toggle('show');
    });
  }
}

customElements.define('navigation-bar', NavigationBar);
