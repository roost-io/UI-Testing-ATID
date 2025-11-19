import 'dotenv/config';
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const BASE_URL = process.env.BASE_URL || 'https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC';
const INVALID_USERNAME = 'x_username';
const INVALID_PASSWORD = 'INVALID_PASSWORD';

test('login_invalid_credentials', async ({ page }) => {
  try {
    // Step 1: Navigate to ParaBank login page
    await page.goto(BASE_URL);
    
    // Verify page title
    await expect(page).toHaveTitle(/ParaBank \| Welcome \| Online Banking/);

    // Step 2: Enter username in the username field
    // Captured selectors:
    //   1. page.locator(".input").nth(0) (confidence: 70%, strategy: css, unique: true)
    await page.locator(".input").nth(0).fill(INVALID_USERNAME);

    // Step 3: Enter invalid password in the password field
    // Captured selectors:
    //   1. page.locator(".input").nth(1) (confidence: 70%, strategy: css, unique: true)
    await page.locator(".input").nth(1).fill(INVALID_PASSWORD);

    // Step 4: Click login button to submit credentials
    // Captured selectors:
    //   1. page.locator(".button").nth(1) (confidence: 70%, strategy: css, unique: true)
    //   2. page.locator(".button") (confidence: 78%, strategy: css, unique: false)
    await page.locator(".button").nth(1).click();

    // Step 5: Verify error message is displayed for invalid credentials
    // Wait for error message to appear
    await page.waitForTimeout(1000);
    
    // Look for common error message containers
    const errorLocators = [
      'div.error',
      '.error-message',
      '.alert-error',
      '[role="alert"]',
      'p.error'
    ];
    
    let errorFound = false;
    for (const selector of errorLocators) {
      const errorElement = page.locator(selector);
      if (await errorElement.count() > 0 && await errorElement.first().isVisible()) {
        errorFound = true;
        const errorText = await errorElement.first().textContent();
        console.log(`Error message displayed: ${errorText}`);
        await expect(errorElement.first()).toBeVisible();
        break;
      }
    }
    
    // If no specific error element found, verify we're still on login page
    // which indicates login failed as expected for negative test
    if (!errorFound) {
      await expect(page).toHaveURL(BASE_URL);
      console.log("Login failed as expected for invalid credentials test");
    }

  } catch (error) {
    console.error(`Test failed with error: ${error.message}`);
    throw error;
  }
});

// Capture accessibility tree on failure for intelligent iteration
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'passed') {
    try {
      // Wait for any animations/modals to fully render
      await page.waitForTimeout(1000);
      
      const accessibilityTree = await page.accessibility.snapshot();
      
      // Capture DOM snapshot
      const domSnapshot = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('*'))
          .filter(el => {
            // Only visible elements
            const rect = el.getBoundingClientRect();
            const style = window.getComputedStyle(el);
            return rect.width > 0 && rect.height > 0 && 
                   style.display !== 'none' &&
                   style.visibility !== 'hidden' &&
                   parseFloat(style.opacity) > 0.05;
          })
          .map(el => {
            const style = window.getComputedStyle(el);
            const rect = el.getBoundingClientRect();
            
            return {
              tag: el.tagName.toLowerCase(),
              id: el.id || null,
              classes: el.className || null,
              text: (el.innerText || el.textContent || '').trim().substring(0, 100),
              value: el.value || null,
              role: el.getAttribute('role') || null,
              ariaLabel: el.getAttribute('aria-label') || null,
              type: el.type || null,
              href: el.href || null,
              cursor: style.cursor,
              display: style.display,
              hasOnclick: !!el.onclick || el.hasAttribute('onclick'),
              parent: {
                tag: el.parentElement?.tagName?.toLowerCase(),
                classes: el.parentElement?.className || null
              },
              position: {
                x: Math.round(rect.x),
                y: Math.round(rect.y),
                width: Math.round(rect.width),
                height: Math.round(rect.height)
              }
            };
          });
      });
      
      // Remove .spec.js and optional .authenticated/.unauthenticated prefixes
      const fileName = path.basename(testInfo.file)
        .replace('.authenticated.spec.js', '')
        .replace('.unauthenticated.spec.js', '')
        .replace('.spec.js', '');
      const stateFile = path.join(__dirname, `../.accessibility_state_${fileName}.json`);
      fs.writeFileSync(stateFile, JSON.stringify({ 
        accessibility_tree: accessibilityTree, 
        dom_snapshot: domSnapshot, 
        element_count: domSnapshot.length, 
        url: page.url() 
      }, null, 2));
    } catch (e) {}
  }
});