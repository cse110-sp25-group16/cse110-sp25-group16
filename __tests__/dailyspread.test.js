describe('Daily Spread Page', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:8080/DailySpreadPage/dailyspread.html');
  });

  it('should greet the user with a message', async () => {
    await page.waitForSelector('#username');
    const greeting = await page.$eval('#username', (el) => el.textContent);
    expect(greeting).toMatch(/here's today's readings/i);
  });

  it('should render 3 tarot card components', async () => {
    await page.waitForSelector('card-component');
    const count = await page.$$eval('card-component', (cards) => cards.length);
    expect(count).toBe(3);
  });

  it('each tarot card should render key data in the shadow DOM', async () => {
    const cards = await page.$$('card-component');
    for (const card of cards) {
      const shadow = await card.evaluateHandle((el) => el.shadowRoot);
      const title = await shadow.$eval('h3', (el) => el.textContent);
      const imgSrc = await shadow.$eval('img', (img) =>
        img.getAttribute('src')
      );
      expect(title.length).toBeGreaterThan(0);
      expect(imgSrc).toMatch(/\.(jpg|jpeg|png|svg)$/);
    }
  });

  it('should flip the card on click', async () => {
    const card = await page.$('card-component');
    const wrapper = await card.evaluateHandle((el) =>
      el.shadowRoot.querySelector('.card-wrapper')
    );

    // Click the card wrapper to flip it
    await wrapper.click();

    // Check if it has the .flip class
    const flipped = await card.evaluate((el) =>
      el.shadowRoot.querySelector('.card').classList.contains('flip')
    );

    expect(flipped).toBe(true);
  });

  it('should collapse and expand the "Description" section', async () => {
    const card = await page.$('card-component');
    const shadow = await card.evaluateHandle((el) => el.shadowRoot);
    const content = await shadow.$('[data-content="desc"]');

    // Click to collapse
    await shadow.evaluate((shadowRoot) => {
      const btn = shadowRoot.querySelector('button[data-toggle="desc"]');
      btn.click();
    });

    await new Promise((r) => setTimeout(r, 500));

    const isCollapsed = await content.evaluate((el) =>
      el.classList.contains('collapsed')
    );
    expect(isCollapsed).toBe(true);

    // Click to expand
    await shadow.evaluate((shadowRoot) => {
      const btn = shadowRoot.querySelector('button[data-toggle="desc"]');
      btn.click();
    });

    await new Promise((r) => setTimeout(r, 500));

    const isExpanded = await content.evaluate((el) =>
      el.classList.contains('collapsed')
    );
    expect(isExpanded).toBe(false);
  }, 10000);
});
