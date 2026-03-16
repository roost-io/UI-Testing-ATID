// HomePage.js
// Page Object for https://testautomationpractice.blogspot.com/ (GUI Elements form)

import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // Name input
    // Selectors:
    // 1. page.getByRole('textbox', { name: 'Enter Name' })
    // 2. page.getByPlaceholder('Enter Name')
    // 3. page.getByRole('heading', { name: 'GUI Elements' }).locator('..').getByPlaceholder('Enter Name')
    // 4. page.locator('input.form-control')
    // 5. page.locator('#name')
    this.nameInput = this.page.getByRole('textbox', { name: 'Enter Name' });

    // Email input
    // Selectors:
    // 1. page.getByRole('textbox', { name: 'Enter EMail' })
    // 2. page.getByPlaceholder('Enter EMail')
    // 3. page.getByRole('heading', { name: 'GUI Elements' }).locator('..').getByPlaceholder('Enter EMail')
    // 4. page.locator('input.form-control')
    // 5. page.locator('#email')
    this.emailInput = this.page.getByRole('textbox', { name: 'Enter EMail' });

    // Phone input
    // Selectors:
    // 1. page.getByRole('textbox', { name: 'Enter Phone' })
    // 2. page.getByPlaceholder('Enter Phone')
    // 3. page.getByRole('heading', { name: 'GUI Elements' }).locator('..').getByPlaceholder('Enter Phone')
    // 4. page.locator('input.form-control')
    // 5. page.locator('#phone')
    this.phoneInput = this.page.getByRole('textbox', { name: 'Enter Phone' });

    // Address textarea
    // Selectors:
    // 1. page.getByRole('textbox', { name: 'Address:' })
    // 2. page.getByRole('textbox', { name: /Address:/ })
    // 3. page.getByLabel('Address:')
    // 4. page.getByRole('heading', { name: 'GUI Elements' }).locator('..').getByLabel('Address:')
    // 5. page.getByLabel('Address:')
    this.addressInput = this.page.getByRole('textbox', { name: 'Address:' });

    // Gender radio button (Male)
    // Selectors:
    // 1. page.getByRole('radio', { name: 'Male', exact: true })
    // 2. page.getByRole('radio', { name: 'Male' })
    // 3. page.getByLabel('Male')
    // 4. page.getByLabel('Male', { exact: true })
    // 5. page.getByLabel('Male')
    this.maleRadio = this.page.getByRole('radio', { name: 'Male', exact: true });

    // Weekday checkboxes
    // Monday
    // Selectors:
    // 1. page.getByRole('checkbox', { name: 'Monday' })
    // 2. page.getByLabel('Monday')
    // 3. page.getByLabel('Monday', { exact: true })
    this.mondayCheckbox = this.page.getByRole('checkbox', { name: 'Monday' });
    // Tuesday
    this.tuesdayCheckbox = this.page.getByRole('checkbox', { name: 'Tuesday' });
    // Wednesday
    this.wednesdayCheckbox = this.page.getByRole('checkbox', { name: 'Wednesday' });
    // Thursday
    this.thursdayCheckbox = this.page.getByRole('checkbox', { name: 'Thursday' });
    // Friday
    this.fridayCheckbox = this.page.getByRole('checkbox', { name: 'Friday' });

    // Country dropdown
    // Selectors:
    // 1. page.getByLabel('Country:')
    // 2. page.getByRole('combobox', { name: /Country:/ })
    // 3. page.getByRole('heading', { name: 'GUI Elements' }).locator('..').getByLabel('Country:')
    this.countryDropdown = this.page.getByLabel('Country:');

    // Colors dropdown
    // Selectors:
    // 1. page.getByLabel('Colors:')
    // 2. page.getByRole('heading', { name: 'GUI Elements' }).locator('..').getByLabel('Colors:')
    // 3. page.locator('select.form-control')
    this.colorsDropdown = this.page.getByLabel('Colors:');

    // Sorted List dropdown
    // Selectors:
    // 1. page.getByLabel('Sorted List:')
    // 2. page.locator('select[name="animals"]')
    // 3. page.getByRole('heading', { name: 'GUI Elements' }).locator('..').getByLabel('Sorted List:')
    this.sortedListDropdown = this.page.getByLabel('Sorted List:');

    // Date Picker 1
    // Selectors:
    // 1. page.locator('#datepicker')
    // 2. page.locator('xpath=html/body/div[4]/div[2]/div[2]/div[2]/div[2]/div[2]/div[2]/div/div[4]/div[1]/div/div/div[1]/div[1]/div/div/div/div/div[2]/p[1]/input')
    this.datePicker1 = this.page.locator('#datepicker');

    // Date Picker 2
    // Selectors:
    // 1. page.locator('#txtDate')
    // 2. page.locator('input[type="text"][name="SelectedDate"]')
    // 3. page.locator('input[name="SelectedDate"]')
    // 4. page.locator('xpath=html/body/div[4]/div[2]/div[2]/div[2]/div[2]/div[2]/div[2]/div/div[4]/div[1]/div/div/div[1]/div[1]/div/div/div/div/div[2]/p[2]/input')
    this.datePicker2 = this.page.locator('#txtDate');

    // Date Picker 3 Start Date
    // Selectors:
    // 1. page.getByPlaceholder('Start Date')
    // 2. page.locator('input[type="date"]')
    // 3. page.getByRole('heading', { name: 'GUI Elements' }).locator('..').getByPlaceholder('Start Date')
    // 4. page.locator('#start-date')
    this.datePicker3Start = this.page.getByPlaceholder('Start Date');

    // Date Picker 3 End Date
    // Selectors:
    // 1. page.getByPlaceholder('End Date')
    // 2. page.locator('input[type="date"]')
    // 3. page.getByRole('heading', { name: 'GUI Elements' }).locator('..').getByPlaceholder('End Date')
    // 4. page.locator('#end-date')
    this.datePicker3End = this.page.getByPlaceholder('End Date');

    // Submit button
    // Selectors:
    // 1. page.locator('#post-body-1307673142697428135').getByRole('button', { name: 'Submit' })
    // 2. page.getByRole('button', { name: 'Submit' })
    // 3. page.getByText('Submit')
    // 4. page.locator('button.submit-btn')
    this.submitBtn = this.page.locator('#post-body-1307673142697428135').getByRole('button', { name: 'Submit' });
  }

  /**
   * Navigates to the homepage.
   * @returns {Promise<HomePage>}
   */
  async goto() {
    await this.page.goto('https://testautomationpractice.blogspot.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
    return this;
  }

  /**
   * Fill the Name field.
   * @param {string} name
   * @returns {Promise<HomePage>}
   */
  async fillName(name) {
    await this.nameInput.fill(name, { timeout: 30000 });
    return this;
  }

  /**
   * Fill the Email field.
   * @param {string} email
   * @returns {Promise<HomePage>}
   */
  async fillEmail(email) {
    await this.emailInput.fill(email, { timeout: 30000 });
    return this;
  }

  /**
   * Fill the Phone field.
   * @param {string} phone
   * @returns {Promise<HomePage>}
   */
  async fillPhone(phone) {
    await this.phoneInput.fill(phone, { timeout: 30000 });
    return this;
  }

  /**
   * Fill the Address field.
   * @param {string} address
   * @returns {Promise<HomePage>}
   */
  async fillAddress(address) {
    await this.addressInput.fill(address, { timeout: 30000 });
    return this;
  }

  /**
   * Select Male gender radio button.
   * @returns {Promise<HomePage>}
   */
  async selectMaleGender() {
    await this.maleRadio.check({ timeout: 30000 });
    return this;
  }

  /**
   * Check the Monday checkbox.
   * @returns {Promise<HomePage>}
   */
  async checkMonday() {
    await this.mondayCheckbox.check({ timeout: 30000 });
    return this;
  }

  /**
   * Check the Tuesday checkbox.
   * @returns {Promise<HomePage>}
   */
  async checkTuesday() {
    await this.tuesdayCheckbox.check({ timeout: 30000 });
    return this;
  }

  /**
   * Check the Wednesday checkbox.
   * @returns {Promise<HomePage>}
   */
  async checkWednesday() {
    await this.wednesdayCheckbox.check({ timeout: 30000 });
    return this;
  }

  /**
   * Check the Thursday checkbox.
   * @returns {Promise<HomePage>}
   */
  async checkThursday() {
    await this.thursdayCheckbox.check({ timeout: 30000 });
    return this;
  }

  /**
   * Check the Friday checkbox.
   * @returns {Promise<HomePage>}
   */
  async checkFriday() {
    await this.fridayCheckbox.check({ timeout: 30000 });
    return this;
  }

  /**
   * Select a country from the dropdown.
   * @param {string} country
   * @returns {Promise<HomePage>}
   */
  async selectCountry(country) {
    await this.countryDropdown.selectOption({ label: country }, { timeout: 30000 });
    return this;
  }

  /**
   * Select a color from the Colors dropdown.
   * @param {string} color
   * @returns {Promise<HomePage>}
   */
  async selectColor(color) {
    await this.colorsDropdown.selectOption({ label: color }, { timeout: 30000 });
    return this;
  }

  /**
   * Select an animal from the Sorted List dropdown.
   * @param {string} animal
   * @returns {Promise<HomePage>}
   */
  async selectSortedList(animal) {
    await this.sortedListDropdown.selectOption({ label: animal }, { timeout: 30000 });
    return this;
  }

  /**
   * Fill Date Picker 1.
   * @param {string} date
   * @returns {Promise<HomePage>}
   */
  async fillDatePicker1(date) {
    await this.datePicker1.fill(date, { timeout: 30000 });
    return this;
  }

  /**
   * Fill Date Picker 2.
   * @param {string} date
   * @returns {Promise<HomePage>}
   */
  async fillDatePicker2(date) {
    // Remove readonly attribute before filling
    await this.page.evaluate(() => {
      const el = document.getElementById('txtDate');
      if (el) el.removeAttribute('readonly');
    });
    await this.datePicker2.fill(date, { timeout: 30000 });
    return this;
  }

  /**
   * Fill Date Picker 3 Start Date.
   * @param {string} date (format: dd/mm/yyyy)
   * @returns {Promise<HomePage>}
   */
  async fillDatePicker3Start(date) {
    // Convert dd/mm/yyyy to yyyy-mm-dd for input[type='date']
    const [dd, mm, yyyy] = date.split('/');
    const isoDate = `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
    await this.datePicker3Start.fill(isoDate, { timeout: 30000 });
    return this;
  }

  /**
   * Fill Date Picker 3 End Date.
   * @param {string} date (format: dd/mm/yyyy)
   * @returns {Promise<HomePage>}
   */
  async fillDatePicker3End(date) {
    // Convert dd/mm/yyyy to yyyy-mm-dd for input[type='date']
    const [dd, mm, yyyy] = date.split('/');
    const isoDate = `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
    await this.datePicker3End.fill(isoDate, { timeout: 30000 });
    return this;
  }

  /**
   * Click the Submit button to submit the form.
   * @returns {Promise<HomePage>}
   */
  async submitForm() {
    await this.submitBtn.click({ timeout: 45000 });
    return this;
  }
}
