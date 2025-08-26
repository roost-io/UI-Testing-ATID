const { test, expect } = require('@playwright/test');

test('Filter Products by Price Range', async ({ page }) => {
  // Step 1: Navigate to the Store page
  await page.goto('https://atid.store/store/');
  await expect(page).toHaveURL('https://atid.store/store/');
  console.log('Navigated to the Store page.');

  // Step 2: Locate the price filter section
  const minPriceField = page.locator('//div[@id="woocommerce_price_filter-2"]/form/div/div[2]/label[1]/following-sibling::input');
  const maxPriceField = page.locator('//div[@id="woocommerce_price_filter-2"]/form/div/div[2]/label[2]/following-sibling::input');
  const filterButton = page.locator('//button[normalize-space()="FILTER"]');

  // Ensure the price filter elements are visible
  await expect(minPriceField).toBeVisible();
  await expect(maxPriceField).toBeVisible();
  await expect(filterButton).toBeVisible();
  console.log('Located the price filter section.');

  // Step 3: Enter a minimum price in the 'Min price' field
  const minPrice = '50'; // Example minimum price
  await minPriceField.fill(minPrice);
  console.log(`Entered minimum price: ${minPrice}`);

  // Step 4: Enter a maximum price in the 'Max price' field
  const maxPrice = '150'; // Example maximum price
  await maxPriceField.fill(maxPrice);
  console.log(`Entered maximum price: ${maxPrice}`);

  // Step 5: Click the 'FILTER' button to apply the price filter
  await filterButton.click();
  console.log('Clicked the FILTER button to apply the price filter.');

  // Step 6: Verify that the product listing updates to display only items within the specified price range
  await page.waitForNavigation({ url: 'https://atid.store/store/' });
  console.log('Page navigation completed after applying the filter.');

  // Locate product listings and validate their price range
  const productPrices = page.locator('.product .price'); // Adjust selector based on actual structure
  const productsCount = await productPrices.count();
  console.log(`Found ${productsCount} products after applying the filter.`);

  for (let i = 0; i < productsCount; i++) {
    const priceText = await productPrices.nth(i).innerText();
    const priceValue = parseFloat(priceText.replace(/[^0-9.]/g, ''));
    expect(priceValue).toBeGreaterThanOrEqual(parseFloat(minPrice));
    expect(priceValue).toBeLessThanOrEqual(parseFloat(maxPrice));
    console.log(`Product ${i + 1}: Price ${priceValue} is within the range ${minPrice} - ${maxPrice}.`);
  }

  // Step 7: Ensure the applied filter is reflected in the UI
  const appliedFilterLabel = page.locator('.filter-summary'); // Adjust selector based on actual structure
  await expect(appliedFilterLabel).toContainText(`${minPrice} - ${maxPrice}`);
  console.log('Verified that the applied filter is reflected in the UI.');

  // Step 8: Clear filters and verify products reset to original state
  const clearFilterButton = page.locator('.clear-filters'); // Adjust selector based on actual structure
  await clearFilterButton.click();
  console.log('Clicked the button to clear filters.');

  await page.waitForNavigation({ url: 'https://atid.store/store/' });
  console.log('Page navigation completed after clearing the filter.');

  const originalProductsCount = await productPrices.count();
  console.log(`Found ${originalProductsCount} products after clearing the filter.`);
  expect(originalProductsCount).toBeGreaterThan(productsCount); // Assuming more products are shown after clearing the filter
});