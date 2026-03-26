import { test, expect } from '@playwright/test';

test('Verify Product Search Functionality', async ({ page }) => {
  // Step 1: Navigate to the 'Men' category page
  const menCategoryPage = 'https://atid.store/product-category/men/';
  await page.goto(menCategoryPage);

  // Verify the page loaded correctly
  await expect(page).toHaveURL(menCategoryPage);

  // Step 2: Locate the search bar input field
  const searchInput = page.locator('#wc-block-search__input-1');
  await expect(searchInput).toBeVisible(); // Ensure the search bar is visible

  // Step 3: Type 'ATID Blue Shoes' into the search bar
  await searchInput.fill('ATID Blue Shoes');

  // Step 4: Click the 'Search' button to execute the query
  const searchButton = page.locator('button[aria-label="Search"]');
  await expect(searchButton).toBeVisible(); // Ensure the search button is visible
  await searchButton.click();

  // Wait for the search results to load
  await page.waitForLoadState('networkidle');

  // Step 5: Verify that the search results display the correct product
  const productResult = page.locator('text=ATID Blue Shoes');
  await expect(productResult).toBeVisible(); // Ensure the product is displayed

  // Step 6: Clear the search input field
  await searchInput.fill(''); // Clear the existing search input

  // Step 7: Type 'Denim Jeans' into the search bar
  await searchInput.fill('Denim Jeans');

  // Step 8: Click the 'Search' button again
  await searchButton.click();

  // Wait for the search results to load
  await page.waitForLoadState('networkidle');

  // Step 9: Verify that the search results display all relevant products containing 'Denim Jeans'
  const relevantProducts = page.locator('text=Denim Jeans');
  await expect(relevantProducts).toBeVisible(); // Ensure at least one relevant product is displayed

  // Step 10: Ensure no unrelated products are displayed
  const unrelatedProduct = page.locator('text=ATID Blue Shoes');
  await expect(unrelatedProduct).not.toBeVisible(); // Ensure unrelated products are not displayed
});