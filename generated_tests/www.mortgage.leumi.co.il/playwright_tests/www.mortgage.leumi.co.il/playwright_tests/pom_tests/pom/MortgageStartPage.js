import { BasePage } from './BasePage.js';
import { MortgageWorkflowPage } from './MortgageWorkflowPage.js';

export class MortgageStartPage extends BasePage {
  /**
   * Selector for 'בואו נתחיל' (Let's Start) button
   * Primary: page.getByRole('link', { name: 'בואו נתחיל' })
   * Alternate 1: page.getByRole('link', { name: /בואו נתחיל/ })
   * Alternate 2: page.locator('[class*="Menu"]').getByRole('link', { name: 'בואו נתחיל' })
   */
  constructor(page) {
    super(page);
    // Use alternate selector marked as unique in scenario JSON
    this.startBtn = page.locator('[class*="Menu"]').getByRole('link', { name: 'בואו נתחיל' });
    // Alternate selectors:
    // this.startBtnAlt1 = page.getByRole('link', { name: /בואו נתחיל/ });
    // this.startBtnAlt2 = page.getByRole('link', { name: 'בואו נתחיל' });
  }

  /**
   * Click the 'בואו נתחיל' button to initiate mortgage workflow
   * @returns {Promise<MortgageWorkflowPage>}
   */
  async clickStartButton() {
    await this.startBtn.waitFor({ state: 'visible', timeout: 30000 });
    await this.startBtn.click({ timeout: 30000 });
    // Navigation is expected after click, so wait for workflow page URL (allow query params)
    await this.page.waitForURL(/https:\/\/mortgage\.leumi\.co\.il\/minisite\/mortgage.*/, { timeout: 60000 });
    return new MortgageWorkflowPage(this.page);
  }
}
