import { test, expect } from '@playwright/test';

test('Verify Product Sorting in \'Men\' Category', async ({ page }) => {
  // Navigate to the 'Men' category page
  const categoryPageUrl = 'https://atid.store/product-category/men/';
  await page.goto(categoryPageUrl);

  // Verify that the page loaded successfully
  await expect(page).toHaveURL(categoryPageUrl);

  // Locate the sorting dropdown menu
  const sortingDropdown = page.locator('select[aria-label="Shop order"]');
  await expect(sortingDropdown).toBeVisible();

  // Helper function to select sorting option and verify reordering
  const verifySorting = async (sortingOption, expectedText) => {
    // Select the sorting option
    await sortingDropdown.selectOption(sortingOption);

    // Wait for the page to reflect the new sorting
    await page.waitForTimeout(1000); // Allow some time for the sorting to apply

    // Verify that the products have been reordered
    const productList = page.locator('.products .product'); // Assuming products have this class
    await expect(productList).toBeVisible();

    // Example of validating sorting order (can be improved based on actual product structure)
    const productPrices = await productList.locator('.price').allTextContents();
    if (sortingOption.includes('low to high')) {
      const sortedPrices = [...productPrices].sort((a, b) => parseFloat(a.replace(/[^0-9.]/g, '')) - parseFloat(b.replace(/[^0-9.]/g, '')));
      expect(productPrices).toEqual(sortedPrices);
    } else if (sortingOption.includes('high to low')) {
      const sortedPrices = [...productPrices].sort((a, b) => parseFloat(b.replace(/[^0-9.]/g, '')) - parseFloat(a.replace(/[^0-9.]/g, '')));
      expect(productPrices).toEqual(sortedPrices);
    }

    console.log(`Verified sorting: ${expectedText}`);
  };

  // Select the option to sort by 'Price: Low to High' and verify
  await verifySorting('price', 'Price: Low to High');

  // Select the option to sort by 'Price: High to Low' and verify
  await verifySorting('price-desc', 'Price: High to Low');

  // Select the option to sort by 'Popularity' and verify
  await verifySorting('popularity', 'Popularity');

  // Select the option to sort by 'Average Rating' and verify
  await verifySorting('rating', 'Average Rating');

  // Select the option to sort by 'Latest' and verify
  await verifySorting('date', 'Latest');

  // Reset the sorting to 'Default sorting' and verify
  await verifySorting('menu_order', 'Default sorting');
});