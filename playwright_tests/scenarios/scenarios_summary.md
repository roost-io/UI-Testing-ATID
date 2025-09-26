# Generated Test Scenarios Summary

## Overview

- **Total Scenarios**: 1
- **Application Base URL**: https://atid.store
- **Generated On**: 2025-09-26 13:12:23

## Scenarios

### 1. Verify Complete E-commerce Checkout Process with Validation Errors
_This scenario tests the complete e-commerce checkout process, including adding a product to the cart, selecting shipping options, filling in billing details, and validating error messages for missing and invalid fields._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, e-commerce, error-handling, payment-flow, performance, ui-test
**Est. Execution Time**: 115 seconds | **Flakiness Potential**: medium

**Type**: e-commerce
**Pages Involved:**
- https://atid.store/
- https://atid.store/product-category/women/
- https://atid.store/product-category/women/page/2/
- https://atid.store/product/blue-hoodie/
- https://atid.store/product/red-hoodie/
- https://atid.store/cart-2/
- https://atid.store/checkout-2/

#### Steps:
- Go to the e-commerce website atid.store.
- Click on the 'SHOP NOW' button in the 'Latest Eyewear For You' category.
- Verify navigation to the products page.
- Navigate to page 2 by clicking on '2' or the next arrow.
- Verify page 2 products are displayed.
- Click on the 'Red Hoodie' product.
- Verify navigation to the Red Hoodie product detail page.
- Verify that the price is '150.00 ₪'.
- Click on the 'ADD TO CART' button.
- Verify confirmation message 'Red Hoodie has been added to your cart' is displayed.
- Click on the 'VIEW CART' button.
- Verify navigation to the cart page.
- Select 'Local pickup' shipping option.
- Select 'Delivery Express' shipping option.
- Select 'Registered Mail' shipping option.
- Click on the 'PROCEED TO CHECKOUT' button.
- Verify navigation to the checkout page.
- Fill in the billing details: first name, last name, company name, country/region, street address, town/city, phone, and email address.
- Click on the 'PLACE ORDER' button.
- Verify error message 'Billing Postcode / ZIP is a required field' is displayed.
- Fill in the 'Postcode / ZIP' field with '316547'.
- Click on the 'PLACE ORDER' button.
- Verify error message 'Invalid payment method' is displayed.

#### Selectors Used:
- **Type**: a, **Text**: 'SHOP NOW', **Selector**: `html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > main > article > div > div > section:nth-of-type(2) > div > div > div > section > div > div:nth-of-type(1) > div > div:nth-of-type(3) > div > div > a.elementor-button-link.elementor-button.elementor-size-sm[href='https://atid.store/product-category/women/'][role='button']`, **Action**: click
- **Type**: a, **Text**: '2', **Selector**: `html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(2) > main > div > nav:nth-of-type(2) > ul > li:nth-of-type(2) > a.page-numbers[href='https://atid.store/product-category/women/page/2/']`, **Action**: click
- **Type**: a, **Text**: 'Red Hoodie', **Selector**: `html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > main > div > div:nth-of-type(2) > section > ul > li:nth-of-type(3) > div:nth-of-type(2) > a.ast-loop-product__link[href='https://atid.store/product/red-hoodie/']`, **Action**: click
- **Type**: button, **Text**: 'ADD TO CART', **Selector**: `html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > main > div > div:nth-of-type(2) > div:nth-of-type(2) > form > button.single_add_to_cart_button.button.alt[type='submit'][name='add-to-cart']`, **Action**: click
- **Type**: a, **Text**: 'VIEW CART', **Selector**: `html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > main > div > div:nth-of-type(1) > div > a.button.wc-forward[href='https://atid.store/cart-2/']`, **Action**: click
- **Type**: input, **Text**: '', **Selector**: `html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > main > article > div > div > section:nth-of-type(2) > div > div > div > div > div > div > div > div:nth-of-type(2) > div > table > tbody > tr:nth-of-type(2) > td > ul > li:nth-of-type(1) > input.shipping_method[type='radio'][name='shipping_method[0]'][id='shipping_method_0_local_pickup1']`, **Action**: select
- **Type**: button, **Text**: 'PROCEED TO CHECKOUT', **Selector**: `html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > main > article > div > div > section:nth-of-type(2) > div > div > div > div > div > div > div > div:nth-of-type(2) > div > div > a.checkout-button.button.alt.wc-forward[href='https://atid.store/checkout-2/']`, **Action**: click
- **Type**: input, **Text**: '', **Selector**: `html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > main > article > div > div > section:nth-of-type(2) > div > div > div > div > div > div > div > form:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div > p:nth-of-type(7) > span > input.input-text[type='text'][name='billing_postcode'][id='billing_postcode']`, **Action**: type
- **Type**: button, **Text**: 'PLACE ORDER', **Selector**: `html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > main > article > div > div > section:nth-of-type(2) > div > div > div > div > div > div > div > form:nth-of-type(3) > div:nth-of-type(3) > div > div > button.button.alt[type='submit'][name='woocommerce_checkout_place_order'][id='place_order']`, **Action**: click

#### Expected Results:
- User is navigated to the products page after clicking 'SHOP NOW'.
- Page 2 products are displayed after navigation.
- Product detail page for 'Red Hoodie' is displayed with price '150.00 ₪'.
- Confirmation message 'Red Hoodie has been added to your cart' is displayed.
- User is navigated to the cart page.
- Checkout page is displayed after proceeding from the cart.
- Error message 'Billing Postcode / ZIP is a required field' is displayed when the field is missing.
- Error message 'Invalid payment method' is displayed for invalid payment.

---

