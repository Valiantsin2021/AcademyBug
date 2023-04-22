// @ts-check
const { test, expect } = require('@playwright/test')
const uuid = require('uuid')
const unique = uuid.v1()
const product = 'Blue Hoodie'
const fakeUserName = '50196d90-e0f0-11ed-9606-1d6306658721@1.com'
const fakePassword = '50196d90-e0f0-11ed-9606-1d6306658721@1.com'
test.describe.only('Explore a practice test site that has 25 real bugs planted inside', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./')
    await page.getByRole('button', { name: '×' }).click()
    await page.getByRole('link', { name: 'Find Bugs' }).click()
  })
  test.afterEach(async ({ page }) => {
    await page.getByRole('button', { name: 'Close' }).click()
    await page
      .getByRole('heading', {
        name: 'There are more bugs in the find bugs page, please keep searching.'
      })
      .isVisible()
    await page.getByRole('button', { name: 'Close' }).click()
  })
  test('first bug - the product quantity can not be increased past 2', async ({ page }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find first bug'
    })
    await page.getByRole('link', { name: product }).click()
    await page.getByRole('button', { name: '+' }).click()
    await page.getByRole('button', { name: 'ADD TO CART' }).click()
    await page.getByRole('button', { name: '+' }).click()
    await page.getByText('UPDATE').click()
  })
  test('second bug - the page becomes unresponsive when clicking on the number of results', async ({ page }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find second bug'
    })
    await page.getByRole('link', { name: '50' }).click()
    await expect(page.locator('div.academy-crash-overlay-bug')).toBeVisible()
  })
  test('third bug - the yellow and orange colors of the product are misspelled.', async ({ page }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find third bug'
    })
    await page.getByRole('link', { name: 'Professional Suit' }).click()
    await page.getByTitle('Orang').click()
    await page.getByText('Orang').click()
  })
  test('fourth bug- the twitter share button in the product details page is broken.', async ({ page }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find fourth bug'
    })
    await page.getByRole('link', { name: product }).click()
    await page.locator('[alt="Twitter"]').click()
  })
  test('fifth bug - page crush on change the currency', async ({ page }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find fifth bug'
    })
    await page.getByRole('link', { name: product }).click()
    await page.locator('[name="ec_currency_conversion"]').selectOption('EUR')
    await expect(page.locator('div.academy-crash-overlay-bug')).toBeVisible()
  })
  test('six bug -  the filter by price doesn`t work in the product details or product list pages.', async ({
    page
  }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find six bug'
    })
    await page.getByRole('link', { name: product }).click()
    await page.getByText('$15.00 - $19.99 (1)').click()
  })
  test('seventh bug - Sign In button overlaps the footer.', async ({ page }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find seventh bug'
    })
    await page.getByRole('link', { name: product }).click()
    await page.getByRole('button', { name: 'Accept cookies' }).click()
    await page.getByText('SIGN IN').click()
  })
  test('eights bug - Sign In button is misaligned vertically.', async ({ page }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find eights bug'
    })
    await page.goto('./account/?ec_page=login&account_error=login_failed')
    await page.getByRole('button', { name: 'Accept cookies' }).click()
    await page.getByText('SIGN IN').click()
  })
  test('ninth bug - the title of the password field is misaligned.', async ({ page }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find ninth bug'
    })
    await page.goto('./account/?ec_page=login&account_error=login_failed')
    await page.waitForLoadState()
    await page.locator('#display-account-login-form-start').getByText('Password*').click()
  })
  test('tens bug - the My Space share page loads infinitely.', async ({ page }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find tens bug'
    })
    await page.getByRole('link', { name: product }).click()
    await page.locator('[alt="MySpace"]').click()
    await page.getByText('Please wait…').click()
  })
  test('eleventh bug - the page becomes unresponsive when clicking on the Post Comment button.', async ({ page }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find eleventh bug'
    })
    await page.getByRole('link', { name: product }).click()
    await page.getByText('Post Comment').click()
  })
  test('twelwes bug - the text under the New User section is not in English.', async ({ page }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find twelwes bug'
    })
    await page.goto('./account/?ec_page=login&account_error=login_failed')
    await page.waitForLoadState()
    await page.locator('.ec_account_right .ec_account_subheader').click()
  })
  test('thirteens bug - the short description and description of the product are not in English.', async ({ page }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find thirteens bug'
    })
    await page.getByRole('link', { name: product }).click()
    await page.locator('.ec_details_description.academy-bug').click()
  })
  test('fourteens bug - the billing address loads infinitely.', async ({ page }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find fourteens bug'
    })
    await page.getByRole('link', { name: product }).click()
    await page.getByRole('link', { name: 'Sign Up' }).click()
    await page.getByLabel('First Name*').fill('abc')
    await page.getByLabel('Last Name*').fill('abc')
    await page.getByLabel('Email*').fill(`${unique}@1.com`)
    await page.locator('#ec_account_register_retype_email').fill(`${unique}@1.com`)
    await page.locator('#ec_account_register_password').fill(`${unique}@1.com`)
    await page.locator('#ec_account_register_password_retype').fill(`${unique}@1.com`)
    await page.locator('[value="REGISTER"]').click()
    await page.waitForLoadState()
    await page.locator('#ec_account_dashboard span.ec_cart_billing_info_update_loader').click({ force: true })
  })
  test('fifteens bug - unreadable symbols in shoping cart popup', async ({ page }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find fifteens bug'
    })
    await page.getByRole('link', { name: product }).click()
    await page.getByRole('button', { name: '+' }).click()
    await page.getByRole('button', { name: 'ADD TO CART' }).click()
    await page.locator('.ec_cart_widget_button').hover()
    await page.locator('.academy-bug span').nth(1).click({ force: true })
  })
  test('sixteen bug - there is big space before the last letter in "Return to Store".', async ({ page }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find fifteens bug'
    })
    await page.getByRole('link', { name: product }).click()
    await page.getByRole('button', { name: '+' }).click()
    await page.getByRole('button', { name: 'ADD TO CART' }).click()
    await page.locator('.ec_cart_widget_button').hover()
    await page.locator('.ec_cartitem_delete').click()
    await page.locator('.ec_cart_empty_button').click()
  })
  test('seventeens bug - the manufacturer link in the product details page is broken.', async ({ page }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find seventeens bug'
    })
    await page.getByRole('link', { name: product }).click()
    await page.locator('#manufacturer-bug a').click()
    await page.waitForLoadState()
    await page.goBack()
  })
  test('eighteens bug - the page becomes unresponsive when clicking on the Retrieve Password button.', async ({
    page
  }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find eighteens bug'
    })
    await page.getByRole('link', { name: product }).click()
    await page.getByRole('link', { name: 'Sign Up' }).click()
    await page.getByRole('link', { name: 'Forgot Your Password?' }).click()
    await page.locator('#ec_account_forgot_password_email').fill(`${unique}@1.com`)
    await page.locator('[value="RETRIEVE PASSWORD"]').click()
    await expect(page.locator('div.academy-crash-overlay-bug')).toBeVisible()
  })
  test('nineteens bug - the grand total is $100 more than the sum of all products in the cart.', async ({ page }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find nineteens bug'
    })
    await page.getByRole('link', { name: product }).click()
    await page.getByRole('button', { name: '+' }).click()
    await page.getByRole('button', { name: 'ADD TO CART' }).click()
    await page.locator('#ec_cart_total').click()
  })
  test('twenty bug - the image is not completely displayed.', async ({ page }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find twenty bug'
    })
    await page.getByRole('link', { name: product }).click()
    await page.locator('#menu3').click()
    await page.locator('a.ec_image_link_cover').nth(3).click({ force: true })
  })
  test('twenty one bug - the order history loads infinitely.', async ({ page }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find twenty one bug'
    })
    await page.getByRole('link', { name: product }).click()
    await page.getByRole('button', { name: 'Accept cookies' }).click()
    await page.locator('#ec_account_login_email_widget').fill(fakeUserName)
    await page.locator('#ec_account_login_password_widget').fill(fakePassword)
    await page.getByText('SIGN IN').click()
    await page.getByRole('button', { name: 'Close' }).click()
    await page
      .getByRole('heading', {
        name: 'There are more bugs in the find bugs page, please keep searching.'
      })
      .isVisible()
    await page.getByRole('button', { name: 'Close' }).click()
    await page.getByRole('link', { name: 'Order History' }).click()
    await page.locator('span.ec_cart_billing_info_update_loader').click({ force: true })
  })
  test('twenty two bug - the page freezes when increasing the product quantity having green or pink colors chosen.', async ({
    page
  }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'find twenty two bug'
    })
    await page.getByRole('link', { name: 'Professional Suit' }).click()
    await page.locator('[title="Green"]').click()
    await page.getByRole('button', { name: '+' }).click()
    await expect(page.locator('div.academy-crash-overlay-bug')).toBeVisible()
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
