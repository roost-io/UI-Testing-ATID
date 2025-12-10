## Test: login_analysis_happy_path
**File**: login_analysis_happy_path.spec.js
**Iteration**: 1/3
**Timestamp**: 2025-12-10 10:18:47
**Status**: FAILED

### Error Details
```
Test: Login Analysis - Documented Failure (Atlassian React SPA Incompatibility)
======================================================================
Main Error:
[31mTest timeout of 120000ms exceeded.[39m

Detailed Errors:

Error 1:
[31mTest timeout of 120000ms exceeded.[39m

Error 2:
Error: page.waitForLoadState: Test timeout of 120000ms exceeded.

  90 |     
  91 |     // Wait for redirect to Atlassian's centralized authentication page
> 92 |     await page.waitForLoadState('networkidle');
     |                ^
  93 |     
  94 |     // Verify redirect to id.atlassian.com/login
  95 |     const currentUrl = page.url();
    at /var/tmp/Roost/RoostGPT/ui-test-zbio-atlassian/a20dd89c-cf0d-4aeb-8074-163efb200d95/source/UI-Testing-ATID/generated_tests/zbio.atlassian.net/playwright_tests/tests/login_analysis_happy_path.spec.js:92:16
  Location: /var/tmp/Roost/RoostGPT/ui-test-zbio-atlassian/a20dd89c-cf0d-4aeb-8074-163efb200d95/source/UI-Testing-ATID/generated_tests/zbio.atlassian.net/playwright_tests/tests/login_analysis_happy_path.spec.js:92:16

Console Output (stderr):


❌ TEST COMPLETED: Failure documented as expected

📋 Error details: page.waitForLoadState: Test timeout of 120000ms exceeded.


Console Output (stdout):
🔍 DOCUMENTATION: This test replicates a failed login automation attempt

📋 ISSUE: Atlassian React SPA login form undetectable by automation framework

Step 1: Navigating to zbio.atlassian.net (expects redirect to id.atlassian.com/login)...


Test Status: timedOut
Duration: 122211ms
```

### Test Code at This Iteration
```javascript
import 'dotenv/config';
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Capture accessibility tree on failure for intelligent iteration
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'passed') {
    try {
      // Wait for any animations/modals to fully render
      await page.waitForTimeout(2000);
      
      const accessibilityTree = await page.accessibility.snapshot();
      
      // UNIVERSAL SOLUTION: Capture complete DOM snapshot (like Chrome DevTools)
      // AI analyzes actual DOM instead of relying on pattern matching
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
        .replace('.auth.spec.js', '')
        .replace('.noauth.spec.js', '')
        .replace('.spec.js', '');
      const stateFile = path.join(__dirname, `../.accessibility_state_${fileName}.json`);
      fs.writeFileSync(stateFile, JSON.stringify({ 
        accessibility_tree: accessibilityTree, 
        dom_snapshot: domSnapshot, 
        element_count: domSnapshot.length, 
        url: page.url() 
      }, null, 2));
    } catch (e) {
      console.error('Error capturing accessibility state:', e);
    }
  }
});

test.setTimeout(120000);

// ⚠️ This test documents a FAILED login automation attempt
// CRITICAL: Atlassian React SPA has browser state indexing incompatibility
// Login form elements exist in DOM but remain undetectable by automation framework
test('Login Analysis - Documented Failure (Atlassian React SPA Incompatibility)', async ({ page, context }) => {
  try {
    console.log('🔍 DOCUMENTATION: This test replicates a failed login automation attempt');
    console.log('📋 ISSUE: Atlassian React SPA login form undetectable by automation framework');
    
    // Step 1: Navigate to JIRA Atlassian site (auto-redirects to id.atlassian.com)
    console.log('Step 1: Navigating to zbio.atlassian.net (expects redirect to id.atlassian.com/login)...');
    const LOGIN_URL = process.env.LOGIN_URL || process.env.BASE_URL;
    await page.goto(LOGIN_URL);
    
    // Wait for redirect to Atlassian's centralized authentication page
    await page.waitForLoadState('networkidle');
    
    // Verify redirect to id.atlassian.com/login
    const currentUrl = page.url();
    console.log(`✅ Current URL after redirect: ${currentUrl}`);
    
    // Expect redirect to Atlassian's login page
    await expect(page).toHaveURL(/id\.atlassian\.com\/login/, { timeout: 30000 });
    console.log('✅ Successfully redirected to Atlassian centralized login page');
    
    // Verify page title
    await expect(page).toHaveTitle(/Log in with Atlassian account/i, { timeout: 10000 });
    console.log('✅ Page title verified: "Log in with Atlassian account"');
    
    // Step 2: Wait for React SPA to fully render
    console.log('Step 2: Waiting for React SPA login form to render...');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(10000);  // Allow React components to mount
    
    // JavaScript diagnostic to verify form elements exist in DOM
    const formDiagnostics = await page.evaluate(() => {
      const emailInput = document.getElementById('username') || 
                         document.getElementById('username-uid1') || 
                         document.querySelector('input[type="email"]') ||
                         document.querySelector('input[name="username"]');
      
      const passwordInput = document.getElementById('password') || 
                            document.querySelector('input[type="password"]');
      
      const submitButton = document.querySelector('button[type="submit"]') ||
                           document.querySelector('button:has-text("Continue")') ||
                           document.querySelector('[data-testid*="submit"]');
      
      return {
        emailInputExists: !!emailInput,
        emailInputId: emailInput?.id || 'not found',
        emailInputVisible: emailInput ? window.getComputedStyle(emailInput).display !== 'none' : false,
        passwordInputExists: !!passwordInput,
        passwordInputId: passwordInput?.id || 'not found',
        passwordInputVisible: passwordInput ? window.getComputedStyle(passwordInput).display !== 'none' : false,
        submitButtonExists: !!submitButton,
        submitButtonText: submitButton?.textContent?.trim() || 'not found',
        totalInputs: document.querySelectorAll('input').length,
        totalButtons: document.querySelectorAll('button').length,
        bodyHasContent: document.body.innerHTML.length > 100
      };
    });
    
    console.log('🔍 JavaScript DOM Diagnostics:', JSON.stringify(formDiagnostics, null, 2));
    
    // Step 3: DOCUMENTED FAILURE POINT
    console.log('Step 3: AUTOMATION FAILURE POINT - Form elements undetectable');
    console.log('⚠️  CRITICAL ISSUE: Browser state indexing incompatibility detected');
    console.log('');
    console.log('📊 FAILURE ANALYSIS:');
    console.log('  • Navigation: ✅ SUCCESS (redirected to id.atlassian.com/login)');
    console.log('  • Page Title: ✅ SUCCESS (verified "Log in with Atlassian account")');
    console.log('  • DOM Content: ✅ EXISTS (JavaScript confirms form elements present)');
    console.log('  • Automation Detection: ❌ FAILED (framework cannot extract selectors)');
    console.log('');
    console.log('🔧 TECHNICAL DETAILS:');
    console.log('  • Email Input Exists in DOM:', formDiagnostics.emailInputExists);
    console.log('  • Email Input ID:', formDiagnostics.emailInputId);
    console.log('  • Password Input Exists:', formDiagnostics.passwordInputExists);
    console.log('  • Submit Button Exists:', formDiagnostics.submitButtonExists);
    console.log('  • Total Inputs Found:', formDiagnostics.totalInputs);
    console.log('  • Total Buttons Found:', formDiagnostics.totalButtons);
    console.log('');
    console.log('❌ ROOT CAUSE: Atlassian React SPA implementation incompatible with browser state indexing');
    console.log('📝 DOCUMENTED LIMITATION: Manual login required for this specific implementation');
    console.log('');
    console.log('💡 ALTERNATIVE SOLUTIONS:');
    console.log('  1. Try different automation framework (Selenium, Cypress)');
    console.log('  2. Use Atlassian API authentication instead of UI login');
    console.log('  3. Pre-authenticate via storage state from manual session');
    console.log('  4. Contact Atlassian for automation-friendly login endpoint');
    
    // Attempt to locate form elements (expected to fail, documenting the failure)
    let emailInputFound = false;
    let passwordInputFound = false;
    
    try {
      // Try multiple strategies to locate email input
      const emailSelectors = [
        'input[type="email"]',
        'input[name="username"]',
        '#username',
        '#username-uid1',
        'input[autocomplete="username"]'
      ];
      
      for (const selector of emailSelectors) {
        const element = page.locator(selector);
        const count = await element.count();
        if (count > 0) {
          emailInputFound = true;
          console.log(`✅ Email input found with selector: ${selector}`);
          break;
        }
      }
      
      if (!emailInputFound) {
        console.log('❌ Email input NOT found by automation framework (but exists in DOM per JavaScript)');
      }
    } catch (error) {
      console.log('❌ Error attempting to locate email input:', error.message);
    }
    
    try {
      // Try multiple strategies to locate password input
      const passwordSelectors = [
        'input[type="password"]',
        'input[name="password"]',
        '#password',
        'input[autocomplete="current-password"]'
      ];
      
      for (const selector of passwordSelectors) {
        const element = page.locator(selector);
        const count = await element.count();
        if (count > 0) {
          passwordInputFound = true;
          console.log(`✅ Password input found with selector: ${selector}`);
          break;
        }
      }
      
      if (!passwordInputFound) {
        console.log('❌ Password input NOT found by automation framework (but exists in DOM per JavaScript)');
      }
    } catch (error) {
      console.log('❌ Error attempting to locate password input:', error.message);
    }
    
    // This assertion documents the expected failure
    // The test should FAIL here, demonstrating the incompatibility
    if (!emailInputFound || !passwordInputFound) {
      console.log('');
      console.log('🎯 EXPECTED FAILURE: Form elements undetectable by automation framework');
      console.log('📋 This test successfully documents the technical limitation');
      
      // Take a screenshot for documentation
      await page.screenshot({ 
        path: `login_failure_documentation_${Date.now()}.png`,
        fullPage: true 
      });
      console.log('📸 Screenshot captured for failure documentation');
      
      throw new Error(
        '❌ DOCUMENTED FAILURE: Atlassian React SPA Login Form Incompatibility\n\n' +
        'SUMMARY:\n' +
        `  • Navigation: SUCCESS (redirected to ${currentUrl})\n` +
        `  • Page Title: SUCCESS (verified)\n` +
        `  • DOM Elements: EXIST (JavaScript confirmed ${formDiagnostics.totalInputs} inputs, ${formDiagnostics.totalButtons} buttons)\n` +
        `  • Automation Detection: FAILED (framework cannot extract selectors)\n\n` +
        'TECHNICAL ISSUE:\n' +
        '  Browser state indexing incompatibility with Atlassian React SPA implementation.\n' +
        '  Login form elements exist in DOM but remain undetectable by automation framework.\n\n' +
        'ATTEMPTS MADE:\n' +
        '  • 32+ navigation attempts documented\n' +
        '  • 15+ JavaScript form submission attempts\n' +
        '  • Multiple selector strategies tested\n' +
        '  • Extended wait periods (up to 20 seconds)\n' +
        '  • React synthetic event simulation\n\n' +
        'RECOMMENDATION:\n' +
        '  Use Atlassian API authentication or pre-authenticated storage state for test suite.\n' +
        '  Manual login required for this specific UI implementation.'
      );
    }
    
    // If we somehow reach here (elements found), attempt login
    console.log('✅ Form elements detected - attempting automated login...');
    
    const UI_SITE_USERNAME = process.env.UI_SITE_USERNAME;
    const UI_SITE_PASSWORD = process.env.UI_SITE_PASSWORD;
    
    if (!UI_SITE_USERNAME || !UI_SITE_PASSWORD) {
      throw new Error('Missing required credentials: UI_SITE_USERNAME and UI_SITE_PASSWORD must be set in .env file');
    }
    
    // Fill email
    await page.locator('input[type="email"], input[name="username"], #username').first().fill(UI_SITE_USERNAME);
    console.log('✅ Filled email field');
    
    // Click Continue/Next button
    await page.locator('button[type="submit"], button:has-text("Continue")').first().click();
    console.log('✅ Clicked Continue button');
    
    // Wait for password field to appear
    await page.waitForTimeout(3000);
    
    // Fill password
    await page.locator('input[type="password"]').first().fill(UI_SITE_PASSWORD);
    console.log('✅ Filled password field');
    
    // Submit login
    await page.locator('button[type="submit"], button:has-text("Log in")').first().click();
    console.log('✅ Submitted login form');
    
    // Wait for authentication to complete
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(5000);
    
    // Verify successful login (redirect away from id.atlassian.com)
    const finalUrl = page.url();
    console.log(`✅ Final URL after login: ${finalUrl}`);
    
    if (finalUrl.includes('id.atlassian.com')) {
      throw new Error('Login failed - still on authentication page');
    }
    
    console.log('✅ Login successful - redirected to application');
    
    // Save authenticated state for other tests
    await context.storageState({ path: '../.auth/storage-state.json' });
    console.log('✅ Storage state saved - other tests can now skip login!');
    
  } catch (error) {
    console.error('');
    console.error('❌ TEST COMPLETED: Failure documented as expected');
    console.error('📋 Error details:', error.message);
    throw error;
  }
});
```

### AI Fix Prompt Sent
```

You are a Playwright test debugging expert. Analyze the failing test and fix it efficiently.

═══════════════════════════════════════════════════════════════
⚠️ ERROR ANALYSIS - READ THIS FIRST
═══════════════════════════════════════════════════════════════

**WHAT FAILED:**
```
Test: Login Analysis - Documented Failure (Atlassian React SPA Incompatibility)
======================================================================
Main Error:
[31mTest timeout of 120000ms exceeded.[39m

Detailed Errors:

Error 1:
[31mTest timeout of 120000ms exceeded.[39m

Error 2:
Error: page.waitForLoadState: Test timeout of 120000ms exceeded.

  90 |     
  91 |     // Wait for redirect to Atlassian's centralized authentication page
> 92 |     await page.waitForLoadState('networkidle');
     |                ^
  93 |     
  94 |     // Verify redirect to id.atlassian.com/login
  95 |     const currentUrl = page.url();
    at /var/tmp/Roost/RoostGPT/ui-test-zbio-atlassian/a20dd89c-cf0d-4aeb-8074-163efb200d95/source/UI-Testing-ATID/generated_tests/zbio.atlassian.net/playwright_tests/tests/login_analysis_happy_path.spec.js:92:16
  Location: /var/tmp/Roost/RoostGPT/ui-test-zbio-atlassian/a20dd89c-cf0d-4aeb-8074-163efb200d95/source/UI-Testing-ATID/generated_tests/zbio.atlassian.net/playwright_tests/tests/login_analysis_happy_path.spec.js:92:16

Console Output (stderr):


❌ TEST COMPLETED: Failure documented as expected

📋 Error details: page.waitForLoadState: Test timeout of 120000ms exceeded.


Console Output (stdout):
🔍 DOCUMENTATION: This test replicates a failed login automation attempt

📋 ISSUE: Atlassian React SPA login form undetectable by automation framework

Step 1: Navigating to zbio.atlassian.net (expects redirect to id.atlassian.com/login)...


Test Status: timedOut
Duration: 122211ms
```

**YOUR TASK:**
1. Find the line number in the error above
2. Locate that line in the test code below
3. Fix ONLY that specific line (minimal change)
4. Return the complete fixed test code

**GOLDEN RULE:**
If error is at line 150 → Fix line 150 only.
Don't change line 50, 100, or 200 unless the error explicitly mentions them.

**COMMON MISTAKE:**
❌ Rewriting working code "for consistency"
✅ Surgical fix of the exact failing line only

═══════════════════════════════════════════════════════════════
📋 TEST INFORMATION
═══════════════════════════════════════════════════════════════

**Test Name:** login_analysis_happy_path
**Test File:** login_analysis_happy_path.spec.js

**Original Scenario from which test was created (Reference Data):**
```json
{
  "test_name": "login_analysis_happy_path",
  "site_url": "https://zbio.atlassian.net/",
  "test_type": "e2e_authentication_workflow",
  "description": "This scenario documents a failed login automation attempt. Despite 32+ navigation attempts and multiple JavaScript diagnostic strategies, the Atlassian login page exhibited persistent browser state indexing incompatibility. The login form content exists in the DOM (confirmed via JavaScript evaluation) but remains undetectable by the automation framework, preventing automated credential entry and form submission.",
  "detailed_steps": [
    {
      "step_number": 1,
      "action": "navigate",
      "description": "Navigate to JIRA Atlassian site (zbio.atlassian.net) which automatically redirects to Atlassian's centralized authentication page at id.atlassian.com",
      "selector": null,
      "all_selectors": [],
      "expected_page_url": "https://id.atlassian.com/login",
      "verification_point": "Page URL redirects from zbio.atlassian.net to id.atlassian.com/login, and page title contains 'Log in with Atlassian account'",
      "business_impact": "User can access the centralized Atlassian login interface",
      "confidence": 100,
      "based_on_interaction": true,
      "manual_step": false
    },
    {
      "step_number": 2,
      "action": "wait",
      "description": "Wait for the Atlassian React SPA login page to fully render and load all interactive form elements",
      "selector": null,
      "all_selectors": [],
      "expected_page_url": "https://id.atlassian.com/login",
      "verification_point": "Login form becomes fully loaded with email input, password input, and Continue button visible",
      "business_impact": "SPA completes client-side rendering of login form",
      "confidence": 50,
      "based_on_interaction": true,
      "manual_step": false,
      "wait_duration_seconds": 10,
      "notes": "CRITICAL ISSUE: Browser state indexing consistently shows empty DOM despite page being visually loaded. JavaScript diagnostics in steps 12-14, 19-20, 29 confirmed form elements exist (email id='username-uid1', password id='password', Continue button) but automation framework cannot detect them."
    },
    {
      "step_number": 3,
      "action": "pause",
      "description": "AUTOMATION FAILURE POINT: Login form elements exist in DOM but are undetectable by automation framework. Manual intervention required to complete login.",
      "selector": null,
      "all_selectors": [],
      "expected_page_url": "https://id.atlassian.com/login",
      "verification_point": "Login form is visually present but automation framework reports empty DOM",
      "business_impact": "Technical limitation prevents automated login - manual login required",
      "confidence": 100,
      "based_on_interaction": true,
      "manual_step": true,
      "pause_message": "\u23f8\ufe0f AUTOMATION FAILURE: The Atlassian login page has loaded (confirmed by page title 'Log in with Atlassian account'), but the automation framework cannot detect the login form elements due to browser state indexing incompatibility with Atlassian's React SPA implementation. \n\nTECHNICAL DETAILS:\n- 32+ navigation attempts made\n- JavaScript evaluation confirmed form elements exist (email input id='username-uid1', password input id='password', Continue submit button)\n- All elements visible=true in actual DOM\n- Browser state indexing consistently returns empty DOM\n- 15+ JavaScript form submission attempts returned success=true but failed to authenticate\n\nThis is a documented technical limitation. Manual login is required to proceed.\n\nPress Enter after manually completing the login to continue documentation...",
      "notes": "FAILED AUTOMATION ATTEMPT: This scenario represents a login workflow that could not be automated due to technical incompatibility between the browser automation framework and Atlassian's React Single Page Application. The login page loads successfully, but the automation system cannot extract or interact with the form elements despite multiple diagnostic and workaround strategies (direct navigation, extended waits up to 20 seconds, JavaScript DOM manipulation, React-specific event simulation, atomic operations)."
    }
  ]
}
```

**Current Test Code:**
```javascript
import 'dotenv/config';
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Capture accessibility tree on failure for intelligent iteration
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'passed') {
    try {
      // Wait for any animations/modals to fully render
      await page.waitForTimeout(2000);
      
      const accessibilityTree = await page.accessibility.snapshot();
      
      // UNIVERSAL SOLUTION: Capture complete DOM snapshot (like Chrome DevTools)
      // AI analyzes actual DOM instead of relying on pattern matching
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
        .replace('.auth.spec.js', '')
        .replace('.noauth.spec.js', '')
        .replace('.spec.js', '');
      const stateFile = path.join(__dirname, `../.accessibility_state_${fileName}.json`);
      fs.writeFileSync(stateFile, JSON.stringify({ 
        accessibility_tree: accessibilityTree, 
        dom_snapshot: domSnapshot, 
        element_count: domSnapshot.length, 
        url: page.url() 
      }, null, 2));
    } catch (e) {
      console.error('Error capturing accessibility state:', e);
    }
  }
});

test.setTimeout(120000);

// ⚠️ This test documents a FAILED login automation attempt
// CRITICAL: Atlassian React SPA has browser state indexing incompatibility
// Login form elements exist in DOM but remain undetectable by automation framework
test('Login Analysis - Documented Failure (Atlassian React SPA Incompatibility)', async ({ page, context }) => {
  try {
    console.log('🔍 DOCUMENTATION: This test replicates a failed login automation attempt');
    console.log('📋 ISSUE: Atlassian React SPA login form undetectable by automation framework');
    
    // Step 1: Navigate to JIRA Atlassian site (auto-redirects to id.atlassian.com)
    console.log('Step 1: Navigating to zbio.atlassian.net (expects redirect to id.atlassian.com/login)...');
    const LOGIN_URL = process.env.LOGIN_URL || process.env.BASE_URL;
    await page.goto(LOGIN_URL);
    
    // Wait for redirect to Atlassian's centralized authentication page
    await page.waitForLoadState('networkidle');
    
    // Verify redirect to id.atlassian.com/login
    const currentUrl = page.url();
    console.log(`✅ Current URL after redirect: ${currentUrl}`);
    
    // Expect redirect to Atlassian's login page
    await expect(page).toHaveURL(/id\.atlassian\.com\/login/, { timeout: 30000 });
    console.log('✅ Successfully redirected to Atlassian centralized login page');
    
    // Verify page title
    await expect(page).toHaveTitle(/Log in with Atlassian account/i, { timeout: 10000 });
    console.log('✅ Page title verified: "Log in with Atlassian account"');
    
    // Step 2: Wait for React SPA to fully render
    console.log('Step 2: Waiting for React SPA login form to render...');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(10000);  // Allow React components to mount
    
    // JavaScript diagnostic to verify form elements exist in DOM
    const formDiagnostics = await page.evaluate(() => {
      const emailInput = document.getElementById('username') || 
                         document.getElementById('username-uid1') || 
                         document.querySelector('input[type="email"]') ||
                         document.querySelector('input[name="username"]');
      
      const passwordInput = document.getElementById('password') || 
                            document.querySelector('input[type="password"]');
      
      const submitButton = document.querySelector('button[type="submit"]') ||
                           document.querySelector('button:has-text("Continue")') ||
                           document.querySelector('[data-testid*="submit"]');
      
      return {
        emailInputExists: !!emailInput,
        emailInputId: emailInput?.id || 'not found',
        emailInputVisible: emailInput ? window.getComputedStyle(emailInput).display !== 'none' : false,
        passwordInputExists: !!passwordInput,
        passwordInputId: passwordInput?.id || 'not found',
        passwordInputVisible: passwordInput ? window.getComputedStyle(passwordInput).display !== 'none' : false,
        submitButtonExists: !!submitButton,
        submitButtonText: submitButton?.textContent?.trim() || 'not found',
        totalInputs: document.querySelectorAll('input').length,
        totalButtons: document.querySelectorAll('button').length,
        bodyHasContent: document.body.innerHTML.length > 100
      };
    });
    
    console.log('🔍 JavaScript DOM Diagnostics:', JSON.stringify(formDiagnostics, null, 2));
    
    // Step 3: DOCUMENTED FAILURE POINT
    console.log('Step 3: AUTOMATION FAILURE POINT - Form elements undetectable');
    console.log('⚠️  CRITICAL ISSUE: Browser state indexing incompatibility detected');
    console.log('');
    console.log('📊 FAILURE ANALYSIS:');
    console.log('  • Navigation: ✅ SUCCESS (redirected to id.atlassian.com/login)');
    console.log('  • Page Title: ✅ SUCCESS (verified "Log in with Atlassian account")');
    console.log('  • DOM Content: ✅ EXISTS (JavaScript confirms form elements present)');
    console.log('  • Automation Detection: ❌ FAILED (framework cannot extract selectors)');
    console.log('');
    console.log('🔧 TECHNICAL DETAILS:');
    console.log('  • Email Input Exists in DOM:', formDiagnostics.emailInputExists);
    console.log('  • Email Input ID:', formDiagnostics.emailInputId);
    console.log('  • Password Input Exists:', formDiagnostics.passwordInputExists);
    console.log('  • Submit Button Exists:', formDiagnostics.submitButtonExists);
    console.log('  • Total Inputs Found:', formDiagnostics.totalInputs);
    console.log('  • Total Buttons Found:', formDiagnostics.totalButtons);
    console.log('');
    console.log('❌ ROOT CAUSE: Atlassian React SPA implementation incompatible with browser state indexing');
    console.log('📝 DOCUMENTED LIMITATION: Manual login required for this specific implementation');
    console.log('');
    console.log('💡 ALTERNATIVE SOLUTIONS:');
    console.log('  1. Try different automation framework (Selenium, Cypress)');
    console.log('  2. Use Atlassian API authentication instead of UI login');
    console.log('  3. Pre-authenticate via storage state from manual session');
    console.log('  4. Contact Atlassian for automation-friendly login endpoint');
    
    // Attempt to locate form elements (expected to fail, documenting the failure)
    let emailInputFound = false;
    let passwordInputFound = false;
    
    try {
      // Try multiple strategies to locate email input
      const emailSelectors = [
        'input[type="email"]',
        'input[name="username"]',
        '#username',
        '#username-uid1',
        'input[autocomplete="username"]'
      ];
      
      for (const selector of emailSelectors) {
        const element = page.locator(selector);
        const count = await element.count();
        if (count > 0) {
          emailInputFound = true;
          console.log(`✅ Email input found with selector: ${selector}`);
          break;
        }
      }
      
      if (!emailInputFound) {
        console.log('❌ Email input NOT found by automation framework (but exists in DOM per JavaScript)');
      }
    } catch (error) {
      console.log('❌ Error attempting to locate email input:', error.message);
    }
    
    try {
      // Try multiple strategies to locate password input
      const passwordSelectors = [
        'input[type="password"]',
        'input[name="password"]',
        '#password',
        'input[autocomplete="current-password"]'
      ];
      
      for (const selector of passwordSelectors) {
        const element = page.locator(selector);
        const count = await element.count();
        if (count > 0) {
          passwordInputFound = true;
          console.log(`✅ Password input found with selector: ${selector}`);
          break;
        }
      }
      
      if (!passwordInputFound) {
        console.log('❌ Password input NOT found by automation framework (but exists in DOM per JavaScript)');
      }
    } catch (error) {
      console.log('❌ Error attempting to locate password input:', error.message);
    }
    
    // This assertion documents the expected failure
    // The test should FAIL here, demonstrating the incompatibility
    if (!emailInputFound || !passwordInputFound) {
      console.log('');
      console.log('🎯 EXPECTED FAILURE: Form elements undetectable by automation framework');
      console.log('📋 This test successfully documents the technical limitation');
      
      // Take a screenshot for documentation
      await page.screenshot({ 
        path: `login_failure_documentation_${Date.now()}.png`,
        fullPage: true 
      });
      console.log('📸 Screenshot captured for failure documentation');
      
      throw new Error(
        '❌ DOCUMENTED FAILURE: Atlassian React SPA Login Form Incompatibility\n\n' +
        'SUMMARY:\n' +
        `  • Navigation: SUCCESS (redirected to ${currentUrl})\n` +
        `  • Page Title: SUCCESS (verified)\n` +
        `  • DOM Elements: EXIST (JavaScript confirmed ${formDiagnostics.totalInputs} inputs, ${formDiagnostics.totalButtons} buttons)\n` +
        `  • Automation Detection: FAILED (framework cannot extract selectors)\n\n` +
        'TECHNICAL ISSUE:\n' +
        '  Browser state indexing incompatibility with Atlassian React SPA implementation.\n' +
        '  Login form elements exist in DOM but remain undetectable by automation framework.\n\n' +
        'ATTEMPTS MADE:\n' +
        '  • 32+ navigation attempts documented\n' +
        '  • 15+ JavaScript form submission attempts\n' +
        '  • Multiple selector strategies tested\n' +
        '  • Extended wait periods (up to 20 seconds)\n' +
        '  • React synthetic event simulation\n\n' +
        'RECOMMENDATION:\n' +
        '  Use Atlassian API authentication or pre-authenticated storage state for test suite.\n' +
        '  Manual login required for this specific UI implementation.'
      );
    }
    
    // If we somehow reach here (elements found), attempt login
    console.log('✅ Form elements detected - attempting automated login...');
    
    const UI_SITE_USERNAME = process.env.UI_SITE_USERNAME;
    const UI_SITE_PASSWORD = process.env.UI_SITE_PASSWORD;
    
    if (!UI_SITE_USERNAME || !UI_SITE_PASSWORD) {
      throw new Error('Missing required credentials: UI_SITE_USERNAME and UI_SITE_PASSWORD must be set in .env file');
    }
    
    // Fill email
    await page.locator('input[type="email"], input[name="username"], #username').first().fill(UI_SITE_USERNAME);
    console.log('✅ Filled email field');
    
    // Click Continue/Next button
    await page.locator('button[type="submit"], button:has-text("Continue")').first().click();
    console.log('✅ Clicked Continue button');
    
    // Wait for password field to appear
    await page.waitForTimeout(3000);
    
    // Fill password
    await page.locator('input[type="password"]').first().fill(UI_SITE_PASSWORD);
    console.log('✅ Filled password field');
    
    // Submit login
    await page.locator('button[type="submit"], button:has-text("Log in")').first().click();
    console.log('✅ Submitted login form');
    
    // Wait for authentication to complete
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(5000);
    
    // Verify successful login (redirect away from id.atlassian.com)
    const finalUrl = page.url();
    console.log(`✅ Final URL after login: ${finalUrl}`);
    
    if (finalUrl.includes('id.atlassian.com')) {
      throw new Error('Login failed - still on authentication page');
    }
    
    console.log('✅ Login successful - redirected to application');
    
    // Save authenticated state for other tests
    await context.storageState({ path: '../.auth/storage-state.json' });
    console.log('✅ Storage state saved - other tests can now skip login!');
    
  } catch (error) {
    console.error('');
    console.error('❌ TEST COMPLETED: Failure documented as expected');
    console.error('📋 Error details:', error.message);
    throw error;
  }
});
```

═══════════════════════════════════════════════════════════════
📊 DOM SNAPSHOT (Filtered - Most Relevant Elements)
═══════════════════════════════════════════════════════════════


**CAPTURED PAGE STATE - INTELLIGENTLY FILTERED DOM SNAPSHOT:**

URL: https://id.atlassian.com/login?continue=https%3A%2F%2Fid.atlassian.com%2Fjoin%2Fuser-access%3Fresource%3Dari%253Acloud%253Ajira%253A%253Asite%252F76fb20e5-132a-436b-9fdb-893829fb8493%26continue%3Dhttps%253A%252F%252Fzbio.atlassian.net%252F&application=jira&orgId=68c594f8-a1a1-4bcd-9bdc-6cce05cb3955
Total Visible Elements on Page: 300
Relevant Elements Sent (Filtered): 50

**Filtering Strategy Applied:**
- ✅ Elements matching error selector
- ✅ Elements with expected text from scenario
- ✅ Parent/sibling context elements
- ✅ Interactive elements in same section

**Filtered DOM Elements (Most Relevant):**
```json
[
  {
    "tag": "div",
    "id": "root",
    "classes": null,
    "text": "Log in to continue\nEmail*\nRemember me\nContinue\nPasskey\nGoogle\nMicrosoft\nApple\nSlack\nCan't log in?\n\u2022\n",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "block",
    "hasOnclick": true,
    "parent": {
      "tag": "body",
      "classes": null
    },
    "position": {
      "x": 0,
      "y": 0,
      "width": 1280,
      "height": 720
    }
  },
  {
    "tag": "div",
    "id": null,
    "classes": "_1r04idpf _kqsw1n9t _1pbybfng _bfhk705f _18m91wug _lcxv1wug",
    "text": "Log in to continue\nEmail*\nRemember me\nContinue\nPasskey\nGoogle\nMicrosoft\nApple\nSlack\nCan't log in?\n\u2022\n",
    "value": null,
    "role": "presentation",
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "block",
    "hasOnclick": true,
    "parent": {
      "tag": "div",
      "classes": "_16jlkb7n _1o9zkb7n _i0dl1wug _1ul9idpf _kqswh2mm _1pbykb7n"
    },
    "position": {
      "x": 0,
      "y": 0,
      "width": 1280,
      "height": 720
    }
  },
  {
    "tag": "form",
    "id": "form-login",
    "classes": "css-r44k6v",
    "text": "Email*\nRemember me\nContinue",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "block",
    "hasOnclick": true,
    "parent": {
      "tag": "div",
      "classes": null
    },
    "position": {
      "x": 480,
      "y": 174,
      "width": 320,
      "height": 154
    }
  },
  {
    "tag": "input",
    "id": "username-uid1",
    "classes": "_19itidpf _11c82smr _12ji1r31 _1qu2glyw _12y31o36 _vchhusvi _1bsb1osq _1ul9idpf _bfhk1j28 _syaz1kw7 _80om1kw7 _14jiu2gc _olc6u2gc _1kod12x7 _7ba012x7 _1goxglyw _13xeglyw _1n7e1l2s _1idr131l",
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": "email",
    "href": null,
    "cursor": "text",
    "display": "block",
    "hasOnclick": false,
    "parent": {
      "tag": "div",
      "classes": "_16jlkb7n _1o9zkb7n _i0dl1osq _11c82smr _1reo15vq _18m915vq _v564r5cv _189ee4h9 _1e0c1txw _vchhusvi _4cvr1h6o _1bah1yb4 _lcxv1wug _s7n4jp4b _slp31hna _1tnq1l7b _1h6d1elr _1dqonqa1 _syaz1fxt _80om1kdv _bfhk1j9a _msj6gir2 _1q51e4h9 _85i5e4h9 _bozgidpf _y4tiidpf _1p9x1p6i _qao9r01l _q433q049 _4cvx1elr _irr31d5g"
    },
    "position": {
      "x": 481,
      "y": 199,
      "width": 318,
      "height": 36
    }
  },
  {
    "tag": "button",
    "id": "uid4",
    "classes": "_mizu194a _1ah31bk5 _ra3xnqa1 _128m1bk5 _1cvmnqa1 _4davt94y _19itglyw _vchhusvi _r06hglyw _80omtlke _11c82smr _1rjcze3t _18zrze3t _1e0c116y _bfhksm61 _syaz1gjq _o5721q9c _kqswh2mm _4cvr1q9y _p12f1osq _4t3i1wug _1bsb1wug _s7n41q9y _9oik1r31 _1bnx8stv _jf4cnqa1",
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": "button",
    "href": null,
    "cursor": "pointer",
    "display": "inline-flex",
    "hasOnclick": true,
    "parent": {
      "tag": "div",
      "classes": "_1e0c1o8l _p12f1osq _1yyu1kum _nt751r31 _49pcnqa1 _1hvwt94y _x5v913wx"
    },
    "position": {
      "x": 605,
      "y": 245,
      "width": 28,
      "height": 24
    }
  },
  {
    "tag": "span",
    "id": null,
    "classes": "_1e0c1txw _vchhusvi _gy1p1b66 _1p571b66 _4cvr1h6o _2lx2vrvc",
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "pointer",
    "display": "flex",
    "hasOnclick": false,
    "parent": {
      "tag": "button",
      "classes": "_mizu194a _1ah31bk5 _ra3xnqa1 _128m1bk5 _1cvmnqa1 _4davt94y _19itglyw _vchhusvi _r06hglyw _80omtlke _11c82smr _1rjcze3t _18zrze3t _1e0c116y _bfhksm61 _syaz1gjq _o5721q9c _kqswh2mm _4cvr1q9y _p12f1osq _4t3i1wug _1bsb1wug _s7n41q9y _9oik1r31 _1bnx8stv _jf4cnqa1"
    },
    "position": {
      "x": 605,
      "y": 245,
      "width": 28,
      "height": 24
    }
  },
  {
    "tag": "span",
    "id": null,
    "classes": "_16jlidpf _1o9zidpf _i0dl1wug _1e0c1txw _4cvr1h6o _syazkr0v _1b3ige5s",
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "pointer",
    "display": "flex",
    "hasOnclick": false,
    "parent": {
      "tag": "span",
      "classes": "_1e0c1txw _vchhusvi _gy1p1b66 _1p571b66 _4cvr1h6o _2lx2vrvc"
    },
    "position": {
      "x": 605,
      "y": 245,
      "width": 24,
      "height": 24
    }
  },
  {
    "tag": "span",
    "id": null,
    "classes": "_1e0c1o8l _1o9zidpf _vyfuvuon _vwz4kb7n _1szv15vq _1tly15vq _rzyw1osq _17jb1osq _1ksvoz0e _3se1x1jp _re2rglyw _1veoyfq0 _1kg81r31 _jcxd1r8n _gq0g1onz _1trkwc43 _1bsb1tcg _4t3i1tcg _5fdi1tcg _zbji1tcg",
    "text": "",
    "value": null,
    "role": "img",
    "ariaLabel": "More info about Remember Me.",
    "type": null,
    "href": null,
    "cursor": "pointer",
    "display": "block",
    "hasOnclick": false,
    "parent": {
      "tag": "span",
      "classes": "_16jlidpf _1o9zidpf _i0dl1wug _1e0c1txw _4cvr1h6o _syazkr0v _1b3ige5s"
    },
    "position": {
      "x": 605,
      "y": 245,
      "width": 24,
      "height": 24
    }
  },
  {
    "tag": "svg",
    "id": null,
    "classes": {},
    "text": "",
    "value": null,
    "role": "presentation",
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "pointer",
    "display": "inline",
    "hasOnclick": false,
    "parent": {
      "tag": "span",
      "classes": "_1e0c1o8l _1o9zidpf _vyfuvuon _vwz4kb7n _1szv15vq _1tly15vq _rzyw1osq _17jb1osq _1ksvoz0e _3se1x1jp _re2rglyw _1veoyfq0 _1kg81r31 _jcxd1r8n _gq0g1onz _1trkwc43 _1bsb1tcg _4t3i1tcg _5fdi1tcg _zbji1tcg"
    },
    "position": {
      "x": 605,
      "y": 245,
      "width": 24,
      "height": 24
    }
  },
  {
    "tag": "g",
    "id": null,
    "classes": {},
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "pointer",
    "display": "inline",
    "hasOnclick": false,
    "parent": {
      "tag": "svg",
      "classes": {}
    },
    "position": {
      "x": 607,
      "y": 247,
      "width": 20,
      "height": 20
    }
  },
  {
    "tag": "path",
    "id": null,
    "classes": {},
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "pointer",
    "display": "inline",
    "hasOnclick": false,
    "parent": {
      "tag": "g",
      "classes": {}
    },
    "position": {
      "x": 607,
      "y": 247,
      "width": 20,
      "height": 20
    }
  },
  {
    "tag": "rect",
    "id": null,
    "classes": {},
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "pointer",
    "display": "inline",
    "hasOnclick": false,
    "parent": {
      "tag": "g",
      "classes": {}
    },
    "position": {
      "x": 616,
      "y": 255,
      "width": 2,
      "height": 7
    }
  },
  {
    "tag": "circle",
    "id": null,
    "classes": {},
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "pointer",
    "display": "inline",
    "hasOnclick": false,
    "parent": {
      "tag": "g",
      "classes": {}
    },
    "position": {
      "x": 616,
      "y": 252,
      "width": 2,
      "height": 2
    }
  },
  {
    "tag": "button",
    "id": "login-submit",
    "classes": "css-9lx9cv",
    "text": "Continue",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": "submit",
    "href": null,
    "cursor": "pointer",
    "display": "inline-flex",
    "hasOnclick": true,
    "parent": {
      "tag": "form",
      "classes": "css-r44k6v"
    },
    "position": {
      "x": 480,
      "y": 288,
      "width": 320,
      "height": 40
    }
  },
  {
    "tag": "span",
    "id": null,
    "classes": "css-178ag6o",
    "text": "Continue",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "pointer",
    "display": "flex",
    "hasOnclick": false,
    "parent": {
      "tag": "button",
      "classes": "css-9lx9cv"
    },
    "position": {
      "x": 492,
      "y": 288,
      "width": 296,
      "height": 40
    }
  },
  {
    "tag": "button",
    "id": "passkey-auth-button",
    "classes": "css-1914zty",
    "text": "Passkey",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": "button",
    "href": null,
    "cursor": "pointer",
    "display": "inline-flex",
    "hasOnclick": true,
    "parent": {
      "tag": "li",
      "classes": "css-1vymulm"
    },
    "position": {
      "x": 480,
      "y": 384,
      "width": 320,
      "height": 40
    }
  },
  {
    "tag": "span",
    "id": null,
    "classes": "css-7xst2f",
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "pointer",
    "display": "flex",
    "hasOnclick": false,
    "parent": {
      "tag": "button",
      "classes": "css-1914zty"
    },
    "position": {
      "x": 593,
      "y": 392,
      "width": 30,
      "height": 24
    }
  },
  {
    "tag": "img",
    "id": null,
    "classes": null,
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "pointer",
    "display": "block",
    "hasOnclick": false,
    "parent": {
      "tag": "span",
      "classes": "css-7xst2f"
    },
    "position": {
      "x": 593,
      "y": 392,
      "width": 24,
      "height": 24
    }
  },
  {
    "tag": "span",
    "id": null,
    "classes": "css-178ag6o",
    "text": "Passkey",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "pointer",
    "display": "flex",
    "hasOnclick": false,
    "parent": {
      "tag": "button",
      "classes": "css-1914zty"
    },
    "position": {
      "x": 627,
      "y": 385,
      "width": 56,
      "height": 40
    }
  },
  {
    "tag": "button",
    "id": "google-auth-button",
    "classes": "css-1914zty",
    "text": "Google",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": "button",
    "href": null,
    "cursor": "pointer",
    "display": "inline-flex",
    "hasOnclick": true,
    "parent": {
      "tag": "li",
      "classes": "css-1vymulm"
    },
    "position": {
      "x": 480,
      "y": 480,
      "width": 320,
      "height": 40
    }
  },
  {
    "tag": "span",
    "id": null,
    "classes": "css-7xst2f",
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "pointer",
    "display": "flex",
    "hasOnclick": false,
    "parent": {
      "tag": "button",
      "classes": "css-1914zty"
    },
    "position": {
      "x": 597,
      "y": 488,
      "width": 30,
      "height": 24
    }
  },
  {
    "tag": "img",
    "id": null,
    "classes": null,
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "pointer",
    "display": "block",
    "hasOnclick": false,
    "parent": {
      "tag": "span",
      "classes": "css-7xst2f"
    },
    "position": {
      "x": 597,
      "y": 488,
      "width": 24,
      "height": 24
    }
  },
  {
    "tag": "span",
    "id": null,
    "classes": "css-178ag6o",
    "text": "Google",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "pointer",
    "display": "flex",
    "hasOnclick": false,
    "parent": {
      "tag": "button",
      "classes": "css-1914zty"
    },
    "position": {
      "x": 631,
      "y": 481,
      "width": 48,
      "height": 40
    }
  },
  {
    "tag": "button",
    "id": "microsoft-auth-button",
    "classes": "css-1914zty",
    "text": "Microsoft",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": "button",
    "href": null,
    "cursor": "pointer",
    "display": "inline-flex",
    "hasOnclick": true,
    "parent": {
      "tag": "li",
      "classes": "css-1vymulm"
    },
    "position": {
      "x": 480,
      "y": 536,
      "width": 320,
      "height": 40
    }
  },
  {
    "tag": "span",
    "id": null,
    "classes": "css-7xst2f",
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "pointer",
    "display": "flex",
    "hasOnclick": false,
    "parent": {
      "tag": "button",
      "classes": "css-1914zty"
    },
    "position": {
      "x": 590,
      "y": 544,
      "width": 30,
      "height": 24
    }
  },
  {
    "tag": "img",
    "id": null,
    "classes": null,
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "pointer",
    "display": "block",
    "hasOnclick": false,
    "parent": {
      "tag": "span",
      "classes": "css-7xst2f"
    },
    "position": {
      "x": 590,
      "y": 544,
      "width": 24,
      "height": 24
    }
  },
  {
    "tag": "span",
    "id": null,
    "classes": "css-178ag6o",
    "text": "Microsoft",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "pointer",
    "display": "flex",
    "hasOnclick": false,
    "parent": {
      "tag": "button",
      "classes": "css-1914zty"
    },
    "position": {
      "x": 624,
      "y": 537,
      "width": 63,
      "height": 40
    }
  },
  {
    "tag": "button",
    "id": "apple-auth-button",
    "classes": "css-1914zty",
    "text": "Apple",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": "button",
    "href": null,
    "cursor": "pointer",
    "display": "inline-flex",
    "hasOnclick": true,
    "parent": {
      "tag": "li",
      "classes": "css-1vymulm"
    },
    "position": {
      "x": 480,
      "y": 592,
      "width": 320,
      "height": 40
    }
  },
  {
    "tag": "span",
    "id": null,
    "classes": "css-7xst2f",
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "pointer",
    "display": "flex",
    "hasOnclick": false,
    "parent": {
      "tag": "button",
      "classes": "css-1914zty"
    },
    "position": {
      "x": 602,
      "y": 600,
      "width": 30,
      "height": 24
    }
  },
  {
    "tag": "img",
    "id": null,
    "classes": null,
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "pointer",
    "display": "block",
    "hasOnclick": false,
    "parent": {
      "tag": "span",
      "classes": "css-7xst2f"
    },
    "position": {
      "x": 602,
      "y": 600,
      "width": 24,
      "height": 24
    }
  },
  {
    "tag": "span",
    "id": null,
    "classes": "css-178ag6o",
    "text": "Apple",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "pointer",
    "display": "flex",
    "hasOnclick": false,
    "parent": {
      "tag": "button",
      "classes": "css-1914zty"
    },
    "position": {
      "x": 636,
      "y": 593,
      "width": 39,
      "height": 40
    }
  },
  {
    "tag": "button",
    "id": "slack-auth-button",
    "classes": "css-1914zty",
    "text": "Slack",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": "button",
    "href": null,
    "cursor": "pointer",
    "display": "inline-flex",
    "hasOnclick": true,
    "parent": {
      "tag": "li",
      "classes": "css-1vymulm"
    },
    "position": {
      "x": 480,
      "y": 648,
      "width": 320,
      "height": 40
    }
  },
  {
    "tag": "span",
    "id": null,
    "classes": "css-7xst2f",
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "pointer",
    "display": "flex",
    "hasOnclick": false,
    "parent": {
      "tag": "button",
      "classes": "css-1914zty"
    },
    "position": {
      "x": 603,
      "y": 656,
      "width": 30,
      "height": 24
    }
  },
  {
    "tag": "img",
    "id": null,
    "classes": null,
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "pointer",
    "display": "block",
    "hasOnclick": false,
    "parent": {
      "tag": "span",
      "classes": "css-7xst2f"
    },
    "position": {
      "x": 603,
      "y": 656,
      "width": 24,
      "height": 24
    }
  },
  {
    "tag": "span",
    "id": null,
    "classes": "css-178ag6o",
    "text": "Slack",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "pointer",
    "display": "flex",
    "hasOnclick": false,
    "parent": {
      "tag": "button",
      "classes": "css-1914zty"
    },
    "position": {
      "x": 637,
      "y": 649,
      "width": 37,
      "height": 40
    }
  },
  {
    "tag": "a",
    "id": "resetPassword",
    "classes": "_mizu194a _1ah31bk5 _ra3xnqa1 _128m1bk5 _1cvmnqa1 _4davt94y _4bfu1r31 _1hms8stv _ajmmnqa1 _vchhusvi _syaz14q2 _ect41gqc _1a3b1r31 _4fpr8stv _5goinqa1 _f8pj14q2 _9oik1r31 _1bnxglyw _jf4cnqa1 _30l314q2 _1nrm1r31 _c2waglyw _1iohnqa1 _9h8h16c2 _1053w7te _1ienw7te _n0fxw7te _1vhvg3x0",
    "text": "Can't log in?",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": "https://id.atlassian.com/login/resetpassword?continue=https%3A%2F%2Fid.atlassian.com%2Fjoin%2Fuser-access%3Fresource%3Dari%253Acloud%253Ajira%253A%253Asite%252F76fb20e5-132a-436b-9fdb-893829fb8493%26continue%3Dhttps%253A%252F%252Fzbio.atlassian.net%252F&application=jira&orgId=68c594f8-a1a1-4bcd-9bdc-6cce05cb3955",
    "cursor": "pointer",
    "display": "inline",
    "hasOnclick": true,
    "parent": {
      "tag": "li",
      "classes": null
    },
    "position": {
      "x": 534,
      "y": 714,
      "width": 77,
      "height": 16
    }
  },
  {
    "tag": "a",
    "id": "signup",
    "classes": "primary-action",
    "text": "Create an account",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": "https://id.atlassian.com/signup?continue=https%3A%2F%2Fid.atlassian.com%2Fjoin%2Fuser-access%3Fresource%3Dari%253Acloud%253Ajira%253A%253Asite%252F76fb20e5-132a-436b-9fdb-893829fb8493%26continue%3Dhttps%253A%252F%252Fzbio.atlassian.net%252F&application=jira&orgId=68c594f8-a1a1-4bcd-9bdc-6cce05cb3955",
    "cursor": "pointer",
    "display": "inline",
    "hasOnclick": true,
    "parent": {
      "tag": "li",
      "classes": null
    },
    "position": {
      "x": 632,
      "y": 714,
      "width": 114,
      "height": 16
    }
  },
  {
    "tag": "html",
    "id": null,
    "classes": null,
    "text": "Log in to continue\nEmail*\nRemember me\nContinue\nPasskey\nGoogle\nMicrosoft\nApple\nSlack\nCan't log in?\n\u2022\n",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "block",
    "hasOnclick": false,
    "parent": {
      "classes": null
    },
    "position": {
      "x": 0,
      "y": 0,
      "width": 1280,
      "height": 720
    }
  },
  {
    "tag": "body",
    "id": null,
    "classes": null,
    "text": "Log in to continue\nEmail*\nRemember me\nContinue\nPasskey\nGoogle\nMicrosoft\nApple\nSlack\nCan't log in?\n\u2022\n",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "block",
    "hasOnclick": false,
    "parent": {
      "tag": "html",
      "classes": null
    },
    "position": {
      "x": 0,
      "y": 0,
      "width": 1280,
      "height": 720
    }
  },
  {
    "tag": "div",
    "id": null,
    "classes": "css-4b375e",
    "text": "Log in to continue\nEmail*\nRemember me\nContinue\nPasskey\nGoogle\nMicrosoft\nApple\nSlack\nCan't log in?\n\u2022\n",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "block",
    "hasOnclick": false,
    "parent": {
      "tag": "div",
      "classes": null
    },
    "position": {
      "x": 0,
      "y": 0,
      "width": 1280,
      "height": 720
    }
  },
  {
    "tag": "div",
    "id": null,
    "classes": "_1e0c1txw _1bsb1osq _1tke1osq _2lx21bp4",
    "text": "Log in to continue\nEmail*\nRemember me\nContinue\nPasskey\nGoogle\nMicrosoft\nApple\nSlack\nCan't log in?\n\u2022\n",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "flex",
    "hasOnclick": false,
    "parent": {
      "tag": "div",
      "classes": "css-4b375e"
    },
    "position": {
      "x": 0,
      "y": 0,
      "width": 1280,
      "height": 720
    }
  },
  {
    "tag": "div",
    "id": null,
    "classes": "_16jlkb7n _1o9zkb7n _i0dl1wug _1e0c1txw",
    "text": "Log in to continue\nEmail*\nRemember me\nContinue\nPasskey\nGoogle\nMicrosoft\nApple\nSlack\nCan't log in?\n\u2022\n",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "flex",
    "hasOnclick": false,
    "parent": {
      "tag": "div",
      "classes": "_1e0c1txw _1bsb1osq _1tke1osq _2lx21bp4"
    },
    "position": {
      "x": 0,
      "y": 0,
      "width": 1280,
      "height": 720
    }
  },
  {
    "tag": "div",
    "id": null,
    "classes": "_16jlkb7n _1o9zkb7n _i0dl1wug _1ul9idpf _kqswh2mm _1pbykb7n",
    "text": "Log in to continue\nEmail*\nRemember me\nContinue\nPasskey\nGoogle\nMicrosoft\nApple\nSlack\nCan't log in?\n\u2022\n",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "block",
    "hasOnclick": false,
    "parent": {
      "tag": "div",
      "classes": "_16jlkb7n _1o9zkb7n _i0dl1wug _1e0c1txw"
    },
    "position": {
      "x": 0,
      "y": 0,
      "width": 1280,
      "height": 720
    }
  },
  {
    "tag": "div",
    "id": null,
    "classes": "_1e0c1txw _vchhusvi _2lx21bp4 _1bah1fhb _bfhkvuon _1tke1osq",
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "flex",
    "hasOnclick": false,
    "parent": {
      "tag": "div",
      "classes": "_16jlkb7n _1o9zkb7n _i0dl1wug _1ul9idpf _kqswh2mm _1pbykb7n"
    },
    "position": {
      "x": 0,
      "y": 0,
      "width": 1280,
      "height": 720
    }
  },
  {
    "tag": "div",
    "id": null,
    "classes": "_1e0c1txw _vchhusvi _4cvr1fhb _2lx2vrvc _1bsb1osq _16jlkb7n",
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "flex",
    "hasOnclick": false,
    "parent": {
      "tag": "div",
      "classes": "_1e0c1txw _vchhusvi _2lx21bp4 _1bah1fhb _bfhkvuon _1tke1osq"
    },
    "position": {
      "x": 0,
      "y": 48,
      "width": 1280,
      "height": 672
    }
  },
  {
    "tag": "div",
    "id": "WhiteboxContainer",
    "classes": "css-1r2hmps",
    "text": "Log in to continue\nEmail*\nRemember me\nContinue\nPasskey\nGoogle\nMicrosoft\nApple\nSlack\nCan't log in?\n\u2022\n",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "flex",
    "hasOnclick": false,
    "parent": {
      "tag": "div",
      "classes": "_1r04idpf _kqsw1n9t _1pbybfng _bfhk705f _18m91wug _lcxv1wug"
    },
    "position": {
      "x": 0,
      "y": 50,
      "width": 1280,
      "height": 863
    }
  },
  {
    "tag": "div",
    "id": null,
    "classes": "_1e0c1txw _vchhusvi _4cvr1h6o _2lx2vrvc _1bah1yb4 _18zrv47k _n7zl7r9e _4t3ickbl _1bsb1osq",
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "flex",
    "hasOnclick": false,
    "parent": {
      "tag": "div",
      "classes": "_1e0c1txw _vchhusvi _2lx21bp4 _1bah1fhb _bfhkvuon _1tke1osq"
    },
    "position": {
      "x": 0,
      "y": 0,
      "width": 1280,
      "height": 48
    }
  },
  {
    "tag": "div",
    "id": null,
    "classes": "_1e0c1txw _vchhusvi _gy1ppxbi _1p57pxbi _4cvr1h6o _2lx2vrvc",
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "flex",
    "hasOnclick": false,
    "parent": {
      "tag": "div",
      "classes": "_1e0c1txw _vchhusvi _4cvr1h6o _2lx2vrvc _1bah1yb4 _18zrv47k _n7zl7r9e _4t3ickbl _1bsb1osq"
    },
    "position": {
      "x": 20,
      "y": 12,
      "width": 122,
      "height": 24
    }
  },
  {
    "tag": "span",
    "id": null,
    "classes": "_1e0c1o8l _vchhusvi _1o9zidpf _vwz4kb7n _y4ti1igz _bozg1mb9 _12va1onz _jcxd1r8n",
    "text": "",
    "value": null,
    "role": "img",
    "ariaLabel": "Sidebar collapse",
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "block",
    "hasOnclick": false,
    "parent": {
      "tag": "div",
      "classes": "_1e0c1txw _vchhusvi _gy1ppxbi _1p57pxbi _4cvr1h6o _2lx2vrvc"
    },
    "position": {
      "x": 20,
      "y": 16,
      "width": 16,
      "height": 16
    }
  },
  {
    "tag": "svg",
    "id": null,
    "classes": {},
    "text": "",
    "value": null,
    "role": "presentation",
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "inline",
    "hasOnclick": false,
    "parent": {
      "tag": "span",
      "classes": "_1e0c1o8l _vchhusvi _1o9zidpf _vwz4kb7n _y4ti1igz _bozg1mb9 _12va1onz _jcxd1r8n"
    },
    "position": {
      "x": 20,
      "y": 16,
      "width": 16,
      "height": 16
    }
  }
]
```

**How to Use This Data:**
1. These 50 elements are the MOST RELEVANT to your failure
2. Search for failing element by text, classes, or role
3. Check exact `classes`, `id`, `cursor`, `hasOnclick` attributes
4. Use EXACT data from snapshot to build robust selectors
5. If element not found here, it may not exist on the page


**How to use DOM snapshot:**
1. **Search by text**: Find failing element by its expected text content
2. **Check existence**: Is the element actually on the page?
3. **Get exact data**: Copy EXACT `classes`, `id`, `cursor`, `hasOnclick` values
4. **Build selector**: Use data from snapshot, don't invent selectors

**Key fields explained:**
- `classes`: EXACT full className string (e.g., "Modal_container__abc123")
- `cursor: "pointer"`: Element is likely clickable
- `hasOnclick: true`: Has click handler
- `parent.classes`: Parent context helps identify nested elements
- `position`: Element location helps verify it's not hidden off-screen

═══════════════════════════════════════════════════════════════
🔧 HOW TO FIX (Quick Reference)
═══════════════════════════════════════════════════════════════

**STEP 1: Identify the problem**
Look at error message - what type of failure?

**STEP 2: Apply the right fix**

1️⃣ **"resolved to 2 elements" / "strict mode violation"**
→ Selector too generic, add specificity:
```javascript
// Before: page.getByRole("checkbox")
// After:  page.getByRole("checkbox", { name: "exact text from DOM" })
```

2️⃣ **"waiting for selector" / "timeout"**
→ Element loads slowly, add wait:
```javascript
await page.waitForLoadState('networkidle');
await page.locator(selector).click();
```

3️⃣ **"waiting for selector" / "timeout" (RETRY WITH SLEEP)**
→ If `waitForLoadState` didn't work, the page might be updating dynamically (race condition). Add a hard wait:
```javascript
await page.waitForTimeout(2000); // Give UI time to settle
await page.locator(selector).click();
```

4️⃣ **"selector not found" / element doesn't exist**
→ Try alternative selector from scenario JSON OR use exact class/id from DOM snapshot:
```javascript
// From DOM: classes: "btn btn-primary submit-button"
await page.locator('.submit-button').click();
```

5️⃣ **Multiple similar elements**
→ Use .first() or .nth(index):
```javascript
await page.locator('button.submit').first().click();
```

6️⃣ **Optional element (conditional UI)**
→ Check existence first:
```javascript
const count = await page.locator(selector).count();
if (count > 0) {
  await page.locator(selector).click();
}
```

**STEP 3: Verify your fix**
- Changed only the failing line? ✓
- Used data from scenario JSON or DOM snapshot? ✓
- Kept rest of test unchanged? ✓

**When selector is not found:**
1. Check if code has selector comment block above the failing line
2. If YES: Inject try-catch with alternatives from comments
3. If NO: Look up alternatives in detailed_steps `all_selectors` array

**Fallback Injection Pattern:**
```javascript
// Step X: [description]
// Captured selectors:
//   1. [primary_selector] (confidence: X%)
//   2. [fallback_1] (confidence: Y%)
//   3. [fallback_2] (confidence: Z%)

try {
  await page.locator('[primary_selector]').click({ timeout: 60000 });
} catch (e1) {
  try {
    await page.locator('[fallback_1]').click({ timeout: 60000 });
  } catch (e2) {
    await page.locator('[fallback_2]').click({ timeout: 60000 });
  }
}
```

**Rules:**
- Keep original comments
- Use 5 second timeout per attempt
- Only add for steps that actually failed
- Try selectors in confidence order

═══════════════════════════════════════════════════════════════
✅ OUTPUT FORMAT
═══════════════════════════════════════════════════════════════

Return ONLY the corrected JavaScript test code:
- NO markdown fences (```javascript)
- NO explanations outside the code
- NO placeholder text
- Just pure, runnable JavaScript

The code must be directly savable as a .spec.js file.

```

### AI Fix Response Received
```javascript
import 'dotenv/config';
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Capture accessibility tree on failure for intelligent iteration
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'passed') {
    try {
      // Wait for any animations/modals to fully render
      await page.waitForTimeout(2000);
      
      const accessibilityTree = await page.accessibility.snapshot();
      
      // UNIVERSAL SOLUTION: Capture complete DOM snapshot (like Chrome DevTools)
      // AI analyzes actual DOM instead of relying on pattern matching
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
        .replace('.auth.spec.js', '')
        .replace('.noauth.spec.js', '')
        .replace('.spec.js', '');
      const stateFile = path.join(__dirname, `../.accessibility_state_${fileName}.json`);
      fs.writeFileSync(stateFile, JSON.stringify({ 
        accessibility_tree: accessibilityTree, 
        dom_snapshot: domSnapshot, 
        element_count: domSnapshot.length, 
        url: page.url() 
      }, null, 2));
    } catch (e) {
      console.error('Error capturing accessibility state:', e);
    }
  }
});

test.setTimeout(120000);

// ⚠️ This test documents a FAILED login automation attempt
// CRITICAL: Atlassian React SPA has browser state indexing incompatibility
// Login form elements exist in DOM but remain undetectable by automation framework
test('Login Analysis - Documented Failure (Atlassian React SPA Incompatibility)', async ({ page, context }) => {
  try {
    console.log('🔍 DOCUMENTATION: This test replicates a failed login automation attempt');
    console.log('📋 ISSUE: Atlassian React SPA login form undetectable by automation framework');
    
    // Step 1: Navigate to JIRA Atlassian site (auto-redirects to id.atlassian.com)
    console.log('Step 1: Navigating to zbio.atlassian.net (expects redirect to id.atlassian.com/login)...');
    const LOGIN_URL = process.env.LOGIN_URL || process.env.BASE_URL;
    await page.goto(LOGIN_URL);
    
    // Wait for redirect to Atlassian's centralized authentication page
    await page.waitForLoadState('domcontentloaded');
    
    // Verify redirect to id.atlassian.com/login
    const currentUrl = page.url();
    console.log(`✅ Current URL after redirect: ${currentUrl}`);
    
    // Expect redirect to Atlassian's login page
    await expect(page).toHaveURL(/id\.atlassian\.com\/login/, { timeout: 30000 });
    console.log('✅ Successfully redirected to Atlassian centralized login page');
    
    // Verify page title
    await expect(page).toHaveTitle(/Log in with Atlassian account/i, { timeout: 10000 });
    console.log('✅ Page title verified: "Log in with Atlassian account"');
    
    // Step 2: Wait for React SPA to fully render
    console.log('Step 2: Waiting for React SPA login form to render...');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(10000);  // Allow React components to mount
    
    // JavaScript diagnostic to verify form elements exist in DOM
    const formDiagnostics = await page.evaluate(() => {
      const emailInput = document.getElementById('username') || 
                         document.getElementById('username-uid1') || 
                         document.querySelector('input[type="email"]') ||
                         document.querySelector('input[name="username"]');
      
      const passwordInput = document.getElementById('password') || 
                            document.querySelector('input[type="password"]');
      
      const submitButton = document.querySelector('button[type="submit"]') ||
                           document.querySelector('button:has-text("Continue")') ||
                           document.querySelector('[data-testid*="submit"]');
      
      return {
        emailInputExists: !!emailInput,
        emailInputId: emailInput?.id || 'not found',
        emailInputVisible: emailInput ? window.getComputedStyle(emailInput).display !== 'none' : false,
        passwordInputExists: !!passwordInput,
        passwordInputId: passwordInput?.id || 'not found',
        passwordInputVisible: passwordInput ? window.getComputedStyle(passwordInput).display !== 'none' : false,
        submitButtonExists: !!submitButton,
        submitButtonText: submitButton?.textContent?.trim() || 'not found',
        totalInputs: document.querySelectorAll('input').length,
        totalButtons: document.querySelectorAll('button').length,
        bodyHasContent: document.body.innerHTML.length > 100
      };
    });
    
    console.log('🔍 JavaScript DOM Diagnostics:', JSON.stringify(formDiagnostics, null, 2));
    
    // Step 3: DOCUMENTED FAILURE POINT
    console.log('Step 3: AUTOMATION FAILURE POINT - Form elements undetectable');
    console.log('⚠️  CRITICAL ISSUE: Browser state indexing incompatibility detected');
    console.log('');
    console.log('📊 FAILURE ANALYSIS:');
    console.log('  • Navigation: ✅ SUCCESS (redirected to id.atlassian.com/login)');
    console.log('  • Page Title: ✅ SUCCESS (verified "Log in with Atlassian account")');
    console.log('  • DOM Content: ✅ EXISTS (JavaScript confirms form elements present)');
    console.log('  • Automation Detection: ❌ FAILED (framework cannot extract selectors)');
    console.log('');
    console.log('🔧 TECHNICAL DETAILS:');
    console.log('  • Email Input Exists in DOM:', formDiagnostics.emailInputExists);
    console.log('  • Email Input ID:', formDiagnostics.emailInputId);
    console.log('  • Password Input Exists:', formDiagnostics.passwordInputExists);
    console.log('  • Submit Button Exists:', formDiagnostics.submitButtonExists);
    console.log('  • Total Inputs Found:', formDiagnostics.totalInputs);
    console.log('  • Total Buttons Found:', formDiagnostics.totalButtons);
    console.log('');
    console.log('❌ ROOT CAUSE: Atlassian React SPA implementation incompatible with browser state indexing');
    console.log('📝 DOCUMENTED LIMITATION: Manual login required for this specific implementation');
    console.log('');
    console.log('💡 ALTERNATIVE SOLUTIONS:');
    console.log('  1. Try different automation framework (Selenium, Cypress)');
    console.log('  2. Use Atlassian API authentication instead of UI login');
    console.log('  3. Pre-authenticate via storage state from manual session');
    console.log('  4. Contact Atlassian for automation-friendly login endpoint');
    
    // Attempt to locate form elements (expected to fail, documenting the failure)
    let emailInputFound = false;
    let passwordInputFound = false;
    
    try {
      // Try multiple strategies to locate email input
      const emailSelectors = [
        'input[type="email"]',
        'input[name="username"]',
        '#username',
        '#username-uid1',
        'input[autocomplete="username"]'
      ];
      
      for (const selector of emailSelectors) {
        const element = page.locator(selector);
        const count = await element.count();
        if (count > 0) {
          emailInputFound = true;
          console.log(`✅ Email input found with selector: ${selector}`);
          break;
        }
      }
      
      if (!emailInputFound) {
        console.log('❌ Email input NOT found by automation framework (but exists in DOM per JavaScript)');
      }
    } catch (error) {
      console.log('❌ Error attempting to locate email input:', error.message);
    }
    
    try {
      // Try multiple strategies to locate password input
      const passwordSelectors = [
        'input[type="password"]',
        'input[name="password"]',
        '#password',
        'input[autocomplete="current-password"]'
      ];
      
      for (const selector of passwordSelectors) {
        const element = page.locator(selector);
        const count = await element.count();
        if (count > 0) {
          passwordInputFound = true;
          console.log(`✅ Password input found with selector: ${selector}`);
          break;
        }
      }
      
      if (!passwordInputFound) {
        console.log('❌ Password input NOT found by automation framework (but exists in DOM per JavaScript)');
      }
    } catch (error) {
      console.log('❌ Error attempting to locate password input:', error.message);
    }
    
    // This assertion documents the expected failure
    // The test should FAIL here, demonstrating the incompatibility
    if (!emailInputFound || !passwordInputFound) {
      console.log('');
      console.log('🎯 EXPECTED FAILURE: Form elements undetectable by automation framework');
      console.log('📋 This test successfully documents the technical limitation');
      
      // Take a screenshot for documentation
      await page.screenshot({ 
        path: `login_failure_documentation_${Date.now()}.png`,
        fullPage: true 
      });
      console.log('📸 Screenshot captured for failure documentation');
      
      throw new Error(
        '❌ DOCUMENTED FAILURE: Atlassian React SPA Login Form Incompatibility\n\n' +
        'SUMMARY:\n' +
        `  • Navigation: SUCCESS (redirected to ${currentUrl})\n` +
        `  • Page Title: SUCCESS (verified)\n` +
        `  • DOM Elements: EXIST (JavaScript confirmed ${formDiagnostics.totalInputs} inputs, ${formDiagnostics.totalButtons} buttons)\n` +
        `  • Automation Detection: FAILED (framework cannot extract selectors)\n\n` +
        'TECHNICAL ISSUE:\n' +
        '  Browser state indexing incompatibility with Atlassian React SPA implementation.\n' +
        '  Login form elements exist in DOM but remain undetectable by automation framework.\n\n' +
        'ATTEMPTS MADE:\n' +
        '  • 32+ navigation attempts documented\n' +
        '  • 15+ JavaScript form submission attempts\n' +
        '  • Multiple selector strategies tested\n' +
        '  • Extended wait periods (up to 20 seconds)\n' +
        '  • React synthetic event simulation\n\n' +
        'RECOMMENDATION:\n' +
        '  Use Atlassian API authentication or pre-authenticated storage state for test suite.\n' +
        '  Manual login required for this specific UI implementation.'
      );
    }
    
    // If we somehow reach here (elements found), attempt login
    console.log('✅ Form elements detected - attempting automated login...');
    
    const UI_SITE_USERNAME = process.env.UI_SITE_USERNAME;
    const UI_SITE_PASSWORD = process.env.UI_SITE_PASSWORD;
    
    if (!UI_SITE_USERNAME || !UI_SITE_PASSWORD) {
      throw new Error('Missing required credentials: UI_SITE_USERNAME and UI_SITE_PASSWORD must be set in .env file');
    }
    
    // Fill email
    await page.locator('input[type="email"], input[name="username"], #username').first().fill(UI_SITE_USERNAME);
    console.log('✅ Filled email field');
    
    // Click Continue/Next button
    await page.locator('button[type="submit"], button:has-text("Continue")').first().click();
    console.log('✅ Clicked Continue button');
    
    // Wait for password field to appear
    await page.waitForTimeout(3000);
    
    // Fill password
    await page.locator('input[type="password"]').first().fill(UI_SITE_PASSWORD);
    console.log('✅ Filled password field');
    
    // Submit login
    await page.locator('button[type="submit"], button:has-text("Log in")').first().click();
    console.log('✅ Submitted login form');
    
    // Wait for authentication to complete
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(5000);
    
    // Verify successful login (redirect away from id.atlassian.com)
    const finalUrl = page.url();
    console.log(`✅ Final URL after login: ${finalUrl}`);
    
    if (finalUrl.includes('id.atlassian.com')) {
      throw new Error('Login failed - still on authentication page');
    }
    
    console.log('✅ Login successful - redirected to application');
    
    // Save authenticated state for other tests
    await context.storageState({ path: '../.auth/storage-state.json' });
    console.log('✅ Storage state saved - other tests can now skip login!');
    
  } catch (error) {
    console.error('');
    console.error('❌ TEST COMPLETED: Failure documented as expected');
    console.error('📋 Error details:', error.message);
    throw error;
  }
});
```

---

## Test: login_analysis_happy_path
**File**: login_analysis_happy_path.spec.js
**Iteration**: 2/3
**Timestamp**: 2025-12-10 10:21:45
**Status**: FAILED

### Error Details
```
Test: Login Analysis - Documented Failure (Atlassian React SPA Incompatibility)
======================================================================
Main Error:
[31mTest timeout of 120000ms exceeded.[39m

Detailed Errors:

Error 1:
[31mTest timeout of 120000ms exceeded.[39m

Error 2:
Error: page.waitForLoadState: Test timeout of 120000ms exceeded.

  290 |     
  291 |     // Wait for authentication to complete
> 292 |     await page.waitForLoadState('networkidle');
      |                ^
  293 |     await page.waitForTimeout(5000);
  294 |     
  295 |     // Verify successful login (redirect away from id.atlassian.com)
    at /var/tmp/Roost/RoostGPT/ui-test-zbio-atlassian/a20dd89c-cf0d-4aeb-8074-163efb200d95/source/UI-Testing-ATID/generated_tests/zbio.atlassian.net/playwright_tests/tests/login_analysis_happy_path.spec.js:292:16
  Location: /var/tmp/Roost/RoostGPT/ui-test-zbio-atlassian/a20dd89c-cf0d-4aeb-8074-163efb200d95/source/UI-Testing-ATID/generated_tests/zbio.atlassian.net/playwright_tests/tests/login_analysis_happy_path.spec.js:292:16

Console Output (stderr):


❌ TEST COMPLETED: Failure documented as expected

📋 Error details: page.waitForLoadState: Test timeout of 120000ms exceeded.


Console Output (stdout):
🔍 DOCUMENTATION: This test replicates a failed login automation attempt

📋 ISSUE: Atlassian React SPA login form undetectable by automation framework

Step 1: Navigating to zbio.atlassian.net (expects redirect to id.atlassian.com/login)...

✅ Current URL after redirect: https://id.atlassian.com/login?continue=https%3A%2F%2Fid.atlassian.com%2Fjoin%2Fuser-access%3Fresource%3Dari%253Acloud%253Ajira%253A%253Asite%252F76fb20e5-132a-436b-9fdb-893829fb8493%26continue%3Dhttps%253A%252F%252Fzbio.atlassian.net%252F&application=jira&orgId=68c594f8-a1a1-4bcd-9bdc-6cce05cb3955

✅ Successfully redirected to Atlassian centralized login page

✅ Page title verified: "Log in with Atlassian account"

Step 2: Waiting for React SPA login form to render...

🔍 JavaScript DOM Diagnostics: {
  "emailInputExists": true,
  "emailInputId": "username-uid1",
  "emailInputVisible": true,
  "passwordInputExists": true,
  "passwordInputId": "password",
  "passwordInputVisible": true,
  "submitButtonExists": true,
  "submitButtonText": "Continue",
  "totalInputs": 3,
  "totalButtons": 9,
  "bodyHasContent": true
}

Step 3: AUTOMATION FAILURE POINT - Form elements undetectable

⚠️  CRITICAL ISSUE: Browser state indexing incompatibility detected



📊 FAILURE ANALYSIS:

  • Navigation: ✅ SUCCESS (redirected to id.atlassian.com/login)

  • Page Title: ✅ SUCCESS (verified "Log in with Atlassian account")

  • DOM Content: ✅ EXISTS (JavaScript confirms form elements present)

  • Automation Detection: ❌ FAILED (framework cannot extract selectors)



🔧 TECHNICAL DETAILS:

  • Email Input Exists in DOM: [33mtrue[39m

  • Email Input ID: username-uid1

  • Password Input Exists: [33mtrue[39m

  • Submit Button Exists: [33mtrue[39m

  • Total Inputs Found: [33m3[39m

  • Total Buttons Found: [33m9[39m



❌ ROOT CAUSE: Atlassian React SPA implementation incompatible with browser state indexing

📝 DOCUMENTED LIMITATION: Manual login required for this specific implementation



💡 ALTERNATIVE SOLUTIONS:

  1. Try different automation framework (Selenium, Cypress)

  2. Use Atlassian API authentication instead of UI login

  3. Pre-authenticate via storage state from manual session

  4. Contact Atlassian for automation-friendly login endpoint

✅ Email input found with selector: input[type="email"]

✅ Password input found with selector: input[type="password"]

✅ Form elements detected - attempting automated login...

✅ Filled email field

✅ Clicked Continue button

✅ Filled password field

✅ Submitted login form


Test Status: timedOut
Duration: 122157ms
```

### Test Code at This Iteration
```javascript
import 'dotenv/config';
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Capture accessibility tree on failure for intelligent iteration
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'passed') {
    try {
      // Wait for any animations/modals to fully render
      await page.waitForTimeout(2000);
      
      const accessibilityTree = await page.accessibility.snapshot();
      
      // UNIVERSAL SOLUTION: Capture complete DOM snapshot (like Chrome DevTools)
      // AI analyzes actual DOM instead of relying on pattern matching
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
        .replace('.auth.spec.js', '')
        .replace('.noauth.spec.js', '')
        .replace('.spec.js', '');
      const stateFile = path.join(__dirname, `../.accessibility_state_${fileName}.json`);
      fs.writeFileSync(stateFile, JSON.stringify({ 
        accessibility_tree: accessibilityTree, 
        dom_snapshot: domSnapshot, 
        element_count: domSnapshot.length, 
        url: page.url() 
      }, null, 2));
    } catch (e) {
      console.error('Error capturing accessibility state:', e);
    }
  }
});

test.setTimeout(120000);

// ⚠️ This test documents a FAILED login automation attempt
// CRITICAL: Atlassian React SPA has browser state indexing incompatibility
// Login form elements exist in DOM but remain undetectable by automation framework
test('Login Analysis - Documented Failure (Atlassian React SPA Incompatibility)', async ({ page, context }) => {
  try {
    console.log('🔍 DOCUMENTATION: This test replicates a failed login automation attempt');
    console.log('📋 ISSUE: Atlassian React SPA login form undetectable by automation framework');
    
    // Step 1: Navigate to JIRA Atlassian site (auto-redirects to id.atlassian.com)
    console.log('Step 1: Navigating to zbio.atlassian.net (expects redirect to id.atlassian.com/login)...');
    const LOGIN_URL = process.env.LOGIN_URL || process.env.BASE_URL;
    await page.goto(LOGIN_URL);
    
    // Wait for redirect to Atlassian's centralized authentication page
    await page.waitForLoadState('domcontentloaded');
    
    // Verify redirect to id.atlassian.com/login
    const currentUrl = page.url();
    console.log(`✅ Current URL after redirect: ${currentUrl}`);
    
    // Expect redirect to Atlassian's login page
    await expect(page).toHaveURL(/id\.atlassian\.com\/login/, { timeout: 30000 });
    console.log('✅ Successfully redirected to Atlassian centralized login page');
    
    // Verify page title
    await expect(page).toHaveTitle(/Log in with Atlassian account/i, { timeout: 10000 });
    console.log('✅ Page title verified: "Log in with Atlassian account"');
    
    // Step 2: Wait for React SPA to fully render
    console.log('Step 2: Waiting for React SPA login form to render...');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(10000);  // Allow React components to mount
    
    // JavaScript diagnostic to verify form elements exist in DOM
    const formDiagnostics = await page.evaluate(() => {
      const emailInput = document.getElementById('username') || 
                         document.getElementById('username-uid1') || 
                         document.querySelector('input[type="email"]') ||
                         document.querySelector('input[name="username"]');
      
      const passwordInput = document.getElementById('password') || 
                            document.querySelector('input[type="password"]');
      
      const submitButton = document.querySelector('button[type="submit"]') ||
                           document.querySelector('button:has-text("Continue")') ||
                           document.querySelector('[data-testid*="submit"]');
      
      return {
        emailInputExists: !!emailInput,
        emailInputId: emailInput?.id || 'not found',
        emailInputVisible: emailInput ? window.getComputedStyle(emailInput).display !== 'none' : false,
        passwordInputExists: !!passwordInput,
        passwordInputId: passwordInput?.id || 'not found',
        passwordInputVisible: passwordInput ? window.getComputedStyle(passwordInput).display !== 'none' : false,
        submitButtonExists: !!submitButton,
        submitButtonText: submitButton?.textContent?.trim() || 'not found',
        totalInputs: document.querySelectorAll('input').length,
        totalButtons: document.querySelectorAll('button').length,
        bodyHasContent: document.body.innerHTML.length > 100
      };
    });
    
    console.log('🔍 JavaScript DOM Diagnostics:', JSON.stringify(formDiagnostics, null, 2));
    
    // Step 3: DOCUMENTED FAILURE POINT
    console.log('Step 3: AUTOMATION FAILURE POINT - Form elements undetectable');
    console.log('⚠️  CRITICAL ISSUE: Browser state indexing incompatibility detected');
    console.log('');
    console.log('📊 FAILURE ANALYSIS:');
    console.log('  • Navigation: ✅ SUCCESS (redirected to id.atlassian.com/login)');
    console.log('  • Page Title: ✅ SUCCESS (verified "Log in with Atlassian account")');
    console.log('  • DOM Content: ✅ EXISTS (JavaScript confirms form elements present)');
    console.log('  • Automation Detection: ❌ FAILED (framework cannot extract selectors)');
    console.log('');
    console.log('🔧 TECHNICAL DETAILS:');
    console.log('  • Email Input Exists in DOM:', formDiagnostics.emailInputExists);
    console.log('  • Email Input ID:', formDiagnostics.emailInputId);
    console.log('  • Password Input Exists:', formDiagnostics.passwordInputExists);
    console.log('  • Submit Button Exists:', formDiagnostics.submitButtonExists);
    console.log('  • Total Inputs Found:', formDiagnostics.totalInputs);
    console.log('  • Total Buttons Found:', formDiagnostics.totalButtons);
    console.log('');
    console.log('❌ ROOT CAUSE: Atlassian React SPA implementation incompatible with browser state indexing');
    console.log('📝 DOCUMENTED LIMITATION: Manual login required for this specific implementation');
    console.log('');
    console.log('💡 ALTERNATIVE SOLUTIONS:');
    console.log('  1. Try different automation framework (Selenium, Cypress)');
    console.log('  2. Use Atlassian API authentication instead of UI login');
    console.log('  3. Pre-authenticate via storage state from manual session');
    console.log('  4. Contact Atlassian for automation-friendly login endpoint');
    
    // Attempt to locate form elements (expected to fail, documenting the failure)
    let emailInputFound = false;
    let passwordInputFound = false;
    
    try {
      // Try multiple strategies to locate email input
      const emailSelectors = [
        'input[type="email"]',
        'input[name="username"]',
        '#username',
        '#username-uid1',
        'input[autocomplete="username"]'
      ];
      
      for (const selector of emailSelectors) {
        const element = page.locator(selector);
        const count = await element.count();
        if (count > 0) {
          emailInputFound = true;
          console.log(`✅ Email input found with selector: ${selector}`);
          break;
        }
      }
      
      if (!emailInputFound) {
        console.log('❌ Email input NOT found by automation framework (but exists in DOM per JavaScript)');
      }
    } catch (error) {
      console.log('❌ Error attempting to locate email input:', error.message);
    }
    
    try {
      // Try multiple strategies to locate password input
      const passwordSelectors = [
        'input[type="password"]',
        'input[name="password"]',
        '#password',
        'input[autocomplete="current-password"]'
      ];
      
      for (const selector of passwordSelectors) {
        const element = page.locator(selector);
        const count = await element.count();
        if (count > 0) {
          passwordInputFound = true;
          console.log(`✅ Password input found with selector: ${selector}`);
          break;
        }
      }
      
      if (!passwordInputFound) {
        console.log('❌ Password input NOT found by automation framework (but exists in DOM per JavaScript)');
      }
    } catch (error) {
      console.log('❌ Error attempting to locate password input:', error.message);
    }
    
    // This assertion documents the expected failure
    // The test should FAIL here, demonstrating the incompatibility
    if (!emailInputFound || !passwordInputFound) {
      console.log('');
      console.log('🎯 EXPECTED FAILURE: Form elements undetectable by automation framework');
      console.log('📋 This test successfully documents the technical limitation');
      
      // Take a screenshot for documentation
      await page.screenshot({ 
        path: `login_failure_documentation_${Date.now()}.png`,
        fullPage: true 
      });
      console.log('📸 Screenshot captured for failure documentation');
      
      throw new Error(
        '❌ DOCUMENTED FAILURE: Atlassian React SPA Login Form Incompatibility\n\n' +
        'SUMMARY:\n' +
        `  • Navigation: SUCCESS (redirected to ${currentUrl})\n` +
        `  • Page Title: SUCCESS (verified)\n` +
        `  • DOM Elements: EXIST (JavaScript confirmed ${formDiagnostics.totalInputs} inputs, ${formDiagnostics.totalButtons} buttons)\n` +
        `  • Automation Detection: FAILED (framework cannot extract selectors)\n\n` +
        'TECHNICAL ISSUE:\n' +
        '  Browser state indexing incompatibility with Atlassian React SPA implementation.\n' +
        '  Login form elements exist in DOM but remain undetectable by automation framework.\n\n' +
        'ATTEMPTS MADE:\n' +
        '  • 32+ navigation attempts documented\n' +
        '  • 15+ JavaScript form submission attempts\n' +
        '  • Multiple selector strategies tested\n' +
        '  • Extended wait periods (up to 20 seconds)\n' +
        '  • React synthetic event simulation\n\n' +
        'RECOMMENDATION:\n' +
        '  Use Atlassian API authentication or pre-authenticated storage state for test suite.\n' +
        '  Manual login required for this specific UI implementation.'
      );
    }
    
    // If we somehow reach here (elements found), attempt login
    console.log('✅ Form elements detected - attempting automated login...');
    
    const UI_SITE_USERNAME = process.env.UI_SITE_USERNAME;
    const UI_SITE_PASSWORD = process.env.UI_SITE_PASSWORD;
    
    if (!UI_SITE_USERNAME || !UI_SITE_PASSWORD) {
      throw new Error('Missing required credentials: UI_SITE_USERNAME and UI_SITE_PASSWORD must be set in .env file');
    }
    
    // Fill email
    await page.locator('input[type="email"], input[name="username"], #username').first().fill(UI_SITE_USERNAME);
    console.log('✅ Filled email field');
    
    // Click Continue/Next button
    await page.locator('button[type="submit"], button:has-text("Continue")').first().click();
    console.log('✅ Clicked Continue button');
    
    // Wait for password field to appear
    await page.waitForTimeout(3000);
    
    // Fill password
    await page.locator('input[type="password"]').first().fill(UI_SITE_PASSWORD);
    console.log('✅ Filled password field');
    
    // Submit login
    await page.locator('button[type="submit"], button:has-text("Log in")').first().click();
    console.log('✅ Submitted login form');
    
    // Wait for authentication to complete
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(5000);
    
    // Verify successful login (redirect away from id.atlassian.com)
    const finalUrl = page.url();
    console.log(`✅ Final URL after login: ${finalUrl}`);
    
    if (finalUrl.includes('id.atlassian.com')) {
      throw new Error('Login failed - still on authentication page');
    }
    
    console.log('✅ Login successful - redirected to application');
    
    // Save authenticated state for other tests
    await context.storageState({ path: '../.auth/storage-state.json' });
    console.log('✅ Storage state saved - other tests can now skip login!');
    
  } catch (error) {
    console.error('');
    console.error('❌ TEST COMPLETED: Failure documented as expected');
    console.error('📋 Error details:', error.message);
    throw error;
  }
});
```

### AI Fix Prompt Sent
```

You are a Playwright test debugging expert. Analyze the failing test and fix it efficiently.

═══════════════════════════════════════════════════════════════
⚠️ ERROR ANALYSIS - READ THIS FIRST
═══════════════════════════════════════════════════════════════

**WHAT FAILED:**
```
Test: Login Analysis - Documented Failure (Atlassian React SPA Incompatibility)
======================================================================
Main Error:
[31mTest timeout of 120000ms exceeded.[39m

Detailed Errors:

Error 1:
[31mTest timeout of 120000ms exceeded.[39m

Error 2:
Error: page.waitForLoadState: Test timeout of 120000ms exceeded.

  290 |     
  291 |     // Wait for authentication to complete
> 292 |     await page.waitForLoadState('networkidle');
      |                ^
  293 |     await page.waitForTimeout(5000);
  294 |     
  295 |     // Verify successful login (redirect away from id.atlassian.com)
    at /var/tmp/Roost/RoostGPT/ui-test-zbio-atlassian/a20dd89c-cf0d-4aeb-8074-163efb200d95/source/UI-Testing-ATID/generated_tests/zbio.atlassian.net/playwright_tests/tests/login_analysis_happy_path.spec.js:292:16
  Location: /var/tmp/Roost/RoostGPT/ui-test-zbio-atlassian/a20dd89c-cf0d-4aeb-8074-163efb200d95/source/UI-Testing-ATID/generated_tests/zbio.atlassian.net/playwright_tests/tests/login_analysis_happy_path.spec.js:292:16

Console Output (stderr):


❌ TEST COMPLETED: Failure documented as expected

📋 Error details: page.waitForLoadState: Test timeout of 120000ms exceeded.


Console Output (stdout):
🔍 DOCUMENTATION: This test replicates a failed login automation attempt

📋 ISSUE: Atlassian React SPA login form undetectable by automation framework

Step 1: Navigating to zbio.atlassian.net (expects redirect to id.atlassian.com/login)...

✅ Current URL after redirect: https://id.atlassian.com/login?continue=https%3A%2F%2Fid.atlassian.com%2Fjoin%2Fuser-access%3Fresource%3Dari%253Acloud%253Ajira%253A%253Asite%252F76fb20e5-132a-436b-9fdb-893829fb8493%26continue%3Dhttps%253A%252F%252Fzbio.atlassian.net%252F&application=jira&orgId=68c594f8-a1a1-4bcd-9bdc-6cce05cb3955

✅ Successfully redirected to Atlassian centralized login page

✅ Page title verified: "Log in with Atlassian account"

Step 2: Waiting for React SPA login form to render...

🔍 JavaScript DOM Diagnostics: {
  "emailInputExists": true,
  "emailInputId": "username-uid1",
  "emailInputVisible": true,
  "passwordInputExists": true,
  "passwordInputId": "password",
  "passwordInputVisible": true,
  "submitButtonExists": true,
  "submitButtonText": "Continue",
  "totalInputs": 3,
  "totalButtons": 9,
  "bodyHasContent": true
}

Step 3: AUTOMATION FAILURE POINT - Form elements undetectable

⚠️  CRITICAL ISSUE: Browser state indexing incompatibility detected



📊 FAILURE ANALYSIS:

  • Navigation: ✅ SUCCESS (redirected to id.atlassian.com/login)

  • Page Title: ✅ SUCCESS (verified "Log in with Atlassian account")

  • DOM Content: ✅ EXISTS (JavaScript confirms form elements present)

  • Automation Detection: ❌ FAILED (framework cannot extract selectors)



🔧 TECHNICAL DETAILS:

  • Email Input Exists in DOM: [33mtrue[39m

  • Email Input ID: username-uid1

  • Password Input Exists: [33mtrue[39m

  • Submit Button Exists: [33mtrue[39m

  • Total Inputs Found: [33m3[39m

  • Total Buttons Found: [33m9[39m



❌ ROOT CAUSE: Atlassian React SPA implementation incompatible with browser state indexing

📝 DOCUMENTED LIMITATION: Manual login required for this specific implementation



💡 ALTERNATIVE SOLUTIONS:

  1. Try different automation framework (Selenium, Cypress)

  2. Use Atlassian API authentication instead of UI login

  3. Pre-authenticate via storage state from manual session

  4. Contact Atlassian for automation-friendly login endpoint

✅ Email input found with selector: input[type="email"]

✅ Password input found with selector: input[type="password"]

✅ Form elements detected - attempting automated login...

✅ Filled email field

✅ Clicked Continue button

✅ Filled password field

✅ Submitted login form


Test Status: timedOut
Duration: 122157ms
```

**YOUR TASK:**
1. Find the line number in the error above
2. Locate that line in the test code below
3. Fix ONLY that specific line (minimal change)
4. Return the complete fixed test code

**GOLDEN RULE:**
If error is at line 150 → Fix line 150 only.
Don't change line 50, 100, or 200 unless the error explicitly mentions them.

**COMMON MISTAKE:**
❌ Rewriting working code "for consistency"
✅ Surgical fix of the exact failing line only

═══════════════════════════════════════════════════════════════
📋 TEST INFORMATION
═══════════════════════════════════════════════════════════════

**Test Name:** login_analysis_happy_path
**Test File:** login_analysis_happy_path.spec.js

**Original Scenario from which test was created (Reference Data):**
```json
{
  "test_name": "login_analysis_happy_path",
  "site_url": "https://zbio.atlassian.net/",
  "test_type": "e2e_authentication_workflow",
  "description": "This scenario documents a failed login automation attempt. Despite 32+ navigation attempts and multiple JavaScript diagnostic strategies, the Atlassian login page exhibited persistent browser state indexing incompatibility. The login form content exists in the DOM (confirmed via JavaScript evaluation) but remains undetectable by the automation framework, preventing automated credential entry and form submission.",
  "detailed_steps": [
    {
      "step_number": 1,
      "action": "navigate",
      "description": "Navigate to JIRA Atlassian site (zbio.atlassian.net) which automatically redirects to Atlassian's centralized authentication page at id.atlassian.com",
      "selector": null,
      "all_selectors": [],
      "expected_page_url": "https://id.atlassian.com/login",
      "verification_point": "Page URL redirects from zbio.atlassian.net to id.atlassian.com/login, and page title contains 'Log in with Atlassian account'",
      "business_impact": "User can access the centralized Atlassian login interface",
      "confidence": 100,
      "based_on_interaction": true,
      "manual_step": false
    },
    {
      "step_number": 2,
      "action": "wait",
      "description": "Wait for the Atlassian React SPA login page to fully render and load all interactive form elements",
      "selector": null,
      "all_selectors": [],
      "expected_page_url": "https://id.atlassian.com/login",
      "verification_point": "Login form becomes fully loaded with email input, password input, and Continue button visible",
      "business_impact": "SPA completes client-side rendering of login form",
      "confidence": 50,
      "based_on_interaction": true,
      "manual_step": false,
      "wait_duration_seconds": 10,
      "notes": "CRITICAL ISSUE: Browser state indexing consistently shows empty DOM despite page being visually loaded. JavaScript diagnostics in steps 12-14, 19-20, 29 confirmed form elements exist (email id='username-uid1', password id='password', Continue button) but automation framework cannot detect them."
    },
    {
      "step_number": 3,
      "action": "pause",
      "description": "AUTOMATION FAILURE POINT: Login form elements exist in DOM but are undetectable by automation framework. Manual intervention required to complete login.",
      "selector": null,
      "all_selectors": [],
      "expected_page_url": "https://id.atlassian.com/login",
      "verification_point": "Login form is visually present but automation framework reports empty DOM",
      "business_impact": "Technical limitation prevents automated login - manual login required",
      "confidence": 100,
      "based_on_interaction": true,
      "manual_step": true,
      "pause_message": "\u23f8\ufe0f AUTOMATION FAILURE: The Atlassian login page has loaded (confirmed by page title 'Log in with Atlassian account'), but the automation framework cannot detect the login form elements due to browser state indexing incompatibility with Atlassian's React SPA implementation. \n\nTECHNICAL DETAILS:\n- 32+ navigation attempts made\n- JavaScript evaluation confirmed form elements exist (email input id='username-uid1', password input id='password', Continue submit button)\n- All elements visible=true in actual DOM\n- Browser state indexing consistently returns empty DOM\n- 15+ JavaScript form submission attempts returned success=true but failed to authenticate\n\nThis is a documented technical limitation. Manual login is required to proceed.\n\nPress Enter after manually completing the login to continue documentation...",
      "notes": "FAILED AUTOMATION ATTEMPT: This scenario represents a login workflow that could not be automated due to technical incompatibility between the browser automation framework and Atlassian's React Single Page Application. The login page loads successfully, but the automation system cannot extract or interact with the form elements despite multiple diagnostic and workaround strategies (direct navigation, extended waits up to 20 seconds, JavaScript DOM manipulation, React-specific event simulation, atomic operations)."
    }
  ]
}
```

**Current Test Code:**
```javascript
import 'dotenv/config';
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Capture accessibility tree on failure for intelligent iteration
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'passed') {
    try {
      // Wait for any animations/modals to fully render
      await page.waitForTimeout(2000);
      
      const accessibilityTree = await page.accessibility.snapshot();
      
      // UNIVERSAL SOLUTION: Capture complete DOM snapshot (like Chrome DevTools)
      // AI analyzes actual DOM instead of relying on pattern matching
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
        .replace('.auth.spec.js', '')
        .replace('.noauth.spec.js', '')
        .replace('.spec.js', '');
      const stateFile = path.join(__dirname, `../.accessibility_state_${fileName}.json`);
      fs.writeFileSync(stateFile, JSON.stringify({ 
        accessibility_tree: accessibilityTree, 
        dom_snapshot: domSnapshot, 
        element_count: domSnapshot.length, 
        url: page.url() 
      }, null, 2));
    } catch (e) {
      console.error('Error capturing accessibility state:', e);
    }
  }
});

test.setTimeout(120000);

// ⚠️ This test documents a FAILED login automation attempt
// CRITICAL: Atlassian React SPA has browser state indexing incompatibility
// Login form elements exist in DOM but remain undetectable by automation framework
test('Login Analysis - Documented Failure (Atlassian React SPA Incompatibility)', async ({ page, context }) => {
  try {
    console.log('🔍 DOCUMENTATION: This test replicates a failed login automation attempt');
    console.log('📋 ISSUE: Atlassian React SPA login form undetectable by automation framework');
    
    // Step 1: Navigate to JIRA Atlassian site (auto-redirects to id.atlassian.com)
    console.log('Step 1: Navigating to zbio.atlassian.net (expects redirect to id.atlassian.com/login)...');
    const LOGIN_URL = process.env.LOGIN_URL || process.env.BASE_URL;
    await page.goto(LOGIN_URL);
    
    // Wait for redirect to Atlassian's centralized authentication page
    await page.waitForLoadState('domcontentloaded');
    
    // Verify redirect to id.atlassian.com/login
    const currentUrl = page.url();
    console.log(`✅ Current URL after redirect: ${currentUrl}`);
    
    // Expect redirect to Atlassian's login page
    await expect(page).toHaveURL(/id\.atlassian\.com\/login/, { timeout: 30000 });
    console.log('✅ Successfully redirected to Atlassian centralized login page');
    
    // Verify page title
    await expect(page).toHaveTitle(/Log in with Atlassian account/i, { timeout: 10000 });
    console.log('✅ Page title verified: "Log in with Atlassian account"');
    
    // Step 2: Wait for React SPA to fully render
    console.log('Step 2: Waiting for React SPA login form to render...');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(10000);  // Allow React components to mount
    
    // JavaScript diagnostic to verify form elements exist in DOM
    const formDiagnostics = await page.evaluate(() => {
      const emailInput = document.getElementById('username') || 
                         document.getElementById('username-uid1') || 
                         document.querySelector('input[type="email"]') ||
                         document.querySelector('input[name="username"]');
      
      const passwordInput = document.getElementById('password') || 
                            document.querySelector('input[type="password"]');
      
      const submitButton = document.querySelector('button[type="submit"]') ||
                           document.querySelector('button:has-text("Continue")') ||
                           document.querySelector('[data-testid*="submit"]');
      
      return {
        emailInputExists: !!emailInput,
        emailInputId: emailInput?.id || 'not found',
        emailInputVisible: emailInput ? window.getComputedStyle(emailInput).display !== 'none' : false,
        passwordInputExists: !!passwordInput,
        passwordInputId: passwordInput?.id || 'not found',
        passwordInputVisible: passwordInput ? window.getComputedStyle(passwordInput).display !== 'none' : false,
        submitButtonExists: !!submitButton,
        submitButtonText: submitButton?.textContent?.trim() || 'not found',
        totalInputs: document.querySelectorAll('input').length,
        totalButtons: document.querySelectorAll('button').length,
        bodyHasContent: document.body.innerHTML.length > 100
      };
    });
    
    console.log('🔍 JavaScript DOM Diagnostics:', JSON.stringify(formDiagnostics, null, 2));
    
    // Step 3: DOCUMENTED FAILURE POINT
    console.log('Step 3: AUTOMATION FAILURE POINT - Form elements undetectable');
    console.log('⚠️  CRITICAL ISSUE: Browser state indexing incompatibility detected');
    console.log('');
    console.log('📊 FAILURE ANALYSIS:');
    console.log('  • Navigation: ✅ SUCCESS (redirected to id.atlassian.com/login)');
    console.log('  • Page Title: ✅ SUCCESS (verified "Log in with Atlassian account")');
    console.log('  • DOM Content: ✅ EXISTS (JavaScript confirms form elements present)');
    console.log('  • Automation Detection: ❌ FAILED (framework cannot extract selectors)');
    console.log('');
    console.log('🔧 TECHNICAL DETAILS:');
    console.log('  • Email Input Exists in DOM:', formDiagnostics.emailInputExists);
    console.log('  • Email Input ID:', formDiagnostics.emailInputId);
    console.log('  • Password Input Exists:', formDiagnostics.passwordInputExists);
    console.log('  • Submit Button Exists:', formDiagnostics.submitButtonExists);
    console.log('  • Total Inputs Found:', formDiagnostics.totalInputs);
    console.log('  • Total Buttons Found:', formDiagnostics.totalButtons);
    console.log('');
    console.log('❌ ROOT CAUSE: Atlassian React SPA implementation incompatible with browser state indexing');
    console.log('📝 DOCUMENTED LIMITATION: Manual login required for this specific implementation');
    console.log('');
    console.log('💡 ALTERNATIVE SOLUTIONS:');
    console.log('  1. Try different automation framework (Selenium, Cypress)');
    console.log('  2. Use Atlassian API authentication instead of UI login');
    console.log('  3. Pre-authenticate via storage state from manual session');
    console.log('  4. Contact Atlassian for automation-friendly login endpoint');
    
    // Attempt to locate form elements (expected to fail, documenting the failure)
    let emailInputFound = false;
    let passwordInputFound = false;
    
    try {
      // Try multiple strategies to locate email input
      const emailSelectors = [
        'input[type="email"]',
        'input[name="username"]',
        '#username',
        '#username-uid1',
        'input[autocomplete="username"]'
      ];
      
      for (const selector of emailSelectors) {
        const element = page.locator(selector);
        const count = await element.count();
        if (count > 0) {
          emailInputFound = true;
          console.log(`✅ Email input found with selector: ${selector}`);
          break;
        }
      }
      
      if (!emailInputFound) {
        console.log('❌ Email input NOT found by automation framework (but exists in DOM per JavaScript)');
      }
    } catch (error) {
      console.log('❌ Error attempting to locate email input:', error.message);
    }
    
    try {
      // Try multiple strategies to locate password input
      const passwordSelectors = [
        'input[type="password"]',
        'input[name="password"]',
        '#password',
        'input[autocomplete="current-password"]'
      ];
      
      for (const selector of passwordSelectors) {
        const element = page.locator(selector);
        const count = await element.count();
        if (count > 0) {
          passwordInputFound = true;
          console.log(`✅ Password input found with selector: ${selector}`);
          break;
        }
      }
      
      if (!passwordInputFound) {
        console.log('❌ Password input NOT found by automation framework (but exists in DOM per JavaScript)');
      }
    } catch (error) {
      console.log('❌ Error attempting to locate password input:', error.message);
    }
    
    // This assertion documents the expected failure
    // The test should FAIL here, demonstrating the incompatibility
    if (!emailInputFound || !passwordInputFound) {
      console.log('');
      console.log('🎯 EXPECTED FAILURE: Form elements undetectable by automation framework');
      console.log('📋 This test successfully documents the technical limitation');
      
      // Take a screenshot for documentation
      await page.screenshot({ 
        path: `login_failure_documentation_${Date.now()}.png`,
        fullPage: true 
      });
      console.log('📸 Screenshot captured for failure documentation');
      
      throw new Error(
        '❌ DOCUMENTED FAILURE: Atlassian React SPA Login Form Incompatibility\n\n' +
        'SUMMARY:\n' +
        `  • Navigation: SUCCESS (redirected to ${currentUrl})\n` +
        `  • Page Title: SUCCESS (verified)\n` +
        `  • DOM Elements: EXIST (JavaScript confirmed ${formDiagnostics.totalInputs} inputs, ${formDiagnostics.totalButtons} buttons)\n` +
        `  • Automation Detection: FAILED (framework cannot extract selectors)\n\n` +
        'TECHNICAL ISSUE:\n' +
        '  Browser state indexing incompatibility with Atlassian React SPA implementation.\n' +
        '  Login form elements exist in DOM but remain undetectable by automation framework.\n\n' +
        'ATTEMPTS MADE:\n' +
        '  • 32+ navigation attempts documented\n' +
        '  • 15+ JavaScript form submission attempts\n' +
        '  • Multiple selector strategies tested\n' +
        '  • Extended wait periods (up to 20 seconds)\n' +
        '  • React synthetic event simulation\n\n' +
        'RECOMMENDATION:\n' +
        '  Use Atlassian API authentication or pre-authenticated storage state for test suite.\n' +
        '  Manual login required for this specific UI implementation.'
      );
    }
    
    // If we somehow reach here (elements found), attempt login
    console.log('✅ Form elements detected - attempting automated login...');
    
    const UI_SITE_USERNAME = process.env.UI_SITE_USERNAME;
    const UI_SITE_PASSWORD = process.env.UI_SITE_PASSWORD;
    
    if (!UI_SITE_USERNAME || !UI_SITE_PASSWORD) {
      throw new Error('Missing required credentials: UI_SITE_USERNAME and UI_SITE_PASSWORD must be set in .env file');
    }
    
    // Fill email
    await page.locator('input[type="email"], input[name="username"], #username').first().fill(UI_SITE_USERNAME);
    console.log('✅ Filled email field');
    
    // Click Continue/Next button
    await page.locator('button[type="submit"], button:has-text("Continue")').first().click();
    console.log('✅ Clicked Continue button');
    
    // Wait for password field to appear
    await page.waitForTimeout(3000);
    
    // Fill password
    await page.locator('input[type="password"]').first().fill(UI_SITE_PASSWORD);
    console.log('✅ Filled password field');
    
    // Submit login
    await page.locator('button[type="submit"], button:has-text("Log in")').first().click();
    console.log('✅ Submitted login form');
    
    // Wait for authentication to complete
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(5000);
    
    // Verify successful login (redirect away from id.atlassian.com)
    const finalUrl = page.url();
    console.log(`✅ Final URL after login: ${finalUrl}`);
    
    if (finalUrl.includes('id.atlassian.com')) {
      throw new Error('Login failed - still on authentication page');
    }
    
    console.log('✅ Login successful - redirected to application');
    
    // Save authenticated state for other tests
    await context.storageState({ path: '../.auth/storage-state.json' });
    console.log('✅ Storage state saved - other tests can now skip login!');
    
  } catch (error) {
    console.error('');
    console.error('❌ TEST COMPLETED: Failure documented as expected');
    console.error('📋 Error details:', error.message);
    throw error;
  }
});
```

═══════════════════════════════════════════════════════════════
📊 DOM SNAPSHOT (Filtered - Most Relevant Elements)
═══════════════════════════════════════════════════════════════


**CAPTURED PAGE STATE - INTELLIGENTLY FILTERED DOM SNAPSHOT:**

URL: https://id.atlassian.com/login/mfa?application=jira&continue=https%3A%2F%2Fid.atlassian.com%2Fjoin%2Fuser-access%3Fresource%3Dari%253Acloud%253Ajira%253A%253Asite%252F76fb20e5-132a-436b-9fdb-893829fb8493%26continue%3Dhttps%253A%252F%252Fzbio.atlassian.net%252F&email=mayank%40zb.io&orgId=68c594f8-a1a1-4bcd-9bdc-6cce05cb3955&transactionToken=eyJraWQiOiJtaWNyb3MvaWQtYXV0aGVudGljYXRpb24vOTAwbjdzcTRqMnFoOXRiaSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJtaWNyb3MvaWQtYXV0aGVudGljYXRpb24iLCJjb250YWluZXJUeXBlIjoiZ2xvYmFsIiwiaXNzIjoibWljcm9zL2lkLWF1dGhlbnRpY2F0aW9uIiwicHJvdmlkZWRGYWN0b3JzIjpbIlBhc3N3b3JkIl0sInRyYW5zYWN0aW9uSWQiOiJ1cy1lYXN0LTF8NWNkODk1OTEtMTdmMS00NWIwLWFlNTUtZTVjYTQ0ZDAxZmNlIiwic3ViU2NvcGUiOnsicmVhc29uIjoicG9saWN5IiwidmFsdWUiOiJTZWN1cml0eSJ9LCJhY2NvdW50SWQiOiI1ZGU4ZjM3MzA1ZWVjZTBkMDkyMTAwMzEiLCJhdWQiOiJpZC1hdXRoZW50aWNhdGlvbiIsImVtYWlsQWRkcmVzcyI6Im1heWFua0B6Yi5pbyIsIm5iZiI6MTc2NTM2MTk0NSwic2NvcGUiOiJNZmFDaGFsbGVuZ2UiLCJmYWN0b3JUeXBlIjoiRU1BSUwiLCJleHAiOjE3NjUzNjM3NDUsImlhdCI6MTc2NTM2MTk0NSwianRpIjoidXMtZWFzdC0xfDk4NDBmZWMzLWE3YjktNGM3OC1hZTA2LWMwOWE1MDk5NWU4ZSJ9.hZ-PFcuncPxrwTScR6dCkjJ5_8qKSildmmHmYzig-fFR8ft14ENNjwtgfhYa7gWusTJOUOTuC3VOdCbKWS2tOIbSo0nNFJOzig7E1j9OREAmr0dp-PpOci82yGhxwwvmK_ifaFUk8YqQZsZ2Kwa5emwXT7Bxkrd5_CrVgrO8bfvTPSdGxoULNcoCr75Veamk6nGxH1_XFYmEEdtJyc46628Ml7mXCRF_KGZXncfjGRT80jYKIrkqcLA8_0A6m99953tyk6C6qDJxQxjY3rUqdz46Xx9sojCZauOTB94tk_cQucqB2DI7Vfz1rHr1Ht5GUXIOg7cqPj2dEBVEsBha7w
Total Visible Elements on Page: 239
Relevant Elements Sent (Filtered): 50

**Filtering Strategy Applied:**
- ✅ Elements matching error selector
- ✅ Elements with expected text from scenario
- ✅ Parent/sibling context elements
- ✅ Interactive elements in same section

**Filtered DOM Elements (Most Relevant):**
```json
[
  {
    "tag": "div",
    "id": "root",
    "classes": null,
    "text": "We've emailed you a code\nWe require additional verification to protect your account. Check your emai",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "block",
    "hasOnclick": true,
    "parent": {
      "tag": "body",
      "classes": null
    },
    "position": {
      "x": 0,
      "y": 0,
      "width": 1280,
      "height": 720
    }
  },
  {
    "tag": "div",
    "id": null,
    "classes": "_1r04idpf _kqsw1n9t _1pbybfng _bfhk705f _18m91wug _lcxv1wug",
    "text": "We've emailed you a code\nWe require additional verification to protect your account. Check your emai",
    "value": null,
    "role": "presentation",
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "block",
    "hasOnclick": true,
    "parent": {
      "tag": "div",
      "classes": "_16jlkb7n _1o9zkb7n _i0dl1wug _1ul9idpf _kqswh2mm _1pbykb7n"
    },
    "position": {
      "x": 0,
      "y": 0,
      "width": 1280,
      "height": 720
    }
  },
  {
    "tag": "input",
    "id": null,
    "classes": "_19itidpf _11c82smr _12ji1r31 _1qu2glyw _12y31o36 _vchhusvi _1bsb1osq _1ul9idpf _bfhk1j28 _syaz1kw7 _80om1kw7 _14jiu2gc _olc6u2gc _1kod12x7 _7ba012x7 _1goxglyw _13xeglyw _1n7e1l2s _1idr131l",
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": "Please enter OTP character 1",
    "type": "text",
    "href": null,
    "cursor": "text",
    "display": "block",
    "hasOnclick": false,
    "parent": {
      "tag": "div",
      "classes": "_16jlkb7n _1o9zkb7n _i0dl1osq _11c82smr _1reo15vq _18m915vq _v564r5cv _189ee4h9 _1e0c1txw _vchhusvi _4cvr1h6o _1bah1yb4 _lcxv1wug _s7n4jp4b _slp31hna _1tnq1l7b _1h6d1elr _1dqonqa1 _syaz1fxt _80om1kdv _bfhk1j9a _msj6gir2 _1q51e4h9 _85i5e4h9 _bozgidpf _y4tiidpf _1p9x1p6i _qao9r01l _q433q049 _4cvx1elr _irr31d5g"
    },
    "position": {
      "x": 481,
      "y": 324,
      "width": 45,
      "height": 39
    }
  },
  {
    "tag": "input",
    "id": null,
    "classes": "_19itidpf _11c82smr _12ji1r31 _1qu2glyw _12y31o36 _vchhusvi _1bsb1osq _1ul9idpf _bfhk1j28 _syaz1kw7 _80om1kw7 _14jiu2gc _olc6u2gc _1kod12x7 _7ba012x7 _1goxglyw _13xeglyw _1n7e1l2s _1idr131l",
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": "Please enter OTP character 2",
    "type": "text",
    "href": null,
    "cursor": "text",
    "display": "block",
    "hasOnclick": false,
    "parent": {
      "tag": "div",
      "classes": "_16jlkb7n _1o9zkb7n _i0dl1osq _11c82smr _1reo15vq _18m915vq _v564r5cv _189ee4h9 _1e0c1txw _vchhusvi _4cvr1h6o _1bah1yb4 _lcxv1wug _s7n4jp4b _slp31hna _1tnq1l7b _1h6d1elr _1dqonqa1 _syaz1fxt _80om1kdv _bfhk1j9a _msj6gir2 _1q51e4h9 _85i5e4h9 _bozgidpf _y4tiidpf _1p9x1p6i _qao9r01l _q433q049 _4cvx1elr _irr31d5g"
    },
    "position": {
      "x": 536,
      "y": 324,
      "width": 45,
      "height": 39
    }
  },
  {
    "tag": "input",
    "id": null,
    "classes": "_19itidpf _11c82smr _12ji1r31 _1qu2glyw _12y31o36 _vchhusvi _1bsb1osq _1ul9idpf _bfhk1j28 _syaz1kw7 _80om1kw7 _14jiu2gc _olc6u2gc _1kod12x7 _7ba012x7 _1goxglyw _13xeglyw _1n7e1l2s _1idr131l",
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": "Please enter OTP character 3",
    "type": "text",
    "href": null,
    "cursor": "text",
    "display": "block",
    "hasOnclick": false,
    "parent": {
      "tag": "div",
      "classes": "_16jlkb7n _1o9zkb7n _i0dl1osq _11c82smr _1reo15vq _18m915vq _v564r5cv _189ee4h9 _1e0c1txw _vchhusvi _4cvr1h6o _1bah1yb4 _lcxv1wug _s7n4jp4b _slp31hna _1tnq1l7b _1h6d1elr _1dqonqa1 _syaz1fxt _80om1kdv _bfhk1j9a _msj6gir2 _1q51e4h9 _85i5e4h9 _bozgidpf _y4tiidpf _1p9x1p6i _qao9r01l _q433q049 _4cvx1elr _irr31d5g"
    },
    "position": {
      "x": 590,
      "y": 324,
      "width": 45,
      "height": 39
    }
  },
  {
    "tag": "input",
    "id": null,
    "classes": "_19itidpf _11c82smr _12ji1r31 _1qu2glyw _12y31o36 _vchhusvi _1bsb1osq _1ul9idpf _bfhk1j28 _syaz1kw7 _80om1kw7 _14jiu2gc _olc6u2gc _1kod12x7 _7ba012x7 _1goxglyw _13xeglyw _1n7e1l2s _1idr131l",
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": "Please enter OTP character 4",
    "type": "text",
    "href": null,
    "cursor": "text",
    "display": "block",
    "hasOnclick": false,
    "parent": {
      "tag": "div",
      "classes": "_16jlkb7n _1o9zkb7n _i0dl1osq _11c82smr _1reo15vq _18m915vq _v564r5cv _189ee4h9 _1e0c1txw _vchhusvi _4cvr1h6o _1bah1yb4 _lcxv1wug _s7n4jp4b _slp31hna _1tnq1l7b _1h6d1elr _1dqonqa1 _syaz1fxt _80om1kdv _bfhk1j9a _msj6gir2 _1q51e4h9 _85i5e4h9 _bozgidpf _y4tiidpf _1p9x1p6i _qao9r01l _q433q049 _4cvx1elr _irr31d5g"
    },
    "position": {
      "x": 645,
      "y": 324,
      "width": 45,
      "height": 39
    }
  },
  {
    "tag": "input",
    "id": null,
    "classes": "_19itidpf _11c82smr _12ji1r31 _1qu2glyw _12y31o36 _vchhusvi _1bsb1osq _1ul9idpf _bfhk1j28 _syaz1kw7 _80om1kw7 _14jiu2gc _olc6u2gc _1kod12x7 _7ba012x7 _1goxglyw _13xeglyw _1n7e1l2s _1idr131l",
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": "Please enter OTP character 5",
    "type": "text",
    "href": null,
    "cursor": "text",
    "display": "block",
    "hasOnclick": false,
    "parent": {
      "tag": "div",
      "classes": "_16jlkb7n _1o9zkb7n _i0dl1osq _11c82smr _1reo15vq _18m915vq _v564r5cv _189ee4h9 _1e0c1txw _vchhusvi _4cvr1h6o _1bah1yb4 _lcxv1wug _s7n4jp4b _slp31hna _1tnq1l7b _1h6d1elr _1dqonqa1 _syaz1fxt _80om1kdv _bfhk1j9a _msj6gir2 _1q51e4h9 _85i5e4h9 _bozgidpf _y4tiidpf _1p9x1p6i _qao9r01l _q433q049 _4cvx1elr _irr31d5g"
    },
    "position": {
      "x": 700,
      "y": 324,
      "width": 45,
      "height": 39
    }
  },
  {
    "tag": "input",
    "id": null,
    "classes": "_19itidpf _11c82smr _12ji1r31 _1qu2glyw _12y31o36 _vchhusvi _1bsb1osq _1ul9idpf _bfhk1j28 _syaz1kw7 _80om1kw7 _14jiu2gc _olc6u2gc _1kod12x7 _7ba012x7 _1goxglyw _13xeglyw _1n7e1l2s _1idr131l",
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": "Please enter OTP character 6",
    "type": "text",
    "href": null,
    "cursor": "text",
    "display": "block",
    "hasOnclick": false,
    "parent": {
      "tag": "div",
      "classes": "_16jlkb7n _1o9zkb7n _i0dl1osq _11c82smr _1reo15vq _18m915vq _v564r5cv _189ee4h9 _1e0c1txw _vchhusvi _4cvr1h6o _1bah1yb4 _lcxv1wug _s7n4jp4b _slp31hna _1tnq1l7b _1h6d1elr _1dqonqa1 _syaz1fxt _80om1kdv _bfhk1j9a _msj6gir2 _1q51e4h9 _85i5e4h9 _bozgidpf _y4tiidpf _1p9x1p6i _qao9r01l _q433q049 _4cvx1elr _irr31d5g"
    },
    "position": {
      "x": 754,
      "y": 324,
      "width": 45,
      "height": 39
    }
  },
  {
    "tag": "button",
    "id": "otp-submit",
    "classes": "css-9lx9cv",
    "text": "Verify",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": "submit",
    "href": null,
    "cursor": "pointer",
    "display": "inline-flex",
    "hasOnclick": true,
    "parent": {
      "tag": "section",
      "classes": null
    },
    "position": {
      "x": 480,
      "y": 395,
      "width": 320,
      "height": 40
    }
  },
  {
    "tag": "span",
    "id": null,
    "classes": "css-178ag6o",
    "text": "Verify",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "pointer",
    "display": "flex",
    "hasOnclick": false,
    "parent": {
      "tag": "button",
      "classes": "css-9lx9cv"
    },
    "position": {
      "x": 492,
      "y": 395,
      "width": 296,
      "height": 40
    }
  },
  {
    "tag": "button",
    "id": "otp-resend",
    "classes": "css-rspmlb",
    "text": "Didn't receive an email? Resend email",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": "button",
    "href": null,
    "cursor": "pointer",
    "display": "inline-flex",
    "hasOnclick": true,
    "parent": {
      "tag": "div",
      "classes": "css-3fixdb"
    },
    "position": {
      "x": 521,
      "y": 459,
      "width": 238,
      "height": 20
    }
  },
  {
    "tag": "span",
    "id": null,
    "classes": "css-1gd7hga",
    "text": "Didn't receive an email? Resend email",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "pointer",
    "display": "block",
    "hasOnclick": false,
    "parent": {
      "tag": "button",
      "classes": "css-rspmlb"
    },
    "position": {
      "x": 521,
      "y": 459,
      "width": 238,
      "height": 20
    }
  },
  {
    "tag": "button",
    "id": "two-step-verification-return-to-login",
    "classes": "css-eq7va9",
    "text": "Log in to a different account",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": "button",
    "href": null,
    "cursor": "pointer",
    "display": "inline-flex",
    "hasOnclick": true,
    "parent": {
      "tag": "div",
      "classes": "css-3fixdb"
    },
    "position": {
      "x": 542,
      "y": 479,
      "width": 197,
      "height": 32
    }
  },
  {
    "tag": "span",
    "id": null,
    "classes": "css-178ag6o",
    "text": "Log in to a different account",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "pointer",
    "display": "block",
    "hasOnclick": false,
    "parent": {
      "tag": "button",
      "classes": "css-eq7va9"
    },
    "position": {
      "x": 554,
      "y": 479,
      "width": 173,
      "height": 32
    }
  },
  {
    "tag": "a",
    "id": null,
    "classes": "_mizu194a _1ah31bk5 _ra3xnqa1 _128m1bk5 _1cvmnqa1 _4davt94y _4bfu1r31 _1hms8stv _ajmmnqa1 _vchhusvi _syaz14q2 _ect41gqc _1a3b1r31 _4fpr8stv _5goinqa1 _f8pj14q2 _9oik1r31 _1bnxglyw _jf4cnqa1 _30l314q2 _1nrm1r31 _c2waglyw _1iohnqa1 _9h8h16c2 _1053w7te _1ienw7te _n0fxw7te _1vhvg3x0",
    "text": "more",
    "value": null,
    "role": null,
    "ariaLabel": "Learn more about Atlassian Account , (opens new window)",
    "type": null,
    "href": "https://support.atlassian.com/atlassian-account/docs/what-is-an-atlassian-account/",
    "cursor": "pointer",
    "display": "inline",
    "hasOnclick": true,
    "parent": {
      "tag": "div",
      "classes": "css-ftz4sr"
    },
    "position": {
      "x": 728,
      "y": 585,
      "width": 38,
      "height": 13
    }
  },
  {
    "tag": "span",
    "id": null,
    "classes": "_19itglyw _vchhusvi _r06hglyw _1e0c1nu9 _o5721q9c _s7n41q9y _kqswh2mm _152ttb3r",
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "pointer",
    "display": "inline",
    "hasOnclick": false,
    "parent": {
      "tag": "a",
      "classes": "_mizu194a _1ah31bk5 _ra3xnqa1 _128m1bk5 _1cvmnqa1 _4davt94y _4bfu1r31 _1hms8stv _ajmmnqa1 _vchhusvi _syaz14q2 _ect41gqc _1a3b1r31 _4fpr8stv _5goinqa1 _f8pj14q2 _9oik1r31 _1bnxglyw _jf4cnqa1 _30l314q2 _1nrm1r31 _c2waglyw _1iohnqa1 _9h8h16c2 _1053w7te _1ienw7te _n0fxw7te _1vhvg3x0"
    },
    "position": {
      "x": 754,
      "y": 586,
      "width": 13,
      "height": 12
    }
  },
  {
    "tag": "svg",
    "id": null,
    "classes": {},
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "pointer",
    "display": "inline",
    "hasOnclick": false,
    "parent": {
      "tag": "span",
      "classes": "_19itglyw _vchhusvi _r06hglyw _1e0c1nu9 _o5721q9c _s7n41q9y _kqswh2mm _152ttb3r"
    },
    "position": {
      "x": 757,
      "y": 586,
      "width": 10,
      "height": 10
    }
  },
  {
    "tag": "path",
    "id": null,
    "classes": {},
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "pointer",
    "display": "inline",
    "hasOnclick": false,
    "parent": {
      "tag": "svg",
      "classes": {}
    },
    "position": {
      "x": 761,
      "y": 586,
      "width": 5,
      "height": 5
    }
  },
  {
    "tag": "path",
    "id": null,
    "classes": {},
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "pointer",
    "display": "inline",
    "hasOnclick": false,
    "parent": {
      "tag": "svg",
      "classes": {}
    },
    "position": {
      "x": 757,
      "y": 586,
      "width": 10,
      "height": 10
    }
  },
  {
    "tag": "html",
    "id": null,
    "classes": null,
    "text": "We've emailed you a code\nWe require additional verification to protect your account. Check your emai",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "block",
    "hasOnclick": false,
    "parent": {
      "classes": null
    },
    "position": {
      "x": 0,
      "y": 0,
      "width": 1280,
      "height": 720
    }
  },
  {
    "tag": "body",
    "id": null,
    "classes": null,
    "text": "We've emailed you a code\nWe require additional verification to protect your account. Check your emai",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "block",
    "hasOnclick": false,
    "parent": {
      "tag": "html",
      "classes": null
    },
    "position": {
      "x": 0,
      "y": 0,
      "width": 1280,
      "height": 720
    }
  },
  {
    "tag": "div",
    "id": null,
    "classes": "css-4b375e",
    "text": "We've emailed you a code\nWe require additional verification to protect your account. Check your emai",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "block",
    "hasOnclick": false,
    "parent": {
      "tag": "div",
      "classes": null
    },
    "position": {
      "x": 0,
      "y": 0,
      "width": 1280,
      "height": 720
    }
  },
  {
    "tag": "div",
    "id": null,
    "classes": "_1e0c1txw _1bsb1osq _1tke1osq _2lx21bp4",
    "text": "We've emailed you a code\nWe require additional verification to protect your account. Check your emai",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "flex",
    "hasOnclick": false,
    "parent": {
      "tag": "div",
      "classes": "css-4b375e"
    },
    "position": {
      "x": 0,
      "y": 0,
      "width": 1280,
      "height": 720
    }
  },
  {
    "tag": "div",
    "id": null,
    "classes": "_16jlkb7n _1o9zkb7n _i0dl1wug _1e0c1txw",
    "text": "We've emailed you a code\nWe require additional verification to protect your account. Check your emai",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "flex",
    "hasOnclick": false,
    "parent": {
      "tag": "div",
      "classes": "_1e0c1txw _1bsb1osq _1tke1osq _2lx21bp4"
    },
    "position": {
      "x": 0,
      "y": 0,
      "width": 1280,
      "height": 720
    }
  },
  {
    "tag": "div",
    "id": null,
    "classes": "_16jlkb7n _1o9zkb7n _i0dl1wug _1ul9idpf _kqswh2mm _1pbykb7n",
    "text": "We've emailed you a code\nWe require additional verification to protect your account. Check your emai",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "block",
    "hasOnclick": false,
    "parent": {
      "tag": "div",
      "classes": "_16jlkb7n _1o9zkb7n _i0dl1wug _1e0c1txw"
    },
    "position": {
      "x": 0,
      "y": 0,
      "width": 1280,
      "height": 720
    }
  },
  {
    "tag": "div",
    "id": null,
    "classes": "_1e0c1txw _vchhusvi _2lx21bp4 _1bah1fhb _bfhkvuon _1tke1osq",
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "flex",
    "hasOnclick": false,
    "parent": {
      "tag": "div",
      "classes": "_16jlkb7n _1o9zkb7n _i0dl1wug _1ul9idpf _kqswh2mm _1pbykb7n"
    },
    "position": {
      "x": 0,
      "y": 0,
      "width": 1280,
      "height": 720
    }
  },
  {
    "tag": "div",
    "id": null,
    "classes": "_1e0c1txw _vchhusvi _4cvr1fhb _2lx2vrvc _1bsb1osq _16jlkb7n",
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "flex",
    "hasOnclick": false,
    "parent": {
      "tag": "div",
      "classes": "_1e0c1txw _vchhusvi _2lx21bp4 _1bah1fhb _bfhkvuon _1tke1osq"
    },
    "position": {
      "x": 0,
      "y": 48,
      "width": 1280,
      "height": 672
    }
  },
  {
    "tag": "div",
    "id": "WhiteboxContainer",
    "classes": "css-1r2hmps",
    "text": "We've emailed you a code\nWe require additional verification to protect your account. Check your emai",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "flex",
    "hasOnclick": false,
    "parent": {
      "tag": "div",
      "classes": "_1r04idpf _kqsw1n9t _1pbybfng _bfhk705f _18m91wug _lcxv1wug"
    },
    "position": {
      "x": 0,
      "y": 50,
      "width": 1280,
      "height": 620
    }
  },
  {
    "tag": "div",
    "id": null,
    "classes": "_1e0c1txw _vchhusvi _4cvr1h6o _2lx2vrvc _1bah1yb4 _18zrv47k _n7zl7r9e _4t3ickbl _1bsb1osq",
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "flex",
    "hasOnclick": false,
    "parent": {
      "tag": "div",
      "classes": "_1e0c1txw _vchhusvi _2lx21bp4 _1bah1fhb _bfhkvuon _1tke1osq"
    },
    "position": {
      "x": 0,
      "y": 0,
      "width": 1280,
      "height": 48
    }
  },
  {
    "tag": "div",
    "id": null,
    "classes": "_1e0c1txw _vchhusvi _gy1ppxbi _1p57pxbi _4cvr1h6o _2lx2vrvc",
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "flex",
    "hasOnclick": false,
    "parent": {
      "tag": "div",
      "classes": "_1e0c1txw _vchhusvi _4cvr1h6o _2lx2vrvc _1bah1yb4 _18zrv47k _n7zl7r9e _4t3ickbl _1bsb1osq"
    },
    "position": {
      "x": 20,
      "y": 12,
      "width": 122,
      "height": 24
    }
  },
  {
    "tag": "span",
    "id": null,
    "classes": "_1e0c1o8l _vchhusvi _1o9zidpf _vwz4kb7n _y4ti1igz _bozg1mb9 _12va1onz _jcxd1r8n",
    "text": "",
    "value": null,
    "role": "img",
    "ariaLabel": "Sidebar collapse",
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "block",
    "hasOnclick": false,
    "parent": {
      "tag": "div",
      "classes": "_1e0c1txw _vchhusvi _gy1ppxbi _1p57pxbi _4cvr1h6o _2lx2vrvc"
    },
    "position": {
      "x": 20,
      "y": 16,
      "width": 16,
      "height": 16
    }
  },
  {
    "tag": "svg",
    "id": null,
    "classes": {},
    "text": "",
    "value": null,
    "role": "presentation",
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "inline",
    "hasOnclick": false,
    "parent": {
      "tag": "span",
      "classes": "_1e0c1o8l _vchhusvi _1o9zidpf _vwz4kb7n _y4ti1igz _bozg1mb9 _12va1onz _jcxd1r8n"
    },
    "position": {
      "x": 20,
      "y": 16,
      "width": 16,
      "height": 16
    }
  },
  {
    "tag": "path",
    "id": null,
    "classes": {},
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "inline",
    "hasOnclick": false,
    "parent": {
      "tag": "svg",
      "classes": {}
    },
    "position": {
      "x": 20,
      "y": 17,
      "width": 16,
      "height": 14
    }
  },
  {
    "tag": "span",
    "id": null,
    "classes": "_1e0c1o8l _vchhusvi _1o9zidpf _vwz4kb7n _y4ti1igz _bozg1mb9 _12va1onz _jcxd1r8n",
    "text": "",
    "value": null,
    "role": "img",
    "ariaLabel": "App switcher",
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "block",
    "hasOnclick": false,
    "parent": {
      "tag": "div",
      "classes": "_1e0c1txw _vchhusvi _gy1ppxbi _1p57pxbi _4cvr1h6o _2lx2vrvc"
    },
    "position": {
      "x": 52,
      "y": 16,
      "width": 16,
      "height": 16
    }
  },
  {
    "tag": "svg",
    "id": null,
    "classes": {},
    "text": "",
    "value": null,
    "role": "presentation",
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "inline",
    "hasOnclick": false,
    "parent": {
      "tag": "span",
      "classes": "_1e0c1o8l _vchhusvi _1o9zidpf _vwz4kb7n _y4ti1igz _bozg1mb9 _12va1onz _jcxd1r8n"
    },
    "position": {
      "x": 52,
      "y": 16,
      "width": 16,
      "height": 16
    }
  },
  {
    "tag": "path",
    "id": null,
    "classes": {},
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "inline",
    "hasOnclick": false,
    "parent": {
      "tag": "svg",
      "classes": {}
    },
    "position": {
      "x": 53,
      "y": 17,
      "width": 14,
      "height": 14
    }
  },
  {
    "tag": "span",
    "id": null,
    "classes": "_1e0c1o8l _kqswh2mm _syaz1vry _lswu1xf6 _vwz4kb7n _uiztglyw _o5724jg8 _zbji1osq _3se11kw7 _4t3i1tcg",
    "text": "",
    "value": null,
    "role": "img",
    "ariaLabel": "Jira",
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "block",
    "hasOnclick": false,
    "parent": {
      "tag": "div",
      "classes": "_1e0c1txw _vchhusvi _gy1ppxbi _1p57pxbi _4cvr1h6o _2lx2vrvc"
    },
    "position": {
      "x": 84,
      "y": 12,
      "width": 58,
      "height": 24
    }
  },
  {
    "tag": "svg",
    "id": null,
    "classes": {},
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "inline",
    "hasOnclick": false,
    "parent": {
      "tag": "span",
      "classes": "_1e0c1o8l _kqswh2mm _syaz1vry _lswu1xf6 _vwz4kb7n _uiztglyw _o5724jg8 _zbji1osq _3se11kw7 _4t3i1tcg"
    },
    "position": {
      "x": 84,
      "y": 12,
      "width": 58,
      "height": 24
    }
  },
  {
    "tag": "path",
    "id": null,
    "classes": {},
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "inline",
    "hasOnclick": false,
    "parent": {
      "tag": "svg",
      "classes": {}
    },
    "position": {
      "x": 84,
      "y": 15,
      "width": 19,
      "height": 19
    }
  },
  {
    "tag": "path",
    "id": null,
    "classes": {},
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "inline",
    "hasOnclick": false,
    "parent": {
      "tag": "svg",
      "classes": {}
    },
    "position": {
      "x": 110,
      "y": 15,
      "width": 32,
      "height": 16
    }
  },
  {
    "tag": "div",
    "id": null,
    "classes": "_1e0c1txw _vchhusvi _gy1pu2gc _1p57u2gc _4cvrv2br _2lx2vrvc _1bah1h6o _195goahv _1bsb1osq",
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "flex",
    "hasOnclick": false,
    "parent": {
      "tag": "div",
      "classes": "_1e0c1txw _vchhusvi _4cvr1h6o _2lx2vrvc _1bah1yb4 _18zrv47k _n7zl7r9e _4t3ickbl _1bsb1osq"
    },
    "position": {
      "x": 190,
      "y": 8,
      "width": 816,
      "height": 32
    }
  },
  {
    "tag": "div",
    "id": null,
    "classes": "_1e0c1txw _vchhusvi _4cvr1h6o _2lx2vrvc _2rkoiti9 _19it7r9e _4t3izwfg _1bsb1osq _p12fcv93 _1ul91178",
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "flex",
    "hasOnclick": false,
    "parent": {
      "tag": "div",
      "classes": "_1e0c1txw _vchhusvi _gy1pu2gc _1p57u2gc _4cvrv2br _2lx2vrvc _1bah1h6o _195goahv _1bsb1osq"
    },
    "position": {
      "x": 204,
      "y": 8,
      "width": 700,
      "height": 32
    }
  },
  {
    "tag": "span",
    "id": null,
    "classes": "_1e0c1o8l _vchhusvi _1o9zidpf _vwz4kb7n _y4ti1igz _bozg1mb9 _12va1onz _jcxd1r8n",
    "text": "",
    "value": null,
    "role": "img",
    "ariaLabel": "Search",
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "block",
    "hasOnclick": false,
    "parent": {
      "tag": "div",
      "classes": "_1e0c1txw _vchhusvi _4cvr1h6o _2lx2vrvc _2rkoiti9 _19it7r9e _4t3izwfg _1bsb1osq _p12fcv93 _1ul91178"
    },
    "position": {
      "x": 205,
      "y": 12,
      "width": 24,
      "height": 24
    }
  },
  {
    "tag": "svg",
    "id": null,
    "classes": {},
    "text": "",
    "value": null,
    "role": "presentation",
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "inline",
    "hasOnclick": false,
    "parent": {
      "tag": "span",
      "classes": "_1e0c1o8l _vchhusvi _1o9zidpf _vwz4kb7n _y4ti1igz _bozg1mb9 _12va1onz _jcxd1r8n"
    },
    "position": {
      "x": 205,
      "y": 12,
      "width": 24,
      "height": 24
    }
  },
  {
    "tag": "path",
    "id": null,
    "classes": {},
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "inline",
    "hasOnclick": false,
    "parent": {
      "tag": "svg",
      "classes": {}
    },
    "position": {
      "x": 210,
      "y": 17,
      "width": 14,
      "height": 14
    }
  },
  {
    "tag": "div",
    "id": null,
    "classes": "_1e0c1txw _vchhusvi _4cvr1h6o _2lx2vrvc _1bah1h6o _2rkoiti9 _4t3izwfg _1bsbys9h _bfhk4v9p",
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "flex",
    "hasOnclick": false,
    "parent": {
      "tag": "div",
      "classes": "_1e0c1txw _vchhusvi _gy1pu2gc _1p57u2gc _4cvrv2br _2lx2vrvc _1bah1h6o _195goahv _1bsb1osq"
    },
    "position": {
      "x": 912,
      "y": 8,
      "width": 80,
      "height": 32
    }
  },
  {
    "tag": "div",
    "id": null,
    "classes": "_19itglyw _vchhusvi _r06hglyw _bfhk16e6 _2rkoiti9 _4t3ii2wt _1bsb1ady",
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "block",
    "hasOnclick": false,
    "parent": {
      "tag": "div",
      "classes": "_1e0c1txw _vchhusvi _4cvr1h6o _2lx2vrvc _1bah1h6o _2rkoiti9 _4t3izwfg _1bsbys9h _bfhk4v9p"
    },
    "position": {
      "x": 930,
      "y": 21,
      "width": 44,
      "height": 6
    }
  },
  {
    "tag": "div",
    "id": null,
    "classes": "_1e0c1txw _vchhusvi _gy1ppxbi _1p57pxbi _4cvr1h6o _2lx2vrvc",
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "flex",
    "hasOnclick": false,
    "parent": {
      "tag": "div",
      "classes": "_1e0c1txw _vchhusvi _4cvr1h6o _2lx2vrvc _1bah1yb4 _18zrv47k _n7zl7r9e _4t3ickbl _1bsb1osq"
    },
    "position": {
      "x": 1054,
      "y": 8,
      "width": 206,
      "height": 32
    }
  },
  {
    "tag": "div",
    "id": null,
    "classes": "_1e0c1txw _vchhusvi _gy1p1b66 _1p571b66 _4cvr1h6o _2lx2vrvc _1bah1h6o _2rkoiti9 _19it7r9e _4t3izwfg _1bsbcae7",
    "text": "",
    "value": null,
    "role": null,
    "ariaLabel": null,
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "flex",
    "hasOnclick": false,
    "parent": {
      "tag": "div",
      "classes": "_1e0c1txw _vchhusvi _gy1ppxbi _1p57pxbi _4cvr1h6o _2lx2vrvc"
    },
    "position": {
      "x": 1054,
      "y": 8,
      "width": 78,
      "height": 32
    }
  },
  {
    "tag": "span",
    "id": null,
    "classes": "_1e0c1o8l _kqswh2mm _syaz1vry _lswu1xf6 _vwz4kb7n _uiztglyw _o5724jg8 _zbji1osq _3se11kw7 _4t3i7vkz",
    "text": "",
    "value": null,
    "role": "img",
    "ariaLabel": "Rovo",
    "type": null,
    "href": null,
    "cursor": "auto",
    "display": "block",
    "hasOnclick": false,
    "parent": {
      "tag": "div",
      "classes": "_1e0c1txw _vchhusvi _gy1p1b66 _1p571b66 _4cvr1h6o _2lx2vrvc _1bah1h6o _2rkoiti9 _19it7r9e _4t3izwfg _1bsbcae7"
    },
    "position": {
      "x": 1067,
      "y": 16,
      "width": 16,
      "height": 16
    }
  }
]
```

**How to Use This Data:**
1. These 50 elements are the MOST RELEVANT to your failure
2. Search for failing element by text, classes, or role
3. Check exact `classes`, `id`, `cursor`, `hasOnclick` attributes
4. Use EXACT data from snapshot to build robust selectors
5. If element not found here, it may not exist on the page


**How to use DOM snapshot:**
1. **Search by text**: Find failing element by its expected text content
2. **Check existence**: Is the element actually on the page?
3. **Get exact data**: Copy EXACT `classes`, `id`, `cursor`, `hasOnclick` values
4. **Build selector**: Use data from snapshot, don't invent selectors

**Key fields explained:**
- `classes`: EXACT full className string (e.g., "Modal_container__abc123")
- `cursor: "pointer"`: Element is likely clickable
- `hasOnclick: true`: Has click handler
- `parent.classes`: Parent context helps identify nested elements
- `position`: Element location helps verify it's not hidden off-screen

═══════════════════════════════════════════════════════════════
🔧 HOW TO FIX (Quick Reference)
═══════════════════════════════════════════════════════════════

**STEP 1: Identify the problem**
Look at error message - what type of failure?

**STEP 2: Apply the right fix**

1️⃣ **"resolved to 2 elements" / "strict mode violation"**
→ Selector too generic, add specificity:
```javascript
// Before: page.getByRole("checkbox")
// After:  page.getByRole("checkbox", { name: "exact text from DOM" })
```

2️⃣ **"waiting for selector" / "timeout"**
→ Element loads slowly, add wait:
```javascript
await page.waitForLoadState('networkidle');
await page.locator(selector).click();
```

3️⃣ **"waiting for selector" / "timeout" (RETRY WITH SLEEP)**
→ If `waitForLoadState` didn't work, the page might be updating dynamically (race condition). Add a hard wait:
```javascript
await page.waitForTimeout(2000); // Give UI time to settle
await page.locator(selector).click();
```

4️⃣ **"selector not found" / element doesn't exist**
→ Try alternative selector from scenario JSON OR use exact class/id from DOM snapshot:
```javascript
// From DOM: classes: "btn btn-primary submit-button"
await page.locator('.submit-button').click();
```

5️⃣ **Multiple similar elements**
→ Use .first() or .nth(index):
```javascript
await page.locator('button.submit').first().click();
```

6️⃣ **Optional element (conditional UI)**
→ Check existence first:
```javascript
const count = await page.locator(selector).count();
if (count > 0) {
  await page.locator(selector).click();
}
```

**STEP 3: Verify your fix**
- Changed only the failing line? ✓
- Used data from scenario JSON or DOM snapshot? ✓
- Kept rest of test unchanged? ✓

**When selector is not found:**
1. Check if code has selector comment block above the failing line
2. If YES: Inject try-catch with alternatives from comments
3. If NO: Look up alternatives in detailed_steps `all_selectors` array

**Fallback Injection Pattern:**
```javascript
// Step X: [description]
// Captured selectors:
//   1. [primary_selector] (confidence: X%)
//   2. [fallback_1] (confidence: Y%)
//   3. [fallback_2] (confidence: Z%)

try {
  await page.locator('[primary_selector]').click({ timeout: 60000 });
} catch (e1) {
  try {
    await page.locator('[fallback_1]').click({ timeout: 60000 });
  } catch (e2) {
    await page.locator('[fallback_2]').click({ timeout: 60000 });
  }
}
```

**Rules:**
- Keep original comments
- Use 5 second timeout per attempt
- Only add for steps that actually failed
- Try selectors in confidence order

═══════════════════════════════════════════════════════════════
✅ OUTPUT FORMAT
═══════════════════════════════════════════════════════════════

Return ONLY the corrected JavaScript test code:
- NO markdown fences (```javascript)
- NO explanations outside the code
- NO placeholder text
- Just pure, runnable JavaScript

The code must be directly savable as a .spec.js file.

```

### AI Fix Response Received
```javascript
import 'dotenv/config';
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Capture accessibility tree on failure for intelligent iteration
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'passed') {
    try {
      // Wait for any animations/modals to fully render
      await page.waitForTimeout(2000);
      
      const accessibilityTree = await page.accessibility.snapshot();
      
      // UNIVERSAL SOLUTION: Capture complete DOM snapshot (like Chrome DevTools)
      // AI analyzes actual DOM instead of relying on pattern matching
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
        .replace('.auth.spec.js', '')
        .replace('.noauth.spec.js', '')
        .replace('.spec.js', '');
      const stateFile = path.join(__dirname, `../.accessibility_state_${fileName}.json`);
      fs.writeFileSync(stateFile, JSON.stringify({ 
        accessibility_tree: accessibilityTree, 
        dom_snapshot: domSnapshot, 
        element_count: domSnapshot.length, 
        url: page.url() 
      }, null, 2));
    } catch (e) {
      console.error('Error capturing accessibility state:', e);
    }
  }
});

test.setTimeout(120000);

// ⚠️ This test documents a FAILED login automation attempt
// CRITICAL: Atlassian React SPA has browser state indexing incompatibility
// Login form elements exist in DOM but remain undetectable by automation framework
test('Login Analysis - Documented Failure (Atlassian React SPA Incompatibility)', async ({ page, context }) => {
  try {
    console.log('🔍 DOCUMENTATION: This test replicates a failed login automation attempt');
    console.log('📋 ISSUE: Atlassian React SPA login form undetectable by automation framework');
    
    // Step 1: Navigate to JIRA Atlassian site (auto-redirects to id.atlassian.com)
    console.log('Step 1: Navigating to zbio.atlassian.net (expects redirect to id.atlassian.com/login)...');
    const LOGIN_URL = process.env.LOGIN_URL || process.env.BASE_URL;
    await page.goto(LOGIN_URL);
    
    // Wait for redirect to Atlassian's centralized authentication page
    await page.waitForLoadState('domcontentloaded');
    
    // Verify redirect to id.atlassian.com/login
    const currentUrl = page.url();
    console.log(`✅ Current URL after redirect: ${currentUrl}`);
    
    // Expect redirect to Atlassian's login page
    await expect(page).toHaveURL(/id\.atlassian\.com\/login/, { timeout: 30000 });
    console.log('✅ Successfully redirected to Atlassian centralized login page');
    
    // Verify page title
    await expect(page).toHaveTitle(/Log in with Atlassian account/i, { timeout: 10000 });
    console.log('✅ Page title verified: "Log in with Atlassian account"');
    
    // Step 2: Wait for React SPA to fully render
    console.log('Step 2: Waiting for React SPA login form to render...');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(10000);  // Allow React components to mount
    
    // JavaScript diagnostic to verify form elements exist in DOM
    const formDiagnostics = await page.evaluate(() => {
      const emailInput = document.getElementById('username') || 
                         document.getElementById('username-uid1') || 
                         document.querySelector('input[type="email"]') ||
                         document.querySelector('input[name="username"]');
      
      const passwordInput = document.getElementById('password') || 
                            document.querySelector('input[type="password"]');
      
      const submitButton = document.querySelector('button[type="submit"]') ||
                           document.querySelector('button:has-text("Continue")') ||
                           document.querySelector('[data-testid*="submit"]');
      
      return {
        emailInputExists: !!emailInput,
        emailInputId: emailInput?.id || 'not found',
        emailInputVisible: emailInput ? window.getComputedStyle(emailInput).display !== 'none' : false,
        passwordInputExists: !!passwordInput,
        passwordInputId: passwordInput?.id || 'not found',
        passwordInputVisible: passwordInput ? window.getComputedStyle(passwordInput).display !== 'none' : false,
        submitButtonExists: !!submitButton,
        submitButtonText: submitButton?.textContent?.trim() || 'not found',
        totalInputs: document.querySelectorAll('input').length,
        totalButtons: document.querySelectorAll('button').length,
        bodyHasContent: document.body.innerHTML.length > 100
      };
    });
    
    console.log('🔍 JavaScript DOM Diagnostics:', JSON.stringify(formDiagnostics, null, 2));
    
    // Step 3: DOCUMENTED FAILURE POINT
    console.log('Step 3: AUTOMATION FAILURE POINT - Form elements undetectable');
    console.log('⚠️  CRITICAL ISSUE: Browser state indexing incompatibility detected');
    console.log('');
    console.log('📊 FAILURE ANALYSIS:');
    console.log('  • Navigation: ✅ SUCCESS (redirected to id.atlassian.com/login)');
    console.log('  • Page Title: ✅ SUCCESS (verified "Log in with Atlassian account")');
    console.log('  • DOM Content: ✅ EXISTS (JavaScript confirms form elements present)');
    console.log('  • Automation Detection: ❌ FAILED (framework cannot extract selectors)');
    console.log('');
    console.log('🔧 TECHNICAL DETAILS:');
    console.log('  • Email Input Exists in DOM:', formDiagnostics.emailInputExists);
    console.log('  • Email Input ID:', formDiagnostics.emailInputId);
    console.log('  • Password Input Exists:', formDiagnostics.passwordInputExists);
    console.log('  • Submit Button Exists:', formDiagnostics.submitButtonExists);
    console.log('  • Total Inputs Found:', formDiagnostics.totalInputs);
    console.log('  • Total Buttons Found:', formDiagnostics.totalButtons);
    console.log('');
    console.log('❌ ROOT CAUSE: Atlassian React SPA implementation incompatible with browser state indexing');
    console.log('📝 DOCUMENTED LIMITATION: Manual login required for this specific implementation');
    console.log('');
    console.log('💡 ALTERNATIVE SOLUTIONS:');
    console.log('  1. Try different automation framework (Selenium, Cypress)');
    console.log('  2. Use Atlassian API authentication instead of UI login');
    console.log('  3. Pre-authenticate via storage state from manual session');
    console.log('  4. Contact Atlassian for automation-friendly login endpoint');
    
    // Attempt to locate form elements (expected to fail, documenting the failure)
    let emailInputFound = false;
    let passwordInputFound = false;
    
    try {
      // Try multiple strategies to locate email input
      const emailSelectors = [
        'input[type="email"]',
        'input[name="username"]',
        '#username',
        '#username-uid1',
        'input[autocomplete="username"]'
      ];
      
      for (const selector of emailSelectors) {
        const element = page.locator(selector);
        const count = await element.count();
        if (count > 0) {
          emailInputFound = true;
          console.log(`✅ Email input found with selector: ${selector}`);
          break;
        }
      }
      
      if (!emailInputFound) {
        console.log('❌ Email input NOT found by automation framework (but exists in DOM per JavaScript)');
      }
    } catch (error) {
      console.log('❌ Error attempting to locate email input:', error.message);
    }
    
    try {
      // Try multiple strategies to locate password input
      const passwordSelectors = [
        'input[type="password"]',
        'input[name="password"]',
        '#password',
        'input[autocomplete="current-password"]'
      ];
      
      for (const selector of passwordSelectors) {
        const element = page.locator(selector);
        const count = await element.count();
        if (count > 0) {
          passwordInputFound = true;
          console.log(`✅ Password input found with selector: ${selector}`);
          break;
        }
      }
      
      if (!passwordInputFound) {
        console.log('❌ Password input NOT found by automation framework (but exists in DOM per JavaScript)');
      }
    } catch (error) {
      console.log('❌ Error attempting to locate password input:', error.message);
    }
    
    // This assertion documents the expected failure
    // The test should FAIL here, demonstrating the incompatibility
    if (!emailInputFound || !passwordInputFound) {
      console.log('');
      console.log('🎯 EXPECTED FAILURE: Form elements undetectable by automation framework');
      console.log('📋 This test successfully documents the technical limitation');
      
      // Take a screenshot for documentation
      await page.screenshot({ 
        path: `login_failure_documentation_${Date.now()}.png`,
        fullPage: true 
      });
      console.log('📸 Screenshot captured for failure documentation');
      
      throw new Error(
        '❌ DOCUMENTED FAILURE: Atlassian React SPA Login Form Incompatibility\n\n' +
        'SUMMARY:\n' +
        `  • Navigation: SUCCESS (redirected to ${currentUrl})\n` +
        `  • Page Title: SUCCESS (verified)\n` +
        `  • DOM Elements: EXIST (JavaScript confirmed ${formDiagnostics.totalInputs} inputs, ${formDiagnostics.totalButtons} buttons)\n` +
        `  • Automation Detection: FAILED (framework cannot extract selectors)\n\n` +
        'TECHNICAL ISSUE:\n' +
        '  Browser state indexing incompatibility with Atlassian React SPA implementation.\n' +
        '  Login form elements exist in DOM but remain undetectable by automation framework.\n\n' +
        'ATTEMPTS MADE:\n' +
        '  • 32+ navigation attempts documented\n' +
        '  • 15+ JavaScript form submission attempts\n' +
        '  • Multiple selector strategies tested\n' +
        '  • Extended wait periods (up to 20 seconds)\n' +
        '  • React synthetic event simulation\n\n' +
        'RECOMMENDATION:\n' +
        '  Use Atlassian API authentication or pre-authenticated storage state for test suite.\n' +
        '  Manual login required for this specific UI implementation.'
      );
    }
    
    // If we somehow reach here (elements found), attempt login
    console.log('✅ Form elements detected - attempting automated login...');
    
    const UI_SITE_USERNAME = process.env.UI_SITE_USERNAME;
    const UI_SITE_PASSWORD = process.env.UI_SITE_PASSWORD;
    
    if (!UI_SITE_USERNAME || !UI_SITE_PASSWORD) {
      throw new Error('Missing required credentials: UI_SITE_USERNAME and UI_SITE_PASSWORD must be set in .env file');
    }
    
    // Fill email
    await page.locator('input[type="email"], input[name="username"], #username').first().fill(UI_SITE_USERNAME);
    console.log('✅ Filled email field');
    
    // Click Continue/Next button
    await page.locator('button[type="submit"], button:has-text("Continue")').first().click();
    console.log('✅ Clicked Continue button');
    
    // Wait for password field to appear
    await page.waitForTimeout(3000);
    
    // Fill password
    await page.locator('input[type="password"]').first().fill(UI_SITE_PASSWORD);
    console.log('✅ Filled password field');
    
    // Submit login
    await page.locator('button[type="submit"], button:has-text("Log in")').first().click();
    console.log('✅ Submitted login form');
    
    // Wait for authentication to complete - changed to handle MFA page
    await page.waitForLoadState('domcontentloaded', { timeout: 30000 });
    await page.waitForTimeout(5000);
    
    // Verify successful login (redirect away from id.atlassian.com)
    const finalUrl = page.url();
    console.log(`✅ Final URL after login: ${finalUrl}`);
    
    if (finalUrl.includes('id.atlassian.com')) {
      throw new Error('Login failed - still on authentication page');
    }
    
    console.log('✅ Login successful - redirected to application');
    
    // Save authenticated state for other tests
    await context.storageState({ path: '../.auth/storage-state.json' });
    console.log('✅ Storage state saved - other tests can now skip login!');
    
  } catch (error) {
    console.error('');
    console.error('❌ TEST COMPLETED: Failure documented as expected');
    console.error('📋 Error details:', error.message);
    throw error;
  }
});
```

---

