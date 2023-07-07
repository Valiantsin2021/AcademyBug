# JS automation tests using Playwright <a href="https://playwright.dev/" target="blank"><img align="center" src="https://playwright.dev/img/playwright-logo.svg" alt="WebdriverIO" height="40" width="40" /></a>

## Author

- [@Valiantsin2021](https://www.github.com/Valiantsin2021) [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## This repository purpose is automation of functional test of [AcademyBugs](https://academybugs.com/)

## There is 1 test suite to find out 22 Bugs on the AcademyBug webapp:

## Allure report - https://valiantsin2021.github.io/AcademyBug/

## Before the test run make sure to update local browsers versions to latest and have NodeJS, npm and Java (for allure report) installed

## Test suite

## Job done:

1.  Page Object model implemented (constants parametrized in .test//utils/constants.js)
2.  Allure reporter with report published on GitHub pages
3.  Test suite integration to GitHub Actions with automated tests run on push and report publishing to gh-pages
4.  Precommit hook for code linting and formatting
5.  Docker run (incl java for allure report):

```
docker build -t playwright .
//run without volume
docker run -it --name playwright playwright npm t
//mount local folder as a volume
docker run -it --name playwright --mount type=bind,source="$(pwd)",target=/app playwright npm t

// image should be the same version as version of playwright in package.json

"docker run -it --rm --name playwright -v ${PWD}:/app -w /app playwright npm t"
```

## Setup:

1. Clone this repository or unzip downloaded file
2. Install dependencies with "npm install"
3. To run tests - open terminal and navigate to the path of the cloned project and:

   - run tests with npm test
   - to generate report run : npm run allure
   - to run headless with Chrome: npm run ci
   - report is created in folder allure-report (index.html should be opened via Live server plugin in VSCode)

## 🔗 Links

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://valiantsin2021.github.io/Portfolio/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/valiantsin-lutchanka/)
