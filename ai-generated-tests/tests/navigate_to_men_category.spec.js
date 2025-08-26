import { test, expect } from '@playwright/test';

test('Navigate to Men Category', async ({ page }) => {
  // Step 1: Navigate to the Store page
  const storePageUrl = 'https://atid.store/store/';
  await page.goto(storePageUrl);
  await expect(page).toHaveURL(storePageUrl);
  console.log('Navigated to Store page.');

  // Step 2: Locate the 'Men' category link
  const menCategoryLinkSelector = "//a[@href='https://atid.store/product-category/men/' and contains(@class, 'menu-link')]";
  const menCategoryLink = page.locator(menCategoryLinkSelector);
  await expect(menCategoryLink).toBeVisible();
  console.log('Located the Men category link.');

  // Step 3: Click on the 'Men' category link
  await menCategoryLink.click();
  console.log('Clicked on the Men category link.');

  // Step 4: Verify navigation to the Men category page
  const menCategoryPageUrl = 'https://atid.store/product-category/men/';
  await page.waitForURL(menCategoryPageUrl);
  await expect(page).toHaveURL(menCategoryPageUrl);
  console.log('Navigation to Men category page was successful.');

  // Step 5: Ensure the product listing on the Men category page displays only items related to men
  const productListingSelector = '.products'; // Assuming '.products' class represents the product grid/listing
  const productItemsSelector = '.products .product'; // Assuming '.product' represents individual product cards
  const menCategoryTag = 'Men'; // Assuming products have a tag or text indicating their category
  const productListing = page.locator(productListingSelector);

  // Verify the product listing is visible
  await expect(productListing).toBeVisible();
  console.log('Product listing is visible on the Men category page.');

  // Verify each product item is related to 'Men'
  const productItems = productListing.locator(productItemsSelector);
  const productCount = await productItems.count();
  for (let i = 0; i < productCount; i++) {
    const product = productItems.nth(i);
    await expect(product).toContainText(menCategoryTag, { timeout: 5000 });
  }
  console.log('All products displayed are related to the Men category.');

  // Step 6: Check the page title reflects the Men category
  const expectedPageTitle = 'Men – ATID Store'; // Assuming this is the expected page title
  await expect(page).toHaveTitle(expectedPageTitle);
  console.log(`Page title "${expectedPageTitle}" matches the Men category.`);
});