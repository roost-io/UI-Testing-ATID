import 'dotenv/config';
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const BASE_URL = process.env.BASE_URL || 'https://parabank.parasoft.com/parabank';
const USERNAME = process.env.USERNAME || 'john';
const PASSWORD = process.env.PASSWORD || 'demo';

// Capture accessibility tree on failure for intelligent iteration
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'passed') {
    try {
      // Wait for any animations/modals to fully render
      await page.waitForTimeout(1000);
      
      const accessibilityTree = await page.accessibility.snapshot();
      
      const domSnapshot = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('*'))
          .filter(el => {
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

test('Customer Login to ParaBank - E2E Workflow', async ({ page, context }) => {
  try {
    // Step 1: Navigate to ParaBank homepage
    await page.goto(`${BASE_URL}/index.htm?ConnType=JDBC`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Wait for any JavaScript-rendered content
    
    // Verify we're on the login page
    await expect(page).toHaveURL(/index\.htm\?ConnType=JDBC/);
    
    // Step 2: Enter username in login form
    // Captured selectors:
    //   1. input[name='username'] (confidence: 90%, strategy: attribute, unique: true)
    //   2. #loginPanel input:nth-of-type(1) (confidence: 85%, strategy: css, unique: true)
    await page.locator('input[name="username"]').fill(USERNAME);
    await page.waitForTimeout(500); // Allow UI to process input
    
    // Step 3: Enter password in login form
    // Captured selectors:
    //   1. input[name='password'] (confidence: 90%, strategy: attribute, unique: true)
    //   2. #loginPanel input[type='password'] (confidence: 85%, strategy: css, unique: true)
    await page.locator('input[name="password"]').fill(PASSWORD);
    await page.waitForTimeout(500); // Allow UI to process input
    
    // Step 4: Click the Login button to submit credentials
    // Captured selectors:
    //   1. input[value='Log In'] (confidence: 90%, strategy: attribute, unique: true)
    //   2. #loginPanel input[type='submit'] (confidence: 85%, strategy: css, unique: true)
    await page.locator('input[value="Log In"]').click();
    
    // Wait for navigation to complete after login
    await page.waitForNavigation({ timeout: 10000 });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Wait for account info to render
    
    // Step 5: Verify successful login and account overview display
    // Check URL indicates successful login
    await expect(page).toHaveURL(/overview\.htm/);
    
    // Verify account overview elements are visible
    // Check for welcome message or account information
    const accountsTable = page.locator('#accountTable');
    await expect(accountsTable).toBeVisible({ timeout: 10000 });
    
    // Verify authenticated navigation options are available
    const transferFundsLink = page.locator('a:has-text("Transfer Funds")');
    await expect(transferFundsLink).toBeVisible();
    
    // Wait for authentication to fully propagate
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(10000);  // Allow time for auth state to be set

    // Save authenticated state for other tests to reuse
    await context.storageState({ path: '.auth/storage-state.json' });
    console.log('✅ Storage state saved - other tests can now skip login!');
    
  } catch (error) {
    console.error('Test failed:', error);
    throw error;
  }
});