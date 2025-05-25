/**
 * This function essentually fetches the contents of the cardsDataFinal.json file
 */
async function getCardsData() {
  const cardsData = await fetch(
    '../../backend/data parsing/cardsDataFinal.json'
  );
  return await cardsData.json();
}

/**
 * This function returns 3 selected cards from the cardsDataFinal.json file.
 * (***This function is randomly selecting cards, but this can be
 * changed to a specific algorithm in the future.***)
 * @param {Object} cardData data from the getCardsData function
 * @returns {Array} array of 3 random cards
 */
function getDailySpread(cardData) {
  let selectedCards = Object.keys(cardData);
  selectedCards = selectedCards.sort(() => Math.random() - 0.5);
  selectedCards = selectedCards.slice(0, 3);
  return selectedCards.map((key) => cardData[key]);
}

window.addEventListener('DOMContentLoaded', init);

/**
 * This function pulls 3 cards and creates a card-component element for each cards.
 * These cards are then added to the grid layout in the dailspread.html file
 */
async function init() {
  const grid = document.querySelector('.cards-container');
  const data = await getCardsData();
  const pulledCards = getDailySpread(data);

  const cardGrid = ['card1', 'card2', 'card3'];

  for (let i = 0; i < pulledCards.length; i++) {
    console.log(pulledCards[i]);
    const cardElement = document.createElement('card-component');
    cardElement.classList.add(cardGrid[i]);
    cardElement.setAttribute('image', `/source/cards/${pulledCards[i].img}`);
    cardElement.setAttribute('name', pulledCards[i].name);
    cardElement.setAttribute('arcana', pulledCards[i].arcana);
    cardElement.setAttribute('suit', pulledCards[i].suit);
    cardElement.setAttribute(
      'uprightMeanings',
      JSON.stringify(pulledCards[i].uprightMeanings)
    );
    cardElement.setAttribute(
      'reversedMeanings',
      JSON.stringify(pulledCards[i].reversedMeanings)
    );
    cardElement.setAttribute(
      'keywords',
      JSON.stringify(pulledCards[i].keywords)
    );
    cardElement.setAttribute('symbolism', pulledCards[i].symbolism);
    cardElement.setAttribute('description', pulledCards[i].description);
    cardElement.setAttribute('numeral', pulledCards[i].numeral);
    grid.appendChild(cardElement);
  }
}
