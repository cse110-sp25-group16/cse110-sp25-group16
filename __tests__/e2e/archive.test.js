describe('Archive Page', () => {
  beforeAll(async () => {
    await page.goto(
      'http://localhost:8080/source/frontend/ArchivePage/archive.html',
      {
        waitUntil: 'domcontentloaded',
      }
    );

    await page.evaluate(() => {
      localStorage.setItem(
        'tarotUserInfo',
        JSON.stringify({ name: 'TestUser', dob: '2000-06-08' })
      );

      localStorage.setItem(
        'dailyCards',
        JSON.stringify({
          '2025-06-08': {
            3: [
              { id: 1, faceup: true, upsideDown: false },
              { id: 27, faceup: true, upsideDown: false },
              { id: 11, faceup: true, upsideDown: true },
            ],
          },
        })
      );
    });

    await page.reload({ waitUntil: 'networkidle0' });
  });

  it('should allow user to switch to Tarot mode and select a date', async () => {
    await page.click('#tarot');
    const dateInput = await page.$('#date');
    await dateInput.click({ clickCount: 3 });
    await dateInput.type('2025-06-08');
    await dateInput.press('Enter');

    // Instead of page.waitForTimeout:
    await new Promise((r) => setTimeout(r, 500));
  });

  it('should display 3 tarot cards when 3-card dropdown is opened', async () => {
    await page.click('#\\33 -dropdown-button'); // use escaped selector
    await page.waitForSelector('#\\33 -card-container card-component');

    const cards = await page.$$('#\\33 -card-container card-component');
    expect(cards.length).toBe(3);
  });

  it('should render each card with a shadow root', async () => {
    const cards = await page.$$('#\\33 -card-container card-component');
    expect(cards.length).toBeGreaterThan(0);

    const shadowRoot = await cards[0].evaluateHandle((card) => card.shadowRoot);
    expect(shadowRoot).toBeTruthy();
  });
});
