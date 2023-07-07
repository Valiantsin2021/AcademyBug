import { test } from '@playwright/test'
import fs from 'fs'

test(`google local storage`, async ({ page }) => {
  await page.goto('https://www.google.com/')
  await page.locator('[name="q"]').fill('hello')
  const localStorage = await page.evaluate(() => JSON.stringify(window.localStorage))
  console.log(await localStorage)
  fs.writeFileSync('localstorage.json', localStorage)
  await page.pause()
})
