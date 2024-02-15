import {launch} from 'puppeteer';

async function main() {
  // Launch the browser and open a new blank page
  const browser = await launch({headless: false, userDataDir: '~/chrome-data', timeout: 30 * 1000});
  const pages = await browser.pages();
  const page = pages[0];

  for (let i = 2; i < 17; ++i) {
    try {
      if (i == 3) continue;

      await page.goto(`https://github.com/organizations/ng-docs/settings/pages_verified_domains/v${i}.angular.cn`);

      await page.waitForSelector('button[type=submit]');

      await page.$$eval('button[type=submit]', (buttons) => buttons.find(it => it.textContent?.trim() === 'Verify')?.click());
    } catch (e) {
      console.error(e);
    }
  }
}

main().then(console.log).catch(console.error);