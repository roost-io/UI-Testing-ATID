import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  /**
   * Navigate to homepage
   * @returns {Promise<HomePage>}
   */
  async navigateToHomepage() {
    await this.page.goto('https://www.mortgage.leumi.co.il', { waitUntil: 'domcontentloaded', timeout: 60000 });
    return this;
  }
}
