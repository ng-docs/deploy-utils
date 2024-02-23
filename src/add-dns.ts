import {launch} from 'puppeteer';
import {DnsClient} from './dns-client';
import {ngDocsDomains} from './ng-docs-domains';
import {accessKeyId, accessKeySecret} from './secret/aliyun.ts';

async function main() {
  // Launch the browser and open a new blank page
  const browser = await launch({headless: false, userDataDir: '~/chrome-data', timeout: 300 * 1000});
  const pages = await browser.pages();
  const page = pages[0];
  for (const name of ngDocsDomains) {
    try {
      await page.goto(`https://github.com/organizations/ng-docs/settings/pages_verified_domains/${name}.angular.cn`);

      const [subName, txtRecord] = await page.$$eval('input.form-control.color-fg-muted', it => it.map(it => it.value));
      const dns = new DnsClient(accessKeyId, accessKeySecret);
      await dns.addDnsRecord(subName, 'angular.cn', 'TXT', txtRecord);

      await delay(4000);

      await page.$$eval('button', (buttons) => {
        return buttons.find(it => it.textContent?.trim() === 'Verify')?.click();
      });
      await delay(1000);
    } catch (e) {
      console.error(e);
    }
  }

  await browser.close();
}

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main().then(console.log).catch(console.error);