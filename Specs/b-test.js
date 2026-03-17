import { browser } from 'k6/browser';
// import { sleep } from 'k6';

export const options = {
  scenarios: {
    browser_test: {
      executor: 'constant-vus',
      vus: 3,              // start small so you can see browsers clearly
      duration: '20s',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

export default async function () {

  const page = await browser.newPage();

  console.log(`VUS ${__VU} started iteration ${__ITER}`);

  await page.goto('https://blazedemo.com/');

  await page.waitForTimeout(3000); // keep browser open so you can see it

  // await page.close();
}