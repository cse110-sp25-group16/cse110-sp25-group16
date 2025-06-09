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

    // 3. **KEY FIX**: Wait for the dropdown button for the 3-card reading to be
    // rendered on the page BEFORE trying to interact with it.
    const dropdownButtonSelector = '#\\33-card-reading-dropdown'; // Escaped selector for id="3-card-reading-dropdown"
    await page.waitForSelector(dropdownButtonSelector);

    // 4. Click the dropdown to reveal the cards.
    await page.click(dropdownButtonSelector);

    // 5. Wait for the card container and the custom card components to be visible.
    const cardSelector = '#\\33-card-reading-container card-component'; // Selector for cards within the container
    await page.waitForSelector(cardSelector);

    // 6. Get all card components and assert that there are exactly 3.
    const cards = await page.$$(cardSelector);
    expect(cards.length).toBe(3);

    // 7. Verify that the web components are correctly rendered with a shadow root.
    const firstCard = cards[0];
    expect(firstCard).toBeDefined();
    const shadowRoot = await firstCard.evaluateHandle((card) => card.shadowRoot);
    expect(shadowRoot.asElement()).toBeTruthy();
  }, 30000); // Test timeout.
});