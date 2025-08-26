import { test, expect } from '@playwright/test';

test('Verify Error Message When Submitting the Form with Empty Required Fields', async ({ page }) => {
  // Step 1: Navigate to the Contact Us page
  const contactUsUrl = 'https://atid.store/contact-us/';
  await page.goto(contactUsUrl);
  await expect(page).toHaveURL(contactUsUrl);

  // Step 2: Locate the 'SEND MESSAGE' button using the provided stable selector
  const sendMessageButton = page.locator('#wpforms-submit-15');
  await expect(sendMessageButton).toBeVisible();

  // Step 3: Click the 'SEND MESSAGE' button without filling in any fields
  await sendMessageButton.click();

  // Step 4: Verify that an error message is displayed under the 'Name' input field
  const nameError = page.locator('#wpforms-15-field_0-error'); // Assuming "-error" suffix for error messages
  await expect(nameError).toBeVisible();
  await expect(nameError).toContainText('This field is required');

  // Step 5: Verify that an error message is displayed under the 'Email' input field
  const emailError = page.locator('#wpforms-15-field_4-error'); // Assuming "-error" suffix for error messages
  await expect(emailError).toBeVisible();
  await expect(emailError).toContainText('This field is required');

  // Step 6: Verify that an error message is displayed under the 'Comment or Message' textarea
  const messageError = page.locator('#wpforms-15-field_2-error'); // Assuming "-error" suffix for error messages
  await expect(messageError).toBeVisible();
  await expect(messageError).toContainText('This field is required');
});