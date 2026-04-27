import { BasePage } from './BasePage.js';

export class StorePage extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // Primary selector for 'Boho Bangle Bracelet' product link
    this.firstProductLink = page.getByRole('link', { name: 'Boho Bangle Bracelet' });
    // Alternate selectors:
    // page.getByRole('link', { name: /Boho Bangle Bracelet/ })
    // page.getByText('Boho Bangle Bracelet')
  }

  /**
   * Selects the first product ('Boho Bangle Bracelet').
   * Timeout: 30s
   * @returns {Promise<ProductPage>}
   */
  async selectFirstProduct() {
    await this.firstProductLink.click({ timeout: 30000 });
    return new ProductPage(this.page);
  }
}

// Import ProductPage for fluent navigation
import { ProductPage } from './ProductPage.js';
