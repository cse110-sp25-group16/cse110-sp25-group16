describe('Archive Page', () => {
  beforeAll(async () => {
    await page.goto(
      'http://localhost:8080/source/frontend/ArchivePage/archive.html',
      { waitUntil: 'domcontentloaded' } // pause before scripts run
    );

    await page.evaluate(() => {
      localStorage.setItem(
        'tarotUserInfo',
        JSON.stringify({ name: 'TestUser', dob: '08/06/1990' })
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
  });

  it('should allow user to switch to Tarot mode and select a date', async () => {
    await page.waitForSelector('#tarot');
    await page.click('#tarot');

    const dateInput = await page.$('#date');
    await dateInput.evaluate((el) => (el.value = '2025-06-08'));
    await dateInput.click(); // force change event
    await dateInput.press('Enter');

    await page.waitForTimeout(500); // wait for archive data to load
  });

  it('should display 3 tarot cards when 3-card dropdown is opened', async () => {
    await page.click('#3-dropdown-button');
    await page.waitForSelector('#3-card-container card-component');
    const cards = await page.$$eval(
      '#3-card-container card-component',
      (els) => els.length
    );
    expect(cards).toBe(3);
  });

  it('should render each card with a shadow root', async () => {
    const cards = await page.$$('#3-card-container card-component');
    expect(cards.length).toBeGreaterThan(0);

    const shadow = await cards[0].getProperty('shadowRoot');
    expect(shadow).toBeTruthy();
  });
});
