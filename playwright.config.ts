import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  reporter: [
    ['html', {
      open: 'never', 
      outputFolder: 'playwright-report'
    }],
    ['line']
  ],
  projects: [
    {
      name: 'chromium',
      retries: 3,
      use: { 
        browserName: 'chromium',
        baseURL: 'https://www.saucedemo.com/',
      },
      testDir: 'src/ui/tests',
    },
    {
      name: 'firefox',
      retries: 3,
      use: { 
        browserName: 'firefox',
        baseURL: 'https://www.saucedemo.com/',
      },
      testDir: 'src/ui/tests',
    },
    {
      name: 'Api-tests',
      use: {
        baseURL: 'https://api.weatherbit.io/v2.0/',
      },
      testDir: 'src/api/tests',
    },
  ],
};

export default config;