/**
 * @jest-environment jsdom
 */

import {
  getStoredCards,
  wrapText,
  loadImage,
  generateImageCards,
} from '../../source/frontend/components/ExportButton.js';

import { jest } from '@jest/globals';

// Manual mock for Card.js (if needed)
jest.mock('../../source/backend/Card.js', () => {
  return function MockCard(id) {
    return {
      getImg: () => `${id}.jpg`,
      isFaceUp: () => true,
      isUpsideDown: () => false
    };
  };
});

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
