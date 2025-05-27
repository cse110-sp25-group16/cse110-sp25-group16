const cardDictionary = require('./Card.js');

describe('Card.js Tarot Data', () => {
  test('should export an object', () => {
    expect(typeof cardDictionary).toBe('object');
  });

  test('should contain Major Arcana cards', () => {
    const majorArcanaCards = Object.values(cardDictionary).filter(
      (card) => card.arcana === 'Major Arcana'
    );
    expect(majorArcanaCards.length).toBeGreaterThan(0);
  });

  test('each card should have all required properties', () => {
    Object.values(cardDictionary).forEach((card) => {
      expect(card).toHaveProperty('name');
      expect(card).toHaveProperty('arcana');
      expect(card).toHaveProperty('uprightMeanings');
      expect(card).toHaveProperty('reversedMeanings');
      expect(card).toHaveProperty('suit');
      expect(card).toHaveProperty('keywords');
      expect(card).toHaveProperty('img');
      expect(card).toHaveProperty('symbolism');
      expect(card).toHaveProperty('description');
      expect(card).toHaveProperty('numeral');

      expect(typeof card.name).toBe('string');
      expect(typeof card.arcana).toBe('string');
      expect(Array.isArray(card.uprightMeanings)).toBe(true);
      expect(Array.isArray(card.reversedMeanings)).toBe(true);
      expect(typeof card.suit).toBe('string');
      expect(Array.isArray(card.keywords)).toBe(true);
      expect(typeof card.img).toBe('string');
      expect(typeof card.symbolism).toBe('string');
      expect(typeof card.description).toBe('string');
      expect(typeof card.numeral).toBe('string');
    });
  });

  test('no duplicate card names', () => {
    const names = Object.values(cardDictionary).map((card) => card.name);
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBe(names.length);
  });

  test('all image filenames are non-empty and end with .jpg', () => {
    Object.values(cardDictionary).forEach((card) => {
      expect(card.img).not.toBe('');
      expect(card.img.endsWith('.jpg')).toBe(true);
    });
  });

  test('numerals are valid string representations of numbers', () => {
    Object.values(cardDictionary).forEach((card) => {
      expect(isNaN(Number(card.numeral))).toBe(false);
    });
  });
});
