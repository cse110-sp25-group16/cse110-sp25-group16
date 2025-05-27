const cardDictionary = require('./Card'); // still pointing to your dictionary

class Card {
  constructor(id, reversed = false) {
    this.id = id;
    this.reversed = reversed;

    const cardMeta = cardDictionary[id];
    if (cardMeta) {
      Object.assign(this, cardMeta);
    }
  }
}

module.exports = Card;
