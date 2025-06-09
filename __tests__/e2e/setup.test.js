const puppeteer = require('puppeteer');

describe('Settings Page E2E', () => {
  let browser, page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    page = await browser.newPage();

    const html = require('fs').readFileSync('source/frontend/settings.html', 'utf8');
    await page.setContent(html, { waitUntil: 'domcontentloaded' });

    // Mock localStorage before the DOMContentLoaded script
    await page.evaluateOnNewDocument(() => {
      localStorage.setItem(
        'tarotUserInfo',
        JSON.stringify({
          name: 'TestUser',
          mbti: 'INTJ',
          dob: '15/04/2000',
        })
      );
    });
  });

  it('loads existing user data from localStorage', async () => {
    await page.reload({ waitUntil: 'domcontentloaded' });

    const nameValue = await page.$eval('#name', (el) => el.value);
    const mbtiValue = await page.$eval('#mbti', (el) => el.value);
    const mm = await page.$eval(
      '.dob-fields input[placeholder="MM"]',
      (el) => el.value
    );
    const dd = await page.$eval(
      '.dob-fields input[placeholder="DD"]',
      (el) => el.value
    );
    const yyyy = await page.$eval(
      '.dob-fields input[placeholder="YYYY"]',
      (el) => el.value
    );

    expect(nameValue).toBe('TestUser');
    expect(mbtiValue).toBe('INTJ');
    expect(mm).toBe('04');
    expect(dd).toBe('15');
    expect(yyyy).toBe('2000');
  });

  it('submits form and stores correct values in localStorage', async () => {
    await page.type('#name', ' Updated');
    await page.select('#mbti', 'ENTP');
    await page.$eval(
      '.dob-fields input[placeholder="MM"]',
      (el) => (el.value = '12')
    );
    await page.$eval(
      '.dob-fields input[placeholder="DD"]',
      (el) => (el.value = '31')
    );
    await page.$eval(
      '.dob-fields input[placeholder="YYYY"]',
      (el) => (el.value = '1999')
    );

    await page.click('.save-btn');

    const data = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('tarotUserInfo'));
    });

    expect(data.name).toBe('TestUser Updated');
    expect(data.mbti).toBe('ENTP');
    expect(data.dob).toBe('31/12/1999');
  });

  it('clears data and resets form when Clear All Data clicked', async () => {
    await page.evaluate(() => {
      window.confirm = () => true; // auto-confirm dialog
    });

    await page.click('#clearButton');

    const data = await page.evaluate(() =>
      localStorage.getItem('tarotUserInfo')
    );
    expect(data).toBeNull();

    const nameValue = await page.$eval('#name', (el) => el.value);
    expect(nameValue).toBe('');
  });

  afterAll(async () => {
    await browser.close();
  });
});
