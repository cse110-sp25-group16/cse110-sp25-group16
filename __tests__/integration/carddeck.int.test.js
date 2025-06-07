import CardDeck from '../../source/backend/CardDeck.js';
import Card from '../../source/backend/Card.js';
import CardDictionary from '../../source/backend/CardDictionary.js';

describe('Integration: CardDeck and CardDictionary', () => {
  it('fills the deck with 78 cards using data from CardDictionary', () => {
    const deck = new CardDeck(Card);
    deck.fillDeck();

    expect(deck.cards.length).toBe(78);
    for (const card of deck.cards) {
      const refCard = CardDictionary[card.id];
      expect(refCard).toBeDefined();
      expect(card.getCardName()).toBe(refCard.name);
      expect(card.getArcana()).toBe(refCard.arcana);
    }
  });

  it('shuffles deck and maintains same cards', () => {
    const deck = new CardDeck(Card);
    deck.fillDeck();
    const beforeShuffle = deck.cards.map(c => c.id);
    deck.shuffle();
    const afterShuffle = deck.cards.map(c => c.id);

    expect(beforeShuffle).toHaveLength(afterShuffle.length);
    expect(afterShuffle.sort()).toEqual(beforeShuffle.sort());
  });
});
