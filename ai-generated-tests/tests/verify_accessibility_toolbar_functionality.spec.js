import { test, expect } from '@playwright/test';

test('Verify Accessibility Toolbar Functionality', async ({ page }) => {
  // Step 1: Navigate to the cart page
  const cartPageUrl = 'https://atid.store/cart-2/';
  await page.goto(cartPageUrl);

  // Assert that the correct page is loaded
  await expect(page).toHaveURL(cartPageUrl);

  // Step 2: Locate the accessibility toolbar link with the label 'Open toolbar'
  const openToolbarSelector = "//a[@href='javascript:void(0);' and contains(@class, 'pojo-a11y-toolbar-link')]";
  const openToolbarLink = page.locator(openToolbarSelector);

  // Assert that the 'Open toolbar' link is visible
  await expect(openToolbarLink).toBeVisible();

  // Step 3: Click on the 'Open toolbar' link to reveal the accessibility options
  await openToolbarLink.click();

  // Add a short wait to ensure the toolbar options are revealed
  await page.waitForTimeout(1000);

  // Step 4: Click on the 'Increase Text' option and verify that the text size on the page increases
  const increaseTextSelector = "//a[@href='#' and contains(@class, 'pojo-a11y-toolbar-link')]";
  const increaseTextOption = page.locator(increaseTextSelector, { hasText: 'Increase Text' });

  // Assert that the 'Increase Text' option is visible
  await expect(increaseTextOption).toBeVisible();

  // Click on the 'Increase Text' option
  await increaseTextOption.click();

  // Add a short wait to allow the text size to change
  await page.waitForTimeout(1000);

  // Verify that the text size has increased (example assertion based on CSS style change)
  const bodyElement = page.locator('body');
  const fontSize = await bodyElement.evaluate((el) => window.getComputedStyle(el).fontSize);
  console.log('Current font size:', fontSize);
  expect(parseFloat(fontSize)).toBeGreaterThan(16); // Assuming default font size is 16px

  // Step 5: Click on the 'High Contrast' option and validate that the page switches to a high-contrast mode
  const highContrastOption = page.getByText('High Contrast');

  // Assert that the 'High Contrast' option is visible
  await expect(highContrastOption).toBeVisible();

  // Click on the 'High Contrast' option
  await highContrastOption.click();

  // Add a short wait to allow the high-contrast mode to apply
  await page.waitForTimeout(1000);

  // Verify that the page switches to a high-contrast mode (example assertion based on background color change)
  const backgroundColor = await bodyElement.evaluate((el) => window.getComputedStyle(el).backgroundColor);
  console.log('Current background color:', backgroundColor);
  expect(backgroundColor).toBe('rgb(0, 0, 0)'); // Assuming high-contrast mode sets background to black

  // Step 6: Click on the 'Reset Changes' option and confirm that the page reverts to its default appearance
  const resetChangesOption = page.getByText('Reset Changes');

  // Assert that the 'Reset Changes' option is visible
  await expect(resetChangesOption).toBeVisible();

  // Click on the 'Reset Changes' option
  await resetChangesOption.click();

  // Add a short wait to allow the changes to reset
  await page.waitForTimeout(1000);

  // Verify that the text size and background color revert to defaults
  const defaultFontSize = await bodyElement.evaluate((el) => window.getComputedStyle(el).fontSize);
  const defaultBackgroundColor = await bodyElement.evaluate((el) => window.getComputedStyle(el).backgroundColor);
  console.log('Default font size:', defaultFontSize);
  console.log('Default background color:', defaultBackgroundColor);

  expect(parseFloat(defaultFontSize)).toBe(16); // Default font size
  expect(defaultBackgroundColor).toBe('rgb(255, 255, 255)'); // Default background color (white)
});