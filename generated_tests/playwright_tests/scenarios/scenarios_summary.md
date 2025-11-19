# Generated Test Scenarios Summary

## Overview

- **Total Scenarios**: 2
- **Application Base URL**: https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC
- **Generated On**: 2025-11-19 09:29:38

## Scenarios

### 1. Login with Invalid Credentials
_Tests the system's behavior when users attempt to log in with invalid authentication credentials. Verifies that the system properly handles incorrect login attempts and displays appropriate error messages._

**Complexity**: Low | **Priority**: High | **Risk Level**: Medium
**Tags**: authentication, negative-testing, login-validation, security
**Est. Execution Time**: 25 seconds | **Flakiness Potential**: Medium

**Type**: negative_authentication_invalid_credentials
**Pages Involved:**
- https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC

#### Steps:
- Navigate to ParaBank login page
- Enter username into the username field
- Enter invalid password into the password field
- Click the Login button to submit invalid credentials
- Verify error message for invalid credentials

#### Selectors Used:
- **Type**: input, **Text**: '', **Selector**: `page.locator(".input").nth(0)`, **Action**: input_text
- **Type**: input, **Text**: '', **Selector**: `page.locator(".input").nth(1)`, **Action**: insert
- **Type**: input, **Text**: '', **Selector**: `page.locator(".button").nth(1)`, **Action**: click

#### Expected Results:
- Page loads successfully with title containing "ParaBank | Welcome | Online Banking"
- Error message indicating invalid credentials is displayed
- User remains on the login page after failed attempt

---

### 2. Login Happy Path and Navigation
_Validates the complete end-to-end login workflow with valid credentials, followed by successful navigation to the Transfer Funds section. This test ensures core authentication functionality works correctly for authorized users._

**Complexity**: Medium | **Priority**: High | **Risk Level**: High
**Tags**: authentication, e2e, login, navigation, core-functionality
**Est. Execution Time**: 30 seconds | **Flakiness Potential**: Medium

**Type**: e2e_authentication_workflow
**Pages Involved:**
- https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC
- https://parabank.parasoft.com/parabank/overview.htm

#### Steps:
- Navigate to ParaBank login page
- Enter username into the username field
- Enter password into the password field
- Click the Login button to submit credentials
- Verify successful login by checking URL change
- Click on Transfer Funds link in navigation menu

#### Selectors Used:
- **Type**: input, **Text**: '', **Selector**: `page.locator(".input").nth(0)`, **Action**: input_text
- **Type**: input, **Text**: '', **Selector**: `page.locator(".input").nth(1)`, **Action**: insert
- **Type**: input, **Text**: '', **Selector**: `page.locator(".button").nth(1)`, **Action**: click
- **Type**: a, **Text**: 'Transfer Funds', **Selector**: `page.getByRole("link", { name: "Transfer Funds" })`, **Action**: click_element_by_index

#### Expected Results:
- Page loads successfully with title containing "ParaBank | Welcome | Online Banking"
- URL changes to accounts overview page after successful login
- User can navigate to Transfer Funds functionality
- Transfer Funds page loads successfully

---