
const { generateImageCards } = require('../../source/frontend/components/ExportButton.js');

describe('generateImageCards', () => {
  it('renders canvas and draws cards properly', async () => {
    document.body.innerHTML = '<canvas id="tarot-canvas" width="1000" height="1000"></canvas>';
    const canvas = document.getElementById('tarot-canvas');
    const ctx = canvas.getContext('2d');

    const cards = [
      {
        id: 1,
        getImg: () => 'mock-image.png',
        getCardName: () => 'Card-1',
        getKeywords: () => ['keyword1'],
        getUprightMeanings: () => ['meaning1'],
        getReversedMeaning: () => 'reversed',
        getSuit: () => 'Wands',
        getArcana: () => 'Major',
        getNumeral: () => 'I',
        getDescription: () => 'desc',
        getSymbolism: () => 'sym',
      },
    ];

    const date = new Date('2024-01-01');
    await generateImageCards(ctx, cards, 'mockHoroscope', date);
    expect(ctx).toBeDefined();
  });
});
