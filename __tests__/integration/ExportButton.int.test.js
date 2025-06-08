/**
 * @jest-environment jsdom
 */

import { generateImageCards } from '../../source/frontend/components/ExportButton.js';

describe('generateImageCards', () => {
  it('renders canvas and draws cards properly', async () => {
    const dummyCard = {
      id: 'card1',
      isFaceUp: () => true,
      isUpsideDown: () => false,
      getImg: () => 'https://via.placeholder.com/150',
    };

    const canvas = await generateImageCards([dummyCard]);

    expect(canvas).toBeInstanceOf(HTMLCanvasElement);
    expect(canvas.width).toBeGreaterThan(0);
    expect(canvas.height).toBeGreaterThan(0);
  });
});
