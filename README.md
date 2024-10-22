# QA Automation Test Framework

Automated UI and API tests using Playwright.

Note: normally I wouldn't commit the .env file but to make the setup easier I have included it in the repo.
## Prerequisites

- Node.js v20 or above ([download](https://nodejs.org/))

## Setup

```bash
# Clone the repository
git clone https://github.com/thaboBD/QANTAS-QA-TEST.git

# Navigate to project directory
cd qantas-qa-test

# Install dependencies
npm i
```

## Running Tests

### Local Test Execution

```bash
# Run all tests with HTML report (Recommended)
npm run test:all:html

# Other options:
npm run test:chrome:html    # Chrome tests
npm run test:firefox:html   # Firefox tests
npm run test:api:html       # API tests only
```

### GitHub Actions

1. Go to "Actions" tab in GitHub
2. Click "Playwright Tests"
3. Click "Run workflow"
4. Select test type:
   - `all`: All tests
   - `chrome`: Chrome tests
   - `firefox`: Firefox tests
   - `api`: API tests
5. Click "Run workflow"

Test reports will be available as downloadable artifacts after the run completes.