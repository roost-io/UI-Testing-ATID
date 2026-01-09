import { BasePage } from './BasePage.js';

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    // No homepage-specific selectors were captured in this scenario.
  }

  /**
   * Navigates to the ATID Store main homepage.
   * @returns {Promise<HomePage>} this
   */
  async gotoHomePage() {
    await this.page.goto('https://atid.store/');
    await this.waitForPageLoad();
    return this;
  }

  /**
   * Gets the current page URL.
   * @returns {Promise<string>}
   */
  async getCurrentUrl() {
    return await this.getPageUrl();
  }
}

export { HomePage };