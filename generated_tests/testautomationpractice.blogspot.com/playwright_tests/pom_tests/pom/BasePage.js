class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(url) {
    // Page navigation with explicit timeout
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    return this;
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded', { timeout: 30000 });
    return this;
  }

  async getPageTitle() {
    return await this.page.title();
  }
}

export { BasePage };