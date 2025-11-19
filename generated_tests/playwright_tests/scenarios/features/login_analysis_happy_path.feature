```gherkin
Feature: Atlassian Authentication Workflow for zbio Jira Instance
  As a registered team member
  I want to log in with my Atlassian credentials
  So that I can access the zbio Jira workspace and manage projects

  Background:
    Given the zbio.atlassian.net Jira instance is accessible and operational
    And the Atlassian ID authentication service is functional
    And I have valid test account credentials stored in environment variables

  @critical @authentication @e2e @happy_path
  Scenario: Successful authentication to zbio Jira workspace with valid Atlassian credentials
    Given I am on the homepage "https://zbio.atlassian.net/"
    
    # Step 1: Initial navigation and redirect verification
    When the page loads
    Then I should be redirected to the Atlassian ID login portal
    And the current URL should contain "https://id.atlassian.com/login"
    And the URL should contain the parameter "continue" with value for "zbio.atlassian.net"
    And the login form should be visible on the page
    
    # Step 2: Username/Email field interaction
    When I locate the email or username input field on the login form
    Then the username input field should be present and enabled
    And the username input field should accept text input
    When I click on the username input field to focus it
    And I clear any existing content from the username input field
    And I fill in the username input field with my valid Atlassian email address
    Then the username input field should display the entered email address
    And the username input field should show no validation errors
    
    # Step 3: Continue to password step
    When I locate the "Continue" button on the login form
    Then the "Continue" button should be visible and enabled
    When I click the "Continue" button
    And the page processes the username submission
    Then the password input field should become visible
    And the page should remain on the Atlassian ID login domain
    
    # Step 4: Password field interaction
    When I locate the password input field on the login form
    Then the password input field should be present and enabled
    And the password input field should have type "password" for masked input
    When I click on the password input field to focus it
    And I clear any existing content from the password input field
    And I fill in the password input field with my valid account password
    Then the password input field should display masked characters
    And the password input field should show no validation errors
    
    # Step 5: Login form submission
    When I locate the login submit button on the form
    Then the login submit button should be visible and clickable
    When I click the login submit button to authenticate
    And the authentication request is processed by Atlassian ID service
    Then I should not see any authentication error messages
    And I should not see any "incorrect password" error notifications
    And I should not see any "account locked" warning messages
    
    # Step 6: Post-authentication redirect verification
    When the authentication completes successfully
    Then I should be redirected away from "id.atlassian.com" domain
    And the current URL should change to "https://zbio.atlassian.net"
    And the URL should not contain "id.atlassian.com" anymore
    And the page should begin loading the Jira workspace
    
    # Step 7: Jira workspace loading confirmation
    When the zbio Jira workspace page loads
    Then the current URL should be "https://zbio.atlassian.net"
    And the page title should indicate the Jira workspace
    And the page should not redirect to any login page
    And the page should not show any authentication error messages
    
    # Step 8: Authenticated state verification
    Then the Jira navigation header should be visible
    And the Jira sidebar navigation should be present
    And I should see authenticated user interface elements
    And the page should display Jira workspace content
    And the session should be established and active
    
    # Step 9: Final stability check
    When I wait for 3 seconds to ensure page stability
    Then the current URL should remain on "https://zbio.atlassian.net"
    And the page should not trigger any additional redirects
    And the page should be in a stable, interactive state
    And the authentication workflow should be complete

  @critical @authentication @edge_case @session_management
  Scenario: Handle authentication when session expires during login process
    Given I am on the homepage "https://zbio.atlassian.net/"
    When the page loads
    Then I should be redirected to the Atlassian ID login portal
    And the current URL should contain "https://id.atlassian.com/login"
    
    When I locate the email or username input field on the login form
    And I fill in the username input field with my valid Atlassian email address
    And I click the "Continue" button
    Then the password input field should become visible
    
    # Simulate session expiration scenario
    When I wait for 5 minutes to simulate session timeout
    And I fill in the password input field with my valid account password
    And I click the login submit button to authenticate
    Then the system should handle the expired session gracefully
    And I should either be prompted to re-enter credentials or automatically redirected
    And no system errors or crashes should occur
    And I should eventually be able to complete authentication successfully

  @critical @authentication @edge_case @network_conditions
  Scenario: Successful authentication with slow network during redirect
    Given I am on the homepage "https://zbio.atlassian.net/"
    When the page loads with simulated slow network conditions
    Then I should be redirected to the Atlassian ID login portal
    And the current URL should eventually contain "https://id.atlassian.com/login"
    
    When I locate the email or username input field on the login form
    And I fill in the username input field with my valid Atlassian email address
    And I click the "Continue" button
    And I wait for the password field to load
    Then the password input field should become visible
    
    When I fill in the password input field with my valid account password
    And I click the login submit button to authenticate
    And the authentication processes with slow network conditions
    Then I should see a loading indicator or progress feedback
    And I should eventually be redirected to "https://zbio.atlassian.net"
    And the Jira workspace should load successfully despite network latency
    And the authenticated session should be established correctly

  @critical @authentication @edge_case @navigation_behavior
  Scenario: Handle browser back navigation during authentication flow
    Given I am on the homepage "https://zbio.atlassian.net/"
    When the page loads
    Then I should be redirected to the Atlassian ID login portal
    And the current URL should contain "https://id.atlassian.com/login"
    
    When I locate the email or username input field on the login form
    And I fill in the username input field with my valid Atlassian email address
    And I click the "Continue" button
    Then the password input field should become visible
    
    # Test back navigation
    When I click the browser back button
    Then the system should handle the navigation appropriately
    And I should either see the username entry step again or remain on password step
    And the authentication state should remain valid
    And no error messages should appear from back navigation
    
    # Continue normal flow
    When I navigate forward if needed to reach the password step
    And I fill in the password input field with my valid account password
    And I click the login submit button to authenticate
    Then I should be redirected to "https://zbio.atlassian.net"
    And the authentication should complete successfully

  @authentication @data_validation @prerequisites
  Scenario Outline: Verify login form accepts different valid email formats
    Given I am on the homepage "https://zbio.atlassian.net/"
    When the page loads
    Then I should be redirected to the Atlassian ID login portal
    And the current URL should contain "https://id.atlassian.com/login"
    
    When I locate the email or username input field on the login form
    And I fill in the username input field with "<email_format>"
    Then the username input field should accept the email format
    And the username input field should display no validation errors
    And the "Continue" button should remain enabled and clickable

    Examples:
      | email_format                    |
      | user@zbio.com                   |
      | first.last@zbio.com             |
      | user+tag@zbio.com               |
      | user_name@zbio.co.uk            |
      | user123@subdomain.zbio.com      |

  @authentication @security @data_protection
  Scenario: Verify password field properly masks sensitive input
    Given I am on the homepage "https://zbio.atlassian.net/"
    When the page loads
    Then I should be redirected to the Atlassian ID login portal
    And the current URL should contain "https://id.atlassian.com/login"
    
    When I locate the email or username input field on the login form
    And I fill in the username input field with my valid Atlassian email address
    And I click the "Continue" button
    Then the password input field should become visible
    
    When I locate the password input field on the login form
    Then the password input field should have attribute "type" with value "password"
    When I fill in the password input field with "TestPassword123!"
    Then the password input field should display masked characters like "•••••••••••••••"
    And the actual password text should not be visible in the field
    And the password should not be visible in the page source as plain text
```

This comprehensive Gherkin feature file provides:

✅ **Atomic Steps**: Each step represents one specific, testable action
✅ **No Assumptions**: Every interaction is explicitly documented
✅ **Homepage Initialization**: All scenarios start from the defined homepage
✅ **Precise Element Targeting**: Exact field names, button text, and UI elements
✅ **Explicit Navigation**: Every redirect and URL change is verified
✅ **Granular Form Interactions**: Individual steps for each form field
✅ **Comprehensive Verification**: Validation after each major action
✅ **Edge Case Coverage**: Session expiration, network issues, navigation behavior
✅ **Automation-Ready**: Specific enough for automated test execution
✅ **Independent Scenarios**: Each test can run standalone