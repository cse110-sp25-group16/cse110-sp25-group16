// Mock Card constructor for testing

import { jest } from "@jest/globals";
import CardDeck from "../source/backend/CardDeck.js";

const MockCard = jest.fn().mockImplementation((id, reversed) => ({
  id,
  reversed,
}));

describe("CardDeck Class", () => {
  let deck;

  beforeEach(() => {
    deck = new CardDeck(MockCard);
  });

  test("should initialize with empty cards and displayCards", () => {
    expect(deck.getCardCount()).toBe(0);
    expect(deck.getCards()).toEqual([]);
  });

  test("fillDeck should add 78 cards", () => {
    deck.fillDeck();
    expect(deck.getCardCount()).toBe(78);
    expect(MockCard).toHaveBeenCalledTimes(78);
    expect(deck.getCards()[0]).toHaveProperty("id", 0);
  });

  test("shuffle should randomize card order", () => {
    deck.fillDeck();
    const originalOrder = [...deck.getCards()];
    deck.shuffle();
    const shuffledOrder = deck.getCards();
    // It's possible for the shuffle to return the same order, but very unlikely
    expect(shuffledOrder).not.toEqual(originalOrder);
  });

  test("removeCard should remove card with given id", () => {
    deck.fillDeck();
    const initialCount = deck.getCardCount();
    const removeId = deck.getCards()[0].id;
    deck.removeCard(removeId);
    expect(deck.getCardCount()).toBe(initialCount - 1);
    expect(deck.getCards().some((card) => card.id === removeId)).toBe(false);
  });

  test("removeTopCard should return and remove the last card", () => {
    deck.fillDeck();
    const lastCard = deck.getCards()[deck.getCardCount() - 1];
    const removedCard = deck.removeTopCard();
    expect(removedCard).toEqual(lastCard);
    expect(deck.getCardCount()).toBe(77);
  });

  test("addCard should push new card to deck", () => {
    deck.addCard(42);
    expect(deck.getCardCount()).toBe(1);
    expect(deck.getCards()[0].id).toBe(42);
  });

  test("drawing should remove and return given number of cards", () => {
    deck.fillDeck();
    const drawn = deck.drawing(3);
    expect(drawn.length).toBe(3);
    expect(deck.getCardCount()).toBe(75);
  });
});
