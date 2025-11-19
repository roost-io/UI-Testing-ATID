# Feature: ParaBank User Authentication and Login

@authentication @login @critical
Feature: ParaBank User Authentication and Login
  As a ParaBank customer
  I want to access my online banking account securely
  So that I can manage my finances through the website

  Background:
    Given I am on the homepage 'https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC'
    And I can see the ParaBank login form on the left side panel

  @positive @happy_path
  Scenario: Successful login with valid credentials
    When I locate the username field in the login form
    And I enter "john" in the username field
    And I locate the password field in the login form
    And I enter "demo" in the password field
    And I click the "LOG IN" button
    Then I should be redirected to the accounts overview page
    And the URL should contain "overview.htm"
    And I should see "Accounts Overview" heading on the page
    And I should see my account information displayed
    And I should see the welcome message containing my username
    And I should see the logout link in the top menu

  @negative @invalid_credentials
  Scenario: Failed login with invalid username
    When I locate the username field in the login form
    And I enter "invalid_user" in the username field
    And I locate the password field in the login form
    And I enter "demo" in the password field
    And I click the "LOG IN" button
    Then I should remain on the login page
    And I should see an error message "The username and password could not be verified."
    And the URL should contain "index.htm"

  @negative @invalid_credentials
  Scenario: Failed login with invalid password
    When I locate the username field in the login form
    And I enter "john" in the username field
    And I locate the password field in the login form
    And I enter "wrong_password" in the password field
    And I click the "LOG IN" button
    Then I should remain on the login page
    And I should see an error message "The username and password could not be verified."
    And the URL should contain "index.htm"

  @negative @empty_fields
  Scenario: Failed login with empty username
    When I locate the username field in the login form
    And I enter "" in the username field
    And I locate the password field in the login form
    And I enter "demo" in the password field
    And I click the "LOG IN" button
    Then I should remain on the login page
    And I should see an error message "Please enter a username and password."
    And the URL should contain "index.htm"

  @negative @empty_fields
  Scenario: Failed login with empty password
    When I locate the username field in the login form
    And I enter "john" in the username field
    And I locate the password field in the login form
    And I enter "" in the password field
    And I click the "LOG IN" button
    Then I should remain on the login page
    And I should see an error message "Please enter a username and password."
    And the URL should contain "index.htm"

  @functional @navigation
  Scenario: Access account services after successful login
    When I locate the username field in the login form
    And I enter "john" in the username field
    And I locate the password field in the login form
    And I enter "demo" in the password field
    And I click the "LOG IN" button
    Then I should be redirected to the accounts overview page
    And the URL should contain "overview.htm"
    When I click on the "Transfer Funds" link in the account services menu
    Then I should be redirected to the transfer funds page
    And the URL should contain "transfer.htm"
    And I should see the transfer funds form

  @functional @logout
  Scenario: Successfully logout after login
    When I locate the username field in the login form
    And I enter "john" in the username field
    And I locate the password field in the login form
    And I enter "demo" in the password field
    And I click the "LOG IN" button
    Then I should be redirected to the accounts overview page
    And the URL should contain "overview.htm"
    When I click on the "Log Out" link in the top menu
    Then I should be logged out and redirected to the login page
    And the URL should contain "index.htm"
    And I should see the login form again
    And I should see a message indicating I have logged out

  @accessibility @forgotten_login
  Scenario: Access forgotten login info page
    When I locate the "Forgot login info?" link below the login form
    And I click on the "Forgot login info?" link
    Then I should be redirected to the lookup form page
    And the URL should contain "lookup.htm"
    And I should see the customer lookup form
    And I should see fields to enter my personal information

  @security @session_timeout
  Scenario: Session timeout after period of inactivity
    When I locate the username field in the login form
    And I enter "john" in the username field
    And I locate the password field in the login form
    And I enter "demo" in the password field
    And I click the "LOG IN" button
    Then I should be redirected to the accounts overview page
    And the URL should contain "overview.htm"
    When the session times out due to inactivity
    And I attempt to access a protected page
    Then I should be redirected back to the login page
    And I should see a message indicating my session has expired
    And the URL should contain "index.htm"