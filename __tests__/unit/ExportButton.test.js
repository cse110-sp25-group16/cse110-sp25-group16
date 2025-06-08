/**
 * @jest-environment jsdom
 */

import {
  getStoredCards,
  wrapText,
  loadImage
} from '../../source/frontend/components/ExportButton.js';

import { jest } from '@jest/globals';

// === Mocks ===

// Mock localStorage for getStoredCards
beforeEach(() => {
  const store = {};
  global.localStorage = {
    getItem: key => store[key],
    setItem: (key, value) => (store[key] = value),
    removeItem: key => delete store[key],
    clear: () => Object.keys(store).forEach(k => delete store[k])
  };
});

// Mock canvas getContext and ctx.measureText
beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = () => ({
    fillText: jest.fn(),
    measureText: text => ({ width: text.length * 5 }),
  });
});

// Mock global Image constructor
global.Image = class {
  constructor() {
    setTimeout(() => {
      if (this.onload) this.onload();
    }, 0);
  }
};

// === Tests ===

describe('ExportButton helpers', () => {
  it('getStoredCards returns an array from localStorage', () => {
    localStorage.setItem('cards', JSON.stringify([{ id: 'x' }]));
    const cards = getStoredCards();
    expect(Array.isArray(cards)).toBe(true);
    expect(cards[0].id).toBe('x');
  });

  it('wrapText returns lines of text', () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const lines = wrapText(ctx, 'This is a long sentence that wraps.', 100, 0, 0, 50);
    expect(Array.isArray(lines)).toBe(true);
  });

  it('loadImage loads an Image', async () => {
    const image = await loadImage('https://via.placeholder.com/150');
    expect(image).toBeInstanceOf(Image);
  });
});
