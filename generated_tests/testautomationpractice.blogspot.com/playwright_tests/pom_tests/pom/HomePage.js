import { BasePage } from './BasePage.js';

/**
 * Page Object Model for https://testautomationpractice.blogspot.com/ Home Page
 * Covers GUI Elements form workflow
 */
class HomePage extends BasePage {
  constructor(page) {
    super(page);

    // Name Input field
    // Primary: page.getByRole('textbox', { name: 'Enter Name' })
    // Alt1: page.getByPlaceholder('Enter Name')
    // Alt2: page.getByRole('heading', { name: 'GUI Elements' }).locator('..').getByPlaceholder('Enter Name')
    // Alt3: page.locator('input.form-control')
    // Alt4: page.locator('#name')
    this.nameInput = page.getByRole('textbox', { name: 'Enter Name' });

    // Email Input field
    // Primary: page.getByRole('textbox', { name: 'Enter EMail' })
    // Alt1: page.getByPlaceholder('Enter EMail')
    // Alt2: page.getByRole('heading', { name: 'GUI Elements' }).locator('..').getByPlaceholder('Enter EMail')
    // Alt3: page.locator('input.form-control')
    // Alt4: page.locator('#email')
    this.emailInput = page.getByRole('textbox', { name: 'Enter EMail' });

    // Phone Input field
    // Primary: page.getByRole('textbox', { name: 'Enter Phone' })
    // Alt1: page.getByPlaceholder('Enter Phone')
    // Alt2: page.getByRole('heading', { name: 'GUI Elements' }).locator('..').getByPlaceholder('Enter Phone')
    // Alt3: page.locator('input.form-control')
    // Alt4: page.locator('#phone')
    this.phoneInput = page.getByRole('textbox', { name: 'Enter Phone' });

    // Address Textarea
    // Primary: page.getByRole('textbox', { name: 'Address:' })
    // Alt1: page.getByRole('textbox', { name: /Address:/ })
    // Alt2: page.getByLabel('Address:')
    // Alt3: page.getByLabel('Address:')
    // Alt4: page.getByRole('heading', { name: 'GUI Elements' }).locator('..').getByLabel('Address:')
    this.addressTextarea = page.getByRole('textbox', { name: 'Address:' });

    // Gender Radio button: Male
    // Primary: page.getByRole('radio', { name: 'Male', exact: true })
    // Alt1: page.getByRole('radio', { name: 'Male' })
    // Alt2: page.getByLabel('Male')
    // Alt3: page.getByLabel('Male', { exact: true })
    // Alt4: page.getByLabel('Male')
    this.genderMaleRadio = page.getByRole('radio', { name: 'Male', exact: true });

    // Days Checkboxes
    // Monday
    // Primary: page.getByRole('checkbox', { name: 'Monday' })
    // Alt1: page.getByRole('checkbox', { name: 'Monday' })
    // Alt2: page.getByLabel('Monday')
    // Alt3: page.getByLabel('Monday', { exact: true })
    // Alt4: page.getByLabel('Monday')
    this.mondayCheckbox = page.getByRole('checkbox', { name: 'Monday' });

    // Tuesday
    // Primary: page.getByRole('checkbox', { name: 'Tuesday' })
    // Alt1: page.getByRole('checkbox', { name: 'Tuesday' })
    // Alt2: page.getByLabel('Tuesday')
    // Alt3: page.getByLabel('Tuesday', { exact: true })
    // Alt4: page.getByLabel('Tuesday')
    this.tuesdayCheckbox = page.getByRole('checkbox', { name: 'Tuesday' });

    // Wednesday
    // Primary: page.getByRole('checkbox', { name: 'Wednesday' })
    // Alt1: page.getByRole('checkbox', { name: 'Wednesday' })
    // Alt2: page.getByLabel('Wednesday')
    // Alt3: page.getByLabel('Wednesday', { exact: true })
    // Alt4: page.getByLabel('Wednesday')
    this.wednesdayCheckbox = page.getByRole('checkbox', { name: 'Wednesday' });

    // Thursday
    // Primary: page.getByRole('checkbox', { name: 'Thursday' })
    // Alt1: page.getByRole('checkbox', { name: 'Thursday' })
    // Alt2: page.getByLabel('Thursday')
    // Alt3: page.getByLabel('Thursday', { exact: true })
    // Alt4: page.getByLabel('Thursday')
    this.thursdayCheckbox = page.getByRole('checkbox', { name: 'Thursday' });

    // Friday
    // Primary: page.getByRole('checkbox', { name: 'Friday' })
    // Alt1: page.getByRole('checkbox', { name: 'Friday' })
    // Alt2: page.getByLabel('Friday')
    // Alt3: page.getByLabel('Friday', { exact: true })
    // Alt4: page.getByLabel('Friday')
    this.fridayCheckbox = page.getByRole('checkbox', { name: 'Friday' });

    // Country Dropdown
    // Primary: page.getByLabel('Country:')
    // Alt1: page.getByRole('combobox', { name: /Country:/ })
    // Alt2: page.getByLabel('Country:')
    // Alt3: page.getByLabel('Country:')
    // Alt4: page.getByRole('heading', { name: 'GUI Elements' }).locator('..').getByLabel('Country:')
    this.countryDropdown = page.getByLabel('Country:');

    // Colors List
    // Primary: page.getByLabel('Colors:')
    // Alt1: page.getByLabel('Colors:')
    // Alt2: page.getByLabel('Colors:')
    // Alt3: page.getByRole('heading', { name: 'GUI Elements' }).locator('..').getByLabel('Colors:')
    // Alt4: page.locator('select.form-control')
    this.colorsList = page.getByLabel('Colors:');

    // Sorted List (Animals)
    // Primary: page.getByLabel('Sorted List:')
    // Alt1: page.getByLabel('Sorted List:')
    // Alt2: page.getByLabel('Sorted List:')
    // Alt3: page.locator('select[name="animals"]')
    // Alt4: page.getByRole('heading', { name: 'GUI Elements' }).locator('..').getByLabel('Sorted List:')
    this.animalsList = page.getByLabel('Sorted List:');

    // Date Picker 1
    // Primary: page.locator('#datepicker')
    // Alt1: page.locator('#datepicker')
    // Alt2: page.locator('xpath=html/body/div[4]/div[2]/div[2]/div[2]/div[2]/div[2]/div[2]/div/div[4]/div[1]/div/div/div[1]/div[1]/div/div/div/div/div[2]/p[1]/input')
    this.datePicker1 = page.locator('#datepicker');

    // Date Picker 2
    // Primary: page.locator('#txtDate')
    // Alt1: page.locator('input[type="text"][name="SelectedDate"]')
    // Alt2: page.locator('input[name="SelectedDate"]')
    // Alt3: page.locator('#txtDate')
    // Alt4: page.locator('xpath=html/body/div[4]/div[2]/div[2]/div[2]/div[2]/div[2]/div[2]/div/div[4]/div[1]/div/div/div[1]/div[1]/div/div/div/div/div[2]/p[2]/input')
    this.datePicker2 = page.locator('#txtDate');

    // Date Picker 3 Start Date
    // Primary: page.getByPlaceholder('Start Date')
    // Alt1: page.locator('input[type="date"]')
    // Alt2: page.getByPlaceholder('Start Date')
    // Alt3: page.getByRole('heading', { name: 'GUI Elements' }).locator('..').getByPlaceholder('Start Date')
    // Alt4: page.locator('#start-date')
    this.datePicker3Start = page.getByPlaceholder('Start Date');

    // Date Picker 3 End Date
    // Primary: page.getByPlaceholder('End Date')
    // Alt1: page.locator('input[type="date"]')
    // Alt2: page.getByPlaceholder('End Date')
    // Alt3: page.getByRole('heading', { name: 'GUI Elements' }).locator('..').getByPlaceholder('End Date')
    // Alt4: page.locator('#end-date')
    this.datePicker3End = page.getByPlaceholder('End Date');

    // Submit button
    // Primary: page.locator('#post-body-1307673142697428135').getByRole('button', { name: 'Submit' })
    // Alt1: page.getByRole('button', { name: 'Submit' })
    // Alt2: page.locator('#post-body-1307673142697428135').getByRole('button', { name: 'Submit' })
    // Alt3: page.getByText('Submit')
    // Alt4: page.locator('button.submit-btn')
    this.submitButton = page.locator('#post-body-1307673142697428135').getByRole('button', { name: 'Submit' });
  }

  /**
   * Navigate to homepage and ensure GUI Elements section is visible
   */
  async openHomePage(url = 'https://testautomationpractice.blogspot.com/') {
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await this.page.waitForSelector('text=GUI Elements', { timeout: 30000 });
    return this;
  }

  /**
   * Fill Name field
   */
  async fillName(name) {
    await this.nameInput.fill(name, { timeout: 30000 });
    return this;
  }

  /**
   * Get entered Name value
   */
  async getNameValue() {
    return await this.nameInput.inputValue({ timeout: 15000 });
  }

  /**
   * Fill Email field
   */
  async fillEmail(email) {
    await this.emailInput.fill(email, { timeout: 30000 });
    return this;
  }

  /**
   * Get entered Email value
   */
  async getEmailValue() {
    return await this.emailInput.inputValue({ timeout: 15000 });
  }

  /**
   * Fill Phone field
   */
  async fillPhone(phone) {
    await this.phoneInput.fill(phone, { timeout: 30000 });
    return this;
  }

  /**
   * Get entered Phone value
   */
  async getPhoneValue() {
    return await this.phoneInput.inputValue({ timeout: 15000 });
  }

  /**
   * Fill Address textarea
   */
  async fillAddress(address) {
    await this.addressTextarea.fill(address, { timeout: 30000 });
    return this;
  }

  /**
   * Get entered Address value
   */
  async getAddressValue() {
    return await this.addressTextarea.inputValue({ timeout: 15000 });
  }

  /**
   * Select Gender: Male
   */
  async selectGenderMale() {
    await this.genderMaleRadio.check({ timeout: 15000 });
    return this;
  }

  /**
   * Check if Male radio button is selected
   */
  async isGenderMaleSelected() {
    return await this.genderMaleRadio.isChecked({ timeout: 15000 });
  }

  /**
   * Check Monday checkbox
   */
  async checkMonday() {
    await this.mondayCheckbox.check({ timeout: 15000 });
    return this;
  }

  /**
   * Check if Monday checkbox is checked
   */
  async isMondayChecked() {
    return await this.mondayCheckbox.isChecked({ timeout: 15000 });
  }

  /**
   * Check Tuesday checkbox
   */
  async checkTuesday() {
    await this.tuesdayCheckbox.check({ timeout: 15000 });
    return this;
  }

  /**
   * Check if Tuesday checkbox is checked
   */
  async isTuesdayChecked() {
    return await this.tuesdayCheckbox.isChecked({ timeout: 15000 });
  }

  /**
   * Check Wednesday checkbox
   */
  async checkWednesday() {
    await this.wednesdayCheckbox.check({ timeout: 15000 });
    return this;
  }

  /**
   * Check if Wednesday checkbox is checked
   */
  async isWednesdayChecked() {
    return await this.wednesdayCheckbox.isChecked({ timeout: 15000 });
  }

  /**
   * Check Thursday checkbox
   */
  async checkThursday() {
    await this.thursdayCheckbox.check({ timeout: 15000 });
    return this;
  }

  /**
   * Check if Thursday checkbox is checked
   */
  async isThursdayChecked() {
    return await this.thursdayCheckbox.isChecked({ timeout: 15000 });
  }

  /**
   * Check Friday checkbox
   */
  async checkFriday() {
    await this.fridayCheckbox.check({ timeout: 15000 });
    return this;
  }

  /**
   * Check if Friday checkbox is checked
   */
  async isFridayChecked() {
    return await this.fridayCheckbox.isChecked({ timeout: 15000 });
  }

  /**
   * Select Country from dropdown (e.g. 'India')
   */
  async selectCountry(country) {
    await this.countryDropdown.selectOption({ label: country }, { timeout: 15000 });
    return this;
  }

  /**
   * Get selected Country value (visible text, not value attribute)
   */
  async getSelectedCountry() {
    // Return the visible text of the selected option using Playwright locator
    return await this.countryDropdown.evaluate(node => node.options[node.selectedIndex]?.text || '');
  }

  /**
   * Select Color from Colors list (e.g. 'Yellow')
   */
  async selectColor(color) {
    await this.colorsList.selectOption({ label: color }, { timeout: 15000 });
    return this;
  }

  /**
   * Get selected Color value
   */
  async getSelectedColor() {
    return await this.colorsList.inputValue({ timeout: 15000 });
  }

  /**
   * Select Animal from Sorted List (e.g. 'Dog')
   */
  async selectAnimal(animal) {
    await this.animalsList.selectOption({ label: animal }, { timeout: 15000 });
    return this;
  }

  /**
   * Get selected Animal value
   */
  async getSelectedAnimal() {
    return await this.animalsList.inputValue({ timeout: 15000 });
  }

  /**
   * Fill Date Picker 1
   */
  async fillDatePicker1(dateStr) {
    await this.datePicker1.fill(dateStr, { timeout: 30000 });
    return this;
  }

  /**
   * Get Date Picker 1 value
   */
  async getDatePicker1Value() {
    return await this.datePicker1.inputValue({ timeout: 15000 });
  }

  /**
   * Fill Date Picker 2
   */
  async fillDatePicker2(dateStr) {
    await this.datePicker2.fill(dateStr, { timeout: 30000 });
    return this;
  }

  /**
   * Get Date Picker 2 value
   */
  async getDatePicker2Value() {
    return await this.datePicker2.inputValue({ timeout: 15000 });
  }

  /**
   * Fill Date Picker 3 Start Date
   */
  async fillDatePicker3Start(dateStr) {
    await this.datePicker3Start.fill(dateStr, { timeout: 30000 });
    return this;
  }

  /**
   * Get Date Picker 3 Start Date value
   */
  async getDatePicker3StartValue() {
    return await this.datePicker3Start.inputValue({ timeout: 15000 });
  }

  /**
   * Fill Date Picker 3 End Date, with robustness for slow-rendering or retries
   */
  async fillDatePicker3End(dateStr) {
    // Try twice for robustness (slow rendering, failures)
    for (let attempt = 0; attempt < 2; attempt++) {
      await this.datePicker3End.fill(dateStr, { timeout: 30000 });
      // Extra small wait to allow update
      await this.page.waitForTimeout(500);
      // Check if value is entered
      const val = await this.datePicker3End.inputValue({ timeout: 15000 });
      if (val && val.includes(dateStr)) {
        break;
      }
    }
    return this;
  }

  /**
   * Get Date Picker 3 End Date value
   */
  async getDatePicker3EndValue() {
    return await this.datePicker3End.inputValue({ timeout: 15000 });
  }

  /**
   * Click Submit button for the form
   */
  async submitForm() {
    await this.submitButton.click({ timeout: 45000 });
    // Optionally: wait for any UI change, but no explicit confirmation in UI
    return this;
  }

  /**
   * Execute the full form workflow as a fluent chain
   */
  async completeForm({
    name,
    email,
    phone,
    address,
    country,
    color,
    animal,
    datePicker1,
    datePicker2,
    datePicker3Start,
    datePicker3End
  }) {
    await this.fillName(name);
    await this.fillEmail(email);
    await this.fillPhone(phone);
    await this.fillAddress(address);
    await this.selectGenderMale();
    await this.checkMonday();
    await this.checkTuesday();
    await this.checkWednesday();
    await this.checkThursday();
    await this.checkFriday();
    await this.selectCountry(country);
    await this.selectColor(color);
    await this.selectAnimal(animal);
    await this.fillDatePicker1(datePicker1);
    await this.fillDatePicker2(datePicker2);
    await this.fillDatePicker3Start(datePicker3Start);
    await this.fillDatePicker3End(datePicker3End);
    await this.submitForm();
    return this;
  }
}

export { HomePage };