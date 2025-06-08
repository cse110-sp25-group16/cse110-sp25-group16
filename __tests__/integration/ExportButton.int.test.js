/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';

const createMockCanvas = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 100;
  canvas.height = 100;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'blue';
  ctx.fillRect(0, 0, 100, 100);
  return canvas;
};

// Mock the module BEFORE importing anything from it
jest.mock('../../source/frontend/components/ExportButton.js', async () => {
  const actual = await jest.importActual(
    '../../source/frontend/components/ExportButton.js'
  );

  return {
    __esModule: true,
    ...actual,
    loadImage: jest.fn(() => Promise.resolve(createMockCanvas())),
  };
});

// Now import from the mocked module
import { generateImageCards } from '../../source/frontend/components/ExportButton.js';

// Mock global Image for image loading simulation
global.Image = class {
  constructor() {
    this._src = '';
    this.onload = null;
    this.onerror = null;
  }

  set src(url) {
    this._src = url;
    if (this.onload) {
      setTimeout(() => this.onload(), 0);
    }
  }

  get src() {
    return this._src;
  }
};

// Polyfill for document.fonts.ready for jsdom
beforeAll(() => {
  if (!document.fonts) {
    Object.defineProperty(document, 'fonts', {
      value: {
        ready: Promise.resolve(),
      },
      writable: true,
    });
  }
});

describe('generateImageCards', () => {
  it('renders canvas and draws cards properly', async () => {
    const dummyCard = {
      id: 'card1',
      name: 'Card 1',
      image: 'card1.png',
      upsideDown: false,
      keywords: 'keyword1, keyword2',
      meaning: 'This is the meaning.',
    };

    // Add a date string as the last element (per your generateImageCards code)
    const data = [dummyCard, '2025-06-08'];

    const canvas = await generateImageCards(data);

    expect(canvas).toBeInstanceOf(HTMLCanvasElement);
    expect(canvas.width).toBeGreaterThan(0);
    expect(canvas.height).toBeGreaterThan(0);
  }, 20000);
});
