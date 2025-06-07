describe("Daily Spread Page", () => {
  beforeAll(async () => {
    await page.goto(
      "http://localhost:8080/source/frontend/DailySpreadPage/dailyspread.html",
    );
  });

  it("should greet the user with a message", async () => {
    await page.waitForSelector("#username");
    const greetingText = await page.$eval("#username", (el) => el.textContent);
    expect(greetingText).toMatch(/Hi .* here's today's readings/i);
  });

  it("should render tarot cards when an amount is selected", async () => {
    await page.select("#card-amount", "3");
    await page.waitForSelector("card-component");
    const cardCount = await page.$$eval(
      "card-component",
      (cards) => cards.length,
    );
    expect(cardCount).toBeGreaterThanOrEqual(1);
  });

  it("each tarot card should render key attributes in shadow DOM", async () => {
    const cards = await page.$$("card-component");
    const shadow = await cards[0].getProperty("shadowRoot");
    expect(shadow).toBeTruthy();
  });
});
