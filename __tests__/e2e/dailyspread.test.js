describe('Daily Spread Page', () => {
  beforeAll(async () => {
    // First go to the real page, but block the scripts from running
    await page.goto(
      'http://localhost:8080/source/frontend/DailySpreadPage/dailyspread.html',
      { waitUntil: 'domcontentloaded' } // don't let scripts run yet
    );

    // Set localStorage before any script uses it
    await page.evaluate(() => {
      localStorage.setItem(
        'tarotUserInfo',
        JSON.stringify({ name: 'TestUser' })
      );
    });

    // Now reload so the page scripts run and pick up localStorage
    await page.reload({ waitUntil: 'networkidle0' });

    // Now wait for the greeting to appear
    await page.waitForSelector('#username');
  });

  it('should greet the user with a message', async () => {
    await page.waitForSelector('#username');
    const greetingText = await page.$eval('#username', (el) => el.textContent);
    expect(greetingText).toMatch(/^Hi .+/i);
  });

  it('should render tarot cards when an amount is selected', async () => {
    await page.select('#card-amount', '3');
    await page.waitForSelector('card-component');
    const cardCount = await page.$$eval(
      'card-component',
      (cards) => cards.length
    );
    expect(cardCount).toBeGreaterThanOrEqual(1);
  }, 60000);

  it('each tarot card should render key attributes in shadow DOM', async () => {
    const cards = await page.$$('card-component');
    const shadow = await cards[0].getProperty('shadowRoot');
    expect(shadow).toBeTruthy();
  });
});
