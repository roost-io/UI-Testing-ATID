# Feature: ParaBank Authentication System
# This feature covers the authentication workflows for ParaBank online banking application
# Based on actual user journey analysis from https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC

@authentication @login @critical
Feature: ParaBank Authentication System
  As a ParaBank customer
  I want to authenticate using the login form
  So that I can access my banking accounts and services

  Background:
    Given I am on the ParaBank homepage 'https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC'
    And I can see the ParaBank welcome page

  @positive @happy_path @smoke
  Scenario: Successful login with valid credentials
    # Login form discovery and interaction
    When I locate the login form in the left panel
    Then I should see the username field
    And I should see the password field
    And I should see the login button

    # Credential entry
    When I enter "john" in the username field
    And I enter "demo" in the password field
    And I click the "LOG IN" button
    
    # Verification of successful authentication
    Then I should be redirected to the accounts overview page
    And the URL should be "https://parabank.parasoft.com/parabank/overview.htm"
    And I should see the "Accounts Overview" heading
    And I should see my account information
    And I should see the "Log Out" link in the navigation menu

  @negative @invalid_credentials @validation
  Scenario: Failed login with invalid credentials
    When I locate the login form in the left panel
    Then I should see the username field
    And I should see the password field
    And I should see the login button

    When I enter "invalid_user" in the username field
    And I enter "wrong_password" in the password field
    And I click the "LOG IN" button
    
    Then I should remain on the login page
    And I should see an error message "The username and password could not be verified."
    And I should not be logged into the system

  @negative @empty_credentials @validation
  Scenario: Login attempt with empty credentials
    When I locate the login form in the left panel
    Then I should see the username field
    And I should see the password field
    And I should see the login button

    When I leave the username field empty
    And I leave the password field empty
    And I click the "LOG IN" button
    
    Then I should remain on the login page
    And I should see an error message about required fields
    And I should not be logged into the system

  @account_recovery @forgot_login_info
  Scenario: Access the forgot login info functionality
    When I locate the login form in the left panel
    Then I should see the "Forgot login info?" link
    
    When I click on the "Forgot login info?" link
    Then I should be redirected to the customer lookup page
    And I should see the customer lookup form
    And I should see fields for customer information

  @registration @new_user
  Scenario: Navigate to user registration from login page
    When I locate the login form in the left panel
    Then I should see the "Register" link
    
    When I click on the "Register" link
    Then I should be redirected to the registration page
    And I should see the registration form
    And I should see fields for creating a new user account

  @security @session @logout
  Scenario: Successful logout after authentication
    # First login successfully
    When I enter "john" in the username field
    And I enter "demo" in the password field
    And I click the "LOG IN" button
    Then I should be redirected to the accounts overview page
    
    # Then perform logout
    When I click on the "Log Out" link in the navigation menu
    Then I should be logged out of the system
    And I should be redirected to the login page
    And I should see the login form
    And I should no longer see my account information

  @security @browser_back
  Scenario: Preventing access to authenticated pages after logout using browser back
    # First login successfully
    When I enter "john" in the username field
    And I enter "demo" in the password field
    And I click the "LOG IN" button
    Then I should be redirected to the accounts overview page
    
    # Logout
    When I click on the "Log Out" link in the navigation menu
    Then I should be logged out of the system
    
    # Try to access protected content using browser back
    When I navigate back in browser history
    Then I should not see my account information
    And I should be required to authenticate again
    And I should see the login form