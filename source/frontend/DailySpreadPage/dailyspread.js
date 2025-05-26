import CardDeck from '../../backend/CardDeck.js';
import Card from '../../backend/Card.js';

/**
 * Upon page load, call the init() function
 */
window.addEventListener('DOMContentLoaded', init);

/**
 * This function serves as the main function for the Dail spread page.
 */
async function init() {
  /*Selects grid-container in html and clears the cards loaded from previous draw*/
  const grid = document.querySelector('.cards-container');
  const selectedAmnt = document.querySelector('#card-amount');

  const currDate = new Date().toLocaleDateString();
  const savedCards = JSON.parse(localStorage.getItem('dailyCards'));

  let pulledCards;

  /**
   * Checks if have cards already drawn and saved today and uses those cards to display.
   * Otherwise, draw (max) cards, assign a today's date, and save to localStorage using date as key.
   */
  if (savedCards && savedCards.date === currDate) {
    pulledCards = savedCards.cards.map((id) => new Card(id, false));
  } else {
    const deck = new CardDeck();
    deck.fillDeck();
    deck.shuffle();
    pulledCards = deck.drawing(10);

    localStorage.setItem(
      'dailyCards',
      JSON.stringify({
        date: currDate,
        cards: pulledCards.map((card) => card.id),
      })
    );
  }

  /*Selects cards and amount drawn depends on what option is picked */
  selectedAmnt.addEventListener('change', (event) => {
    /*Clears amount of card displayed from previous selection */
    grid.innerHTML = '';

    /*For each card drew, create a card webcomponent to then append and display */
    for (let i = 0; i < event.target.value; i++) {
      const cardElement = document.createElement('card-component');
      
      cardElement.setAttribute('facing', Math.round(Math.random()) == 1)
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
      // cardElement.setAttribute('interpretation', pulledCards[i].getInterpretation())
      grid.appendChild(cardElement);
    }
  });
}
