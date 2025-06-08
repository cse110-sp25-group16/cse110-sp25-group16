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
    await page.type('#name', 'Jane Doe');
    await page.type('#dob-month', '06');
    await page.type('#dob-day', '08');
    await page.type('#dob-year', '1990');
    await page.select('#mbti', 'INTJ');

    // Intercept localStorage set from inside signup.js
    await page.evaluate(() => {
      // Patch localStorage.setItem to record the value for test checking
      const originalSetItem = localStorage.setItem;
      window.testStorage = {};
      localStorage.setItem = (key, val) => {
        window.testStorage[key] = val;
        originalSetItem.call(localStorage, key, val);
      };
    });

    await Promise.all([
      page.click('button[type="submit"]'),
      page.waitForNavigation({ waitUntil: 'networkidle0' }).catch(() => {}), // In case form doesn't actually navigate
    ]);

    const userInfo = await page.evaluate(() => {
      return JSON.parse(window.testStorage?.tarotUserInfo || '{}');
    });

    expect(userInfo.name).toBe('Jane Doe');
    expect(userInfo.mbti).toBe('INTJ');
    expect(userInfo.dob).toBe('1990-06-08');
  }, 30000);
});