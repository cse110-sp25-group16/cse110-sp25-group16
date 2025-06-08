import cardDictionary from './CardDictionary.js';

class Card {
  /**
   *
   * @param {number} id ID number to initialize card with
   * @param {boolean} faceup Faceup boolean to initialize card with
   */
  constructor(id, faceup = false, upsideDown) {
    this.id = id;
    this.faceup = faceup;

    if (upsideDown !== undefined) {
      this.upsideDown = upsideDown;
    } else {
      let coinflip = Math.floor(Math.random() * 2);

      this.upsideDown = false;
      if (coinflip == 1) this.upsideDown = true;
    }
  }

  /**
   * Getter method for card name
   * @returns {string} The corresponding string name of the card
   */
  getCardName() {
    return cardDictionary[this.id].name;
  }

  /**
   *
   * @returns {number} The id vlaue of this card
   */
  getCardId() {
    return this.id;
  }

  /**
   *
   * @returns {boolean} The state of the card after flipping
   */
  flip() {
    this.faceup = !this.faceup;
    return this.faceup;
  }

  /**
   *
   * @returns {string} The suit of the card
   */
  getSuit() {
    return cardDictionary[this.id].suit;
  }

  /**
   * @returns {string} The arcana of the card (major/minor)
   */
  getArcana() {
    return cardDictionary[this.id].arcana;
  }

  /**
   * @returns {Array<string>} An array of strings containing the upright meanings of the card.
   */
  getUprightMeanings() {
    return cardDictionary[this.id].uprightMeanings;
  }

  /**
   *
   * @returns {Array<string>} An array of strings containing the reversed meanings of this card.
   */
  getReversedMeaning() {
    return cardDictionary[this.id].reversedMeanings;
  }

  /**
   *
   * @returns {Array<string>} An array of strings of keywords associated to the card.
   */
  getKeywords() {
    return cardDictionary[this.id].keywords;
  }

  /**
   * @returns {string} Filname of image of associated card.
   */
  getImg() {
    return cardDictionary[this.id].img;
  }

  /**
   *
   * @returns {string} Returns the sybmolism of the associated card
   */
  getSymbolism() {
    return cardDictionary[this.id].symbolism;
  }

  /**
   * @returns {string} A short paragrpah explaining the backstory and description of the card.
   */
  getDescription() {
    return cardDictionary[this.id].description;
  }

  /**
   *
   * @returns {number} The corresponding numeral of that card in its family
   */
  getNumeral() {
    return cardDictionary[this.id].numeral;
  }

  /**
   *
   * @returns {boolean} Whether or not the card is faceup
   */
  isFaceUp() {
    return this.faceup;
  }

  /**
   *
   *
   * @returns {boolean} Whether or not the card is upside side (dark) or right side up (light)
   */
  isUpsideDown() {
    return this.upsideDown;
  }
}

export default Card;
