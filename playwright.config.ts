import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 0 : 0,
  workers: 1,
  reporter: [
    ["line"],
    ['allure-playwright', { 
      outputFolder: 'allure-results',
      suiteTitle: false,
      detail: true,
      links: [
        {
          type: 'issue',
          urlTemplate: 'https://github.com/bodyaaao0o/test.git',
          nameTemplate: 'Issue #%s'
        }
      ]
    }],
  ],
  timeout: 120000,
  use: {
    navigationTimeout: 120000,
    trace: 'retain-on-failure',
    headless: true,
    screenshot: 'only-on-failure',
  },
  
  outputDir: 'test-results',
  expect: {
    timeout: 10000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 12'],
        isMobile: true,
        viewport: { width: 450, height: 850 },
      },
    },
  ],
});