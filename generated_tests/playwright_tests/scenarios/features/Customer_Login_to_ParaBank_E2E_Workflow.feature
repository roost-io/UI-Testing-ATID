# Feature: Customer Login to ParaBank E2E Workflow

As a ParaBank customer
I want to log in to my account
So that I can access my banking information and perform transactions

@login @e2e @critical
Scenario: Successful customer login with valid credentials
  Given I am on the homepage "https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC"
  Then the page title should contain "ParaBank"
  And the login form should be visible
  
  When I fill in the "Username" field with "john"
  Then the "Username" field should contain "john"
  
  When I fill in the "Password" field with "demo"
  Then the password field should contain masked characters
  
  When I click the "Log In" button
  Then I should wait for page navigation to complete
  And I should be redirected to the account overview page
  And the URL should contain "overview.htm"
  
  When the page has fully loaded
  Then I should see a welcome message containing "john"
  And the account summary section should be visible
  And at least one account should be listed in the account summary
  And the authenticated navigation menu should be displayed
  And the "Transfer Funds" option should be available in the navigation menu
  And the "Bill Pay" option should be available in the navigation menu
  And the "Log Out" option should be available

@login @negative @security
Scenario: Failed login with incorrect password
  Given I am on the homepage "https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC"
  Then the login form should be visible
  
  When I fill in the "Username" field with "john"
  And I fill in the "Password" field with "wrongpassword"
  And I click the "Log In" button
  
  Then I should remain on the login page
  And I should see an error message containing "The username and password could not be verified"
  And the login form should still be visible

@login @negative @security
Scenario: Failed login with non-existent username
  Given I am on the homepage "https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC"
  Then the login form should be visible
  
  When I fill in the "Username" field with "nonexistentuser123"
  And I fill in the "Password" field with "demo"
  And I click the "Log In" button
  
  Then I should remain on the login page
  And I should see an error message containing "The username and password could not be verified"
  And the login form should still be visible

@login @usability
Scenario: Validate empty field validation for login form
  Given I am on the homepage "https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC"
  Then the login form should be visible
  
  When I click the "Log In" button without entering credentials
  
  Then I should remain on the login page
  And I should see an error message related to missing credentials
  And the login form should still be visible

@login @navigation @browser
Scenario: Browser back button after successful login maintains authenticated state
  Given I am on the homepage "https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC"
  Then the login form should be visible
  
  When I fill in the "Username" field with "john"
  And I fill in the "Password" field with "demo"
  And I click the "Log In" button
  
  Then I should be redirected to the account overview page
  And the URL should contain "overview.htm"
  And the welcome message should be displayed
  
  When I navigate to the "Bill Pay" page
  Then the URL should contain "billpay.htm"
  
  When I click the browser back button
  Then I should be redirected to the account overview page
  And I should remain authenticated
  And the welcome message should still be displayed

@login @security @session
Scenario: Customer logout terminates user session
  Given I am on the homepage "https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC"
  Then the login form should be visible
  
  When I fill in the "Username" field with "john"
  And I fill in the "Password" field with "demo"
  And I click the "Log In" button
  
  Then I should be redirected to the account overview page
  And I should be authenticated
  
  When I click the "Log Out" link
  Then I should be redirected back to the homepage
  And the URL should contain "index.htm"
  And the login form should be visible
  And the welcome message should not be displayed