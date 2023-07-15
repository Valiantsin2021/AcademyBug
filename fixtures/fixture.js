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
    // const response = page.waitForResponse('/find-bugs/')
    await homePage.openPage('/')
    await homePage.acceptCookies.click()
    await homePage.findBugsBtn.click()
    // console.log(await response))
    await use(homePage)
    // handle the found bug
    await homePage.handleBug(bugsFound)
    //store the local storage and bugsfound array to JSON files
    const localStorage = await page.evaluate(() => JSON.stringify(window.localStorage))
    console.log(await localStorage)
    fs.writeFileSync('localstorage.json', localStorage)
    fs.writeFileSync('./bugs.json', JSON.stringify(bugsFound))
  }
})

export const expect = test.expect
