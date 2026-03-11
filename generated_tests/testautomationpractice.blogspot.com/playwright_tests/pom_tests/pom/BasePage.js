export class BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Waits for the page to load with DOMContentLoaded event.
   * @param {string} url
   * @param {number} [timeout=60000] - Timeout in ms (default: 60s)
   * @returns {Promise<void>}
   */
  async goto(url, timeout = 60000) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout });
    return this;
  }

  /**
   * Waits for a selector to be visible.
   * @param {string} selector
   * @param {number} [timeout=30000]
   * @returns {Promise<void>}
   */
  async waitForVisible(selector, timeout = 30000) {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
    return this;
  }

  /**
   * Captures all visible messages on the page (for confirmation/error feedback).
   * @param {number} [timeout=15000]
   * @returns {Promise<string[]>}
   */
  async captureVisibleMessages(timeout = 15000) {
    // Try to capture visible messages (alerts, confirmations, etc.)
    const messages = await this.page.locator('[role="alert"], .alert, .confirmation, .error, .success').allInnerTexts();
    return messages;
  }
}
