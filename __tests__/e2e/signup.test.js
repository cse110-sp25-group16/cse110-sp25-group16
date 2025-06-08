describe('Signup Page', () => {
  beforeAll(async () => {
    // Prevent page navigation before any script runs
    await page.evaluateOnNewDocument(() => {
      window.location.assign = () => {};
      window.location.replace = () => {};
    });

    await page.goto('http://localhost:8080/source/frontend/signup.html', {
      waitUntil: 'domcontentloaded',
    });

    await page.waitForSelector('#signup-form');
  });

  it(
    'should allow user to fill out and submit the form',
    async () => {
      await page.type('#name', 'Jane Doe');
      await page.type('#dob-month', '06');
      await page.type('#dob-day', '08');
      await page.type('#dob-year', '1990');
      await page.select('#mbti', 'INTJ');

      // Handle alert popup
      page.on('dialog', async (dialog) => {
        expect(dialog.message()).toMatch(/Sign up successful/i);
        await dialog.dismiss(); // or accept()
      });

      await page.click('button[type="submit"]');

      // Check localStorage after submission
      const storedData = await page.evaluate(() =>
        JSON.parse(localStorage.getItem('tarotUserInfo'))
      );

      expect(storedData).toEqual({
        name: 'Jane Doe',
        dob: '08/06/1990',
        mbti: 'INTJ',
      });
    },
    120000 // timeout for this test
  );
});


