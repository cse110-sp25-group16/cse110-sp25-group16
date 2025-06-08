describe('Signup Page', () => {
  beforeAll(async () => {
    // Block navigation BEFORE any script runs
    await page.evaluateOnNewDocument(() => {
      window.location.assign = () => {};
      Object.defineProperty(window.location, 'href', {
        set: () => {},
      });
    });

    await page.goto(
      'http://localhost:8080/source/frontend/signup.html',
      { waitUntil: 'domcontentloaded' }
    );

    await page.waitForSelector('#signup-form');
  });

  it('should allow user to fill out and submit the form', async () => {
    await page.type('#name', 'Jane Doe');
    await page.type('#dob-month', '06');
    await page.type('#dob-day', '08');
    await page.type('#dob-year', '1990');
    await page.select('#mbti', 'INTJ');

    // Intercept alert so the test doesn't hang
    page.on('dialog', async dialog => {
      expect(dialog.message()).toMatch(/Sign up successful!/i);
      await dialog.dismiss();
    });

    await page.click('button[type="submit"]');

    // Verify localStorage update
    const userData = await page.evaluate(() =>
      JSON.parse(localStorage.getItem('tarotUserInfo'))
    );

    expect(userData).toEqual({
      name: 'Jane Doe',
      dob: '08/06/1990',
      mbti: 'INTJ',
    });
  }, 120000); // test timeout
});

