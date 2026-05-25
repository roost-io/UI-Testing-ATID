import { BasePage } from './BasePage.js';

export class GuiElementsPage extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // Primary selector for Download Files link
    // 1. page.getByRole('link', { name: 'Download Files' })
    // 2. page.getByRole('link', { name: /Download Files/ })
    // 3. page.getByText('Download Files')
    this.downloadFilesLink = page.getByRole('link', { name: 'Download Files' });
  }

  /**
   * Clicks the Download Files link to navigate to the download section.
   * @param {number} [timeout=30000] - Maximum time to wait for click in ms.
   * @returns {Promise<DownloadFilesPage>}
   */
  async clickDownloadFilesLink(timeout = 30000) {
    await this.downloadFilesLink.click({ timeout });
    return this; // Navigation is handled by the test or next POM
  }
}
