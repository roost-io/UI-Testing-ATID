import { test, expect } from '@playwright/test';

test('Validate Pagination Functionality', async ({ page }) => {
  // Step 1: Navigate to the 'Men' category page
  const menCategoryUrl = 'https://atid.store/product-category/men/';
  await page.goto(menCategoryUrl);

  // Verify the page loaded correctly
  await expect(page).toHaveURL(menCategoryUrl);

  // Step 2: Locate the 'Page 2' pagination link
  const page2Link = page.locator("//a[@href='https://atid.store/product-category/men/page/2/' and contains(@class, 'page-numbers')]");

  // Ensure the 'Page 2' link is visible
  await expect(page2Link).toBeVisible();

  // Step 3: Click on the 'Page 2' link
  await page2Link.click();

  // Step 4: Verify that the product listing updates to show the second page of products
  const page2Url = 'https://atid.store/product-category/men/page/2/';
  await page.waitForURL(page2Url);
  await expect(page).toHaveURL(page2Url);

  // Step 5: Locate the 'Next' pagination link
  const nextLink = page.locator("//a[@href='https://atid.store/product-category/men/page/2/' and contains(@class, 'next')]");

  // Ensure the 'Next' link is visible
  await expect(nextLink).toBeVisible();

  // Step 6: Click on the 'Next' link
  await nextLink.click();

  // Step 7: Verify that the product listing updates to show the next page of products
  const page3Url = 'https://atid.store/product-category/men/page/3/';
  await page.waitForURL(page3Url);
  await expect(page).toHaveURL(page3Url);

  // Step 8: Locate the 'Page 1' pagination link
  const page1Link = page.locator("//a[@href='https://atid.store/product-category/men/' and contains(@class, 'page-numbers')]");

  // Ensure the 'Page 1' link is visible
  await expect(page1Link).toBeVisible();

  // Step 9: Click on the 'Page 1' link
  await page1Link.click();

  // Step 10: Verify that the product listing resets to the first page
  await page.waitForURL(menCategoryUrl);
  await expect(page).toHaveURL(menCategoryUrl);

  console.log('Pagination functionality validated successfully!');
});