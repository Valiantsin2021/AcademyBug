// @ts-check
import { test as myTest } from '@playwright/test'
import { HomePage } from '../pages/homePage'
const fixture = myTest.extend({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page))
  }
})

export const test = fixture
export const expect = fixture.expect
