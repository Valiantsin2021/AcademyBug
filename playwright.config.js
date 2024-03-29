// @ts-check
import { defineConfig } from '@playwright/test'
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000/',
  //   reuseExistingServer: !process.env.CI,
  // },
  testDir: './tests/',
  timeout: 300000,
  expect: {
    timeout: 20 * 1000
  },
  reporter: [
    ['list'],
    [
      'html',
      {
        open: 'never'
      }
    ],
    [
      'allure-playwright',
      {
        detail: true,
        outputFolder: 'allure-results',
        suiteTitle: true
      }
    ]
  ],
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: 4,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  globalSetup: './envs/global_setup.js',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 40 * 1000,
    navigationTimeout: 40 * 1000,
    locale: 'en-GB',
    headless: true,
    screenshot: 'only-on-failure', // "on"
    video: 'retain-on-failure', // "on"
    // retries: 2, // number of retry to fail test
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://academybugs.com/',
    viewport: null,
    // viewport: process.env.CI ? { width: 1920, height: 1080 } : null,
    // launchOptions: { args: ['--start-maximized'] },
    trace: 'retain-on-failure'

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        channel: 'chrome',
        launchOptions: {
          args: ['--start-maximized'] // starting the browser in full screen
        }
      }
    }

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { channel: 'chrome' },
    // },
  ]

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
})
