export class Wrapper {
  /**
   * @param {import('@playwright/test').Page} page
   */
  /*
  options?: {
        frame?: string,
        tabId?: number,
        timeOut?: number,
        has?: Locator,
        hasText?: string
    }
  */
  constructor(page) {
    this.page = page
  }
  async findLocator(value, options = {}) {
    // improve this window concept
    if (options?.tabId) {
      this.page = this.page.context().pages()[options.tabId]
    }
    if (options?.frame) {
      return this.page.frameLocator(options.frame).locator(value, {
        has: options?.has,
        hasText: options?.hasText
      })
    }
    return this.page.locator(value, {
      has: options?.has,
      hasText: options?.hasText
    })
  }

  getUrl() {
    return this.page.url()
  }

  async closeTab(options = {}) {
    if (options?.tabId) {
      await this.page.context().pages()[options.tabId].close()
    } else {
      await this.page.close()
    }
  }
}
