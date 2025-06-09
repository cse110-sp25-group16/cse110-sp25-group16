import CardDeck from '../../backend/CardDeck.js';
import Card from '../../backend/Card.js';
import { generateImageCards } from '../components/ExportButton.js';
import { getStoredCards } from '../components/ExportButton.js';

/**
 * Upon page load, call the init() function
 */
window.addEventListener('DOMContentLoaded', init);

/**
 * This function serves as the main function for the Dail spread page.
 */
async function init() {
  const userData = JSON.parse(localStorage.getItem('tarotUserInfo'));
  const name = userData?.name || 'User';
  document.querySelector('#username').textContent = `Hi ${name}!`;

  /*Selects grid-container in html and clears the cards loaded from previous draw*/
  const grid = document.querySelector('.cards-container');
  const selectedAmnt = document.querySelector('#card-amount');
  selectedAmnt.value = 'select';
  console.log('selectedAmnt: ' + selectedAmnt.value);

  const shareButton = document.getElementById('generateTarotCardsBtn');
  shareButton.addEventListener('click', () =>
    generateImageCards(getStoredCards(selectedAmnt.value))
  );

  const shareDiv = document.querySelector('.disabled');

  /*Selects cards and amount drawn depends on what option is picked */
  selectedAmnt.addEventListener('change', (event) => {
    const currDate = new Date().toLocaleDateString(); // gets date in YYYY-MM-DD format
    const existingData = JSON.parse(localStorage.getItem('dailyCards')) || {};
    let pulledCards;

    shareDiv.classList.remove('disabled');

    /**
     * Checks if have cards already drawn and saved today and uses those cards to display.
     * Otherwise, draw selected amount of cards, assign a today's date, and save to localStorage using date as key.
     */
    if (!existingData[currDate]) {
      existingData[currDate] = {};
    }
    if (existingData[currDate][event.target.value]) {
      pulledCards = existingData[currDate][event.target.value].map((card) => {
        return new Card(card.id, card.faceup, card.upsideDown);
      });
    } else {
      const deck = new CardDeck(Card);
      deck.fillDeck();
      deck.shuffle();
      pulledCards = deck.drawing(event.target.value);

      existingData[currDate][event.target.value] = pulledCards.map((card) => ({
        id: card.id,
        faceup: card.faceup,
        upsideDown: card.upsideDown,
      }));

      localStorage.setItem('dailyCards', JSON.stringify(existingData)); // save back to localStorage
    }

    /*Clears amount of card displayed from previous selection */
    grid.innerHTML = '';

    /*For each card drawn, create a card webcomponent to then append and display in dailspread.html file */
    for (let i = 0; i < pulledCards.length; i++) {
      if (!pulledCards[i]) continue;
      const cardElement = document.createElement('card-component');

      cardElement.setAttribute(
        'image',
        `/source/cards/${pulledCards[i].getImg()}`
      );
      cardElement.setAttribute('name', pulledCards[i].getCardName());
      cardElement.setAttribute('arcana', pulledCards[i].getArcana());
      cardElement.setAttribute('suit', pulledCards[i].getSuit());
      cardElement.setAttribute(
        'uprightMeanings',
        JSON.stringify(pulledCards[i].getUprightMeanings())
      );
      cardElement.setAttribute(
        'reversedMeanings',
        JSON.stringify(pulledCards[i].getReversedMeaning())
      );
      cardElement.setAttribute(
        'keywords',
        JSON.stringify(pulledCards[i].getKeywords())
      );
      cardElement.setAttribute('symbolism', pulledCards[i].getSymbolism());
      cardElement.setAttribute('description', pulledCards[i].getDescription());
      cardElement.setAttribute('numeral', pulledCards[i].getNumeral());
      cardElement.setAttribute('facing', pulledCards[i].isFaceUp());
      cardElement.setAttribute('upsideDown', pulledCards[i].isUpsideDown());

      grid.appendChild(cardElement);
    }
  });
}
