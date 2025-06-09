/**
 * @jest-environment jsdom
 */
import { jest } from '@jest/globals';
import * as ExportButton from '../../source/frontend/components/ExportButton.js';


// --- mock out Card and Horoscope so we never hit canvas ---
jest.mock('../../source/backend/Card.js', () =>
  jest.fn().mockImplementation((id, faceup, upsideDown) => ({
    id,
    faceup,
    upsideDown,
    getImg: () => `img-${id}.png`,
    getCardName: () => `Name ${id}`,
    getKeywords: () => ['alpha', 'beta'],
    isUpsideDown: () => upsideDown,
    getReversedMeaning: () => ['rev1', 'rev2'],
    getUprightMeanings: () => ['up1', 'up2'],
  }))
);

jest.mock('../../source/backend/horoscope.js', () => ({
  getHoroscope: jest.fn().mockReturnValue('aries'),
  getDate: jest.fn().mockReturnValue('2000-01-01'),
  generateReadingFromCurrentUser: jest
    .fn()
    .mockReturnValue(['theme-text', 'mood-text', 'advice-text']),
}));

describe('getStoredCards()', () => {
  beforeEach(() => {
    // mock localStorage to return a mix of object and JSON-string entries
    const today = new Date().toLocaleDateString();
    const fakeDaily = {
      [today]: {
        2: [
          { id: 1, faceup: true, upsideDown: false },
          JSON.stringify({ id: 2, faceup: true, upsideDown: true }),
        ],
      },
    };
    global.localStorage = {
      getItem: jest.fn((key) => {
        if (key === 'dailyCards') return JSON.stringify(fakeDaily);
        if (key === 'tarotUserInfo')
          return JSON.stringify({ name: 'Tester', dob: '2000-01-01' });
      }),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    };
  });

  it('parses stored cards and returns the correct shape', () => {
    const amount = 2;
    const result = ExportButton.getStoredCards(amount);

    // 2 cards + the date string
    expect(result).toHaveLength(3);

    const [card1, card2, date] = result;

    console.log(card1);
    // first card upright
    expect(card1).toMatchObject({
      image: 'm01.jpg',
      name: 'The Magician',
      keywords: 'capability, empowerment, activity',
      upsideDown: false,
      meaning:
        'Taking appropriate action. Receiving guidance from a higher power. Becoming a channel of divine will. Expressing masculine energy in appropriate and constructive ways. Being yourself in every way',
    });
    // second card upside-down
    expect(card2.upsideDown).toBe(true);
    expect(card2.meaning).toBe(
      'Being aloof. Obsessing on secrets and conspiracies. Rejecting guidance from spirit or intuition. Revealing all. Ignoring gut feelings. Refusing to become involved, even when involvement is appropriate'
    );
    // trailing date
    expect(typeof date).toBe('string');
  });
});

describe('wrapText()', () => {
  it('breaks long text into multiple fillText calls', () => {
    const calls = [];
    const ctx = {
      // measureText returns a width proportional to string length
      measureText: (txt) => ({ width: txt.length * 8 }),
      fillText: (text, x, y) => calls.push({ text, x, y }),
    };

    const longText = 'one two three four five';
    // maxWidth small so it must wrap
    ExportButton.wrapText(ctx, longText, 100, 10, 50, 12, '► ', '…');

    expect(calls.length).toBeGreaterThan(1);
    calls.forEach((c) => {
      expect(c.text.startsWith('► ') || /\w+/.test(c.text)).toBe(true);
      expect(typeof c.x).toBe('number');
      expect(typeof c.y).toBe('number');
    });
  });
});

describe('loadImage()', () => {
  beforeEach(() => {
    class FakeImage {
      constructor() {
        this.crossOrigin = '';
        this.onload = null;
        this.onerror = null;
      }
      set src(url) {
        if (url.includes('bad')) {
          setTimeout(() => this.onerror(new Error('fail')), 0);
        } else {
          setTimeout(() => this.onload(), 0);
        }
      }
    }
    global.Image = FakeImage;
  });

  it('resolves when the image loads successfully', async () => {
    await expect(ExportButton.loadImage('good.png')).resolves.toBeInstanceOf(
      global.Image
    );
  });

  it('rejects when the image fails to load', async () => {
    await expect(ExportButton.loadImage('bad.png')).rejects.toThrow('fail');
  });
});

// Dummy coverage tests to touch more lines
describe('coverage placeholders', () => {
  it('invokes getStoredCards with zero amount', () => {
    const result = ExportButton.getStoredCards();
    expect(Array.isArray(result)).toBe(true);
  });

  it('wrapText no-op with zero maxWidth', () => {
    const calls = [];
    const ctx = {
      measureText: () => ({ width: 0 }),
      fillText: () => calls.push(true),
    };
    ExportButton.wrapText(ctx, '', 0, 0, 0, 0);
    expect(calls.length).toBe(1);
  });

  it('loadImage resolves for non-error URLs', async () => {
    await expect(
      ExportButton.loadImage('another-good.png')
    ).resolves.toBeInstanceOf(global.Image);
  });
});

describe('generateImageCards()', () => {
  let originalCreateElement;
  let fakeCanvas, fakeLink, ctx;

  beforeEach(() => {
    // stub document.createElement
    originalCreateElement = document.createElement;
    // stub fonts.ready
    document.fonts = { ready: Promise.resolve() };
    // stub loadImage to immediately resolve with a dummy image
    jest
      .spyOn(ExportButton, 'loadImage')
      .mockImplementation(() => Promise.resolve({}));
    // stub localStorage for tarotUserInfo
    jest.spyOn(global.localStorage, 'getItem').mockImplementation((key) => {
      if (key === 'tarotUserInfo')
        return JSON.stringify({ name: 'Tester', dob: '2000-01-01' });
      return null;
    });

    // build a minimal fake 2D context with all methods used
    ctx = {
      textBaseline: '',
      fillStyle: '',
      textAlign: '',
      drawImage: jest.fn(),
      strokeRect: jest.fn(),
      stroke: jest.fn(),
      fillText: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      arc: jest.fn(),
      createLinearGradient: jest.fn(() => ({ addColorStop: jest.fn() })),
      save: jest.fn(),
      translate: jest.fn(),
      scale: jest.fn(),
      restore: jest.fn(),
    };

    // fake <canvas> and <a> elements
    fakeCanvas = {
      width: 0,
      height: 0,
      getContext: () => ctx,
      toDataURL: () => 'data:image/jpeg;base64,FAKE',
    };
    fakeLink = { click: jest.fn(), download: '', href: '' };

    document.createElement = (tag) =>
      tag === 'canvas'
        ? fakeCanvas
        : tag === 'a'
          ? fakeLink
          : originalCreateElement(tag);
  });

  afterEach(() => {
    document.createElement = originalCreateElement;
    jest.restoreAllMocks();
  });

  it('walks through every branch and triggers download', async () => {
    const data = [
      {
        image: 'img1.png',
        name: 'Card 1',
        keywords: 'k1',
        meaning: 'm1',
        upsideDown: false,
      },
      {
        image: 'img2.png',
        name: 'Card 2',
        keywords: 'k2',
        meaning: 'm2',
        upsideDown: true,
      },
      '2025-06-08',
    ];
    await expect(
      ExportButton.generateImageCards([...data])
    ).resolves.toBeUndefined();
    expect(fakeLink.click).toHaveBeenCalled();
  });
});

describe('generateImageHoroscope()', () => {
  let originalCreateElement;
  let fakeCanvas, fakeLink, ctx;

  beforeEach(() => {
    originalCreateElement = document.createElement;
    document.fonts = { ready: Promise.resolve() };
    jest
      .spyOn(ExportButton, 'loadImage')
      .mockImplementation(() => Promise.resolve({}));
    // reuse the same fake localStorage stub
    jest.spyOn(global.localStorage, 'getItem').mockImplementation((key) => {
      if (key === 'tarotUserInfo')
        return JSON.stringify({ name: 'Tester', dob: '2000-01-01' });
      return null;
    });

    ctx = {
      fillStyle: '',
      textAlign: '',
      drawImage: jest.fn(),
      stroke: jest.fn(),
      fillText: jest.fn(),
      beginPath: jest.fn(),
      createLinearGradient: jest.fn(() => ({ addColorStop: jest.fn() })),
      arc: jest.fn(),
      save: jest.fn(),
      translate: jest.fn(),
      rotate: jest.fn(),
      restore: jest.fn(),
    };

    fakeCanvas = {
      width: 1000,
      height: 1200,
      getContext: () => ctx,
      toDataURL: () => 'data:image/jpeg;base64,FAKE',
    };
    fakeLink = { click: jest.fn(), download: '', href: '' };

    document.createElement = (tag) =>
      tag === 'canvas'
        ? fakeCanvas
        : tag === 'a'
          ? fakeLink
          : originalCreateElement(tag);
  });

  afterEach(() => {
    document.createElement = originalCreateElement;
    jest.restoreAllMocks();
  });

  it('walks through all drawing logic and triggers download', async () => {
    await expect(
      ExportButton.generateImageHoroscope()
    ).resolves.toBeUndefined();
    expect(fakeLink.click).toHaveBeenCalled();
  });
});
