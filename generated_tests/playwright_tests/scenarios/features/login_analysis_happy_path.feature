# Feature: ParaBank Authentication
# As a ParaBank user
# I want to be able to log in to my account
# So that I can access my banking information and services

@authentication @login @smoke
Scenario: Successful login with valid credentials
  Given I am on the homepage "https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC"
  Then the page title should be "ParaBank | Welcome | Online Banking"
  When I enter "john_doe" into the username field
  And I enter "secure123" into the password field
  And I click the "LOG IN" button
  Then I should be redirected to the accounts overview page
  And the URL should contain "overview.htm"
  And I should see the welcome message with my username
  And I should see my account information displayed

@authentication @login @negative
Scenario Outline: Login with invalid credentials
  Given I am on the homepage "https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC"
  When I enter "<username>" into the username field
  And I enter "<password>" into the password field
  And I click the "LOG IN" button
  Then I should remain on the login page
  And I should see the error message "The username and password could not be verified."

  Examples:
    | username | password    |
    | john_doe | wrongpass   |
    | invalid  | secure123   |
    | invalid  | wrongpass   |
    |          | secure123   |
    | john_doe |             |

@authentication @login @validation
Scenario: Empty login form submission
  Given I am on the homepage "https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC"
  When I click the "LOG IN" button without entering any credentials
  Then I should remain on the login page
  And I should see the error message "Please enter a username and password."

@authentication @login @security
Scenario: Login with SQL injection attempt
  Given I am on the homepage "https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC"
  When I enter "' OR 1=1 --" into the username field
  And I enter "password" into the password field
  And I click the "LOG IN" button
  Then I should remain on the login page
  And I should see the error message indicating invalid credentials

@authentication @logout
Scenario: Successful logout after login
  Given I am on the homepage "https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC"
  When I enter "john_doe" into the username field
  And I enter "secure123" into the password field
  And I click the "LOG IN" button
  Then I should be redirected to the accounts overview page
  When I click the "Log Out" link
  Then I should be redirected to the login page
  And I should see the logout success message
  And I should not see any user-specific information