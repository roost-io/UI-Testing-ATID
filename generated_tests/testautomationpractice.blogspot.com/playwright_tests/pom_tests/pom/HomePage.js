import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // Primary selector for GUI Elements navigation link
    // 1. page.getByRole('link', { name: 'GUI Elements' })
    // 2. page.getByRole('link', { name: /GUI Elements/ })
    // 3. page.getByText('GUI Elements')
    this.guiElementsLink = page.getByRole('link', { name: 'GUI Elements' });
  }

  /**
   * Navigates to the homepage.
   * @param {number} [timeout=60000] - Maximum time to wait for navigation in ms.
   * @returns {Promise<HomePage>}
   */
  async navigateToHomePage(timeout = 60000) {
    await this.page.goto('https://testautomationpractice.blogspot.com', { waitUntil: 'domcontentloaded', timeout });
    return this;
  }

  /**
   * Clicks the GUI Elements navigation link.
   * @param {number} [timeout=30000] - Maximum time to wait for click in ms.
   * @returns {Promise<GuiElementsPage>}
   */
  async clickGuiElementsLink(timeout = 30000) {
    await this.guiElementsLink.click({ timeout });
    return this; // Navigation is handled by the test or next POM
  }
}
