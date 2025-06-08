describe('Horoscope Page E2E Tests', () => {
  beforeAll(async () => {
    // Persist localStorage before the page loads
    await page.evaluateOnNewDocument(() => {
      localStorage.setItem(
        'tarotUserInfo',
        JSON.stringify({ name: 'TestUser', dob: '25-03-2000' }) // Aries
      );
    });

    // Now go directly to the page you want to test
    await page.goto(
      'http://127.0.0.1:8080/source/frontend/DailyHoroscopePage/horoscopePage.html',
      {
        waitUntil: 'networkidle0',
      }
    );
  });

  test('should greet the user by name', async () => {
    const usernameText = await page.$eval('#username', (el) => el.textContent);
    expect(usernameText).toMatch(/Hi TestUser!/);
  });

  test('should display correct zodiac sign', async () => {
    const signText = await page.$eval('.sign-text', (el) => el.textContent);
    expect(signText).toBe('Aries');
  });

  test('should render all horoscope cards with titles and descriptions', async () => {
    const cards = await page.$$('horoscope-card');
    expect(cards.length).toBe(3);

    for (const card of cards) {
      const backTitle = await card
        .getProperty('backTitle')
        .then((p) => p.jsonValue());
      const backDesc = await card
        .getProperty('backDesc')
        .then((p) => p.jsonValue());
      expect(backTitle).not.toBe('');
      expect(backDesc).not.toBe('');
    }
  });

  test('should click Share button without errors', async () => {
    await expect(page.click('#generateHoroscopeBtn')).resolves.toBeUndefined();
  });
});
