import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { HomePage } from './pom/HomePage.js';
const BASE_HOST_URL = process.env.BASE_HOST_URL || 'https://atid.store';

test('homepage_accessibility___initial_entry_point', async ({ page }) => {
  // Instantiate the HomePage page object
  const homePage = new HomePage(page);

  // Step 1: Navigate to website homepage using POM method
  await homePage.gotoHomePage();

  // Step 2: Wait for network to be idle for full page load
  await homePage.waitForPageLoad();

  // Step 3: Verification - Page URL is correct and homepage is accessible
  const currentUrl = await homePage.getCurrentUrl();
  expect(currentUrl).toBe(`${BASE_HOST_URL}/`);
});