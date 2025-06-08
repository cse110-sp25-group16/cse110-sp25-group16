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
    getKeywords: () => ['Keyword1', 'Keyword2'],
    isUpsideDown: () => upsideDown,
    getReversedMeaning: () => ['Reversed meaning'],
    getUprightMeanings: () => ['Upright meaning'],
  }));
});


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

Storage.prototype.setItem = jest.fn();

describe('getStoredCards', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-06-08T12:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return parsed card data with metadata', () => {
    const result = getStoredCards(3);
    expect(result).toHaveLength(4); // 3 cards + date

    const card = result[0];
    expect(card).toHaveProperty('image', 'mock-image.png');
    expect(card).toHaveProperty('name', 'Card-1');
    expect(card).toHaveProperty('keywords', 'wisdom, guidance');
    expect(card).toHaveProperty('meaning', 'upright meaning');
  });
});

describe('wrapText', () => {
  let mockCtx;

  beforeEach(() => {
    mockCtx = {
      fillText: jest.fn(),
      measureText: jest.fn((text) => ({ width: text.length * 10 })),
    };
  });

  it('should call fillText appropriately for short text', () => {
    wrapText(mockCtx, 'short words only', 100, 50, 200, 20, '', '');
    expect(mockCtx.fillText).toHaveBeenCalled();
  });

  it('should wrap long text across multiple lines', () => {
    wrapText(
      mockCtx,
      'this is a very long line that needs to wrap multiple times',
      100,
      50,
      120,
      20,
      '',
      ''
    );
    expect(mockCtx.fillText.mock.calls.length).toBeGreaterThan(1);
  });
});

describe('loadImage', () => {
  it('resolves with an image on successful load', async () => {
    const img = await loadImage('http://example.com/test.png');
    expect(img).toBeInstanceOf(Image);
  });

  it('rejects if image fails to load', async () => {
    const badURL = 'http://badurl.test/image.png';
    const mockImage = {
      set src(value) {
        setTimeout(() => this.onerror(new Error('fail')), 0);
      },
      onload: null,
      onerror: null,
    };
    global.Image = jest.fn(() => mockImage);

    await expect(loadImage(badURL)).rejects.toThrow();
  });
});
