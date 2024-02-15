import {launch} from 'puppeteer';
import {DnsClient} from './dns-client';
import {aigcDomainNames} from './aigc-domain-names';
import {accessKeyId, accessKeySecret} from './secret/aliyun.ts';

async function main() {
  // Launch the browser and open a new blank page
  const browser = await launch({headless: false, userDataDir: '~/chrome-data', timeout: 30 * 1000});
  const pages = await browser.pages();
  const page = pages[0];
  for (const name of aigcDomainNames) {
    try {
      await page.goto(`https://github.com/organizations/aigc-spring-angular/settings/pages_verified_domains/${name}.angular.cn`);

      const [subName, txtRecord] = await page.$$eval('input.form-control.color-fg-muted', it => it.map(it => it.value));
      const dns = new DnsClient(accessKeyId, accessKeySecret);
      await dns.addDnsRecord(subName, 'TXT', txtRecord);

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