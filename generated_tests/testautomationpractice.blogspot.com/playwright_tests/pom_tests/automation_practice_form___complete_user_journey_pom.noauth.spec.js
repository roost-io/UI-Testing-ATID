import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { HomePage } from './pom/HomePage.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let stepTimeout30 = { timeout: 30000 };
const BASE_URL = process.env.BASE_URL || process.env.BASE_HOST_URL || 'https://testautomationpractice.blogspot.com/';

test('Discovered Workflow: Automation Practice Form - Complete User Journey', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();

  // Fill Name
  await homePage.fillName('Roostai');
  // Fill Email
  await homePage.fillEmail('roostai@zb.io');
  // Fill Phone
  await homePage.fillPhone('9999999999');
  // Fill Address
  await homePage.fillAddress('Bangalore , India');
  // Select Male gender
  await homePage.selectMaleGender();
  // Check all weekdays
  await homePage.checkMonday();
  await homePage.checkTuesday();
  await homePage.checkWednesday();
  await homePage.checkThursday();
  await homePage.checkFriday();
  // Select Country
  await homePage.selectCountry('India');
  // Select Color
  await homePage.selectColor('Yellow');
  // Select Sorted List
  await homePage.selectSortedList('Dog');
  // Fill Date Picker 1
  await homePage.fillDatePicker1('17/02/2026');
  // Fill Date Picker 2
  await homePage.fillDatePicker2('01/01/2026');
  // Fill Date Picker 3 Start Date
  await homePage.fillDatePicker3Start('10/01/2026');
  // Fill Date Picker 3 End Date
  await homePage.fillDatePicker3End('10/03/2026');
  // Submit the form
  await homePage.submitForm();

  // There is no visible confirmation message, but we can check that the page did not navigate away or show errors
  await expect(page).toHaveURL(BASE_URL);
});

