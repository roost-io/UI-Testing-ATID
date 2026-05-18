import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // Main form fields
    // Name input
    // Primary: page.getByRole('textbox', { name: 'Enter Name' })
    // Alt1: page.getByPlaceholder('Enter Name')
    // Alt2: page.getByRole('heading', { name: 'GUI Elements' }).locator('..').getByPlaceholder('Enter Name')
    this.nameInput = page.getByRole('textbox', { name: 'Enter Name' });
    // Email input
    // Primary: page.getByRole('textbox', { name: 'Enter EMail' })
    // Alt1: page.getByPlaceholder('Enter EMail')
    // Alt2: page.getByRole('heading', { name: 'GUI Elements' }).locator('..').getByPlaceholder('Enter EMail')
    this.emailInput = page.getByRole('textbox', { name: 'Enter EMail' });
    // Phone input
    // Primary: page.getByRole('textbox', { name: 'Enter Phone' })
    // Alt1: page.getByPlaceholder('Enter Phone')
    // Alt2: page.getByRole('heading', { name: 'GUI Elements' }).locator('..').getByPlaceholder('Enter Phone')
    this.phoneInput = page.getByRole('textbox', { name: 'Enter Phone' });
    // Address input
    // Primary: page.getByRole('textbox', { name: 'Address:' })
    // Alt1: page.getByRole('textbox', { name: /Address:/ })
    // Alt2: page.getByLabel('Address:')
    this.addressInput = page.getByRole('textbox', { name: 'Address:' });
    // Gender radio
    // Primary: page.getByRole('radio', { name: 'Male', exact: true })
    // Alt1: page.getByRole('radio', { name: 'Male' })
    // Alt2: page.getByLabel('Male')
    this.genderMaleRadio = page.getByRole('radio', { name: 'Male', exact: true });
    // Days checkboxes
    // Monday
    // Primary: page.getByRole('checkbox', { name: 'Monday' })
    // Alt1: page.getByLabel('Monday')
    // Alt2: page.getByLabel('Monday', { exact: true })
    this.mondayCheckbox = page.getByRole('checkbox', { name: 'Monday' });
    // Tuesday
    this.tuesdayCheckbox = page.getByRole('checkbox', { name: 'Tuesday' });
    // Wednesday
    this.wednesdayCheckbox = page.getByRole('checkbox', { name: 'Wednesday' });
    // Thursday
    this.thursdayCheckbox = page.getByRole('checkbox', { name: 'Thursday' });
    // Friday
    this.fridayCheckbox = page.getByRole('checkbox', { name: 'Friday' });
    // Country dropdown
    // Primary: page.getByLabel('Country:')
    // Alt1: page.getByRole('combobox', { name: /Country:/ })
    // Alt2: page.getByRole('heading', { name: 'GUI Elements' }).locator('..').getByLabel('Country:')
    this.countryDropdown = page.getByLabel('Country:');
    // Colors list
    // Primary: page.getByLabel('Colors:')
    // Alt1: page.getByRole('heading', { name: 'GUI Elements' }).locator('..').getByLabel('Colors:')
    // Alt2: page.locator('select.form-control')
    this.colorsList = page.getByLabel('Colors:');
    // Sorted List
    // Primary: page.getByLabel('Sorted List:')
    // Alt1: page.locator('select[name="animals"]')
    // Alt2: page.getByRole('heading', { name: 'GUI Elements' }).locator('..').getByLabel('Sorted List:')
    this.sortedList = page.getByLabel('Sorted List:');
    // Date Picker 1
    // Primary: page.locator('#datepicker')
    // Alt1: page.locator('xpath=html/body/div[4]/div[2]/div[2]/div[2]/div[2]/div[2]/div[2]/div/div[4]/div[1]/div/div/div[1]/div[1]/div/div/div/div/div[2]/p[1]/input')
    this.datePicker1 = page.locator('#datepicker');
    // Date Picker 2
    // Primary: page.locator('#txtDate')
    // Alt1: page.locator('input[type="text"][name="SelectedDate"]')
    // Alt2: page.locator('input[name="SelectedDate"]')
    this.datePicker2 = page.locator('#txtDate');
    // Date Picker 3 Start
    // Primary: page.getByPlaceholder('Start Date')
    // Alt1: page.locator('input[type="date"]')
    // Alt2: page.getByRole('heading', { name: 'GUI Elements' }).locator('..').getByPlaceholder('Start Date')
    this.datePicker3Start = page.getByPlaceholder('Start Date');
    // Date Picker 3 End
    // Primary: page.getByPlaceholder('End Date')
    // Alt1: page.locator('input[type="date"]')
    // Alt2: page.getByRole('heading', { name: 'GUI Elements' }).locator('..').getByPlaceholder('End Date')
    this.datePicker3End = page.getByPlaceholder('End Date');
    // Submit button
    // Primary: page.locator('#post-body-1307673142697428135').getByRole('button', { name: 'Submit' })
    // Alt1: page.getByRole('button', { name: 'Submit' })
    // Alt2: page.getByText('Submit')
    this.submitBtn = page.locator('#post-body-1307673142697428135').getByRole('button', { name: 'Submit' });
    // GUI Elements heading (for confirmation/validation message check)
    // Primary: page.getByRole('heading', { name: 'GUI Elements' })
    this.guiElementsHeading = page.getByRole('heading', { name: 'GUI Elements' });
  }

  /**
   * Fill Name field
   * @param {string} value
   */
  async fillName(value) {
    await this.nameInput.fill(value, { timeout: 30000 });
    return this;
  }

  /**
   * Fill Email field
   * @param {string} value
   */
  async fillEmail(value) {
    await this.emailInput.fill(value, { timeout: 30000 });
    return this;
  }

  /**
   * Fill Phone field
   * @param {string} value
   */
  async fillPhone(value) {
    await this.phoneInput.fill(value, { timeout: 30000 });
    return this;
  }

  /**
   * Fill Address field
   * @param {string} value
   */
  async fillAddress(value) {
    await this.addressInput.fill(value, { timeout: 30000 });
    return this;
  }

  /**
   * Select Male gender radio
   */
  async selectGenderMale() {
    await this.genderMaleRadio.check({ timeout: 15000 });
    return this;
  }

  /**
   * Check Monday
   */
  async checkMonday() {
    await this.mondayCheckbox.check({ timeout: 15000 });
    return this;
  }

  /**
   * Check Tuesday
   */
  async checkTuesday() {
    await this.tuesdayCheckbox.check({ timeout: 15000 });
    return this;
  }

  /**
   * Check Wednesday
   */
  async checkWednesday() {
    await this.wednesdayCheckbox.check({ timeout: 15000 });
    return this;
  }

  /**
   * Check Thursday
   */
  async checkThursday() {
    await this.thursdayCheckbox.check({ timeout: 15000 });
    return this;
  }

  /**
   * Check Friday
   */
  async checkFriday() {
    await this.fridayCheckbox.check({ timeout: 15000 });
    return this;
  }

  /**
   * Select 'India' from Country dropdown
   */
  async selectCountryIndia() {
    await this.countryDropdown.selectOption({ label: 'India' }, { timeout: 20000 });
    return this;
  }

  /**
   * Select 'Yellow' from Colors list
   */
  async selectColorYellow() {
    await this.colorsList.selectOption({ label: 'Yellow' }, { timeout: 20000 });
    return this;
  }

  /**
   * Select 'Dog' from Sorted List
   */
  async selectSortedListDog() {
    await this.sortedList.selectOption({ label: 'Dog' }, { timeout: 20000 });
    return this;
  }

  /**
   * Fill Date Picker 1
   * @param {string} value
   */
  async fillDatePicker1(value) {
    await this.datePicker1.fill(value, { timeout: 20000 });
    return this;
  }

  /**
   * Fill Date Picker 2
   * @param {string} value
   */
  async fillDatePicker2(value) {
    await this.datePicker2.fill(value, { timeout: 20000 });
    return this;
  }

  /**
   * Fill Date Picker 3 Start
   * @param {string} value
   */
  async fillDatePicker3Start(value) {
    await this.datePicker3Start.fill(value, { timeout: 20000 });
    return this;
  }

  /**
   * Fill Date Picker 3 End
   * @param {string} value
   */
  async fillDatePicker3End(value) {
    await this.datePicker3End.fill(value, { timeout: 20000 });
    return this;
  }

  /**
   * Submit the form
   */
  async submitForm() {
    await this.submitBtn.click({ timeout: 30000 });
    return this;
  }

  /**
   * Get the GUI Elements heading (for confirmation/validation message check)
   * @returns {import('playwright').Locator}
   */
  getGuiElementsHeading() {
    return this.guiElementsHeading;
  }
}
