import Card from "../../source/backend/Card.js";
import CardDeck from "../../source/backend/CardDeck.js";
import CardDictionary from "../../source/backend/CardDictionary.js";

describe("Integration: Daily Spread Logic", () => {
  it("draws 3 cards with correct structure and data", () => {
    const deck = new CardDeck(Card);
    deck.fillDeck();
    deck.shuffle();
    const pulledCards = deck.drawing(3);

    // Ensure 3 cards drawn
    expect(pulledCards).toHaveLength(3);

    // Validate card structure and data linkage
    pulledCards.forEach((card) => {
      const dict = CardDictionary[card.id];
      expect(dict).toBeDefined();
      expect(card.getCardName()).toBe(dict.name);
      expect(card.getSuit()).toBe(dict.suit);
      expect(card.getArcana()).toBe(dict.arcana);
      expect(Array.isArray(card.getKeywords())).toBe(true);
      expect(card.getImg()).toMatch(/\.jpg$/);
    });
  });

  it("drawn cards are unique (no duplicates)", () => {
    const deck = new CardDeck(Card);
    deck.fillDeck();
    deck.shuffle();
    const pulledCards = deck.drawing(5);
    const ids = pulledCards.map((c) => c.id);
    const uniqueIds = new Set(ids);

    expect(uniqueIds.size).toBe(ids.length);
  });
});
