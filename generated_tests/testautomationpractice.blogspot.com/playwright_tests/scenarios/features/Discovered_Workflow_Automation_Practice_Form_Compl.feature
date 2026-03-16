@e2e @gui-elements @critical @form @homepage
Feature: Complete Automation Practice Form Workflow - GUI Elements Section

  In order to ensure the Automation Testing Practice website's GUI Elements form functions correctly
  As a QA automation engineer
  I want to verify that every field in the form can be filled with valid data and the form can be submitted successfully from the homepage

  Background:
    Given I am on the homepage 'https://testautomationpractice.blogspot.com/'
    Then the page should load successfully
    And the "GUI Elements" section should be visible on the page

  Scenario: Submit the GUI Elements form with valid inputs for every field and verify successful submission
    # Name Field
    When I fill in the 'Enter Name' field with 'Roostai'
    Then the 'Enter Name' field should display 'Roostai'

    # Email Field
    When I fill in the 'Enter EMail' field with 'roostai@zb.io'
    Then the 'Enter EMail' field should display 'roostai@zb.io'

    # Phone Field
    When I fill in the 'Enter Phone' field with '9999999999'
    Then the 'Enter Phone' field should display '9999999999'

    # Address Field
    When I fill in the 'Address:' field with 'Bangalore , India'
    Then the 'Address:' field should display 'Bangalore , India'

    # Gender Radio Button (Male)
    When I select the 'Male' option from the Gender radio buttons
    Then the 'Male' gender radio button should be selected

    # Checkbox - Monday
    When I check the 'Monday' checkbox in the Days section
    Then the 'Monday' checkbox should be checked

    # Checkbox - Tuesday
    When I check the 'Tuesday' checkbox in the Days section
    Then the 'Tuesday' checkbox should be checked

    # Checkbox - Wednesday
    When I check the 'Wednesday' checkbox in the Days section
    Then the 'Wednesday' checkbox should be checked

    # Checkbox - Thursday
    When I check the 'Thursday' checkbox in the Days section
    Then the 'Thursday' checkbox should be checked

    # Checkbox - Friday
    When I check the 'Friday' checkbox in the Days section
    Then the 'Friday' checkbox should be checked

    # Country Dropdown
    When I select 'India' from the 'Country:' dropdown
    Then the 'Country:' dropdown should have 'India' selected

    # Colors List
    When I select 'Yellow' from the 'Colors:' list
    Then the 'Colors:' list should have 'Yellow' selected

    # Sorted List Dropdown
    When I select 'Dog' from the 'Sorted List:' dropdown
    Then the 'Sorted List:' dropdown should have 'Dog' selected

    # Date Picker 1
    When I enter '17/02/2026' into the first date picker field labeled 'Datepicker'
    Then the first date picker field should display '17/02/2026'

    # Date Picker 2
    When I enter '01/01/2026' into the second date picker field labeled 'SelectedDate'
    Then the second date picker field should display '01/01/2026'

    # Date Picker 3 - Start Date
    When I enter '10/01/2026' into the 'Start Date' field in Date Picker 3
    Then the 'Start Date' field should display '10/01/2026'

    # Date Picker 3 - End Date
    When I enter '10/03/2026' into the 'End Date' field in Date Picker 3
    Then the 'End Date' field should display '10/03/2026'

    # Submit Button
    When I click the 'Submit' button in the GUI Elements section
    Then the page should remain at 'https://testautomationpractice.blogspot.com/'
    And the form should submit without errors
    And there should be no visible error messages after submitting the form
    And there should be no visible confirmation message after form submission