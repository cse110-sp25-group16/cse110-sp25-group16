
const {
  getStoredCards,
  wrapText,
  loadImage,
  generateImageCards,
} = require('../../source/frontend/components/ExportButton.js');

jest.mock('../../source/backend/Card.js', () => {
  return jest.fn().mockImplementation((id, faceup, upsideDown) => ({
    getImg: () => 'mock-image.png',
    getCardName: () => `Card-${id}`,
    getKeywords: () => ['keyword1', 'keyword2'],
    getUprightMeanings: () => ['Meaning 1'],
    getReversedMeaning: () => 'Reversed Meaning',
    getSuit: () => 'Suit',
    getArcana: () => 'Major',
    getNumeral: () => 'I',
    getDescription: () => 'Description',
    getSymbolism: () => 'Symbolism',
  }));
});

describe('getStoredCards', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return an empty array if no cards are stored', () => {
    const result = getStoredCards();
    expect(result).toEqual([]);
  });

  it('should parse and return stored cards', () => {
    localStorage.setItem('cards', JSON.stringify([{ id: 1 }]));
    const result = getStoredCards();
    expect(result).toEqual([{ id: 1 }]);
  });
});
