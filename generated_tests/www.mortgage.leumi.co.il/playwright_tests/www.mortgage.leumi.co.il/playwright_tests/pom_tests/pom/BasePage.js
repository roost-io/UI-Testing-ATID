export class BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Wait for navigation to a specific URL with timeout (default 60s)
   * @param {string} url
   * @param {number} [timeout=60000]
   */
  async waitForUrl(url, timeout = 60000) {
    await this.page.waitForURL(url, { timeout });
    return this;
  }

  /**
   * Wait for element to be visible
   * @param {import('playwright').Locator} locator
   * @param {number} [timeout=30000]
   */
  async waitForVisible(locator, timeout = 30000) {
    await locator.waitFor({ state: 'visible', timeout });
    return this;
  }
}
