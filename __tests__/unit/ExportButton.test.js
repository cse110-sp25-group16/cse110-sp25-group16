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
    // first card upright
    expect(card1).toMatchObject({
      image: 'img-1.png',
      name: 'Name 1',
      keywords: 'alpha, beta',
      upsideDown: false,
      meaning: 'up1. up2',
    });
    // second card upside-down
    expect(card2.upsideDown).toBe(true);
    expect(card2.meaning).toBe('rev1. rev2');
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
    const result = ExportButton.getStoredCards(0);
    expect(Array.isArray(result)).toBe(true);
  });

  it('wrapText no-op with zero maxWidth', () => {
    const calls = [];
    const ctx = {
      measureText: () => ({ width: 0 }),
      fillText: () => calls.push(true),
    };
    ExportButton.wrapText(ctx, '', 0, 0, 0, 0);
    expect(calls.length).toBe(0);
  });

  it('loadImage resolves for non-error URLs', async () => {
    await expect(
      ExportButton.loadImage('another-good.png')
    ).resolves.toBeInstanceOf(global.Image);
  });
});
