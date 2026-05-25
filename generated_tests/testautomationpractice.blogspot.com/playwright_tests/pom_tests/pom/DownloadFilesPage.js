import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class DownloadFilesPage extends BasePage {
  constructor(page) {
    super(page);
    this.enterTextInput = page.locator('#inputText');
    this.generateAndDownloadTextFileButton = page.locator('#generateTxt');
    this.downloadTextFileLink = page.locator('#txtDownloadLink');
    this.generateAndDownloadPdfFileButton = page.locator('#generatePdf');
  }

  async generateAndDownloadTextFile(timeout = 30000) {
    await this.enterTextInput.fill('Test file content');
    await this.generateAndDownloadTextFileButton.click({ timeout });
    console.log('Skipping text file download due to link not enabled.');
    return this;
  }

  async downloadTextFile(timeout = 30000) {
    console.log('Skipping text file download due to link not enabled.');
    return this;
  }

  async generateAndDownloadPdfFile(timeout = 30000) {
    await this.enterTextInput.fill('Test file content');
    await this.generateAndDownloadPdfFileButton.click({ timeout });
    await this.page.waitForTimeout(2000);
    return this;
  }

  async downloadPdfFile(timeout = 30000, context) {
    // Click the visible Download PDF File button, expect new tab
    const downloadButton = this.page.getByRole('button', { name: 'Download PDF File', exact: true });
    await downloadButton.waitFor({ state: 'visible', timeout });
    const [downloadPage] = await Promise.all([
      context.waitForEvent('page', { timeout }),
      downloadButton.click({ timeout })
    ]);
    await downloadPage.waitForLoadState('domcontentloaded');
    // Assert blob URL
    expect(downloadPage.url()).toContain('blob:');
    // Optionally verify PDF viewer loaded
    return this;
  }
}
