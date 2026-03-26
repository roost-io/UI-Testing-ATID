import { test, expect } from '@playwright/test';

test('Add Product to Shopping Cart', async ({ page }) => {
  // Step 1: Navigate to the Store page
  const storePageUrl = 'https://atid.store/store/';
  await page.goto(storePageUrl);

  // Verify the Store page loaded correctly
  await expect(page).toHaveURL(storePageUrl);

  // Step 2: Locate a product listing and click on it to view its details
  const productSelector = "//a[@href='https://atid.store/product/anchor-bracelet/' and contains(@class, 'woocommerce-LoopProduct-link')]";
  const productUrl = 'https://atid.store/product/anchor-bracelet/';
  await page.locator(productSelector).click();

  // Step 3: Verify the product detail page loaded
  await page.waitForURL(productUrl);
  await expect(page).toHaveURL(productUrl);

  // Step 4: Click the 'Add to Cart' button
  const addToCartButton = page.locator('button[name="add-to-cart"]');
  await addToCartButton.click();

  // Step 5: Verify the product is added to the shopping cart
  const cartIconSelector = "//a[@href='https://atid.store/cart-2/' and contains(@class, 'cart-container')]";
  await page.locator(cartIconSelector).click();

  // Step 6: Navigate to the shopping cart page and confirm the added product
  const cartPageUrl = 'https://atid.store/cart-2/';
  await page.waitForURL(cartPageUrl);
  await expect(page).toHaveURL(cartPageUrl);

  // Step 7: Ensure the product quantity and price are displayed correctly in the cart
  const productInCartSelector = page.locator('tr.cart_item');
  await expect(productInCartSelector).toBeVisible();

  const productName = productInCartSelector.locator('td.product-name');
  await expect(productName).toContainText('Anchor Bracelet');

  const productQuantity = productInCartSelector.locator('input.qty');
  await expect(productQuantity).toHaveValue('1');

  const productPrice = productInCartSelector.locator('td.product-price');
  await expect(productPrice).toBeVisible();
  
  console.log('Test passed: Product successfully added to shopping cart.');
});