import CardDeck from '../../backend/CardDeck.js';

/**
 * Upon page load, whenever the user changes the amount of cards to draw via dropdown menu,
 * the init function is called.
 */
window.addEventListener('DOMContentLoaded', () => {
   const selectedAmnt = document.querySelector('#card-amount');
   selectedAmnt.addEventListener('change', init);
  });

/**
 * This function serves as the main function for the Dail spread page.
 */
async function init() {
  /*Selects grid-container in html and clears the cards loaded from previous draw*/
  const grid = document.querySelector('.cards-container');
  grid.innerHTML = '';

  /*Selects cards and amount drawn depends on what option is picked */
  const selectedAmnt = document.querySelector('#card-amount');
  const deck = new CardDeck();
  deck.fillDeck();
  deck.shuffle();
  const pulledCards = deck.drawing(parseInt(selectedAmnt.value));

  /* (**BUG**) attempt to save to local storage */
  localStorage.setItem('pulledCards', JSON.stringify(pulledCards));

  /*For each card drew, create a card webcomponent to then append and display */
  for (let i = 0; i < pulledCards.length; i++) {
    const cardElement = document.createElement('card-component');

    cardElement.setAttribute('image', `/source/cards/${pulledCards[i].getImg()}`);
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
    grid.appendChild(cardElement);
  }
}
