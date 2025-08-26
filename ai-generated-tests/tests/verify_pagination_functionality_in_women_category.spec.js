import { test, expect } from '@playwright/test';

test('Verify Pagination Functionality in Women Category', async ({ page }) => {
  // Step 1: Navigate to the Women category page
  const womenCategoryUrl = 'https://atid.store/product-category/women/';
  await page.goto(womenCategoryUrl);
  
  // Verify the page loaded correctly
  await expect(page).toHaveURL(womenCategoryUrl);
  console.log('Navigated to Women category page.');

  // Step 2: Locate the pagination links
  const page2LinkSelector = '//a[@href="https://atid.store/product-category/women/page/2/" and contains(@class, "page-numbers")]';
  const nextLinkSelector = '//a[@href="https://atid.store/product-category/women/page/2/" and contains(@class, "next")]';

  const page2Link = page.locator(page2LinkSelector);
  const nextLink = page.locator(nextLinkSelector);

  // Ensure the pagination link for page 2 is visible
  await expect(page2Link).toBeVisible();
  console.log('Pagination link for Page 2 is visible.');

  // Step 3: Click on the 'Page 2' link
  await page2Link.click();
  console.log('Clicked on Page 2 pagination link.');

  // Step 4: Wait for the page to refresh with the next set of product listings
  const page2Url = 'https://atid.store/product-category/women/page/2/';
  await page.waitForURL(page2Url);
  await expect(page).toHaveURL(page2Url);
  console.log('Navigated to Page 2 and verified the URL.');

  // Step 5: Verify that the products on page 2 are displayed
  const productListingsSelector = '.products'; // Assuming '.products' contains the product list
  const productListings = page.locator(productListingsSelector);
  await expect(productListings).toBeVisible();
  console.log('Verified products are displayed on Page 2.');

  // Step 6: Click on the 'Next' link to navigate to the next page
  await expect(nextLink).toBeVisible();
  await nextLink.click();
  console.log('Clicked on Next pagination link.');

  // Step 7: Verify the correct navigation to the next set of product listings
  const page3Url = 'https://atid.store/product-category/women/page/3/';
  await page.waitForURL(page3Url);
  await expect(page).toHaveURL(page3Url);
  console.log('Navigated to Page 3 and verified the URL.');

  const productListingsPage3 = page.locator(productListingsSelector);
  await expect(productListingsPage3).toBeVisible();
  console.log('Verified products are displayed on Page 3.');
});