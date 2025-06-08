describe('Signup Page', () => {
  beforeAll(async () => {
    await page.goto(
      'http://localhost:8080/source/frontend/signup.html',
      { waitUntil: 'domcontentloaded' } // do NOT wait for full load
    );

    // Inject a blocker for navigation *early*, before any scripts run
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(window, 'location', {
        writable: true,
        value: {
          assign: () => {}, // prevent navigation
          set: () => {},
          href: '',
        },
      });
    });

    await page.reload({ waitUntil: 'networkidle0' }); // let page fully load now
  });

  it('should allow user to fill out and submit the form', async () => {
    await page.waitForSelector('#signup-form');

    await page.type('#name', 'Jane Doe');
    await page.type('#dob-month', '06');
    await page.type('#dob-day', '08');
    await page.type('#dob-year', '1990');
    await page.select('#mbti', 'INTJ');

    await page.click('button[type="submit"]');
    await page.waitForTimeout(500); // let localStorage save

    const userData = await page.evaluate(() =>
      JSON.parse(localStorage.getItem('tarotUserInfo'))
    );

    expect(userData).toEqual({
      name: 'Jane Doe',
      dob: '08/06/1990',
      mbti: 'INTJ',
    });
  }, 30000);
});
