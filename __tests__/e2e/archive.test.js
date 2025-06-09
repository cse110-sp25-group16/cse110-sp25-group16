/*
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
    await new Promise((r) => setTimeout(r, 1000));
  });

  it('should display 3 tarot cards when 3-card dropdown is opened', async () => {
    await page.click('#\\3 -dropdown-button'); // use escaped selector
    await page.waitForSelector('#\\3 -card-container card-component');

    const cards = await page.$$('#\\3 -card-container card-component');
    expect(cards.length).toBe(3);
  });

  it('should render each card with a shadow root', async () => {
    const cards = await page.$$('#\\3 -card-container card-component');
    expect(cards.length).toBeGreaterThan(0);

    const shadowRoot = await cards[0].evaluateHandle((card) => card.shadowRoot);
    expect(shadowRoot).toBeTruthy();
  });
});
*/
describe('Archive Page', () => {
  /**
   * Before the test runs, navigate to the archive page and set up the
   * necessary localStorage data to simulate a user with a past reading.
   */
  beforeAll(async () => {
    // Navigate to the archive page.
    await page.goto(
      'http://localhost:8080/source/frontend/ArchivePage/archive.html',
      {
        waitUntil: 'domcontentloaded',
      }
    );

    // Mock localStorage data for a test user and a 3-card reading on a specific date.
    // This is done within the browser's context.
    await page.evaluate(() => {
      localStorage.setItem(
        'tarotUserInfo',
        JSON.stringify({ name: 'TestUser', dob: '2000-06-08' })
      );

      localStorage.setItem(
        'dailyCards',
        JSON.stringify({
          // Data for a 3-card reading on June 8, 2025.
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

    // Reload the page to ensure the application loads and processes the mocked localStorage data.
    await page.reload({ waitUntil: 'networkidle0' });
  });

  /**
   * This test covers the full user flow of viewing a past tarot reading.
   * It combines the steps of selecting a date, opening the reading, and verifying the cards
   * into one robust test case to avoid timing and state issues between tests.
   */
  it('should allow user to view a 3-card reading for a selected date', async () => {
    // 1. Switch to Tarot mode.
    await page.click('#tarot');

    // 2. Find the date input, clear it, and type the target date.
    const dateInput = await page.$('#date');
    await dateInput.click({ clickCount: 3 }); // Select existing text.
    await dateInput.type('2025-06-08');
    await dateInput.press('Enter');

    // 3. **KEY FIX**: Wait for the dropdown button using a stable attribute selector.
    // This avoids issues with CSS escaping for IDs that start with a number.
    const dropdownButtonSelector = '[id="3-dropdown-button"]';
    await page.waitForSelector(dropdownButtonSelector);

    // 4. Click the dropdown to reveal the cards.
    await page.click(dropdownButtonSelector);

    // 5. Wait for the card container and the custom card components to be visible.
    const cardSelector = '[id="3-card-container"] card-component';
    await page.waitForSelector(cardSelector);

    // 6. Get all card components and assert that there are exactly 3.
    const cards = await page.$$(cardSelector);
    expect(cards.length).toBe(3);

    // 7. Verify that the web components are correctly rendered with a shadow root.
    const firstCard = cards[0];
    expect(firstCard).toBeDefined();
    const shadowRoot = await firstCard.evaluateHandle((card) => card.shadowRoot);
    expect(shadowRoot.asElement()).toBeTruthy();
  }, 60000); // Test timeout remains at 60 seconds.
});

