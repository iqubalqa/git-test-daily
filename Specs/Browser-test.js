import { browser } from 'k6/browser';
import { sleep } from 'k6';

export const options = {
  scenarios: {
    browser_test: {
      executor: 'constant-vus',
      vus: 10,
      duration: '30s',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

export default async function () {
  const page = browser.newPage();

  await page.goto('https://blazedemo.com/');

  sleep(2);

//   await page.close();
}