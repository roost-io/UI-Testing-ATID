import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { HomePage } from './pom/HomePage.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Environment variables
const BASE_HOST_URL = process.env.BASE_HOST_URL || 'https://testautomationpractice.blogspot.com';
const BASE_URL = process.env.BASE_URL || 'https://testautomationpractice.blogspot.com/';

let stepTimeout30 = { timeout: 30000 };
let stepTimeout10 = { timeout: 10000 };

test('Automation Testing Practice Form - Complete User Journey', async ({ page }) => {
  // Test data for this scenario
  const testData = {
    name: 'Roostai',
    email: 'roostai@zb.io',
    phone: '9999999999',
    address: 'Bangalore , India',
    country: 'India',
    color: 'Yellow',
    animal: 'Dog',
    datePicker1: '17/02/2026',
    datePicker2: '01/01/2026',
    datePicker3Start: '2026-01-10',
    datePicker3End: '03/10/2026'
  };

  await test.step('Navigate to homepage and ensure GUI Elements section is visible', async () => {
    const homePage = new HomePage(page);
    await homePage.openHomePage(BASE_URL);
    await expect(page).toHaveURL(BASE_URL, stepTimeout30);
    // Optionally, check page title contains 'Automation Testing Practice'
    const title = await homePage.getPageTitle();
    expect(title).toMatch(/Automation Testing Practice/i);
  });

  let homePage;
  await test.step('Fill Name field', async () => {
    homePage = new HomePage(page);
    await homePage.fillName(testData.name);
    await expect(await homePage.getNameValue()).toBe(testData.name);
  });

  await test.step('Fill Email field', async () => {
    await homePage.fillEmail(testData.email);
    await expect(await homePage.getEmailValue()).toBe(testData.email);
  });

  await test.step('Fill Phone field', async () => {
    await homePage.fillPhone(testData.phone);
    await expect(await homePage.getPhoneValue()).toBe(testData.phone);
  });

  await test.step('Fill Address field', async () => {
    await homePage.fillAddress(testData.address);
    await expect(await homePage.getAddressValue()).toBe(testData.address);
  });

  await test.step('Select Gender: Male', async () => {
    await homePage.selectGenderMale();
    await expect(await homePage.isGenderMaleSelected()).toBe(true);
  });

  await test.step('Check Monday checkbox', async () => {
    await homePage.checkMonday();
    await expect(await homePage.isMondayChecked()).toBe(true);
  });

  await test.step('Check Tuesday checkbox', async () => {
    await homePage.checkTuesday();
    await expect(await homePage.isTuesdayChecked()).toBe(true);
  });

  await test.step('Check Wednesday checkbox', async () => {
    await homePage.checkWednesday();
    await expect(await homePage.isWednesdayChecked()).toBe(true);
  });

  await test.step('Check Thursday checkbox', async () => {
    await homePage.checkThursday();
    await expect(await homePage.isThursdayChecked()).toBe(true);
  });

  await test.step('Check Friday checkbox', async () => {
    await homePage.checkFriday();
    await expect(await homePage.isFridayChecked()).toBe(true);
  });

  await test.step('Select Country from dropdown', async () => {
    await homePage.selectCountry(testData.country);
    await expect(await homePage.getSelectedCountry()).toBe('India');
  });

  await test.step('Select Color from Colors list', async () => {
    await homePage.selectColor(testData.color);
    await expect(await homePage.getSelectedColor()).toBe('Yellow');
  });

  await test.step('Select Animal from Sorted List', async () => {
    await homePage.selectAnimal(testData.animal);
    await expect(await homePage.getSelectedAnimal()).toBe('Dog');
  });

  await test.step('Fill Date Picker 1', async () => {
    await homePage.fillDatePicker1(testData.datePicker1);
    await expect(await homePage.getDatePicker1Value()).toBe(testData.datePicker1);
  });

  await test.step('Fill Date Picker 2', async () => {
    await homePage.fillDatePicker2(testData.datePicker2);
    await expect(await homePage.getDatePicker2Value()).toBe(testData.datePicker2);
  });

  await test.step('Fill Date Picker 3 Start Date', async () => {
    await homePage.fillDatePicker3Start(testData.datePicker3Start);
    await expect(await homePage.getDatePicker3StartValue()).toBe(testData.datePicker3Start);
  });

  await test.step('Fill Date Picker 3 End Date', async () => {
    await homePage.fillDatePicker3End(testData.datePicker3End);
    await expect(await homePage.getDatePicker3EndValue()).toBe(testData.datePicker3End);
  });

  await test.step('Submit the form', async () => {
    await homePage.submitForm();
    // No explicit confirmation message, but we can check that the fields are cleared or remain as is
    // Optionally, wait a moment for any UI update
    await page.waitForTimeout(1000);
  });
});