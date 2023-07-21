import { test } from '@playwright/test'
import fs from 'fs'
import Tesseract from 'tesseract.js'
import { ENV } from '../envs/env.js'
import { measureExecutionTime } from '../utils/test-orchestration/measure-execution-time.js'
console.log(ENV.BASE_URL, ENV.USERNAME, ENV.PASSWORD)
test.beforeEach(async ({}, testInfo) => {
  testInfo.duration
})
test.afterEach(async ({}, testInfo) => {
  measureExecutionTime(testInfo)
})
test(`google local storage`, async ({ page }, testInfo) => {
  // console.log(testInfo.config)
  await page.goto('https://www.google.com/')
  await page.locator('[name="q"]').fill('hello')
  const color = await page.locator('[name="q"]').evaluate(el => {
    return window.getComputedStyle(el).getPropertyValue('background-color')
  })
  console.log(color)
  const localStorage = await page.evaluate(() => JSON.stringify(window.localStorage))
  console.log(await localStorage)
  fs.writeFileSync('localstorage.json', localStorage)
})
test(`OCR the image and log the text`, async () => {
  await Tesseract.recognize('./tesseract/data/picture.png', 'eng').then(({ data: { text } }) => {
    let a = text
    console.log(typeof a)
    fs.writeFileSync('./tesseract/output/teserractoutput.txt', text)
  })
})
