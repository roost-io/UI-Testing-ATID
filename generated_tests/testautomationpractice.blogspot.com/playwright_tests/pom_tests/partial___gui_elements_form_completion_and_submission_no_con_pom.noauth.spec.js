import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { HomePage } from './pom/HomePage.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.BASE_URL;
const BASE_HOST_URL = process.env.BASE_HOST_URL;
let stepTimeout30 = { timeout: 30000 };

// Scenario: Discovered Workflow: Partial - GUI Elements Form Completion and Submission (No Confirmation)
test('partial___gui_elements_form_completion_and_submission_no_con', async ({ page }) => {
  // Step 1: Navigate to homepage
  await page.goto(BASE_URL || BASE_HOST_URL, { waitUntil: 'domcontentloaded' });

  // Instantiate HomePage POM
  const homePage = new HomePage(page);

  // Step 2: Input Name
  await homePage.fillNameField('Roostai');

  // Step 3: Input Email
  await homePage.fillEmailField('roostai@zb.io');

  // Step 4: Input Phone
  await homePage.fillPhoneField('9999999999');

  // Step 5: Input Address
  await homePage.fillAddressField('Bangalore , India');

  // Step 6: Select Male Gender
  await homePage.selectGenderMale();

  // Step 7: Check Monday
  await homePage.checkMonday();

  // Step 8: Check Tuesday
  await homePage.checkTuesday();

  // Step 9: Check Wednesday
  await homePage.checkWednesday();

  // Step 10: Check Thursday
  await homePage.checkThursday();

  // Step 11: Check Friday
  await homePage.checkFriday();

  // Step 12: Select Country
  await homePage.selectCountryIndia();

  // Step 13: Select Color
  await homePage.selectColorYellow();

  // Step 14: Select Sorted List
  await homePage.selectSortedListDog();

  // Step 15: Input Date Picker 1
  await homePage.fillDatePicker1('17/02/2026');

  // Step 16: Input Date Picker 2
  await homePage.fillDatePicker2('01/01/2026');

  // Step 17: Input Date Picker 3 Start Date
  await homePage.fillDatePicker3Start('2026-01-10');

  // Step 18: Input Date Picker 3 End Date
  await homePage.fillDatePicker3End('2026-03-10');

  // Step 19: Click Submit
  await homePage.submitForm();

  // Step 20: Capture Visible Messages
  const messages = await homePage.captureVisibleMessages();
  if (messages && messages.length > 0) {
    console.log('Visible messages after submit:', messages);
  } else {
    console.log('No visible confirmation message after submit.');
  }

  // Step 21: Retry Submit
  await homePage.retrySubmitForm();

  // Step 22: Finalize Scenario
  await homePage.finalizeScenario();
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'passed') {
    try {
      const accessibilityTree = await page.accessibility.snapshot();
      const fileName = path.basename(testInfo.file)
        .replace('.auth.spec.js', '').replace('.noauth.spec.js', '').replace('.spec.js', '');
      const stateFile = path.join(__dirname, '..', `.accessibility_state_${fileName}.json`);
      fs.writeFileSync(stateFile, JSON.stringify({
        accessibility_tree: accessibilityTree,
        url: page.url()
      }, null, 2));
    } catch (e) { /* Silent fail */ }
  }
});
