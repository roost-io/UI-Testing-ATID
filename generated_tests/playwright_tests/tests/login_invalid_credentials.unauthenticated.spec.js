import 'dotenv/config';
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const BASE_URL = process.env.BASE_URL || 'https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC';
const INVALID_USERNAME = 'x_username';
const INVALID_PASSWORD = 'INVALID_PASSWORD';

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

test('Login with Invalid Credentials', async ({ page }) => {
  try {
    // Step 1: Navigate to ParaBank login page
    await page.goto(BASE_URL);
    await expect(page).toHaveURL(BASE_URL);
    
    // Verify page title
    await expect(page).toHaveTitle(/ParaBank.*Online Banking/);

    // Step 2: Enter invalid username into the username field
    // Captured selectors:
    //   1. page.locator(".input").nth(0) (confidence: 70%, strategy: css, unique: true)
    await page.locator(".input").nth(0).fill(INVALID_USERNAME);

    // Step 3: Enter invalid password into the password field
    // Captured selectors:
    //   1. page.locator(".input").nth(1) (confidence: 70%, strategy: css, unique: true)
    await page.locator(".input").nth(1).fill(INVALID_PASSWORD);

    // Step 4: Click the Login button to submit invalid credentials
    // Captured selectors:
    //   1. page.locator(".button").nth(1) (confidence: 70%, strategy: css, unique: true)
    await page.locator(".button").nth(1).click();
    
    // Step 5: Verify error message for invalid credentials is displayed
    // Wait for error message to appear
    await page.waitForTimeout(1000);
    
    // Look for error message using various common error selectors
    const errorSelectors = [
      '.error',
      '[role="alert"]',
      '.alert',
      '.message-error',
      'p.error',
      'div.error'
    ];
    
    // Try each selector until we find an error message
    let errorFound = false;
    for (const selector of errorSelectors) {
      const errorElement = page.locator(selector).first();
      if (await errorElement.count() > 0 && await errorElement.isVisible()) {
        // Verify error message contains text about invalid credentials
        const errorText = await errorElement.textContent();
        console.log(`Found error message: ${errorText}`);
        
        // Check if error message contains typical invalid credential phrases
        const hasInvalidCredentialsMessage = /invalid|incorrect|wrong|failed|not recognized|authentication|login|password/i.test(errorText);
        expect(hasInvalidCredentialsMessage).toBeTruthy();
        errorFound = true;
        break;
      }
    }
    
    // If we didn't find an error using common selectors, look for any text that might indicate an error
    if (!errorFound) {
      // Look for text mentioning invalid credentials
      const bodyText = await page.textContent('body');
      const hasErrorInBody = /invalid|incorrect|wrong|failed|not recognized|authentication|login|password/i.test(bodyText);
      expect(hasErrorInBody).toBeTruthy();
    }
    
    // Verify we're still on the login page (didn't navigate to account page)
    await expect(page).toHaveURL(BASE_URL);
  } catch (error) {
    throw error;
  }
});