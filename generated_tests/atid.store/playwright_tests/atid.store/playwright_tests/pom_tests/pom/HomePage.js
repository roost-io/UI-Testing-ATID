import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // Primary selector for 'Shop Now' button
    this.shopNowBtn = page.getByRole('button', { name: 'Shop Now' }).first();
    // Alternate selectors:
    // page.locator('#post-2888').getByRole('button', { name: 'SHOP NOW' })
    // page.locator('a.elementor-button-link.elementor-button')
  }

  /**
   * Clicks the 'Shop Now' button to begin shopping.
   * Timeout: 30s
   * @returns {Promise<StorePage>}
   */
  async clickShopNow() {
    await this.shopNowBtn.click({ timeout: 30000 });
    return new StorePage(this.page);
  }
}

// Import StorePage for fluent navigation
import { StorePage } from './StorePage.js';
