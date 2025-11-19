# Feature: ParaBank Login and Navigation
This feature verifies user authentication and basic navigation within ParaBank online banking system

@authentication @login @navigation
Scenario: Successful login and navigation to Transfer Funds page
  Given I am on the homepage 'https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC'
  Then the page title should contain 'ParaBank | Welcome | Online Banking'
  When I fill in the username field with "x_username"
  And I fill in the password field with "INVALID_PASSWORD_TEST123"
  When I click the "Login" button
  Then I should be navigated to the accounts overview page
  And the URL should be "https://parabank.parasoft.com/parabank/overview.htm"
  When I click the "Transfer Funds" link in the navigation menu
  Then I should see the transfer funds form

@login @negative
Scenario: Failed login attempt with invalid credentials
  Given I am on the homepage 'https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC'
  Then the page title should contain 'ParaBank | Welcome | Online Banking'
  When I fill in the username field with "invalid_user"
  And I fill in the password field with "wrong_password"
  When I click the "Login" button
  Then I should see an error message "The username and password could not be verified."
  And I should remain on the login page
  And the URL should be "https://parabank.parasoft.com/parabank/login.htm"

@registration
Scenario: New user registration
  Given I am on the homepage 'https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC'
  When I click the "Register" link
  Then I should be on the registration page
  And the URL should be "https://parabank.parasoft.com/parabank/register.htm"
  When I fill in the "First Name" field with "John"
  And I fill in the "Last Name" field with "Smith"
  And I fill in the "Address" field with "123 Test Street"
  And I fill in the "City" field with "Testville"
  And I fill in the "State" field with "TS"
  And I fill in the "Zip Code" field with "12345"
  And I fill in the "Phone #" field with "555-123-4567"
  And I fill in the "SSN" field with "123-45-6789"
  And I fill in the "Username" field with "johnsmith123"
  And I fill in the "Password" field with "SecurePass123"
  And I fill in the "Confirm" field with "SecurePass123"
  When I click the "Register" button
  Then I should see a welcome message containing "Your account was created successfully"
  And I should be logged in automatically

@account @funds_transfer
Scenario: Transfer funds between accounts
  Given I am on the homepage 'https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC'
  When I fill in the username field with "x_username"
  And I fill in the password field with "INVALID_PASSWORD_TEST123"
  And I click the "Login" button
  Then I should be navigated to the accounts overview page
  When I click the "Transfer Funds" link in the navigation menu
  Then I should see the transfer funds form
  When I select "13566" from the "fromAccountId" dropdown
  And I select "13677" from the "toAccountId" dropdown
  And I fill in the "amount" field with "100.00"
  And I click the "Transfer" button
  Then I should see a confirmation message "Transfer Complete!"
  And I should see the details of the completed transfer
  And the "Amount" field should display "$100.00"
  And the "From account" field should display "13566"
  And the "To account" field should display "13677"

@account @balance_inquiry
Scenario: View account balance and recent transactions
  Given I am on the homepage 'https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC'
  When I fill in the username field with "x_username"
  And I fill in the password field with "INVALID_PASSWORD_TEST123"
  And I click the "Login" button
  Then I should be navigated to the accounts overview page
  When I click on account number "13566" in the accounts table
  Then I should be on the account details page
  And I should see the account balance displayed
  And I should see a transaction history table
  And the transaction table should contain columns for "Date", "Description", and "Amount"

@security @logout
Scenario: User logout functionality
  Given I am on the homepage 'https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC'
  When I fill in the username field with "x_username"
  And I fill in the password field with "INVALID_PASSWORD_TEST123"
  And I click the "Login" button
  Then I should be navigated to the accounts overview page
  When I click the "Log Out" link
  Then I should be logged out successfully
  And I should be redirected to the login page
  And I should see a message "Customer Login"