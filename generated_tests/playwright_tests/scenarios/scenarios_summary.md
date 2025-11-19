# Generated Test Scenarios Summary

## Overview

- **Total Scenarios**: 3
- **Application Base URL**: https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC
- **Generated On**: 2025-11-19 05:23:42

## Scenarios

### 1. Login with Invalid Credentials
_Tests the system's handling of authentication attempts with invalid credentials, verifying that appropriate error messages are displayed when incorrect login information is provided._

**Complexity**: Low | **Priority**: Medium | **Risk Level**: Low
**Tags**: authentication, negative-testing, security, form-submission, validation
**Est. Execution Time**: 20 seconds | **Flakiness Potential**: Medium

**Type**: negative_authentication_invalid_credentials
**Pages Involved:**
- https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC

#### Steps:
- Navigate to ParaBank login page
- Enter username in the username field
- Enter invalid password in the password field
- Click login button to submit credentials
- Verify error message is displayed for invalid credentials

#### Selectors Used:
- **Type**: input, **Text**: 'x_username', **Selector**: `page.locator(".input").nth(0)`, **Action**: input_text
- **Type**: input, **Text**: 'INVALID_PASSWORD', **Selector**: `page.locator(".input").nth(1)`, **Action**: input_text
- **Type**: input, **Text**: '', **Selector**: `page.locator(".button").nth(1)`, **Action**: click

#### Expected Results:
- Error message is displayed indicating invalid credentials
- User remains on the login page
- No authentication session is created

---

### 2. Customer Login to ParaBank - E2E Workflow
_This scenario tests the complete customer login journey from the homepage to successful authentication. It validates that a registered customer can enter their credentials, submit the login form, and gain access to their account dashboard. This is a critical path that every user must complete to access banking services._

**Complexity**: Medium | **Priority**: High | **Risk Level**: High
**Tags**: authentication, e2e, critical-path, user-journey, banking-access
**Est. Execution Time**: 25 seconds | **Flakiness Potential**: Medium

**Type**: e2e_workflow
**Pages Involved:**
- https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC
- https://parabank.parasoft.com/parabank/overview.htm

#### Steps:
- Navigate to ParaBank homepage
- Enter username in login form
- Enter password in login form
- Click the Login button to submit credentials
- Verify successful login and account overview display

#### Selectors Used:
- **Type**: input, **Text**: 'john', **Selector**: `input[name='username']`, **Action**: input_text
- **Type**: input, **Text**: 'demo', **Selector**: `input[name='password']`, **Action**: input_text
- **Type**: input, **Text**: '', **Selector**: `input[value='Log In']`, **Action**: click

#### Expected Results:
- User successfully authenticates with valid credentials
- System redirects to the account overview page after authentication
- Account overview displays correct customer information and account details
- Navigation options for authenticated users are accessible
- Login form is replaced with authenticated user interface elements

---

### 3. Login Analysis - Happy Path
_Tests the standard authentication flow with valid credentials, verifying that users can successfully log in and access their account overview page._

**Complexity**: Low | **Priority**: High | **Risk Level**: Medium
**Tags**: authentication, e2e, happy-path, critical-path, login-flow
**Est. Execution Time**: 20 seconds | **Flakiness Potential**: Medium

**Type**: e2e_authentication_workflow
**Pages Involved:**
- https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC
- https://parabank.parasoft.com/parabank/overview.htm

#### Steps:
- Navigate to ParaBank login page
- Enter username in the username field
- Enter password in the password field
- Click login button to submit credentials
- Verify user is successfully logged in and redirected to accounts overview page

#### Selectors Used:
- **Type**: input, **Text**: 'x_username', **Selector**: `page.locator(".input").nth(0)`, **Action**: input_text
- **Type**: input, **Text**: 'x_password', **Selector**: `page.locator(".input").nth(1)`, **Action**: input_text
- **Type**: input, **Text**: '', **Selector**: `page.locator(".button").nth(1)`, **Action**: click

#### Expected Results:
- User is successfully authenticated
- Page URL changes to accounts overview page
- User account information is displayed
- All authenticated user interface elements are visible

---