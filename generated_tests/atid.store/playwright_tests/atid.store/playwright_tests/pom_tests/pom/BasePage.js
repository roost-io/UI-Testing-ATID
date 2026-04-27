export class BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
  }
  /**
   * Wait for navigation to a specific URL with timeout.
   * @param {string} url
   * @param {number} timeoutMs
   */
  async waitForUrl(url, timeoutMs = 60000) {
    await this.page.waitForURL(url, { timeout: timeoutMs });
    return this;
  }
  /**
   * Wait for selector to appear with timeout.
   * @param {string} selector
   * @param {number} timeoutMs
   */
  async waitForSelector(selector, timeoutMs = 30000) {
    await this.page.waitForSelector(selector, { timeout: timeoutMs });
    return this;
  }
}
