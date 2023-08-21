// @ts-check
import * as base from '@playwright/test'
import fs from 'fs'
import { HomePage } from '../pages/homePage'

let bugsFound = []
/**
 * @typedef {object} HomePageTestArgs - homePage test args
 * @property {HomePage} homePage     - homePage
 */
/** @type {base.Fixtures<HomePageTestArgs, {}, base.PlaywrightTestArgs, base.PlaywrightWorkerArgs>} */
export const extension = {
  homePage: async ({ page }, use) => {
    // Set up the fixture
    const homePage = new HomePage(page)
    // log all uncaught exceptions
    page.on('pageerror', exception => {
      console.log(`Uncaught exception: "${exception}"`)
    })
    page.on('console', m => console.log('BROWSER log: ', m.text()))

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
}
export const test = base.test.extend(extension)
export const expect = base.expect
