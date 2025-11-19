```gherkin
Feature: Authentication Security - Invalid Credentials Handling
  As a security tester
  I want to verify that invalid login attempts are properly rejected
  So that unauthorized access is prevented and users receive appropriate feedback

  Background:
    Given the Atlassian ID authentication service is available
    And rate limiting allows test execution

  @negative @authentication @security @high_priority @invalid_credentials
  Scenario: Verify authentication rejection with valid username and invalid password
    # Step 1: Initialize from homepage and navigate to authentication
    Given I am on the homepage "https://zbio.atlassian.net/"
    Then I should be redirected to the Atlassian ID login page
    And I should be on the URL "https://id.atlassian.com/login"
    And the page title should contain "Log in with Atlassian account"
    
    # Step 2: Locate and verify login form elements
    Then I should see the username input field
    And I should see the password input field
    And I should see the "Continue" button
    
    # Step 3: Enter valid username/email
    When I click on the username input field
    And I fill in the "Username or email" field with "test.user@zbio.com"
    Then the username field should contain "test.user@zbio.com"
    
    # Step 4: Submit username and proceed to password screen
    When I click the "Continue" button
    And I wait for the page to load
    Then I should see the password input field become active
    And the username field should be read-only or hidden
    
    # Step 5: Enter invalid password
    When I click on the password input field
    And I fill in the "Password" field with "WrongPassword123!"
    Then the password field should be populated
    And the password field should show masked characters
    
    # Step 6: Verify login button is enabled
    Then the "Log in" button should be enabled
    And the "Log in" button should be clickable
    
    # Step 7: Submit invalid credentials
    When I click the "Log in" button
    And I wait for authentication processing to complete
    
    # Step 8: Verify authentication is rejected
    Then I should remain on the URL "https://id.atlassian.com/login"
    And I should not be redirected to "https://zbio.atlassian.net/"
    And the login form should still be visible
    
    # Step 9: Verify error message appears
    Then I should see an error message displayed on the page
    And the error message should be visible near the login form
    And the error message should contain text indicating authentication failure
    And the error message should not reveal whether the username exists
    
    # Step 10: Verify specific error message content
    Then the error message should match one of the following:
      | Incorrect username or password                    |
      | Invalid credentials                               |
      | The username and password you entered don't match |
    
    # Step 11: Verify error styling and visibility
    And the error message should be displayed in red or warning color
    And the error message should have appropriate error styling
    
    # Step 12: Verify form state after failed login
    Then the password field should be cleared or empty
    And the username field should retain "test.user@zbio.com"
    And the login form should remain interactive
    
    # Step 13: Verify no security information leakage
    And the error message should not contain database error details
    And the error message should not contain stack trace information
    And the error message should not specify which credential was incorrect
    
    # Step 14: Verify page elements remain intact
    Then I should still see the Atlassian logo
    And I should still see the "Can't log in?" link
    And I should still see the "Sign up" option if available
    
    # Step 15: Verify no authentication tokens or cookies set
    And no valid authentication token should be present in browser storage
    And no session cookie for "zbio.atlassian.net" should be set
    
    # Step 16: Verify rate limiting allows continued testing
    And the login form should not be temporarily locked
    And no CAPTCHA challenge should be triggered after single failed attempt

  @negative @authentication @security @edge_case @rate_limiting
  Scenario: Verify rate limiting after multiple consecutive failed login attempts
    # Step 1: Initialize from homepage
    Given I am on the homepage "https://zbio.atlassian.net/"
    Then I should be redirected to the Atlassian ID login page
    And I should be on the URL "https://id.atlassian.com/login"
    
    # Step 2: Prepare for multiple failed attempts
    When I fill in the "Username or email" field with "test.user@zbio.com"
    And I click the "Continue" button
    And I wait for the password field to appear
    
    # Attempt 1
    When I fill in the "Password" field with "InvalidPassword1!"
    And I click the "Log in" button
    And I wait for authentication processing to complete
    Then I should see an error message displayed
    And I should remain on the login page
    
    # Attempt 2
    When I clear the password field
    And I fill in the "Password" field with "InvalidPassword2!"
    And I click the "Log in" button
    And I wait for authentication processing to complete
    Then I should see an error message displayed
    And I should remain on the login page
    
    # Attempt 3
    When I clear the password field
    And I fill in the "Password" field with "InvalidPassword3!"
    And I click the "Log in" button
    And I wait for authentication processing to complete
    Then I should see an error message displayed
    And I should remain on the login page
    
    # Attempt 4
    When I clear the password field
    And I fill in the "Password" field with "InvalidPassword4!"
    And I click the "Log in" button
    And I wait for authentication processing to complete
    Then I should see an error message displayed
    
    # Step 3: Verify rate limiting behavior
    Then the error message may indicate too many failed attempts
    And a CAPTCHA challenge may be displayed
    Or the account may be temporarily locked with appropriate messaging
    And any security measures should be clearly communicated to the user

  @negative @authentication @security @edge_case @special_characters
  Scenario: Verify system handles special characters in invalid password
    # Step 1: Initialize from homepage
    Given I am on the homepage "https://zbio.atlassian.net/"
    Then I should be redirected to the Atlassian ID login page
    And I should be on the URL "https://id.atlassian.com/login"
    
    # Step 2: Navigate to password entry
    When I fill in the "Username or email" field with "test.user@zbio.com"
    And I click the "Continue" button
    And I wait for the password field to appear
    
    # Step 3: Enter password with special characters
    When I fill in the "Password" field with "P@$$w0rd!<>&\"'%;()+=[]{}|\\`~"
    Then the password field should accept all special characters
    
    # Step 4: Submit form
    When I click the "Log in" button
    And I wait for authentication processing to complete
    
    # Step 5: Verify proper handling
    Then I should remain on the login page
    And I should see a standard error message
    And the error message should not contain unescaped special characters
    And the page should not display any JavaScript errors
    And the page should not display any rendering issues

  @negative @authentication @security @edge_case @injection_attack
  Scenario: Verify system is protected against SQL injection attempts in credentials
    # Step 1: Initialize from homepage
    Given I am on the homepage "https://zbio.atlassian.net/"
    Then I should be redirected to the Atlassian ID login page
    And I should be on the URL "https://id.atlassian.com/login"
    
    # Step 2: Attempt SQL injection in username
    When I fill in the "Username or email" field with "admin' OR '1'='1"
    And I click the "Continue" button
    And I wait for the password field to appear
    
    # Step 3: Attempt SQL injection in password
    When I fill in the "Password" field with "' OR '1'='1' --"
    And I click the "Log in" button
    And I wait for authentication processing to complete
    
    # Step 4: Verify injection is neutralized
    Then I should remain on the login page
    And I should see a standard authentication error message
    And I should not be authenticated or redirected
    And the error message should not contain SQL error information
    And the page should not display any database error messages

  @negative @authentication @security @edge_case @xss_attack
  Scenario: Verify system is protected against XSS attempts in credentials
    # Step 1: Initialize from homepage
    Given I am on the homepage "https://zbio.atlassian.net/"
    Then I should be redirected to the Atlassian ID login page
    And I should be on the URL "https://id.atlassian.com/login"
    
    # Step 2: Attempt XSS in username
    When I fill in the "Username or email" field with "<script>alert('XSS')</script>"
    And I click the "Continue" button
    And I wait for the password field to appear
    
    # Step 3: Submit form
    When I fill in the "Password" field with "TestPassword123!"
    And I click the "Log in" button
    And I wait for authentication processing to complete
    
    # Step 4: Verify XSS is neutralized
    Then I should remain on the login page
    And no JavaScript alert should be triggered
    And the error message should display sanitized text
    And the script tags should be escaped or removed in any displayed error
    And the page should not execute any injected scripts

  @negative @authentication @security @verification @non_existent_user
  Scenario: Verify error message consistency for non-existent username
    # Step 1: Initialize from homepage
    Given I am on the homepage "https://zbio.atlassian.net/"
    Then I should be redirected to the Atlassian ID login page
    And I should be on the URL "https://id.atlassian.com/login"
    
    # Step 2: Enter non-existent username
    When I fill in the "Username or email" field with "nonexistent.user.9999@zbio.com"
    And I click the "Continue" button
    And I wait for authentication processing to complete
    
    # Step 3: Verify error behavior for non-existent user
    Then I should see an error message or password prompt
    And if password prompt appears, I fill in the "Password" field with "AnyPassword123!"
    And if password prompt appears, I click the "Log in" button
    And if password prompt appears, I wait for authentication processing to complete
    
    # Step 4: Verify error message does not reveal user existence
    Then the final error message should be generic
    And the error message should not indicate whether the username exists
    And the error message should be consistent with wrong password error message
    And the error message timing should not reveal account enumeration information
```

This comprehensive Gherkin feature file includes:

1. **Main scenario** covering the primary invalid credentials test flow with 16 detailed, atomic steps
2. **Rate limiting scenario** testing multiple consecutive failed attempts
3. **Special characters scenario** verifying proper handling of complex password inputs
4. **SQL injection scenario** testing security against database injection attacks
5. **XSS scenario** testing security against cross-site scripting attacks
6. **User enumeration scenario** verifying error message consistency

Each step is:
- ✅ Atomic (one action/verification per step)
- ✅ Explicit (no assumptions or combined actions)
- ✅ Precise (exact element references and expected behaviors)
- ✅ Automatable (specific enough for test automation frameworks)
- ✅ Independently verifiable (clear success criteria)