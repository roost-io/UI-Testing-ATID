import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { HomePage } from './pom/HomePage.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.BASE_URL || process.env.BASE_HOST_URL || 'https://testautomationpractice.blogspot.com/';
let stepTimeout30 = { timeout: 30000 };

test(
  'Discovered Workflow: e2e_business_workflow - Complete User Journey',
  { tag: ['@smoke'] },
  async ({ page }) => {
    // Step 1: Navigate to homepage
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL('https://testautomationpractice.blogspot.com/');

    const homePage = new HomePage(page);

    // Step 2: Fill Name
    await homePage.fillName('Roostai');
    // Step 3: Fill Email
    await homePage.fillEmail('roostai@zb.io');
    // Step 4: Fill Phone
    await homePage.fillPhone('9999999999');
    // Step 5: Fill Address
    await homePage.fillAddress('Bangalore , India');
    // Step 6: Select Gender Male
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
    // Step 12: Select Country India
    await homePage.selectCountryIndia();
    // Step 13: Select Color Yellow
    await homePage.selectColorYellow();
    // Step 14: Select Sorted List Dog
    await homePage.selectSortedListDog();
    // Step 15: Fill Date Picker 1
    await homePage.fillDatePicker1('17/02/2026');
    // Step 16: Fill Date Picker 2
    await homePage.fillDatePicker2('01/01/2026');
    // Step 17: Fill Date Picker 3 Start
    await homePage.fillDatePicker3Start('2026-10-01');
    // Step 18: Fill Date Picker 3 End
    await homePage.fillDatePicker3End('2026-10-03');
    // Step 19: Submit the form
    await homePage.submitForm();
    // Step 20: Verify no confirmation or validation message is displayed (no error/confirmation expected)
    // (No explicit confirmation message locator, so just ensure the heading is still present and no error thrown)
    await expect(homePage.getGuiElementsHeading()).toBeVisible();
  }
);

test.afterEach(async ({ page, context }, testInfo) => {
  if (testInfo.status !== 'passed') {
    try {
      const accessibilityTree = await page.accessibility.snapshot();
      const fileName = path.basename(testInfo.file)
        .replace('.auth.spec.js', '').replace('.noauth.spec.js', '').replace('.spec.js', '');
      const stateFile = path.join(__dirname, '..', `.accessibility_state_${fileName}.json`);
      fs.writeFileSync(stateFile, JSON.stringify({
        accessibility_tree: accessibilityTree,
        url: page.url(),
        all_page_urls: context.pages().map(p => p.url())
      }, null, 2));
    } catch (e) { /* Silent fail */ }
  }
});
