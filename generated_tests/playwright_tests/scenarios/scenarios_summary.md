# Generated Test Scenarios Summary

## Overview

- **Total Scenarios**: 2
- **Application Base URL**: https://zbio.atlassian.net/
- **Generated On**: 2025-11-19 12:33:14

## Scenarios

### 1. Login Invalid Credentials
_Test authentication failure handling with invalid password to verify error messages and security behavior_

**Complexity**: low | **Priority**: high | **Risk Level**: medium
**Tags**: authentication, negative-testing, security, error-handling, login
**Est. Execution Time**: 25 seconds | **Flakiness Potential**: low

**Type**: negative_authentication_invalid_credentials
**Pages Involved:**
- https://zbio.atlassian.net/
- https://id.atlassian.com/login

#### Steps:
- Navigate to zbio.atlassian.net which redirects to Atlassian ID login page
- Pause for manual entry of valid Atlassian username/email in login form
- Pause for manual entry of INVALID password (e.g., 'WrongPassword123!') and submit the form
- Verify authentication is rejected and user remains on login page
- Verify appropriate error message is displayed for invalid credentials

#### Selectors Used:
- **Type**: manual_input, **Text**: 'Username field', **Selector**: `N/A`, **Action**: fill
- **Type**: manual_input, **Text**: 'Password field', **Selector**: `N/A`, **Action**: fill
- **Type**: verification, **Text**: 'Error message', **Selector**: `N/A`, **Action**: verify

#### Expected Results:
- User successfully navigates to Atlassian ID login page
- Login form accepts username and invalid password input
- System rejects authentication attempt with invalid credentials
- User remains on login page without being granted access
- Appropriate error message is displayed indicating authentication failure
- Error message does not reveal whether username exists (security best practice)
- No redirect to zbio.atlassian.net occurs with invalid credentials

---

### 2. Login Analysis Happy Path
_Complete successful authentication workflow using valid Atlassian credentials to access zbio Jira instance_

**Complexity**: low | **Priority**: critical | **Risk Level**: high
**Tags**: authentication, e2e, login, happy-path, critical-flow, jira
**Est. Execution Time**: 25 seconds | **Flakiness Potential**: low

**Type**: e2e_authentication_workflow
**Pages Involved:**
- https://zbio.atlassian.net/
- https://id.atlassian.com/login

#### Steps:
- Navigate to zbio.atlassian.net homepage which redirects to Atlassian ID login
- Pause for manual entry of valid Atlassian email/username on login form
- Pause for manual entry of valid password and click 'Continue' or press Enter to submit
- Verify successful authentication and redirect to zbio.atlassian.net Jira workspace
- Verify authenticated state by confirming page title and URL stability

#### Selectors Used:
- **Type**: manual_input, **Text**: 'Email/username field', **Selector**: `N/A`, **Action**: fill
- **Type**: manual_input, **Text**: 'Password field', **Selector**: `N/A`, **Action**: fill
- **Type**: navigation, **Text**: 'Continue button', **Selector**: `N/A`, **Action**: click
- **Type**: verification, **Text**: 'Workspace page', **Selector**: `N/A`, **Action**: verify

#### Expected Results:
- User successfully navigates to Atlassian ID login page
- Login form accepts valid credentials without errors
- Authentication processes successfully with valid credentials
- User is redirected to zbio.atlassian.net Jira workspace after authentication
- Authenticated session is established and page loads successfully
- No security errors or authentication failures occur during the workflow

---