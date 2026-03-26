import { test, expect } from '@playwright/test';

test('Verify User Can Successfully Submit the Contact Form', async ({ page }) => {
  // Step 1: Navigate to the Contact Us page
  const contactUsPageUrl = 'https://atid.store/contact-us/';
  await page.goto(contactUsPageUrl);

  // Verify the page loaded correctly
  await expect(page).toHaveURL(contactUsPageUrl);

  // Step 2: Locate the 'Name' input field and type a valid name
  const nameInputSelector = '#wpforms-15-field_0';
  await page.locator(nameInputSelector).fill('John Doe');

  // Step 3: Locate the 'Email' input field and type a valid email address
  const emailInputSelector = '#wpforms-15-field_4';
  await page.locator(emailInputSelector).fill('john.doe@example.com');

  // Step 4: Locate the 'Comment or Message' textarea and type a message
  const messageTextareaSelector = '#wpforms-15-field_2';
  await page.locator(messageTextareaSelector).fill('I have a query about my recent order.');

  // Step 5: Locate the 'SEND MESSAGE' button and click it
  const sendMessageButtonSelector = '#wpforms-submit-15';
  await page.locator(sendMessageButtonSelector).click();

  // Step 6: Verify that the confirmation message is displayed
  const confirmationMessageText = 'Your message has been sent successfully!';
  const confirmationMessageSelector = '.wpforms-confirmation-container'; // Assuming this is the container for the confirmation message
  await expect(page.locator(confirmationMessageSelector)).toContainText(confirmationMessageText);
});