import http from 'k6/http'
import {sleep} from 'k6'

import { browser } from 'k6/browser';
import { check } from 'https://jslib.k6.io/k6-utils/1.5.0/index.js';

export const options = {
  scenarios: {
    default: {
      executor: 'ramping-vus',
      startVUs: 3,
      stages: [
        { duration: '10s', target: 5 },   // Ramp up to 5 users over 10 seconds
        { duration: '15s', target: 10 },  // Ramp up to 10 users over 20 seconds 
        { duration: '30s', target: 12 },  // Ramp up to 15 users over 30 seconds
        { duration: '15s', target: 10 },  // Ramp up to 10 users over 10 seconds
        { duration: '10s', target: 5 },   // Ramp down to 0 users over 10 seconds
      ],
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
  thresholds: {
    checks: ['rate>=0.99'],
  },
};

export default async function () {
  const page = await browser.newPage();

  try {
    // await page.goto('http://host.docker.internal:8501');
    await page.goto('http://localhost:8501')

    // Enter login credentials
    await page.locator('input').type('demo');

    // press enter
    await page.locator('input').press('Enter');

    await page.waitForTimeout(1000);

    // await page.screenshot({ path: 'screenshots/screenshot.png' });
    
    // Check adminadmin on the page
    await check(page.locator('h3'), {
      header: async (lo) => (await lo.textContent()) == 'demodemo',
    });

  } finally {
    await page.close();
  }
}

// docker run --rm -i -v $(pwd):/scripts grafana/k6:latest-with-browser run /scripts/myscript.js