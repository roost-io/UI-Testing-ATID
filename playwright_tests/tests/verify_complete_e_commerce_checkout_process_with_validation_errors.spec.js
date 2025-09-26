import { test, expect } from '@playwright/test';

test('Verify Complete E-commerce Checkout Process with Validation Errors', async ({ page }) => {
  // Step 1: Go to the e-commerce website
  await page.goto('https://atid.store/');
  await expect(page).toHaveURL('https://atid.store/');

  // Step 2: Click on the 'SHOP NOW' button in the 'Latest Eyewear For You' category
  await page.locator("html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > main > article > div > div > section:nth-of-type(2) > div > div > div > section > div > div:nth-of-type(1) > div > div:nth-of-type(3) > div > div > a.elementor-button-link.elementor-button.elementor-size-sm[href='https://atid.store/product-category/women/'][role='button']").click();

  // Step 3: Verify navigation to the products page
  await expect(page).toHaveURL('https://atid.store/product-category/women/');

  // Step 4: Navigate to page 2 by clicking on '2' or the next arrow
  await page.locator("html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(2) > main > div > nav:nth-of-type(2) > ul > li:nth-of-type(2) > a.page-numbers[href='https://atid.store/product-category/women/page/2/']").click();

  // Step 5: Verify page 2 products are displayed
  await expect(page).toHaveURL('https://atid.store/product-category/women/page/2/');

  // Step 6: Click on the 'Red Hoodie' product
  await page.locator("html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > main > div > div:nth-of-type(2) > section > ul > li:nth-of-type(3) > div:nth-of-type(2) > a.ast-loop-product__link[href='https://atid.store/product/red-hoodie/']").click();

  // Step 7: Verify navigation to the Red Hoodie product detail page
  await expect(page).toHaveURL('https://atid.store/product/red-hoodie/');

  // Step 8: Verify that the price is '150.00 ₪'
  const priceLocator = page.locator('.summary.entry-summary .price .woocommerce-Price-amount');
  await expect(priceLocator).toContainText('150.00 ₪');

  // Step 9: Click on the 'ADD TO CART' button
  await page.locator("html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > main > div > div:nth-of-type(2) > div:nth-of-type(2) > form > button.single_add_to_cart_button.button.alt[type='submit'][name='add-to-cart']").click();

  // Step 10: Verify confirmation message 'Red Hoodie has been added to your cart' is displayed
  const confirmationMessage = page.locator('.woocommerce-message');
  await expect(confirmationMessage).toContainText('Red Hoodie has been added to your cart');

  // Step 11: Click on the 'VIEW CART' button
  await page.locator("html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > main > div > div:nth-of-type(1) > div > a.button.wc-forward[href='https://atid.store/cart-2/']").click();

  // Step 12: Verify navigation to the cart page
  await expect(page).toHaveURL('https://atid.store/cart-2/');

  // Step 13-15: Select shipping options
  const shippingOptions = [
    "html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > main > article > div > div > section:nth-of-type(2) > div > div > div > div > div > div > div > div:nth-of-type(2) > div > table > tbody > tr:nth-of-type(2) > td > ul > li:nth-of-type(1) > input.shipping_method[type='radio'][name='shipping_method[0]'][id='shipping_method_0_local_pickup1']"
  ];
  for (const option of shippingOptions) {
    await page.locator(option).check();
  }

  //Step PROCEED