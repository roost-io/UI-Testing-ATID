# Generated Test Scenarios Summary

## Overview

- **Total Scenarios**: 15
- **Application Base URL**: https://atid.store
- **Generated On**: 2025-08-25 13:52:10

## Scenarios

### 1. Verify User Can Successfully Submit the Contact Form
_This test ensures that a user can fill out and submit the contact form with valid data, and a confirmation message is displayed upon successful submission._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, error-handling, form-submission, form_submission, keyboard-navigation, performance, ui-test
**Est. Execution Time**: 50 seconds | **Flakiness Potential**: medium

**Type**: form_submission
**Pages Involved:**
- https://atid.store/contact-us/

#### Steps:
- Navigate to the Contact Us page at 'https://atid.store/contact-us/'.
- Locate the 'Name' input field using the provided stable selector.
- Type a valid name, such as 'John Doe', into the 'Name' input field.
- Locate the 'Email' input field using the provided stable selector.
- Type a valid email address, such as 'john.doe@example.com', into the 'Email' input field.
- Locate the 'Comment or Message' textarea using the provided stable selector.
- Type a message, such as 'I have a query about my recent order.', into the 'Comment or Message' textarea.
- Locate the 'SEND MESSAGE' button using the provided stable selector.
- Click the 'SEND MESSAGE' button.
- Verify that a confirmation message, such as 'Your message has been sent successfully!', is displayed on the page.

#### Selectors Used:
- **Type**: input, **Text**: '', **Selector**: `#wpforms-15-field_0`, **Action**: type
- **Type**: input, **Text**: '', **Selector**: `#wpforms-15-field_4`, **Action**: type
- **Type**: textarea, **Text**: '', **Selector**: `#wpforms-15-field_2`, **Action**: type
- **Type**: button, **Text**: 'SEND MESSAGE', **Selector**: `#wpforms-submit-15`, **Action**: click

#### Expected Results:
- The form is submitted without errors.
- A confirmation message is displayed, indicating successful submission.

---

### 2. Verify Error Message When Submitting the Form with Empty Required Fields
_This test validates that the form displays appropriate error messages when required fields are left empty._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, auto-generated, data-validation, error-handling, form-submission, form_validation, keyboard-navigation, performance, ui-test
**Est. Execution Time**: 30 seconds | **Flakiness Potential**: medium

**Type**: form_validation
**Pages Involved:**
- https://atid.store/contact-us/

#### Steps:
- Navigate to the Contact Us page at 'https://atid.store/contact-us/'.
- Locate the 'SEND MESSAGE' button using the provided stable selector.
- Click the 'SEND MESSAGE' button without filling in any fields.
- Verify that an error message is displayed under the 'Name' input field, indicating that it is required.
- Verify that an error message is displayed under the 'Email' input field, indicating that it is required.
- Verify that an error message is displayed under the 'Comment or Message' textarea, indicating that it is required.

#### Selectors Used:
- **Type**: button, **Text**: 'SEND MESSAGE', **Selector**: `#wpforms-submit-15`, **Action**: click
- **Type**: input, **Text**: '', **Selector**: `#wpforms-15-field_0`, **Action**: validate
- **Type**: input, **Text**: '', **Selector**: `#wpforms-15-field_4`, **Action**: validate
- **Type**: textarea, **Text**: '', **Selector**: `#wpforms-15-field_2`, **Action**: validate

#### Expected Results:
- Error messages are displayed for all required fields that are left empty.

---

### 3. Filter Products by Price Range
_Validates the functionality of the price filter feature by ensuring users can filter products within a specified price range._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, concurrency, data-validation, form-submission, functional, performance, ui-test
**Est. Execution Time**: 40 seconds | **Flakiness Potential**: medium

**Type**: functional
**Pages Involved:**
- https://atid.store/store/

#### Steps:
- Navigate to the Store page.
- Locate the price filter section.
- Enter a minimum price in the 'Min price' field using the appropriate input.
- Enter a maximum price in the 'Max price' field using the appropriate input.
- Click the 'FILTER' button to apply the price filter.
- Verify that the product listing updates to display only items within the specified price range.
- Ensure the applied filter is reflected in the UI (e.g., updated price range label).
- Clear filters and verify products reset to original state.

#### Selectors Used:
- **Type**: label, **Text**: 'Min price', **Selector**: `//div[@id='woocommerce_price_filter-2']/form/div/div[2]/label[1]`, **Action**: type
- **Type**: label, **Text**: 'Max price', **Selector**: `//div[@id='woocommerce_price_filter-2']/form/div/div[2]/label[2]`, **Action**: type
- **Type**: button, **Text**: 'FILTER', **Selector**: `//button[normalize-space()="FILTER"]`, **Action**: click

#### Expected Results:
- Products displayed match the specified price range.
- No products outside the range are displayed.
- Filter UI reflects the selected price range.

---

### 4. Sort Products by Popularity
_Validates the ability to sort products by popularity using the sorting dropdown menu._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, data-validation, drag-and-drop, functional, performance, ui-test
**Est. Execution Time**: 35 seconds | **Flakiness Potential**: medium

**Type**: functional
**Pages Involved:**
- https://atid.store/store/

#### Steps:
- Navigate to the Store page.
- Locate the sorting dropdown menu.
- Click on the dropdown menu to expand sorting options.
- Select 'Sort by popularity' from the dropdown.
- Verify that the product listing updates to display items sorted by popularity.
- Check that the sorting option is reflected in the UI.
- Reset sorting to 'Default sorting' and verify the product order resets.

#### Selectors Used:
- **Type**: select, **Text**: 'Sort by popularity', **Selector**: `select[aria-label="Shop order"]`, **Action**: select

#### Expected Results:
- Products are displayed in descending order of popularity.
- Selected sorting option is reflected in the dropdown menu.
- Default sorting resets product display to original order.

---

### 5. Navigate to Men Category
_Validates navigation to the Men category page and the correct display of products specific to this category._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, data-validation, navigation, performance, ui-test
**Est. Execution Time**: 30 seconds | **Flakiness Potential**: medium

**Type**: navigation
**Pages Involved:**
- https://atid.store/store/
- https://atid.store/product-category/men/

#### Steps:
- Navigate to the Store page.
- Locate the 'Men' category link.
- Click on the 'Men' category link.
- Verify navigation to the Men category page.
- Ensure the product listing on the Men category page displays only items related to men.
- Check the page title reflects the Men category.

#### Selectors Used:
- **Type**: link, **Text**: 'MEN', **Selector**: `//a[@href='https://atid.store/product-category/men/' and contains(@class, 'menu-link')]`, **Action**: click

#### Expected Results:
- Navigation to Men category page is successful.
- Only products related to men are displayed.
- Page title matches the Men category.

---

### 6. Add Product to Shopping Cart
_Validates the ability to add a product to the shopping cart from the store page._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, data-validation, functional, payment-flow, performance, ui-test
**Est. Execution Time**: 35 seconds | **Flakiness Potential**: medium

**Type**: functional
**Pages Involved:**
- https://atid.store/store/
- https://atid.store/cart-2/

#### Steps:
- Navigate to the Store page.
- Locate a product listing.
- Click on the product to view its details.
- Click the 'Add to Cart' button on the product detail page.
- Verify the product is added to the shopping cart.
- Navigate to the shopping cart page to confirm the added product.
- Ensure the product quantity and price are displayed correctly in the cart.

#### Selectors Used:
- **Type**: link, **Text**: '', **Selector**: `//a[@href='https://atid.store/product/anchor-bracelet/' and contains(@class, 'woocommerce-LoopProduct-link')]`, **Action**: click
- **Type**: link, **Text**: 'Cart', **Selector**: `//a[@href='https://atid.store/cart-2/' and contains(@class, 'cart-container')]`, **Action**: click

#### Expected Results:
- Product is successfully added to the shopping cart.
- Shopping cart displays correct quantity and price.
- Added product is reflected in the shopping cart page.

---

### 7. Verify Product Sorting in 'Men' Category
_Tests the ability to sort products in the 'Men' category by different criteria such as popularity, average rating, price, and latest arrivals._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, drag-and-drop, functional, performance, ui-test
**Est. Execution Time**: 70 seconds | **Flakiness Potential**: medium

**Type**: functional
**Pages Involved:**
- https://atid.store/product-category/men/

#### Steps:
- Navigate to the 'Men' category page.
- Locate the sorting dropdown menu.
- Select the option to sort by 'Price: Low to High'.
- Verify that the products are re-ordered by price in ascending order.
- Select the option to sort by 'Price: High to Low'.
- Verify that the products are re-ordered by price in descending order.
- Select the option to sort by 'Popularity'.
- Verify that the products are re-ordered based on popularity.
- Select the option to sort by 'Average Rating'.
- Verify that the products are re-ordered based on average customer ratings.
- Select the option to sort by 'Latest'.
- Verify that the products are re-ordered by newest arrivals.
- Reset the sorting to 'Default sorting'.
- Verify that the products return to the default order.

#### Selectors Used:
- **Type**: select, **Text**: 'Default sorting
Sort by popularity
Sort by average rating
Sort by latest
Sort by price: low to high
Sort by price: high to low', **Selector**: `select[aria-label="Shop order"]`, **Action**: select

#### Expected Results:
- The products are correctly re-ordered based on the selected sorting criteria.

---

### 8. Validate Price Filtering Functionality
_Tests the price filter tool to ensure users can successfully filter products within a specific price range in the 'Men' category._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, form-submission, functional, performance, ui-test
**Est. Execution Time**: 50 seconds | **Flakiness Potential**: medium

**Type**: functional
**Pages Involved:**
- https://atid.store/product-category/men/

#### Steps:
- Navigate to the 'Men' category page.
- Locate the 'Min price' and 'Max price' labels.
- Enter a minimum price value (e.g., 100₪).
- Enter a maximum price value (e.g., 150₪).
- Click the 'FILTER' button to apply the price range filter.
- Verify that the product list updates to display only items within the specified price range.
- Change the minimum price value to 80₪ and maximum price to 190₪.
- Click the 'FILTER' button again.
- Verify that the product list updates to reflect the new price range.
- Ensure that products outside the range are not displayed.

#### Selectors Used:
- **Type**: label, **Text**: 'Min price', **Selector**: `//div[@id='woocommerce_price_filter-2']/form/div/div[2]/label[1]`, **Action**: type
- **Type**: label, **Text**: 'Max price', **Selector**: `//div[@id='woocommerce_price_filter-2']/form/div/div[2]/label[2]`, **Action**: type
- **Type**: button, **Text**: 'FILTER', **Selector**: `//button[normalize-space()="FILTER"]`, **Action**: click

#### Expected Results:
- Products within the specified price range are displayed.
- Products outside the range are hidden.

---

### 9. Verify Product Search Functionality
_Tests the search bar functionality to ensure users can find specific products in the 'Men' category._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, error-handling, form-submission, functional, performance, ui-test
**Est. Execution Time**: 50 seconds | **Flakiness Potential**: medium

**Type**: functional
**Pages Involved:**
- https://atid.store/product-category/men/

#### Steps:
- Navigate to the 'Men' category page.
- Locate the search bar input field.
- Type 'ATID Blue Shoes' into the search bar.
- Click the 'Search' button to execute the query.
- Verify that the search results display the correct product.
- Clear the search input field.
- Type 'Denim Jeans' into the search bar.
- Click the 'Search' button again.
- Verify that the search results display all relevant products containing 'Denim Jeans'.
- Ensure no unrelated products are displayed.

#### Selectors Used:
- **Type**: input, **Text**: '', **Selector**: `#wc-block-search__input-1`, **Action**: type
- **Type**: button, **Text**: 'Search', **Selector**: `button[aria-label="Search"]`, **Action**: click

#### Expected Results:
- Search results match the entered query.
- Unrelated products are excluded from search results.

---

### 10. Validate Pagination Functionality
_Tests the pagination controls to ensure users can navigate between pages of product listings in the 'Men' category._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, error-handling, functional, performance, ui-test
**Est. Execution Time**: 50 seconds | **Flakiness Potential**: medium

**Type**: functional
**Pages Involved:**
- https://atid.store/product-category/men/

#### Steps:
- Navigate to the 'Men' category page.
- Locate the 'Page 2' pagination link.
- Click on the 'Page 2' link.
- Verify that the product listing updates to show the second page of products.
- Locate the 'Next' pagination link.
- Click on the 'Next' link.
- Verify that the product listing updates to show the next page of products.
- Locate the 'Page 1' pagination link.
- Click on the 'Page 1' link.
- Verify that the product listing resets to the first page.

#### Selectors Used:
- **Type**: a, **Text**: '2', **Selector**: `//a[@href='https://atid.store/product-category/men/page/2/' and contains(@class, 'page-numbers')]`, **Action**: click
- **Type**: a, **Text**: '→', **Selector**: `//a[@href='https://atid.store/product-category/men/page/2/' and contains(@class, 'next')]`, **Action**: click

#### Expected Results:
- Pagination controls correctly update the product listing.
- Users can navigate between all pages.

---

### 11. Verify Product Sorting by Price (Low to High) in Women Category
_Test the functionality of sorting products by price from low to high in the Women category page._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, drag-and-drop, functionality, mobile, performance, ui-test
**Est. Execution Time**: 30 seconds | **Flakiness Potential**: medium

**Type**: functionality
**Pages Involved:**
- https://atid.store/product-category/women/

#### Steps:
- Navigate to the Women category page.
- Locate the sorting dropdown menu.
- Click on the dropdown menu.
- Select the 'Sort by price: low to high' option.
- Wait for the page to refresh with updated product listing.
- Verify that the products are displayed in ascending order of price.

#### Selectors Used:
- **Type**: select, **Text**: 'Default sorting
Sort by popularity
Sort by average rating
Sort by latest
Sort by price: low to high
Sort by price: high to low', **Selector**: `select[aria-label="Shop order"]`, **Action**: select

#### Expected Results:
- Products are displayed in ascending order of price.
- No duplicate products are shown in the listing.
- Sorting option persists upon refreshing the page.

---

### 12. Verify Filtering Products by Price Range in Women Category
_Test the functionality of filtering products by a specified price range in the Women category page._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, form-submission, functionality, performance, ui-test
**Est. Execution Time**: 35 seconds | **Flakiness Potential**: medium

**Type**: functionality
**Pages Involved:**
- https://atid.store/product-category/women/

#### Steps:
- Navigate to the Women category page.
- Locate the 'Min price' and 'Max price' filter fields.
- Input a minimum price value (e.g., 50).
- Input a maximum price value (e.g., 150).
- Click the 'FILTER' button.
- Wait for the page to refresh with filtered product listing.
- Verify that only products within the specified price range are displayed.

#### Selectors Used:
- **Type**: label, **Text**: 'Min price', **Selector**: `//div[@id='woocommerce_price_filter-2']/form/div/div[2]/label[1]`, **Action**: type
- **Type**: label, **Text**: 'Max price', **Selector**: `//div[@id='woocommerce_price_filter-2']/form/div/div[2]/label[2]`, **Action**: type
- **Type**: button, **Text**: 'FILTER', **Selector**: `//button[normalize-space()="FILTER"]`, **Action**: click

#### Expected Results:
- Products within the specified price range are displayed.
- No products outside the range are shown.
- Filter criteria persist upon refreshing the page.

---

### 13. Verify Pagination Functionality in Women Category
_Test the functionality of navigating through multiple pages of product listings in the Women category._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, navigation, performance, ui-test
**Est. Execution Time**: 35 seconds | **Flakiness Potential**: medium

**Type**: navigation
**Pages Involved:**
- https://atid.store/product-category/women/

#### Steps:
- Navigate to the Women category page.
- Locate the pagination links at the bottom of the page.
- Click on the 'Page 2' link.
- Wait for the page to refresh with the next set of product listings.
- Verify that the products on page 2 are displayed.
- Click on the 'Next' link to navigate to the next page.
- Verify the correct navigation to the next set of product listings.

#### Selectors Used:
- **Type**: a, **Text**: '2', **Selector**: `//a[@href='https://atid.store/product-category/women/page/2/' and contains(@class, 'page-numbers')]`, **Action**: click
- **Type**: a, **Text**: '→', **Selector**: `//a[@href='https://atid.store/product-category/women/page/2/' and contains(@class, 'next')]`, **Action**: click

#### Expected Results:
- Correct set of products is displayed for the selected page.
- Pagination links are functional and responsive.
- No duplicate products are shown across pages.

---

### 14. Verify Navigation to 'Return to Shop' from Empty Cart
_Ensure that users can navigate to the shop page from the empty cart page using the 'RETURN TO SHOP' button._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, cross-browser, error-handling, navigation, payment-flow, performance, security, ui-test
**Est. Execution Time**: 30 seconds | **Flakiness Potential**: medium

**Type**: navigation
**Pages Involved:**
- https://atid.store/cart-2/
- https://atid.store/store/

#### Steps:
- Navigate to https://atid.store/cart-2/.
- Verify the visibility of the message indicating the cart is empty.
- Locate the 'RETURN TO SHOP' button.
- Click on the 'RETURN TO SHOP' button.
- Verify that the user is redirected to the shop page at https://atid.store/store/.
- Confirm that the shop page displays a list of products for browsing.

#### Selectors Used:
- **Type**: a, **Text**: 'RETURN TO SHOP', **Selector**: `//a[@href='https://atid.store/store/' and contains(@class, 'button')]`, **Action**: click

#### Expected Results:
- The 'RETURN TO SHOP' button is visible on the cart page.
- Clicking the button redirects the user to the shop page.
- The shop page correctly displays a list of products.

---

### 15. Verify Accessibility Toolbar Functionality
_Validate the operation of the accessibility toolbar on the cart page, ensuring options like increasing text size and high contrast mode work as expected._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, data-validation, keyboard-navigation, payment-flow, performance, ui-test
**Est. Execution Time**: 30 seconds | **Flakiness Potential**: medium

**Type**: accessibility
**Pages Involved:**
- https://atid.store/cart-2/

#### Steps:
- Navigate to https://atid.store/cart-2/.
- Locate the accessibility toolbar link with the label 'Open toolbar'.
- Click on the 'Open toolbar' link to reveal the accessibility options.
- Click on the 'Increase Text' option and verify that the text size on the page increases.
- Click on the 'High Contrast' option and validate that the page switches to a high-contrast mode.
- Click on the 'Reset Changes' option and confirm that the page reverts to its default appearance.

#### Selectors Used:
- **Type**: a, **Text**: 'Open toolbar', **Selector**: `//a[@href='javascript:void(0);' and contains(@class, 'pojo-a11y-toolbar-link')]`, **Action**: click
- **Type**: a, **Text**: 'Increase Text', **Selector**: `//a[@href='#' and contains(@class, 'pojo-a11y-toolbar-link')]`, **Action**: click

#### Expected Results:
- The toolbar options are visible and clickable.
- The text size increases after selecting 'Increase Text'.
- The high contrast mode is applied after selecting 'High Contrast'.
- The default appearance is restored after selecting 'Reset Changes'.

---

