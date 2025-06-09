import Card from '../../backend/Card.js';
import Horoscope from '../../backend/horoscope.js';

window.addEventListener('DOMContentLoaded', init);

/**
 * Gets archived tarot/horoscope for particular date based on active state
 */
async function init() {
  let active = 'tarot';
  let date = new Date().toLocaleDateString(); // gets date in YYYY-MM-DD format
  const tarotButton = document.getElementById('tarot');
  const horoscopeButton = document.getElementById('horoscope');
  const dateInput = document.getElementById('date');
  dateInput.value = date;

  const updateActiveButton = () => {
    tarotButton.classList.remove('active');
    horoscopeButton.classList.remove('active');
    console.log(active);

    const cardsContainer = document.querySelector('.all-cards-container');
    const horoscopeContainer = document.querySelector('.horoscope-container');

    if (active === 'tarot') {
      tarotButton.classList.add('active');
      cardsContainer.style.display = 'grid';
      horoscopeContainer.style.display = 'none';
    } else {
      horoscopeButton.classList.add('active');
      cardsContainer.style.display = 'none';
      horoscopeContainer.style.display = 'flex';
    }
  };
  updateActiveButton();
  getArchived(active, date);

  tarotButton.addEventListener('click', () => {
    active = 'tarot';
    updateActiveButton();
    console.log(active, date);
    getArchived(active, date);
  });

  horoscopeButton.addEventListener('click', () => {
    active = 'horoscope';
    updateActiveButton();
    getArchived(active, date);
  });

  dateInput.addEventListener('change', (e) => {
    date = e.target.value;
    getArchived(active, date);
  });

  ['3', '5', '10'].forEach((item) => {
    const button = document.getElementById(`${item}-dropdown-button`);
    const container = document.getElementById(`${item}-card-container`);

    button.addEventListener('click', () => {
      const isHidden = container.classList.toggle('hidden-group');
      button.textContent = isHidden ? 'Open' : 'Close';
    });
  });
}

function getArchived(active, date) {
  if (active == 'tarot') {
    const allData = JSON.parse(localStorage.getItem('dailyCards')) || {};

    //  const tarotContainer = document.querySelector(".cards-container");
    //  tarotContainer.innerHTML = "";

    if (!allData[date] || Object.keys(allData[date]).length === 0) {
      const tarotContainer = document.querySelector('.cards-container');
      tarotContainer.innerHTML =
        "<p style='text-align: center;'>No cards drawn for this date.</p>";
      return;
    }

    const tarotLabels = { 3: '3-Card', 5: '5-Card', 10: '10-Card' };
    console.log(allData);
    Object.keys(tarotLabels).forEach((stackAmount) => {
      const groupContainer = document.getElementById(
        `${stackAmount}-card-container`
      );
      groupContainer.innerHTML = '';

      if (
        !allData[date][stackAmount] ||
        allData[date][stackAmount].length === 0
      ) {
        groupContainer.innerHTML =
          "<p style='text-align: center;'>No cards drawn for this group.</p>";
        return;
      }

      /*Check if the stack exists*/
      if (allData[date][stackAmount]) {
        const cards = allData[date][stackAmount].map(
          (card) => new Card(card.id, card.faceup, card.upsideDown)
        );
        cards.map((card) => {
          const cardElement = document.createElement('card-component');
          cardElement.setAttribute('image', `/source/cards/${card.getImg()}`);
          cardElement.setAttribute('name', card.getCardName());
          cardElement.setAttribute('arcana', card.getArcana());
          cardElement.setAttribute('suit', card.getSuit());
          cardElement.setAttribute(
            'uprightMeanings',
            JSON.stringify(card.getUprightMeanings())
          );
          cardElement.setAttribute(
            'reversedMeanings',
            JSON.stringify(card.getReversedMeaning())
          );
          cardElement.setAttribute(
            'keywords',
            JSON.stringify(card.getKeywords())
          );
          cardElement.setAttribute('symbolism', card.getSymbolism());
          cardElement.setAttribute('description', card.getDescription());
          cardElement.setAttribute('numeral', card.getNumeral());
          cardElement.setAttribute('facing', card.isFaceUp());
          cardElement.setAttribute('upsideDown', card.isUpsideDown());
          groupContainer.appendChild(cardElement);
        });
      }
    });
  } else {
    const userInfo = JSON.parse(localStorage.getItem('tarotUserInfo'));
    const birthDate = Horoscope.getDate(userInfo.dob);
    const horoscope = Horoscope.getHoroscope(birthDate);
    const [theme, mood, advice] = Horoscope.generateReading(
      horoscope,
      new Date(date)
    );
    const [themeExpanded, moodExpanded, adviceExpanded] =
      Horoscope.expandedReading(horoscope, new Date(date));
    const values = [theme, mood, advice];
    const labels = ['Theme', 'Mood', 'Advice'];
    const valuesExpanded = [themeExpanded, moodExpanded, adviceExpanded];
    const sign = Horoscope.getHoroscope(Horoscope.getDate(userInfo.dob));
    console.log(sign);

    const horoscopeContainer = document.querySelector('.horoscope-container');
    horoscopeContainer.innerHTML = '';

    for (let i = 0; i < values.length; i++) {
      const horoscopeCard = document.createElement('horoscope-card');
      horoscopeCard.setAttribute('front-img', `../images/advice.png`);
      horoscopeCard.setAttribute('front-title', labels[i]);
      // horoscopeCard.setAttribute("front-desc", )

      horoscopeCard.setAttribute('back-img', `../images/advice.png`);
      horoscopeCard.setAttribute('back-title', values[i]);
      horoscopeCard.setAttribute('back-desc', valuesExpanded[i]);

      horoscopeContainer.appendChild(horoscopeCard);
    }
  }
}
