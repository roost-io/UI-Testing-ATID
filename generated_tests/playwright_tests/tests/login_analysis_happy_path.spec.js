import 'dotenv/config';
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const BASE_URL = process.env.BASE_URL || 'https://parabank.parasoft.com/parabank';
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

// Capture accessibility tree on failure for intelligent iteration
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'passed') {
    try {
      // Wait for any animations/modals to fully render
      await page.waitForTimeout(1000);
      
      const accessibilityTree = await page.accessibility.snapshot();
      
      // Capture complete DOM snapshot
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

test('Login to ParaBank - Happy Path', async ({ page }) => {
  try {
    // Step 1: Navigate to ParaBank login page
    await page.goto(`${BASE_URL}/index.htm?ConnType=JDBC`);
    
    // Verify page title
    await expect(page).toHaveTitle('ParaBank | Welcome | Online Banking');
    
    // Step 2: Enter username in the username field
    // Captured selectors:
    //   1. page.locator(".input").nth(0) (confidence: 70%, strategy: css, unique: true)
    await page.locator(".input").nth(0).fill(USERNAME);
    
    // Step 3: Enter password in the password field
    // Captured selectors:
    //   1. page.locator(".input").nth(1) (confidence: 70%, strategy: css, unique: true)
    await page.locator(".input").nth(1).fill(PASSWORD);
    
    // Step 4: Click login button to submit credentials
    // Captured selectors:
    //   1. page.locator(".button").nth(1) (confidence: 70%, strategy: css, unique: true)
    //   2. page.locator(".button") (confidence: 78%, strategy: css, unique: false)
    await page.locator(".button").nth(1).click();
    
    // Step 5: Verify user is successfully logged in
    // Wait for navigation to complete
    await page.waitForURL(`${BASE_URL}/overview.htm`);
    
    // Verify we are on the accounts overview page
    await expect(page).toHaveURL(`${BASE_URL}/overview.htm`);
    
  } catch (error) {
    console.error('Test failed:', error);
    throw error;
  }
});