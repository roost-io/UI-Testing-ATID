const { test, expect } = require('@playwright/test');

test('Verify Product Sorting by Price (Low to High) in Women Category', async ({ page }) => {
  // Step 1: Navigate to the Women category page
  const womenCategoryUrl = 'https://atid.store/product-category/women/';
  await page.goto(womenCategoryUrl);
  await expect(page).toHaveURL(womenCategoryUrl);
  console.log('Navigated to Women category page.');

  // Step 2: Locate the sorting dropdown menu
  const sortingDropdown = page.locator('select[aria-label="Shop order"]');
  await expect(sortingDropdown).toBeVisible();
  console.log('Sorting dropdown menu located.');

  // Step 3: Click on the dropdown menu
  await sortingDropdown.click();
  console.log('Clicked on the sorting dropdown menu.');

  // Step 4: Select the 'Sort by price: low to high' option
  await sortingDropdown.selectOption({ label: 'Sort by price: low to high' });
  console.log('Selected the "Sort by price: low to high" option.');

  // Step 5: Wait for the page to refresh with updated product listing
  await page.waitForNavigation();
  await expect(page).toHaveURL(womenCategoryUrl);
  console.log('Page refreshed with updated product listing.');

  // Step 6: Verify that the products are displayed in ascending order of price
  const productPrices = await page.locator('.price').allInnerTexts();
  const priceValues = productPrices.map(priceText => {
    const numericPrice = parseFloat(priceText.replace(/[^0-9.]/g, ''));
    return numericPrice;
  });

  // Assert that the prices are in ascending order
  for (let i = 0; i < priceValues.length - 1; i++) {
    if (priceValues[i] > priceValues[i + 1]) {
      throw new Error('Products are not sorted in ascending order of price.');
    }
  }
  console.log('Verified products are sorted in ascending order of price.');

  // Additional verification: Ensure no duplicate products are shown
  const productTitles = await page.locator('.product-title').allInnerTexts();
  const uniqueTitles = new Set(productTitles);
  if (uniqueTitles.size !== productTitles.length) {
    throw new Error('Duplicate products detected in the listing.');
  }
  console.log('Verified no duplicate products are shown in the listing.');

  // Additional verification: Sorting option persists upon refreshing the page
  await page.reload();
  await expect(sortingDropdown).toHaveValue('price');
  console.log('Verified sorting option persists upon refreshing the page.');
});