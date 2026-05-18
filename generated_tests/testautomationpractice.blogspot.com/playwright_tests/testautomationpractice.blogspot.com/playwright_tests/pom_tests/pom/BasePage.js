export class BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Wait for the page to load by checking for a selector
   * @param {string} selector
   * @param {number} [timeout=30000]
   */
  async waitForSelector(selector, timeout = 30000) {
    await this.page.waitForSelector(selector, { timeout });
    return this;
  }

  /**
   * Wait for navigation to a specific URL
   * @param {string|RegExp} url
   * @param {number} [timeout=60000]
   */
  async waitForUrl(url, timeout = 60000) {
    await this.page.waitForURL(url, { timeout });
    return this;
  }
}
