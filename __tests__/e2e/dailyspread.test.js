describe('Daily Spread Page', () => {
  beforeAll(async () => {
    // First go to the real page, but block the scripts from running
    await page.goto(
      'http://localhost:8080/source/frontend/DailySpreadPage/dailyspread.html',
      { waitUntil: 'domcontentloaded' } // don't let scripts run yet
    );

    await page.evaluate(() => {
      localStorage.setItem(
        'tarotUserInfo',
        JSON.stringify({ name: 'TestUser' })
      );

      localStorage.setItem(
        'dailyCards',
        JSON.stringify({
          '2025-06-08': {
            3: [
              { id: 1, faceup: false, upsideDown: false },
              { id: 27, faceup: false, upsideDown: false },
              { id: 11, faceup: false, upsideDown: true },
            ],
            5: [
              { id: 1, faceup: false, upsideDown: false },
              { id: 35, faceup: false, upsideDown: true },
              { id: 23, faceup: false, upsideDown: false },
              { id: 59, faceup: false, upsideDown: false },
              { id: 18, faceup: false, upsideDown: false },
            ],
            10: [
              { id: 37, faceup: false, upsideDown: false },
              { id: 70, faceup: false, upsideDown: true },
              { id: 45, faceup: false, upsideDown: false },
              { id: 57, faceup: false, upsideDown: true },
              { id: 46, faceup: false, upsideDown: true },
              { id: 72, faceup: false, upsideDown: false },
              { id: 34, faceup: false, upsideDown: false },
              { id: 5, faceup: false, upsideDown: false },
              { id: 6, faceup: false, upsideDown: false },
              { id: 53, faceup: false, upsideDown: false },
            ],
          },
        })
      );
    });

    await page.reload({ waitUntil: 'networkidle0' });

  },

    // it('should greet the user with a message', async () => {
    //   await page.waitForSelector('#username');
    //   const greetingText = await page.$eval('#username', (el) => el.textContent);
    //   expect(greetingText).toMatch(/Hi .* here's today's readings/i);
    // });

    it('should render tarot cards when an amount is selected', async () => {
      await page.select('#card-amount', '3');
      await page.waitForSelector('card-component');
      const cardCount = await page.$$eval(
        'card-component',
        (cards) => cards.length
      );
      expect(cardCount).toBeGreaterThanOrEqual(1);
    }, 70000);

    it('each tarot card should render key attributes in shadow DOM', async () => {
      const cards = await page.$$('card-component');
      const shadow = await cards[0].getProperty('shadowRoot');
      expect(shadow).toBeTruthy();
    });
  });
