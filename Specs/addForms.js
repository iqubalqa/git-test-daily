import { browser } from 'k6/browser';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    browser_test: {
      executor: 'shared-iterations',
      vus: 1,
      duration: '1m',
      options: {
        browser: {
          type: 'chromium',
          slowMo: '800ms', // ← slows every action by 800ms so you can watch
        },
      },
    },
  },
};

export default async function () {
  const page = await browser.newPage(); // ← was missing await
  await page.setViewportSize({ width: 1920, height: 1080 }); // ← set viewport size for better visibility

  await page.goto('https://blazedemo.com/purchase.php');
  

  // Fill form fields with a visible pause between each
  await page.locator('#inputName').fill('John Doe');
  await page.waitForTimeout(500);

  await page.locator('#address').fill('123 Main St');
  await page.waitForTimeout(500);

  await page.locator('#city').fill('Berlin');
  await page.waitForTimeout(500);

  await page.locator('#state').fill('Germany');
  await page.waitForTimeout(500);

  await page.locator('#zipCode').fill('12345');
  await page.waitForTimeout(500);

  await page.locator('#cardType').selectOption('visa');
  await page.waitForTimeout(500);

  await page.locator('#creditCardNumber').fill('4111111111111111');
  await page.waitForTimeout(500);

  await page.locator('#creditCardMonth').fill('12');
  await page.waitForTimeout(500);

  await page.locator('#creditCardYear').fill('2025');
  await page.waitForTimeout(500);

  await page.locator('#nameOnCard').fill('John Doe');
  await page.waitForTimeout(500);

  await page.check('input[type="checkbox"]'); // ← removed space inside quotes
  await page.waitForTimeout(500);

  const submit = page.locator('input[type="submit"]');

  await Promise.all([                  // ← fixed typo: awaitpromise → await Promise
    page.waitForNavigation(),
    submit.click(),
  ]);

  check(page, {                        // ← check is a sync function, no await needed
    'Text Validation': p =>
      p.locator('h1').textContent() == "Thank you for your purchase today!",
  });

  sleep(1);
  await page.close();
}