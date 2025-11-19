# Feature: ParaBank Login Authentication Validation
# As a user of ParaBank online banking
# I want to validate the login authentication system
# So that unauthorized access is prevented with proper error handling

@authentication
@login
@negative_testing
Feature: ParaBank Login Authentication Validation

  @login_invalid_credentials
  @negative_authentication
  @error_handling
  Scenario: Verify error message when logging in with invalid credentials
    Given I am on the homepage "https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC"
    Then the page title should contain "ParaBank | Welcome | Online Banking"
    
    When I enter "x_username" into the username field
    And I enter "INVALID_PASSWORD" into the password field
    When I click the "Login" button
    Then I should see an error message indicating invalid credentials
    And I should still be on the login page "https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC"
    And the login form should still be visible