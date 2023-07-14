import { test, expect } from '@playwright/test'
import fs from 'fs'
import Tesseract from 'tesseract.js'
test(`google local storage`, async ({ page }) => {
  await page.goto('https://www.google.com/')
  await page.locator('[name="q"]').fill('hello')
  const color = await page.locator('[name="q"]').evaluate(el => {
    return window.getComputedStyle(el).getPropertyValue('background-color')
  })
  console.log(color)
  const localStorage = await page.evaluate(() => JSON.stringify(window.localStorage))
  console.log(await localStorage)
  fs.writeFileSync('localstorage.json', localStorage)
  await page.pause()
})
test(`OCR the image and log the text`, async () => {
  await Tesseract.recognize('./picture.png', 'eng').then(({ data: { text } }) => {
    let a = text
    console.log(typeof a)
    fs.writeFileSync('./teserractoutput.txt', text)
  })
})
