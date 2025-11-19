# Feature: ParaBank User Authentication and Account Management System

This feature covers the core authentication functionality of the ParaBank website, allowing users to securely log in, manage their accounts, and perform banking operations.

## Background:
  Given I am on the homepage 'https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC'

## Scenario: User logs in to access their account
  When I enter 'john' in the 'Username' field in the login panel
  And I enter 'demo' in the 'Password' field in the login panel
  And I click the 'Log In' button in the login panel
  Then I should see the 'Accounts Overview' page
  And I should see the welcome message containing 'Welcome John Smith'
  And I should see the 'Log Out' link in the top menu
  And I should see a list of accounts in the accounts table

## Scenario: User registers for a new account
  When I click the 'Register' link in the login panel
  Then I should be on the registration page
  And I should see the 'Signing up is easy!' header
  When I enter 'John' in the 'First Name:' field
  And I enter 'Doe' in the 'Last Name:' field
  And I enter '123 Main St' in the 'Address:' field
  And I enter 'Anytown' in the 'City:' field
  And I enter 'CA' in the 'State:' field
  And I enter '12345' in the 'Zip Code:' field
  And I enter '555-123-4567' in the 'Phone #:' field
  And I enter '123-45-6789' in the 'SSN:' field
  And I enter 'jdoe2023' in the 'Username:' field
  And I enter 'SecurePass123' in the 'Password:' field
  And I enter 'SecurePass123' in the 'Confirm:' field
  And I click the 'Register' button
  Then I should see the confirmation message 'Your account was created successfully. You are now logged in.'
  And I should be redirected to the accounts overview page

## Scenario: User opens a new account
  When I enter 'john' in the 'Username' field in the login panel
  And I enter 'demo' in the 'Password' field in the login panel
  And I click the 'Log In' button in the login panel
  Then I should see the 'Accounts Overview' page
  When I click the 'Open New Account' link in the left menu
  Then I should be on the 'Open New Account' page
  And I should see the 'Open New Account' header
  When I select 'SAVINGS' from the 'What type of Account would you like to open?' dropdown
  And I select the first available account from the 'Please choose from which account you would like to make the initial deposit.' dropdown
  And I click the 'Open New Account' button
  Then I should see the 'Account Opened!' confirmation message
  And I should see a new account number displayed
  And I should see the 'Your new account number:' text

## Scenario: User transfers funds between accounts
  When I enter 'john' in the 'Username' field in the login panel
  And I enter 'demo' in the 'Password' field in the login panel
  And I click the 'Log In' button in the login panel
  Then I should see the 'Accounts Overview' page
  When I click the 'Transfer Funds' link in the left menu
  Then I should be on the 'Transfer Funds' page
  And I should see the 'Transfer Funds' header
  When I enter '100' in the 'Amount:' field
  And I select the first account from the 'From account #:' dropdown
  And I select the second account from the 'To account #:' dropdown
  And I click the 'Transfer' button
  Then I should see the 'Transfer Complete!' message
  And I should see the confirmation text containing the amount '$100.00'
  And I should see the 'from account' and 'to account' numbers displayed

## Scenario: User checks account transaction history
  When I enter 'john' in the 'Username' field in the login panel
  And I enter 'demo' in the 'Password' field in the login panel
  And I click the 'Log In' button in the login panel
  Then I should see the 'Accounts Overview' page
  When I click on the first account number link in the accounts table
  Then I should be on the 'Account Details' page
  And I should see the 'Account Details' header
  And I should see the account number displayed
  And I should see the account type displayed
  And I should see the account balance displayed
  And I should see the 'Transaction History' section
  And I should see a table containing transaction details including 'Date', 'Description', and 'Amount' columns

## Scenario: User updates their contact information
  When I enter 'john' in the 'Username' field in the login panel
  And I enter 'demo' in the 'Password' field in the login panel
  And I click the 'Log In' button in the login panel
  Then I should see the 'Accounts Overview' page
  When I click the 'Update Contact Info' link in the left menu
  Then I should be on the 'Update Profile' page
  And I should see the 'Update Profile' header
  When I enter '456 New Street' in the 'Address:' field
  And I enter 'New City' in the 'City:' field
  And I enter 'NY' in the 'State:' field
  And I enter '54321' in the 'Zip Code:' field
  And I enter '555-987-6543' in the 'Phone #:' field
  And I click the 'Update Profile' button
  Then I should see the confirmation message 'Your profile has been updated.'

## Scenario: User logs out of their account
  When I enter 'john' in the 'Username' field in the login panel
  And I enter 'demo' in the 'Password' field in the login panel
  And I click the 'Log In' button in the login panel
  Then I should see the 'Accounts Overview' page
  When I click the 'Log Out' link in the top menu
  Then I should be redirected to the homepage
  And I should see the login panel with 'Username' and 'Password' fields
  And I should see the 'Customer Login' header in the login panel