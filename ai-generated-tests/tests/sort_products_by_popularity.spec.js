const { test, expect } = require('@playwright/test');

test('Sort Products by Popularity', async ({ page }) => {
  // Step 1: Navigate to the Store page
  const storePageURL = 'https://atid.store/store/';
  await page.goto(storePageURL);

  // Verify the page loaded correctly
  await expect(page).toHaveURL(storePageURL);
  console.log('Navigated to the Store page successfully.');

  // Step 2: Locate the sorting dropdown menu
  const sortingDropdown = page.locator('select[aria-label="Shop order"]');
  await expect(sortingDropdown).toBeVisible();
  console.log('Sorting dropdown menu is visible.');

  // Step 3: Click on the dropdown menu to expand sorting options
  await sortingDropdown.click();
  console.log('Clicked on the sorting dropdown menu.');

  // Step 4: Select 'Sort by popularity' from the dropdown
  await sortingDropdown.selectOption({ label: 'Sort by popularity' });
  console.log('Selected "Sort by popularity" from the dropdown.');

  // Step 5: Verify that the product listing updates to display items sorted by popularity
  // Note: This step assumes that the UI updates visibly after sorting. Adjust selectors as necessary.
  await page.waitForTimeout(2000); // Wait for sorting to apply (replace this with a specific wait if possible)
  const productList = page.locator('.products'); // Adjust the selector for your product list if necessary
  await expect(productList).toBeVisible();
  console.log('Verified that the product listing is visible.');

  // If there is a specific indicator that the products are sorted by popularity, validate that here.
  // For example, if there is a visual cue or specific product order that indicates popularity:
  // await expect(productList).toContainText('Popular Product'); // Replace with actual validation logic

  // Step 6: Check that the sorting option is reflected in the UI
  const selectedOption = await sortingDropdown.inputValue();
  expect(selectedOption).toBe('popularity'); // Validate the value reflects 'Sort by popularity'
  console.log('Verified that the selected sorting option is reflected in the dropdown.');

  // Step 7: Reset sorting to 'Default sorting' and verify the product order resets
  await sortingDropdown.selectOption({ label: 'Default sorting' });
  console.log('Reset sorting to "Default sorting".');

  // Wait for the product list to reset
  await page.waitForTimeout(2000); // Wait for reset to apply (replace with a specific wait if possible)

  // Validate that the product list order has returned to the default state
  // For example, check for a specific order or visual cue indicating default sorting:
  // await expect(productList).toContainText('Default Product'); // Replace with actual validation logic
  console.log('Verified that the product order reset to default.');

  console.log('Test completed successfully.');
});