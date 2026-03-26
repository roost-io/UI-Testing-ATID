import { test, expect } from '@playwright/test';

test('Verify E-Commerce Checkout Process with Validation Errors', async ({ page }) => {
  // Step 1: Navigate to the e-commerce website
  await page.goto('https://atid.store/');
  await expect(page).toHaveURL(/.*atid\.store\/$/);

  // Step 2: Click on the 'SHOP NOW' button in the 'Latest Eyewear For You' category
  const shopNowButton = page.locator('html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > main > article > div > div > section:nth-of-type(1) > div:nth-of-type(2) > div > div > div:nth-of-type(4) > div > div > a > span');
  await shopNowButton.click();

  // Step 3: Verify navigation to the products page
  await expect(page).toHaveURL(/.*atid\.store\/store\/$/);

  // Step 4: Navigate to page 3 by clicking on '3'
  const pageThreeButton = page.locator('html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(2) > main > div > nav:nth-of-type(2) > ul > li:nth-of-type(3) > a.page-numbers');
  await pageThreeButton.click();

  // Step 5: Verify that page 2 products are visible
  await expect(page).toHaveURL(/.*atid\.store\/store\/page\/3\/$/);

  // Step 6: Click on the 'Red Hoodie' product
  const redHoodieLink = page.locator('html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(2) > main > div > ul > li:nth-of-type(5) > div:nth-of-type(2) > a.ast-loop-product__link');
  await redHoodieLink.click();

  // Step 7: Verify navigation to the Red Hoodie product detail page
  await expect(page).toHaveURL(/.*atid\.store\/product\/red-hoodie\/$/);

  // Step 8: Click on the 'ADD TO CART' button
  const addToCartButton = page.locator('button.single_add_to_cart_button');
  await addToCartButton.click();

  // Step 9: Verify confirmation message is displayed
  const confirmationMessage = page.locator('div.woocommerce-message');
  await expect(confirmationMessage).toHaveText(/Red Hoodie.*has been added to your cart/);

  // Step 10: Click on the 'VIEW CART' button
  const viewCartButton = page.locator('a.button.wc-forward');
  await viewCartButton.click();

  // Step 11: Verify navigation to the cart page
  await expect(page).toHaveURL(/.*atid\.store\/cart-2\/$/);

  // Step 12: Select 'Local pickup' shipping option
  const localPickupOption = page.locator('#shipping_method_0_local_pickup1');
  await localPickupOption.click();

  // Step 13: Select 'Delivery Express' shipping option
  const deliveryExpressOption = page.locator('#shipping_method_0_flat_rate3');
  await deliveryExpressOption.click();

  // Step 14: Select 'Registered Mail' shipping option
  const registeredMailOption = page.locator('#shipping_method_0_flat_rate4');
  await registeredMailOption.click();

  // Step 15: Click on the 'PROCEED TO CHECKOUT' button
  const proceedToCheckoutButton = page.locator('a.checkout-button');
  await proceedToCheckoutButton.click();

  // Step 16: Verify navigation to the checkout page
  await expect(page).toHaveURL(/.*atid\.store\/checkout-2\/$/);

  // Step 17: Fill in the billing details
  const firstNameField = page.locator('#billing_first_name');
  await firstNameField.fill('Meital');
  const lastNameField = page.locator('#billing_last_name');
  await lastNameField.fill('Kenzi');
  const addressField = page.locator('#billing_address_1');
  await addressField.fill('Burla yehuda 1');
  const cityField = page.locator('#billing_city');
  await cityField.fill('Tel Aviv');
  const phoneField = page.locator('#billing_phone');
  await phoneField.fill('0544344345');
  const emailField = page.locator('#billing_email');
  await emailField.fill('meitalkenzi@gmail.com');

  // Step 18: Click on the 'PLACE ORDER' button
  const placeOrderButton = page.locator('#place_order');
  await placeOrderButton.click();

  // Step 19: Verify error message for missing postcode
  const postcodeErrorMessage = page.locator('ul.woocommerce-error');
  await expect(postcodeErrorMessage).toContainText('Billing Postcode / ZIP is a required field');

  // Step 20: Fill in the 'Postcode / ZIP' field
  const postcodeField = page.locator('#billing_postcode');
  await postcodeField.fill('316547');

  // Step 21: Click on the 'PLACE ORDER' button again
  await placeOrderButton.click();

  // Step 22: Verify error message for invalid payment method
  await expect(postcodeErrorMessage).toContainText('Invalid payment method');
});