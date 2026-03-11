import 'dotenv/config';
import { test, expect } from '@playwright/test';

import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.BASE_URL;

let stepTimeout30 = { timeout: 30000 };
let stepTimeout10 = { timeout: 10000 };

test('automation_testing_practice_form___complete_user_journey', async ({ page }) => {
  // Step 1: Navigate to homepage
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

  // Step 2: Input Name
  await page.getByRole('textbox', { name: 'Enter Name' }).fill('Roostai', stepTimeout30);
  await expect(page.getByRole('textbox', { name: 'Enter Name' })).toHaveValue('Roostai', stepTimeout10);

  // Step 3: Input Email
  await page.getByRole('textbox', { name: 'Enter EMail' }).fill('roostai@zb.io', stepTimeout30);
  await expect(page.getByRole('textbox', { name: 'Enter EMail' })).toHaveValue('roostai@zb.io', stepTimeout10);

  // Step 4: Input Phone
  await page.getByRole('textbox', { name: 'Enter Phone' }).fill('9999999999', stepTimeout30);
  await expect(page.getByRole('textbox', { name: 'Enter Phone' })).toHaveValue('9999999999', stepTimeout10);

  // Step 5: Input Address
  await page.getByRole('textbox', { name: 'Address:' }).fill('Bangalore , India', stepTimeout30);
  await expect(page.getByRole('textbox', { name: 'Address:' })).toHaveValue('Bangalore , India', stepTimeout10);

  // Step 6: Select Gender
  await page.getByRole('radio', { name: 'Male', exact: true }).check(stepTimeout30);
  await expect(page.getByRole('radio', { name: 'Male', exact: true })).toBeChecked(stepTimeout10);

  // Step 7: Check Monday
  await page.getByRole('checkbox', { name: 'Monday' }).check(stepTimeout30);
  await expect(page.getByRole('checkbox', { name: 'Monday' })).toBeChecked(stepTimeout10);

  // Step 8: Check Tuesday
  await page.getByRole('checkbox', { name: 'Tuesday' }).check(stepTimeout30);
  await expect(page.getByRole('checkbox', { name: 'Tuesday' })).toBeChecked(stepTimeout10);

  // Step 9: Check Wednesday
  await page.getByRole('checkbox', { name: 'Wednesday' }).check(stepTimeout30);
  await expect(page.getByRole('checkbox', { name: 'Wednesday' })).toBeChecked(stepTimeout10);

  // Step 10: Check Thursday
  await page.getByRole('checkbox', { name: 'Thursday' }).check(stepTimeout30);
  await expect(page.getByRole('checkbox', { name: 'Thursday' })).toBeChecked(stepTimeout10);

  // Step 11: Check Friday
  await page.getByRole('checkbox', { name: 'Friday' }).check(stepTimeout30);
  await expect(page.getByRole('checkbox', { name: 'Friday' })).toBeChecked(stepTimeout10);

  // Step 12: Select Country
  await page.getByLabel('Country:').selectOption({ label: 'India' }, stepTimeout30);
  await expect(page.getByLabel('Country:')).toHaveValue('india', stepTimeout10);

  // Step 13: Select Color
  await page.getByLabel('Colors:').selectOption({ label: 'Yellow' }, stepTimeout30);
  await expect(page.getByLabel('Colors:')).toHaveValue('yellow', stepTimeout10);

  // Step 14: Select Animal
  await page.getByLabel('Sorted List:').selectOption({ label: 'Dog' }, stepTimeout30);
  await expect(page.getByLabel('Sorted List:')).toHaveValue('dog', stepTimeout10);

  // Step 15: Input Date Picker 1
  await page.locator('#datepicker').fill('17/02/2026', stepTimeout30);
  await expect(page.locator('#datepicker')).toHaveValue('17/02/2026', stepTimeout10);

  // Step 16: Input Date Picker 2
  await page.evaluate(() => { document.getElementById('txtDate').removeAttribute('readonly'); });
  await page.locator('#txtDate').fill('01/01/2026', stepTimeout30);
  await expect(page.locator('#txtDate')).toHaveValue('01/01/2026', stepTimeout10);

  // Step 17: Input Date Picker 3 Start Date
  await page.getByPlaceholder('Start Date').fill('2026-01-10', stepTimeout30);
  await expect(page.getByPlaceholder('Start Date')).toHaveValue('2026-01-10', stepTimeout10);

  // Step 18: Input Date Picker 3 End Date
  await page.getByPlaceholder('End Date').fill('2026-10-03', stepTimeout30);
  await page.waitForTimeout(500); // Let UI settle
  await page.getByPlaceholder('End Date').fill('2026-10-03', stepTimeout30);
  await expect(page.getByPlaceholder('End Date')).toHaveValue('2026-10-03', stepTimeout10);

  // Step 19: Submit Form
  await page.locator('#post-body-1307673142697428135').getByRole('button', { name: 'Submit' }).click(stepTimeout30);
});

