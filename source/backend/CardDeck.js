const Card = require('./Card');

const deckSize = 78;

class CardDeck {
  /**
   * Initializes an empty deck of cards
   */
  constructor() {
    this.cards = [];
    this.displayCards = [];
  }

  /**
   *
   * @returns {number} Current count of cards in deck
   */
  getCardCount() {
    return this.cards.length;
  }

  /**
   *
   * @returns {Array<Card>} Array of cards in the deck
   */
  getCards() {
    return this.cards;
  }

  /**
   * Fills the deck with a standard 52-card deck
   */
  fillDeck() {
    for (let i = 0; i < deckSize; i++) {
      this.cards.push(new Card(i, false));
    }
  }

  /**
   * Shuffles cards in deck according to Fisher-Yates algorithm
   */
  shuffle() {
    let curr = this.getCardCount();

    while (curr != 0) {
      let random = Math.floor(Math.random() * curr);
      curr -= 1;

      let temp = this.cards[curr];
      this.cards[curr] = this.cards[random];
      this.cards[random] = temp;
    }

    return this.cards;
  }

  /**
   * Helper function: Prints out all cards currently in deck by id into console
   */
  printCards() {
    let max = this.getCardCount();
    for (let i = 0; i < max; i++) {
      // console.log(this.cards[i].id);
    }
  }

  /**
   *
   * @param {number} id Removes card from deck of given id
   */
  removeCard(id) {
    let max = this.getCardCount();
    for (let i = 0; i < max; i++) {
      if (this.cards[i].id == id) {
        this.cards.splice(i, 1);
        break; // avoid looping after modifying array
      }
    }
  }

  /**
   *
   * @returns {Card} Returns top card of the deck
   */
  removeTopCard() {
    return this.cards.pop();
  }

  /**
   *
   * @param {number} id Adds card of provided id to top of deck
   */
  addCard(id) {
    this.cards.push(new Card(id, false));
  }

  /**
   *
   * @param {number} cardCount Draw cardCount amount of cards, and return an array of those drawn cards.
   */
  drawing(cardCount) {
    let drawnCards = [];
    for (let i = 0; i < cardCount; i++) {
      drawnCards.push(this.removeTopCard());
    }

    return drawnCards;
  }
}

module.exports = CardDeck;
