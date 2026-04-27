import { BasePage } from './BasePage.js';

export class ProductPage extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // Primary selector for 'Add to cart' button
    this.addToCartBtn = page.getByRole('button', { name: 'Add to cart' });
    // Alternate selectors:
    // page.locator('button[value="169"]')
    // page.getByText('Add to cart')
  }

  /**
   * Clicks the 'Add to cart' button to add the product to the shopping cart.
   * Timeout: 30s
   * @returns {Promise<this>} (Remains on ProductPage)
   */
  async addToCart() {
    await this.addToCartBtn.click({ timeout: 30000 });
    return this;
  }
}
