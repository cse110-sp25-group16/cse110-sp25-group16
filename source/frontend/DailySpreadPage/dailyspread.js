import CardDeck from "../../backend/CardDeck.js";
import Card from "../../backend/Card.js";

/**
 * Upon page load, call the init() function
 */
window.addEventListener("DOMContentLoaded", init);

/**
 * This function serves as the main function for the Dail spread page.
 */
async function init() {
  /*Selects grid-container in html and clears the cards loaded from previous draw*/
  const grid = document.querySelector(".cards-container");
  const selectedAmnt = document.querySelector("#card-amount");

  /*Selects cards and amount drawn depends on what option is picked */
  selectedAmnt.addEventListener("change", (event) => {
    const currDate = new Date().toLocaleDateString();
    const savedCards = JSON.parse(
      localStorage.getItem(`dailyCards_${event.target.value}`),
    );
    let pulledCards;

    /**
     * Checks if have cards already drawn and saved today and uses those cards to display.
     * Otherwise, draw selected amount of cards, assign a today's date, and save to localStorage using date as key.
     * Saved cards are under the name "dailyCards_3", "dailyCards_5", or "dailyCards_10"
     */
    if (savedCards && savedCards.date === currDate) {
      pulledCards = savedCards.cards.map((cardString) => {
        let card = JSON.parse(cardString);
        return new Card(card.id, card.faceup, card.upsideDown);
      });
    } else {
      const deck = new CardDeck(Card);
      deck.fillDeck();
      deck.shuffle();
      pulledCards = deck.drawing(event.target.value);

      localStorage.setItem(
        `dailyCards_${event.target.value}`,
        JSON.stringify({
          date: currDate,
          cards: pulledCards.map((card) => JSON.stringify(card)),
        }),
      );
    }

    /*Clears amount of card displayed from previous selection */
    grid.innerHTML = "";

    /*For each card drawn, create a card webcomponent to then append and display in dailspread.html file */
    for (let i = 0; i < event.target.value; i++) {
      if (!pulledCards[i]) continue;
      const cardElement = document.createElement("card-component");

      cardElement.setAttribute(
        "image",
        `/source/cards/${pulledCards[i].getImg()}`,
      );
      cardElement.setAttribute("name", pulledCards[i].getCardName());
      cardElement.setAttribute("arcana", pulledCards[i].getArcana());
      cardElement.setAttribute("suit", pulledCards[i].getSuit());
      cardElement.setAttribute(
        "uprightMeanings",
        JSON.stringify(pulledCards[i].getUprightMeanings()),
      );
      cardElement.setAttribute(
        "reversedMeanings",
        JSON.stringify(pulledCards[i].getReversedMeaning()),
      );
      cardElement.setAttribute(
        "keywords",
        JSON.stringify(pulledCards[i].getKeywords()),
      );
      cardElement.setAttribute("symbolism", pulledCards[i].getSymbolism());
      cardElement.setAttribute("description", pulledCards[i].getDescription());
      cardElement.setAttribute("numeral", pulledCards[i].getNumeral());
      cardElement.setAttribute("facing", pulledCards[i].isFaceUp());
      cardElement.setAttribute("upsideDown", pulledCards[i].isUpsideDown());

      grid.appendChild(cardElement);
    }
  });
}
