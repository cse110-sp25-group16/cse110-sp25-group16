describe('Archive Page - Horoscope Mode Only', () => {
  beforeAll(async () => {
    await page.goto(
      'http://localhost:8080/source/frontend/ArchivePage/archive.html',
      { waitUntil: 'domcontentloaded' }
    );

    await page.evaluate(() => {
      localStorage.setItem(
        'tarotUserInfo',
        JSON.stringify({ name: 'TestUser', dob: '2000-06-08' })
      );
    });

    await page.reload({ waitUntil: 'networkidle0' });
  });

  it('should display horoscope cards when Horoscope mode is selected', async () => {
    await page.click('#horoscope');
    await page.waitForSelector('.horoscope-container horoscope-card', {
      timeout: 3000,
    });

    const cards = await page.$$('.horoscope-container horoscope-card');
    expect(cards.length).toBe(3);

    const title = await cards[0].evaluate((card) =>
      card.getAttribute('front-title')
    );
    expect(['Theme', 'Mood', 'Advice']).toContain(title);
  });
});
