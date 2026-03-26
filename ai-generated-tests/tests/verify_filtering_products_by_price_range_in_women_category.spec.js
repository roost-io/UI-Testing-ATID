// playwright.config.js setup assumed to be configured
import { test, expect } from '@playwright/test';

test('Verify Filtering Products by Price Range in Women Category', async ({ page }) => {
  // Step 1: Navigate to the Women category page
  const womenCategoryUrl = 'https://atid.store/product-category/women/';
  await page.goto(womenCategoryUrl);

  // Verify that the page loaded correctly
  await expect(page).toHaveURL(womenCategoryUrl);

  // Step 2: Locate the 'Min price' and 'Max price' filter fields
  const minPriceField = page.locator('//div[@id="woocommerce_price_filter-2"]/form/div/div[2]/label[1]/following-sibling::input');
  const maxPriceField = page.locator('//div[@id="woocommerce_price_filter-2"]/form/div/div[2]/label[2]/following-sibling::input');

  // Ensure the filter fields are visible
  await expect(minPriceField).toBeVisible();
  await expect(maxPriceField).toBeVisible();

  // Step 3: Input a minimum price value (e.g., 50)
  const minPriceValue = '50';
  await minPriceField.fill(minPriceValue);

  // Step 4: Input a maximum price value (e.g., 150)
  const maxPriceValue = '150';
  await maxPriceField.fill(maxPriceValue);

  // Step 5: Click the 'FILTER' button
  const filterButton = page.locator('//button[normalize-space()="FILTER"]');
  await filterButton.click();

  // Step 6: Wait for the page to refresh with filtered product listing
  await page.waitForURL(womenCategoryUrl);

  // Step 7: Verify that only products within the specified price range are displayed
  const productPrices = page.locator('.price ins .woocommerce-Price-amount bdi, .price .woocommerce-Price-amount bdi'); // Adjust selector for product prices if needed
  const prices = await productPrices.allTextContents();

  for (const price of prices) {
    const priceValue = parseFloat(price.replace(/[^0-9.]/g, ''));
    expect(priceValue).toBeGreaterThanOrEqual(50);
    expect(priceValue).toBeLessThanOrEqual(150);
  }

  // Verify filter criteria persist upon refreshing the page
  await page.reload();
  const reloadedMinPrice = await minPriceField.inputValue();
  const reloadedMaxPrice = await maxPriceField.inputValue();
  expect(reloadedMinPrice).toBe(minPriceValue);
  expect(reloadedMaxPrice).toBe(maxPriceValue);
});