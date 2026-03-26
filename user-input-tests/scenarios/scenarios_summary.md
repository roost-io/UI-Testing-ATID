# Generated Test Scenarios Summary

## Overview

- **Total Scenarios**: 1
- **Application Base URL**: https://atid.store
- **Generated On**: 2025-08-26 12:37:47

## Scenarios

### 1. Verify E-Commerce Checkout Process with Validation Errors
_This test scenario verifies the entire e-commerce checkout workflow from browsing products to placing an order, including handling validation errors during checkout._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, data-validation, error-handling, functional, keyboard-navigation, payment-flow, performance, ui-test
**Est. Execution Time**: 115 seconds | **Flakiness Potential**: medium

**Type**: functional
**Pages Involved:**
- https://atid.store/
- https://atid.store/store/
- https://atid.store/store/page/3/
- https://atid.store/product/red-hoodie/
- https://atid.store/cart-2/
- https://atid.store/checkout-2/

#### Steps:
- Navigate to the e-commerce website 'atid.store'.
- Click on the 'SHOP NOW' button in the 'Latest Eyewear For You' category.
- Verify navigation to the products page.
- Navigate to page 3 by clicking on '3' or the next arrow.
- Verify that page 2 products are visible.
- Click on the 'Red Hoodie' product.
- Verify navigation to the Red Hoodie product detail page.
- Verify the price of the product is '150.00 ₪'.
- Click on the 'ADD TO CART' button.
- Verify confirmation message 'Red Hoodie has been added to your cart' is displayed.
- Click on the 'VIEW CART' button.
- Verify navigation to the cart page.
- Select 'Local pickup' shipping option.
- Select 'Delivery Express' shipping option.
- Select 'Registered Mail' shipping option.
- Click on the 'PROCEED TO CHECKOUT' button.
- Verify navigation to the checkout page.
- Fill in the billing details as specified in the table.
- Click on the 'PLACE ORDER' button.
- Verify error message 'Billing Postcode / ZIP is a required field' is displayed.
- Fill in the 'Postcode / ZIP' field with '316547'.
- Click on the 'PLACE ORDER' button again.
- Verify error message 'Invalid payment method' is displayed.

#### Selectors Used:
- **Type**: span, **Text**: 'SHOP NOW', **Selector**: `html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > main > article > div > div > section:nth-of-type(1) > div:nth-of-type(2) > div > div > div:nth-of-type(4) > div > div > a > span`, **Action**: click_element_by_index
- **Type**: a, **Text**: '3', **Selector**: `html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(2) > main > div > nav:nth-of-type(2) > ul > li:nth-of-type(3) > a.page-numbers[href="https://atid.store/store/page/3/"]`, **Action**: click_element_by_index
- **Type**: a, **Text**: 'Red Hoodie', **Selector**: `html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(2) > main > div > ul > li:nth-of-type(5) > div:nth-of-type(2) > a.ast-loop-product__link[href="https://atid.store/product/red-hoodie/"]`, **Action**: click_element_by_index
- **Type**: button, **Text**: 'ADD TO CART', **Selector**: `html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > main > div > div:nth-of-type(2) > div:nth-of-type(2) > form > button.single_add_to_cart_button.button.alt[type="submit"][name="add-to-cart"]`, **Action**: click_element_by_index
- **Type**: a, **Text**: 'VIEW CART', **Selector**: `html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > main > div > div:nth-of-type(1) > div > a.button.wc-forward[href="https://atid.store/cart-2/"]`, **Action**: click_element_by_index
- **Type**: input, **Text**: 'Local pickup', **Selector**: `html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > main > article > div > div > section:nth-of-type(2) > div > div > div > div > div > div > div > div:nth-of-type(2) > div > table > tbody > tr:nth-of-type(2) > td > ul > li:nth-of-type(1) > input.shipping_method[type="radio"][name="shipping_method[0]"][id="shipping_method_0_local_pickup1"]`, **Action**: click_element_by_index
- **Type**: input, **Text**: 'Delivery Express', **Selector**: `html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > main > article > div > div > section:nth-of-type(2) > div > div > div > div > div > div > div > div:nth-of-type(2) > div > table > tbody > tr:nth-of-type(2) > td > ul > li:nth-of-type(2) > input.shipping_method[type="radio"][name="shipping_method[0]"][id="shipping_method_0_flat_rate3"]`, **Action**: click_element_by_index
- **Type**: input, **Text**: 'Registered Mail', **Selector**: `html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > main > article > div > div > section:nth-of-type(2) > div > div > div > div > div > div > div > div:nth-of-type(2) > div > table > tbody > tr:nth-of-type(2) > td > ul > li:nth-of-type(3) > input.shipping_method[type="radio"][name="shipping_method[0]"][id="shipping_method_0_flat_rate4"]`, **Action**: click_element_by_index
- **Type**: a, **Text**: 'PROCEED TO CHECKOUT', **Selector**: `html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > main > article > div > div > section:nth-of-type(2) > div > div > div > div > div > div > div > div:nth-of-type(2) > div > div > a.checkout-button.button.alt.wc-forward[href="https://atid.store/checkout-2/"]`, **Action**: click_element_by_index
- **Type**: input, **Text**: 'None', **Selector**: `html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > main > article > div > div > section:nth-of-type(2) > div > div > div > div > div > div > div > form:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div > p:nth-of-type(1) > span > input.input-text[type="text"][name="billing_first_name"][id="billing_first_name"][placeholder][autocomplete="given-name"]`, **Action**: input_text
- **Type**: button, **Text**: 'PLACE ORDER', **Selector**: `html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > main > article > div > div > section:nth-of-type(2) > div > div > div > div > div > div > div > form:nth-of-type(3) > div:nth-of-type(2) > div > div > button.button.alt[type="submit"][name="woocommerce_checkout_place_order"][id="place_order"]`, **Action**: click_element_by_index

#### Expected Results:
- User should be able to navigate through the e-commerce site.
- The product page should display the correct products.
- The cart should reflect the selected product and shipping options.
- The checkout form should validate required fields and reject invalid payment methods.

---

