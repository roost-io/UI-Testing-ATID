import { test, expect } from '@playwright/test';

test('Validate Price Filtering Functionality', async ({ page }) => {
  // Step 1: Navigate to the 'Men' category page
  const menCategoryURL = 'https://atid.store/product-category/men/';
  await page.goto(menCategoryURL);

  // Step 2: Verify correct page loaded
  await expect(page).toHaveURL(menCategoryURL);

  // Step 3: Locate the 'Min price' and 'Max price' labels
  const minPriceLabel = page.locator("//div[@id='woocommerce_price_filter-2']/form/div/div[2]/label[1]");
  const maxPriceLabel = page.locator("//div[@id='woocommerce_price_filter-2']/form/div/div[2]/label[2]");

  // Verify both labels are visible
  await expect(minPriceLabel).toBeVisible();
  await expect(maxPriceLabel).toBeVisible();

  // Step 4: Enter a minimum price value (e.g., 100₪)
  const minPriceInput = page.locator("//div[@id='woocommerce_price_filter-2']/form/div/div[2]/input[@name='min_price']");
  await minPriceInput.fill('100');

  // Step 5: Enter a maximum price value (e.g., 150₪)
  const maxPriceInput = page.locator("//div[@id='woocommerce_price_filter-2']/form/div/div[2]/input[@name='max_price']");
  await maxPriceInput.fill('150');

  // Step 6: Click the 'FILTER' button to apply the price range filter
  const filterButton = page.locator("//button[normalize-space()='FILTER']");
  await filterButton.click();

  // Step 7: Verify that the product list updates to display only items within the specified price range
  await page.waitForURL(menCategoryURL);
  const productPrices = page.locator('.price');
  const prices = await productPrices.allTextContents();

  // Ensure all products are within the range of 100₪ to 150₪
  for (const priceText of prices) {
    const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
    expect(price).toBeGreaterThanOrEqual(100);
    expect(price).toBeLessThanOrEqual(150);
  }

  // Step 8: Change the minimum price value to 80₪ and maximum price to 190₪
  await minPriceInput.fill('80');
  await maxPriceInput.fill('190');

  // Step 9: Click the 'FILTER' button again
  await filterButton.click();

  // Step 10: Verify that the product list updates to reflect the new price range
  await page.waitForURL(menCategoryURL);
  const updatedPrices = await productPrices.allTextContents();

  // Ensure all products are within the range of 80₪ to 190₪
  for (const priceText of updatedPrices) {
    const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
    expect(price).toBeGreaterThanOrEqual(80);
    expect(price).toBeLessThanOrEqual(190);
  }

  // Step 11: Ensure that products outside the range are not displayed
  const allPrices = updatedPrices.map(priceText =>
    parseFloat(priceText.replace(/[^\d.]/g, ''))
  );
  const outOfRangeProducts = allPrices.filter(price => price < 80 || price > 190);
  expect(outOfRangeProducts.length).toBe(0);
});