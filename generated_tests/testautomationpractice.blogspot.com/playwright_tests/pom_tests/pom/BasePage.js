// BasePage.js
// Common functionality for all pages

export class BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Waits for the page to load with DOMContentLoaded.
   * @param {string} url
   * @returns {Promise<void>}
   */
  async goto(url) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    return this;
  }
}
