import { expect, Page } from '@playwright/test'

export class HomePage {
  constructor(page) {
    /** @type {Page} */
    this.page = page
    this.acceptCookies = page.getByRole('button', { name: '×' })
    this.findBugsBtn = page.getByRole('link', { name: 'Find Bugs' })
    this.closeModal = page.getByRole('button', { name: 'Close' })
    this.bugFoundHeader = page.getByRole('heading', {
      name: 'There are more bugs in the find bugs page, please keep searching.'
    })
    this.addOneProductBtn = page.getByRole('button', { name: '+' })
    this.deleteOneProductBtn = page.getByRole('button', { name: '-' })
    this.addToCard = page.getByRole('button', { name: 'ADD TO CART' })
    this.updateBasket = page.getByText('UPDATE')
    this.bugModal = page.locator('div.academy-crash-overlay-bug')
    this.twitterLink = page.locator('[alt="Twitter"]')
    this.cookiesBtn = page.getByRole('button', { name: 'Accept cookies' })
    this.signinBtn = page.getByRole('button', { name: 'SIGN IN' })
    this.passwordPlaceholder = page.locator('#display-account-login-form-start').getByText('Password*')
    this.mySpaceLink = page.locator('[alt="MySpace"]')
    this.waitPlaceholder = page.getByText('Please wait…')
    this.postCommentLink = page.getByText('Post Comment')
    this.userAccountHeader = page.locator('.ec_account_right .ec_account_subheader')
    this.productDescriptions = page.locator('.ec_details_description.academy-bug')
    this.signUpBtn = page.getByRole('link', { name: 'Sign Up' })
    this.firstNameInput = page.getByLabel('First Name*')
    this.lastNameInput = page.getByLabel('Last Name*')
    this.emailInput = page.getByLabel('Email*')
    this.repeatEmailInput = page.locator('#ec_account_register_retype_email')
    this.passwordInput = page.locator('#ec_account_register_password')
    this.repeatPasswordInput = page.locator('#ec_account_register_password_retype')
    this.registerBtn = page.locator('[value="REGISTER"]')
    this.accountBillingInfoLink = page.locator('#ec_account_dashboard span.ec_cart_billing_info_update_loader')
    this.bugDescription = page.locator('.academy-popup-bug-subtitle"')
    this.cardWidgetBtn = page.locator('.ec_cart_widget_button')
    this.cardWidgetProductQuantityPlaceholder = page.locator('[id*="ec_cartitem_unit_price"]')
    this.deleteFromCardBtn = page.locator('.ec_cartitem_delete')
    this.returnToStoreBtn = page.locator('div a.ec_cart_empty_button')
    this.productManufacturer = page.locator('#manufacturer-bug a')
    this.forgotPasswordBtn = page.getByRole('link', { name: 'Forgot Your Password?' })
    this.forgotPasswordEmailInput = page.locator('#ec_account_forgot_password_email')
    this.retrievePasswordBtn = page.locator('[value="RETRIEVE PASSWORD"]')
    this.basketTotalBtn = page.locator('#ec_cart_total')
    this.menuLink = page.locator('#menu3')
    this.productImageLink = page.locator('a.ec_image_link_cover')
    this.accountLoginWidgetInput = page.locator('#ec_account_login_email_widget')
    this.accountPasswordWidgetInput = page.locator('#ec_account_login_password_widget')
    this.orderHistoryLink = page.getByRole('link', { name: 'Order History' })
    this.billingInfoUpdateLoader = page.locator('span.ec_cart_billing_info_update_loader')
  }
  async registerUser(user) {
    this.firstNameInput.fill(user.firstname)
    this.lastNameInput.fill(user.lastname)
    this.emailInput.fill(user.email)
    this.repeatEmailInput.fill(user.email)
    this.passwordInput.fill(user.password)
    this.repeatPasswordInput.fill(user.password)
    this.registerBtn.click()
    await this.page.waitForLoadState()
  }
  async showNumberOfProducts(number) {
    await this.page.getByRole('link', { name: number }).click()
  }
  /**
   * method to filter products by price
   * @param {*} range - string of price range
   */
  async selectPriceRange(range) {
    await this.cookiesBtn.click()
    await this.page.getByRole('link', { name: range }).scrollIntoViewIfNeeded()
    await this.page.getByRole('link', { name: range }).click()
  }
  async openProduct(product) {
    await this.page.getByRole('link', { name: product }).click()
  }
  async chooseCurrency(currency) {
    await this.page.locator('[name="ec_currency_conversion"]').selectOption(currency)
  }
  async chooseColor(color) {
    await Promise.all([
      this.page.locator(`[title="${color}"]`).click(),
      this.page.locator('.ec_details_option_label_selected').click()
    ])
  }
  async openPage(link) {
    await this.page.goto(link)
    await this.page.waitForLoadState()
  }
  async handleBug() {
    await this.page.waitForLoadState()
    await this.closeModal.click({ force: true })
    const description = await this.page.evaluate(() =>
      document.querySelector('p.academy-popup-bug-subtitle').innerHTML.trim()
    )
    await this.bugFoundHeader.isVisible()
    await this.page.waitForLoadState()
    await this.closeModal.click({ force: true })
    console.log(description)
    return description
  }
  async addToBasket(product) {
    await this.openProduct(product)
    await this.addOneProductBtn.click()
    await this.addToCard.click()
  }
  async addToBasketAndUpdate(product) {
    await this.openProduct(product)
    await this.addOneProductBtn.click()
    await this.addToCard.click()
    await this.addOneProductBtn.click()
    await this.updateBasket.click()
  }
}
