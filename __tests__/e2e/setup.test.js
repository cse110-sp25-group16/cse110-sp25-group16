// __tests__/e2e/setup.test.js

const path = require('path');
const { pathToFileURL } = require('url');

describe('Settings Page E2E', () => {
  // path to settings.html in source/frontend
  const htmlPath = path.resolve(
    __dirname,
    '../../source/frontend/settings.html'
  );
  const fileUrl = pathToFileURL(htmlPath).href;
  console.log('→ loading page at', fileUrl);

  beforeAll(async () => {
    // auto-accept any dialogs
    page.on('dialog', (dialog) => dialog.accept());
  });

  beforeEach(async () => {
    // load the page, clear storage, then reload to reset form state
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });
    await page.evaluate(() => localStorage.clear());
    await page.reload({ waitUntil: 'networkidle0' });
  });

  test('loads existing user data from localStorage', async () => {
    const testUser = {
      name: 'Test User',
      dob: '25/10/1999',
      mbti: 'INTJ',
    };

    // Seed localStorage and reload
    await page.evaluate((userData) => {
      localStorage.setItem('tarotUserInfo', JSON.stringify(userData));
    }, testUser);
    await page.reload({ waitUntil: 'networkidle0' });

    // Assert form fields reflect user data
    const nameValue = await page.$eval('#name', (el) => el.value);
    const mbtiValue = await page.$eval('#mbti', (el) => el.value);
    const [mmValue, ddValue, yyyyValue] = await page.$$eval(
      '.dob-fields input',
      (els) => els.map((el) => el.value)
    );

    expect(nameValue).toBe('Test User');
    expect(mbtiValue).toBe('INTJ');
    expect(mmValue).toBe('10');
    expect(ddValue).toBe('25');
    expect(yyyyValue).toBe('1999');
  });

  test('submits form and stores correct values in localStorage', async () => {
    // Fill form inputs
    await page.type('#name', 'Jane Doe');
    await page.select('#mbti', 'ENTP');
    const dobInputs = await page.$$('.dob-fields input');
    await dobInputs[0].type('07');
    await dobInputs[1].type('04');
    await dobInputs[2].type('1985');

    // Click Save
    await page.click('.save-btn');

    // Verify localStorage content
    const stored = await page.evaluate(() =>
      JSON.parse(localStorage.getItem('tarotUserInfo'))
    );
    expect(stored).toEqual({
      name: 'Jane Doe',
      dob: '04/07/1985',
      mbti: 'ENTP',
    });
  });

  test('clears data and resets form when Clear All Data clicked', async () => {
    // Pre-populate and reload
    await page.evaluate(() =>
      localStorage.setItem(
        'tarotUserInfo',
        JSON.stringify({ name: 'Foo', dob: '01/02/2000', mbti: 'ISFP' })
      )
    );
    await page.reload({ waitUntil: 'networkidle0' });

    // Click Clear All Data
    await page.click('#clearButton');

    // Assert storage is cleared
    const postClear = await page.evaluate(() =>
      localStorage.getItem('tarotUserInfo')
    );
    expect(postClear).toBeNull();

    // Assert form reset
    const nameVal = await page.$eval('#name', (el) => el.value);
    const mbtiVal = await page.$eval('#mbti', (el) => el.value);
    const [mVal, dVal, yVal] = await page.$$eval('.dob-fields input', (els) =>
      els.map((el) => el.value)
    );

    expect(nameVal).toBe('');
    expect(mbtiVal).toBe('');
    expect(mVal).toBe('');
    expect(dVal).toBe('');
    expect(yVal).toBe('');
  });
});
