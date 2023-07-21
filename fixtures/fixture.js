// @ts-check
import { test as myTest } from '@playwright/test'
import fs from 'fs'
import { HomePage } from '../pages/homePage'

let bugsFound = []
export const test = myTest.extend({
  homePage: async ({ page }, use) => {
    /**
     * @param {import('../pages/homePage').HomePage} homePage
     */
    // Set up the fixture
    const homePage = new HomePage(page)
    // log all uncaught exceptions
    page.on('pageerror', exception => {
      console.log(`Uncaught exception: "${exception}"`)
    })

    // block google analytics

    await page.route('https://www.google-analytics.com/g/collect*', route => {
      route.fulfill({
        status: 204,
        body: ''
      })
    })

    // open home page, accept cookies and go to bugs page

    await homePage.openPage('/')
    await homePage.acceptCookies.click()
    await homePage.findBugsBtn.click()

    // use the prepared page conditioon

    await use(homePage)

    // handle the found bug

    await homePage.handleBug(bugsFound)
    const localStorage = await page.evaluate(() => JSON.stringify(window.localStorage, null, 2))
    console.log(await localStorage)
    fs.writeFileSync('localstorage.json', localStorage)
    fs.writeFileSync('./bugs.json', JSON.stringify(bugsFound, null, 2))
  }
})

export const expect = test.expect
