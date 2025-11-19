# Feature: Login Functionality - Authentication with Invalid Credentials
# This feature validates that the system appropriately rejects login attempts with invalid credentials
# and provides proper error messages to the user

@authentication
@negative_testing
@login
Scenario: Login with invalid credentials
  Given I am on the homepage "https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC"
  Then I should see the page title "ParaBank | Welcome | Online Banking"
  When I enter "x_username" in the username field
  And I enter "INVALID_PASSWORD" in the password field
  And I click the "LOG IN" button
  Then I should remain on the page "https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC"
  And I should see an error message indicating invalid credentials
  And the login form should still be visible
  And the username field should still contain "x_username"
  And the password field should be empty