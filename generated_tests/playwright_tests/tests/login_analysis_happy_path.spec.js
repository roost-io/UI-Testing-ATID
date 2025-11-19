import 'dotenv/config';
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Environment variables
const BASE_URL = process.env.BASE_URL || 'https://zbio.atlassian.net';
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

// Capture accessibility tree on failure for intelligent iteration
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'passed') {
    try {
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

test('Complete successful authentication workflow using valid Atlassian credentials to access zbio Jira instance', async ({ page, context }) => {
  try {
    // Step 1: Navigate to zbio.atlassian.net homepage which redirects to Atlassian ID login
    await page.goto(BASE_URL);
    
    // Wait for redirect to Atlassian ID login portal
    await page.waitForURL(/id\.atlassian\.com\/login/, { timeout: 15000 });
    await page.waitForLoadState('networkidle');
    
    console.log('✅ Step 1: Successfully redirected to Atlassian ID login page');

    // Step 2: Enter valid Atlassian email/username
    if (!USERNAME) {
      throw new Error('⚠️ USERNAME not set in .env file. Please add USERNAME=your-atlassian-email@example.com');
    }

    // Wait for username/email input field to be visible
    const usernameInput = page.locator('input[type="email"], input[name="username"], input[id*="username"]').first();
    await usernameInput.waitFor({ state: 'visible', timeout: 10000 });
    await usernameInput.fill(USERNAME);
    
    console.log('✅ Step 2: Entered Atlassian email/username');

    // Step 3: Enter password and submit
    if (!PASSWORD) {
      throw new Error('⚠️ PASSWORD not set in .env file. Please add PASSWORD=your-atlassian-password');
    }

    // Click Continue/Next button to proceed to password field
    const continueButton = page.locator('button[type="submit"], button:has-text("Continue"), button#login-submit').first();
    await continueButton.waitFor({ state: 'visible', timeout: 10000 });
    await continueButton.click();

    // Wait for password field to appear
    await page.waitForTimeout(2000);
    const passwordInput = page.locator('input[type="password"], input[name="password"], input[id*="password"]').first();
    await passwordInput.waitFor({ state: 'visible', timeout: 10000 });
    await passwordInput.fill(PASSWORD);

    // Submit the login form
    const loginButton = page.locator('button[type="submit"], button:has-text("Log in"), button:has-text("Continue"), button#login-submit').first();
    await loginButton.waitFor({ state: 'visible', timeout: 10000 });
    await loginButton.click();

    console.log('✅ Step 3: Entered password and submitted login form');

    // Step 4: Verify successful authentication and redirect to zbio.atlassian.net
    await page.waitForURL(/zbio\.atlassian\.net/, { timeout: 30000 });
    await page.waitForLoadState('networkidle');
    
    console.log('✅ Step 4: Successfully authenticated and redirected to zbio Jira workspace');

    // Step 5: Verify authenticated state by confirming page title and URL stability
    await expect(page).toHaveURL(/zbio\.atlassian\.net/);
    
    // Wait for page to fully load and stabilize
    await page.waitForTimeout(3000);
    
    const pageTitle = await page.title();
    console.log(`✅ Step 5: Authenticated session established. Page title: ${pageTitle}`);

    // Save authenticated state for other tests to reuse
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(10000);
    await context.storageState({ path: '.auth/storage-state.json' });
    console.log('✅ Storage state saved - other tests can now skip login!');

  } catch (error) {
    console.error('❌ Login workflow failed:', error.message);
    throw error;
  }
});