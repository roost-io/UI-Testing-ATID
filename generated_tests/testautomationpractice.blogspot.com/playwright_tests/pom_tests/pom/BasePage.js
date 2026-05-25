export class BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Waits for the page to load completely (DOM content loaded).
   * @param {number} [timeout=60000] - Maximum time to wait for page load in ms.
   */
  async waitForPageLoad(timeout = 60000) {
    await this.page.waitForLoadState('domcontentloaded', { timeout });
    return this;
  }
}
