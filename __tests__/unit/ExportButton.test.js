import {
  getStoredCards,
  wrapText,
  loadImage,
  generateImageCards,
} from '../../source/frontend/components/ExportButton.js';

jest.unstable_mockModule('../../source/backend/Card.js', () => ({
  default: function MockCard(id) {
    return {
      getImg: () => `${id}.jpg`,
      isFaceUp: () => true,
      isUpsideDown: () => false,
    };
  },
}));

describe('ExportButton functions', () => {
  it('getStoredCards should return an array', () => {
    localStorage.setItem('cards', JSON.stringify([{ id: 'card1' }]));
    const cards = getStoredCards();
    expect(Array.isArray(cards)).toBe(true);
    expect(cards[0].id).toBe('card1');
  });

  it('wrapText should wrap long text', () => {
    const ctx = document.createElement('canvas').getContext('2d');
    const lines = wrapText(ctx, 'This is a test sentence', 100, 0, 0, 50);
    expect(Array.isArray(lines)).toBe(true);
  });

  it('loadImage should resolve an Image', async () => {
    const img = await loadImage('https://via.placeholder.com/150');
    expect(img).toBeInstanceOf(HTMLImageElement);
  });
});
