// @ts-check

import { expect, test } from '../fixtures/fixture'
import { color, measureExecutionTime, product, user } from '../index'

test.beforeEach(async ({}, testInfo) => {
  testInfo.duration
})
test.afterEach(async ({}, testInfo) => {
  measureExecutionTime(testInfo)
})

test.describe('Explore a practice test site that has 25 real bugs planted inside', async () => {
  test('first bug - the product quantity can not be increased past 2', async ({ homePage }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find first bug'
    })
    // console.log(await page.coverage)
    // @ts-ignore
    await homePage.addToBasketAndUpdate(product[0])
  })
  test('second bug - the page becomes unresponsive when clicking on the number of results', async ({ homePage }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find second bug'
    })
    await homePage.showNumberOfProducts(`50`)
  })
  test('third bug - the yellow and orange colors of the product are misspelled.', async ({ homePage }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find third bug'
    })
    await homePage.openProduct(product[1])
    await homePage.chooseColor(color[0])
  })
  test.fixme(
    'fourth bug- the twitter share button in the product details page is broken.',
    // @ts-ignore
    async ({ homePage, page, context }) => {
      test.info().annotations.push({
        type: 'issue',
        description: 'find fourth bug'
      })
      await homePage.openProduct(product[0])
      homePage.twitterLink.click()
      console.log(await page.title())
      // const [newtab] = await Promise.all([
      //   context.waitForEvent('page'), //listener
      //   homePage.twitterLink.scrollIntoViewIfNeeded(), //event on the promise page
      //   homePage.twitterLink.click()
      // ])
      // await newtab.close()
    }
  )
  test('fifth bug - page crush on change the currency', async ({ homePage }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find fifth bug'
    })
    await homePage.openProduct(product[0])
    await homePage.chooseCurrency('EUR')
    await expect(homePage.bugModal).toBeVisible()
  })
  test('six bug -  the filter by price doesn`t work in the product details or product list pages.', async ({
    homePage
  }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find six bug'
    })
    await homePage.openProduct(product[0])
    await homePage.selectPriceRange('$15.00 - $19.99 (1)')
  })
  test('seventh bug - Sign In button overlaps the footer.', async ({ homePage }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find seventh bug'
    })
    await homePage.openProduct(product[0])
    await homePage.cookiesBtn.click()
    await homePage.signinBtn.click()
  })
  test('eights bug - Sign In button is misaligned vertically.', async ({ homePage }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find eights bug'
    })
    await homePage.openPage('./account/?ec_page=login&account_error=login_failed')
    await homePage.cookiesBtn.click()
    await homePage.signinBtn.click()
  })
  test('ninth bug - the title of the password field is misaligned.', async ({ homePage }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find ninth bug'
    })
    await homePage.openPage('./account/?ec_page=login&account_error=login_failed')
    await homePage.passwordPlaceholder.click()
  })
  test('tens bug - the My Space share page loads infinitely.', async ({ homePage }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find tens bug'
    })
    await homePage.openProduct(product[0])
    await homePage.mySpaceLink.click()
    await homePage.waitPlaceholder.click()
  })
  test.skip('eleventh bug - the page becomes unresponsive when clicking on the Post Comment button.', async ({
    homePage
  }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find eleventh bug'
    })
    await homePage.openProduct(product[0])
    await homePage.postCommentLink.click()
  })
  test('twelwes bug - the text under the New User section is not in English.', async ({ homePage }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find twelwes bug'
    })
    await homePage.openPage('./account/?ec_page=login&account_error=login_failed')
    await homePage.userAccountHeader.click()
  })
  test('thirteens bug - the short description and description of the product are not in English.', async ({
    homePage
  }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find thirteens bug'
    })
    await homePage.openProduct(product[0])
    await homePage.productDescriptions.click()
  })
  test.describe.serial('user register', () => {
    test('fourteens bug - the billing address loads infinitely.', async ({ homePage }) => {
      test.info().annotations.push({
        type: 'issue',
        description: 'find fourteens bug'
      })
      await homePage.openProduct(product[0])
      await homePage.cookiesBtn.click()
      await homePage.signUpBtn.click()
      await homePage.registerUser(user)
      await homePage.accountBillingInfoLink.click({ force: true })
    })
    // @ts-ignore
    test('twenty one bug - the order history loads infinitely.', async ({ homePage, page }) => {
      test.info().annotations.push({
        type: 'issue',
        description: 'find twenty one bug'
      })
      await homePage.addToBasket(product[0])
      await homePage.cookiesBtn.click()
      await homePage.accountLoginWidgetInput.fill(user.email)
      await homePage.accountPasswordWidgetInput.fill(user.password)
      await homePage.signinBtn.click()
      await homePage.closeModal.click()
      await homePage.bugFoundHeader.isVisible()
      await homePage.closeModal.click()
      await homePage.openPage('my-cart/')
      await homePage.orderHistoryLink.click()
      await homePage.billingInfoUpdateLoader.click({ force: true })
    })
  })
  test('fifteens bug - unreadable symbols in shoping cart popup', async ({ homePage }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find fifteens bug'
    })
    await homePage.addToBasket(product[0])
    await homePage.cardWidgetBtn.hover()
    await homePage.cardWidgetProductQuantityPlaceholder.click({ force: true })
  })
  test('sixteen bug - there is big space before the last letter in "Return to Store".', async ({ homePage }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find fifteens bug'
    })
    await homePage.addToBasket(product[0])
    await homePage.cardWidgetBtn.hover()
    await homePage.deleteFromCardBtn.click()
    await homePage.returnToStoreBtn.click()
  })
  test('seventeens bug - the manufacturer link in the product details page is broken.', async ({ page, homePage }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find seventeens bug'
    })
    await homePage.openProduct(product[0])
    await homePage.productManufacturer.click()
    await page.waitForLoadState()
    await page.goBack()
  })
  test('eighteens bug - the page becomes unresponsive when clicking on the Retrieve Password button.', async ({
    homePage
  }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find eighteens bug'
    })
    await homePage.openProduct(product[0])
    await homePage.signUpBtn.click()
    await homePage.forgotPasswordBtn.click()
    await homePage.forgotPasswordEmailInput.fill(user.email)
    await homePage.retrievePasswordBtn.click()
    await expect(homePage.bugModal).toBeVisible()
  })
  test('nineteens bug - the grand total is $100 more than the sum of all products in the cart.', async ({
    homePage
  }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find nineteens bug'
    })
    await homePage.addToBasket(product[0])
    await homePage.basketTotalBtn.click()
  })
  test('twenty bug - the image is not completely displayed.', async ({ homePage }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find twenty bug'
    })
    await homePage.addToBasket(product[0])
    await homePage.menuLink.click()
    await homePage.productImageLink.nth(3).click({ force: true })
  })
  test('twenty two bug - the page freezes when increasing the product quantity having green or pink colors chosen.', async ({
    homePage
  }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find twenty two bug'
    })
    await homePage.openProduct(product[1])
    await homePage.chooseColor(color[1])
    await homePage.addOneProductBtn.click()
    await expect(homePage.bugModal).toBeVisible()
  })
})
/*
NOT REPRODUCIBLE
  {
            'bugTitle': 'You found a “Visual” bug',
            'subtitle': "In this bug, the image is not completely displayed.",
            'severity': 'Medium',
            'bugType': 'Visual',
            'steps': '<li>Open <a href="https://academybugs.com" target="_blank" rel="noopener noreferrer"><b>https://academybugs.com</b></a></li>'
                    + '<li>Click the Find Bugs link on the navigation bar</li>'
                    + '<li>Click on "Dark Grey Jeans"</li>',
            'expResult': 'The product image fills the box entirely',
            'actResult': 'The image has a white space on the right',
            'gifImg': 'https://academybugs.com/wp-content/uploads/2020/10/Find-6.gif',
            'imgImg': 'https://academybugs.com/wp-content/uploads/2020/10/6.png'
  },
  {
  'bugTitle': 'You found a “Performance” bug',
            'subtitle': "In this bug, the product in the Hot Item section keeps loading.",
            'severity': 'High',
            'bugType': 'Performance',
            'steps': '<li>Open <a href="https://academybugs.com" target="_blank" rel="noopener noreferrer"><b>https://academybugs.com</b></a></li>'
                    + '<li>Click the Find Bugs link on the navigation bar</li>'
                    + '<li>Open a product</li>'
                    + '<li>Open the product in the Hot Item section of the right side menu</li>',
            'expResult': 'The product in the Hot Item section is displayed',
            'actResult': 'The page loads infinitely',
            'gifImg': 'https://academybugs.com/wp-content/uploads/2020/10/19.gif',
            'imgImg': 'https://academybugs.com/wp-content/uploads/2020/10/19.png'
  },
*/
