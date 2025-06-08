import { generateImageCards } from '../source/frontend/export.js';

describe('generateImageCards', () => {
  it('should create and download a canvas with card visuals', async () => {
    const cardData = [
      {
        image: 'card1.png',
        name: 'The Fool',
        keywords: 'new beginnings',
        upsideDown: false,
        meaning: 'Fresh start.'
      },
      {
        image: 'card2.png',
        name: 'The Magician',
        keywords: 'manifestation',
        upsideDown: true,
        meaning: 'Manipulation.'
      },
      '2025-06-07'
    ];

    const mockCanvas = document.createElement('canvas');
    document.createElement = jest.fn((tag) => tag === 'canvas' ? mockCanvas : document.createElement(tag));
    mockCanvas.getContext = jest.fn(() => ({
      fillText: jest.fn(),
      drawImage: jest.fn(),
      strokeRect: jest.fn(),
      stroke: jest.fn(),
      measureText: () => ({ width: 100 }),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      save: jest.fn(),
      restore: jest.fn(),
      translate: jest.fn(),
      scale: jest.fn(),
      rotate: jest.fn(),
      arc: jest.fn(),
      createLinearGradient: () => ({
        addColorStop: jest.fn()
      }),
    }));

    await generateImageCards(cardData);

    expect(mockCanvas.getContext).toHaveBeenCalled();
  });
});