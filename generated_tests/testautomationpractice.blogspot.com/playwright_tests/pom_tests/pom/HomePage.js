import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // GUI Elements Form selectors
    // Name field
    this.nameInput = this.page.getByRole('textbox', { name: 'Enter Name' });
    // Email field
    this.emailInput = this.page.getByRole('textbox', { name: 'Enter EMail' });
    // Phone field
    this.phoneInput = this.page.getByRole('textbox', { name: 'Enter Phone' });
    // Address field
    this.addressInput = this.page.getByRole('textbox', { name: 'Address:' });
    // Gender radio button (Male)
    this.genderMaleRadio = this.page.getByRole('radio', { name: 'Male', exact: true });
    // Days checkboxes
    this.mondayCheckbox = this.page.getByRole('checkbox', { name: 'Monday' });
    this.tuesdayCheckbox = this.page.getByRole('checkbox', { name: 'Tuesday' });
    this.wednesdayCheckbox = this.page.getByRole('checkbox', { name: 'Wednesday' });
    this.thursdayCheckbox = this.page.getByRole('checkbox', { name: 'Thursday' });
    this.fridayCheckbox = this.page.getByRole('checkbox', { name: 'Friday' });
    // Country dropdown
    this.countryDropdown = this.page.getByLabel('Country:');
    // Colors dropdown
    this.colorsDropdown = this.page.getByLabel('Colors:');
    // Sorted List
    this.sortedListDropdown = this.page.getByLabel('Sorted List:');
    // Date Picker 1
    this.datePicker1 = this.page.locator('#datepicker');
    // Date Picker 2
    this.datePicker2 = this.page.locator('#txtDate');
    // Date Picker 3 Start Date
    this.datePicker3Start = this.page.getByPlaceholder('Start Date');
    // Date Picker 3 End Date
    this.datePicker3End = this.page.getByPlaceholder('End Date');
    // Submit button
    this.submitButton = this.page.locator('#post-body-1307673142697428135').getByRole('button', { name: 'Submit' });
  }

  /**
   * Fills the Name field.
   * @param {string} name
   * @returns {Promise<this>}
   */
  async fillNameField(name) {
    await this.nameInput.fill(name, { timeout: 30000 });
    return this;
  }

  /**
   * Fills the Email field.
   * @param {string} email
   * @returns {Promise<this>}
   */
  async fillEmailField(email) {
    await this.emailInput.fill(email, { timeout: 30000 });
    return this;
  }

  /**
   * Fills the Phone field.
   * @param {string} phone
   * @returns {Promise<this>}
   */
  async fillPhoneField(phone) {
    await this.phoneInput.fill(phone, { timeout: 30000 });
    return this;
  }

  /**
   * Fills the Address field.
   * @param {string} address
   * @returns {Promise<this>}
   */
  async fillAddressField(address) {
    await this.addressInput.fill(address, { timeout: 30000 });
    return this;
  }

  /**
   * Selects Male gender radio button.
   * @returns {Promise<this>}
   */
  async selectGenderMale() {
    await this.genderMaleRadio.click({ timeout: 15000 });
    return this;
  }

  /**
   * Checks Monday checkbox.
   * @returns {Promise<this>}
   */
  async checkMonday() {
    await this.mondayCheckbox.check({ timeout: 15000 });
    return this;
  }

  /**
   * Checks Tuesday checkbox.
   * @returns {Promise<this>}
   */
  async checkTuesday() {
    await this.tuesdayCheckbox.check({ timeout: 15000 });
    return this;
  }

  /**
   * Checks Wednesday checkbox.
   * @returns {Promise<this>}
   */
  async checkWednesday() {
    await this.wednesdayCheckbox.check({ timeout: 15000 });
    return this;
  }

  /**
   * Checks Thursday checkbox.
   * @returns {Promise<this>}
   */
  async checkThursday() {
    await this.thursdayCheckbox.check({ timeout: 15000 });
    return this;
  }

  /**
   * Checks Friday checkbox.
   * @returns {Promise<this>}
   */
  async checkFriday() {
    await this.fridayCheckbox.check({ timeout: 15000 });
    return this;
  }

  /**
   * Selects 'India' from Country dropdown.
   * @returns {Promise<this>}
   */
  async selectCountryIndia() {
    await this.countryDropdown.selectOption({ label: 'India' }, { timeout: 15000 });
    return this;
  }

  /**
   * Selects 'Yellow' from Colors dropdown.
   * @returns {Promise<this>}
   */
  async selectColorYellow() {
    await this.colorsDropdown.selectOption({ label: 'Yellow' }, { timeout: 15000 });
    return this;
  }

  /**
   * Selects 'Dog' from Sorted List dropdown.
   * @returns {Promise<this>}
   */
  async selectSortedListDog() {
    await this.sortedListDropdown.selectOption({ label: 'Dog' }, { timeout: 15000 });
    return this;
  }

  /**
   * Fills Date Picker 1 with provided date string.
   * @param {string} date
   * @returns {Promise<this>}
   */
  async fillDatePicker1(date) {
    await this.datePicker1.fill(date, { timeout: 30000 });
    return this;
  }

  /**
   * Fills Date Picker 2 with provided date string.
   * @param {string} date (format: DD/MM/YYYY)
   * @returns {Promise<this>}
   */
  async fillDatePicker2(date) {
    // The input is readonly, so we must use the datepicker widget.
    // Parse the date string (expected format: DD/MM/YYYY)
    const [day, month, year] = date.split('/');
    // Click the input to open the datepicker
    await this.datePicker2.click({ timeout: 10000 });

    // Wait for the datepicker widget to appear
    const datepickerWidget = this.page.locator('.ui-datepicker');
    await datepickerWidget.waitFor({ state: 'visible', timeout: 10000 });

    // Select the correct month and year
    // The widget has .ui-datepicker-month and .ui-datepicker-year <select> elements
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthIndex = parseInt(month, 10) - 1;
    const monthName = monthNames[monthIndex];

    // Select year
    await this.page.locator('.ui-datepicker-year').selectOption(year);
    // Select month
    await this.page.locator('.ui-datepicker-month').selectOption(monthName);

    // Click the day cell
    await this.page.locator(`.ui-datepicker-calendar td a:text-is("${parseInt(day, 10)}")`).click();

    // Wait for the input value to be updated
    await this.page.waitForFunction(
      (selector, expected) => document.querySelector(selector)?.value === expected,
      '#txtDate',
      date,
      { timeout: 5000 }
    );

    return this;
  }

  /**
   * Fills Date Picker 3 Start Date with provided date string.
   * @param {string} date
   * @returns {Promise<this>}
   */
  async fillDatePicker3Start(date) {
    await this.datePicker3Start.fill(date, { timeout: 30000 });
    return this;
  }

  /**
   * Fills Date Picker 3 End Date with provided date string.
   * @param {string} date
   * @returns {Promise<this>}
   */
  async fillDatePicker3End(date) {
    await this.datePicker3End.fill(date, { timeout: 30000 });
    return this;
  }

  /**
   * Clicks the Submit button to submit the form.
   * @returns {Promise<this>}
   */
  async submitForm() {
    await this.submitButton.click({ timeout: 30000 });
    return this;
  }

  /**
   * Clicks the Submit button again (retry).
   * @returns {Promise<this>}
   */
  async retrySubmitForm() {
    await this.submitButton.click({ timeout: 30000 });
    return this;
  }

  /**
   * Captures visible messages after form submission.
   * @returns {Promise<string[]>}
   */
  async captureVisibleMessages() {
    return await super.captureVisibleMessages(15000);
  }

  /**
   * Finalizes scenario execution (no-op for POM; for test orchestration).
   * @returns {Promise<this>}
   */
  async finalizeScenario() {
    // No action needed; placeholder for workflow completion
    return this;
  }
}
