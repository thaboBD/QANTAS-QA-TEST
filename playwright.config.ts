import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  reporter: [
    ['html', {
      open: 'never', 
      outputFolder: 'playwright-report'
    }],
    ['line']
  ],
  use: {
    baseURL: 'https://www.saucedemo.com/',
  },
  projects: [
    {
      name: 'chromium',
      retries: 3,
      use: { 
        browserName: 'chromium',
      },
      testDir: 'src/ui/tests',
    },
    {
      name: 'firefox',
      retries: 3,
      use: { 
        browserName: 'firefox' 
      },
      testDir: 'src/ui/tests',
    },
    {
      name: 'Api-tests',
      use: {
        baseURL: 'https://petstore.swagger.io/v2/',
      },
      testDir: 'src/api/tests',
    },
  ],
};

export default config;