describe('Signup Page', () => {
  beforeAll(async () => {
    // First go to the real page, but block the scripts from running
    await page.goto(
      'http://localhost:8080/source/frontend/signup.html',
      { waitUntil: 'domcontentloaded' } // don't let scripts run yet
    );
  });
  it('should render the signup form with all required fields', async () => {
    await page.waitForSelector('#signup-form');
    const nameExists = await page.$('#name');
    const monthExists = await page.$('#dob-month');
    const dayExists = await page.$('#dob-day');
    const yearExists = await page.$('#dob-year');
    const mbtiExists = await page.$('#mbti');
    const submitBtnExists = await page.$('button[type="submit"]');

    expect(nameExists).toBeTruthy();
    expect(monthExists).toBeTruthy();
    expect(dayExists).toBeTruthy();
    expect(yearExists).toBeTruthy();
    expect(mbtiExists).toBeTruthy();
    expect(submitBtnExists).toBeTruthy();
  });

  it('should allow user to fill out and submit the form', async () => {
    await page.goto('http://localhost:8080/source/frontend/signup.html', {
      waitUntil: 'domcontentloaded',
    });

    await page.evaluate(() => {
      // Prevent navigation after form submit
      delete window.location;
      window.location = { set: () => {}, assign: () => {} };
    });

    await page.type('#name', 'Jane Doe');
    await page.type('#dob-month', '06');
    await page.type('#dob-day', '08');
    await page.type('#dob-year', '1990');
    await page.select('#mbti', 'INTJ');

    await page.click('button[type="submit"]');
    await page.waitForTimeout(500); // give the browser time to run JS

    const stored = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('tarotUserInfo'));
    });

    expect(stored.name).toBe('Jane Doe');
    expect(stored.dob).toBe('08/06/1990');
    expect(stored.mbti).toBe('INTJ');
  }, 30000);
});
