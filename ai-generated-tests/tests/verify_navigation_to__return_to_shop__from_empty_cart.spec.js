import { test, expect } from '@playwright/test';

test('Verify Navigation to Return to Shop from Empty Cart', async ({ page }) => {
  // Step 1: Navigate to the cart page
  await page.goto('https://atid.store/cart-2/');

  // Step 2: Verify the visibility of the message indicating the cart is empty
  const emptyCartMessage = page.locator('div.cart-empty');
  await expect(emptyCartMessage).toBeVisible();
  console.log('Verified the empty cart message is visible.');

  // Step 3: Locate the "RETURN TO SHOP" button
  const returnToShopButton = page.locator("//a[@href='https://atid.store/store/' and contains(@class, 'button')]");
  await expect(returnToShopButton).toBeVisible();
  console.log('Verified the "RETURN TO SHOP" button is visible.');

  // Step 4: Click on the "RETURN TO SHOP" button
  await returnToShopButton.click();
  console.log('Clicked on the "RETURN TO SHOP" button.');

  // Step 5: Verify that the user is redirected to the shop page
  await page.waitForURL('https://atid.store/store/');
  await expect(page).toHaveURL('https://atid.store/store/');
  console.log('Verified redirection to the shop page.');

  // Step 6: Confirm that the shop page displays a list of products for browsing
  const productList = page.locator('ul.products');
  await expect(productList).toBeVisible();
  console.log('Verified the shop page displays a list of products.');
});