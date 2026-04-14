import { browser } from 'k6/browser';

export const options = {
  scenarios: {
    browser_test: {
      executor: 'constant-vus',
      vus: 1,
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

  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto('https://google.com/', {
      timeout: '60s',
    });

    await page.waitForLoadState('load');

    // Keep browser visible
    await page.waitForTimeout(10000);

  } finally {
    await page.close();
  }
}