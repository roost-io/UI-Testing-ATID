import { BasePage } from './BasePage.js';

export class MortgageWorkflowPage extends BasePage {
  /**
   * Navigate to mortgage workflow page
   * @returns {Promise<MortgageWorkflowPage>}
   */
  async navigateToWorkflow() {
    await this.page.goto('https://mortgage.leumi.co.il/minisite/mortgage', { waitUntil: 'domcontentloaded', timeout: 60000 });
    return this;
  }
}
