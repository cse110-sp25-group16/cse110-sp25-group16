import Card from "../../source/backend/Card.js";
import cardDictionary from "../../source/backend/CardDictionary.js";

describe("Card class", () => {
  const id = 0;
  const refCard = cardDictionary[id];

  test("constructor sets id, faceup, and upsideDown properly", () => {
    const card = new Card(id, true, true);
    expect(card.id).toBe(id);
    expect(card.faceup).toBe(true);
    expect(card.upsideDown).toBe(true);
  });

  test("constructor randomly sets upsideDown when not provided", () => {
    const card = new Card(id);
    expect(typeof card.upsideDown).toBe("boolean");
  });

  test("getCardName returns correct name", () => {
    const card = new Card(id);
    expect(card.getCardName()).toBe(refCard.name);
  });

  test("getCardId returns id", () => {
    const card = new Card(id);
    expect(card.getCardId()).toBe(id);
  });

  test("flip toggles faceup state", () => {
    const card = new Card(id, false);
    const flipped = card.flip();
    expect(flipped).toBe(true);
    expect(card.isFaceUp()).toBe(true);
  });

  test("getSuit returns correct suit", () => {
    const card = new Card(id);
    expect(card.getSuit()).toBe(refCard.suit);
  });

  test("getArcana returns correct arcana", () => {
    const card = new Card(id);
    expect(card.getArcana()).toBe(refCard.arcana);
  });

  test("getUprightMeanings returns correct upright meanings", () => {
    const card = new Card(id);
    expect(card.getUprightMeanings()).toEqual(refCard.uprightMeanings);
  });

  test("getReversedMeaning returns correct reversed meanings", () => {
    const card = new Card(id);
    expect(card.getReversedMeaning()).toEqual(refCard.reversedMeanings);
  });

  test("getKeywords returns correct keywords", () => {
    const card = new Card(id);
    expect(card.getKeywords()).toEqual(refCard.keywords);
  });

  test("getImg returns correct image filename", () => {
    const card = new Card(id);
    expect(card.getImg()).toBe(refCard.img);
  });

  test("getSymbolism returns correct symbolism", () => {
    const card = new Card(id);
    expect(card.getSymbolism()).toBe(refCard.symbolism);
  });

  test("getDescription returns correct description", () => {
    const card = new Card(id);
    expect(card.getDescription()).toBe(refCard.description);
  });

  test("getNumeral returns correct numeral", () => {
    const card = new Card(id);
    expect(card.getNumeral()).toBe(refCard.numeral);
  });

  test("isFaceUp returns correct faceup state", () => {
    const card = new Card(id, true);
    expect(card.isFaceUp()).toBe(true);
  });

  test("isUpsideDown returns correct upsideDown state", () => {
    const card = new Card(id, true, false);
    expect(card.isUpsideDown()).toBe(false);
  });
});
