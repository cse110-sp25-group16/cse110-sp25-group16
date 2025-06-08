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
    getKeywords: () => ['wisdom', 'guidance'],
    isUpsideDown: () => upsideDown,
    getReversedMeaning: () => ['reversed meaning'],
    getUprightMeanings: () => ['upright meaning'],
  }));
});

global.Image = class {
  set src(val) {
    setTimeout(() => this.onload(), 10);
  }
};

Storage.prototype.getItem = jest.fn(() =>
  JSON.stringify({
    '2025-06-08': {
      3: [
        { id: 1, faceup: true, upsideDown: false },
        { id: 2, faceup: true, upsideDown: false },
        { id: 3, faceup: true, upsideDown: true },
      ],
    },
  })
);

describe('getStoredCards', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-06-08T12:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns stored cards with enriched data', () => {
    const cards = getStoredCards(3);
    expect(cards.length).toBe(4); // 3 cards + 1 date
    expect(cards[0]).toMatchObject({
      name: 'Card-1',
      keywords: 'wisdom, guidance',
      meaning: 'upright meaning',
    });
  });
});

describe('wrapText', () => {
  it('calls fillText multiple times for wrapping', () => {
    const mockCtx = {
      fillText: jest.fn(),
      measureText: jest.fn((t) => ({ width: t.length * 8 })),
    };
    wrapText(mockCtx, 'This is a long sentence that should wrap', 10, 10, 100, 20, '', '');
    expect(mockCtx.fillText.mock.calls.length).toBeGreaterThan(1);
  });
});

describe('loadImage', () => {
  it('resolves with a mocked image object', async () => {
    const img = await loadImage('https://mock.url/image.png');
    expect(img).toBeInstanceOf(Image);
  });
});
