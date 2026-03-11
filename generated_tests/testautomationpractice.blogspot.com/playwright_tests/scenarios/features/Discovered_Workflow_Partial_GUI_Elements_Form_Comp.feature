Feature: GUI Elements Form Completion and Submission on Automation Testing Practice
  As a QA engineer
  I want to verify that all GUI Elements form fields can be filled, options selected, and the form submitted on https://testautomationpractice.blogspot.com/
  So that I can ensure users can interact with and submit the form, and understand the post-submit behavior


  @critical @e2e @gui-elements-form
  Scenario: Complete GUI Elements form and submit without visible confirmation

    # -- Homepage Initialization --
    Given I am on the homepage 'https://testautomationpractice.blogspot.com/'
    Then the page URL should be 'https://testautomationpractice.blogspot.com/'
    And the 'GUI Elements' section should be visible

    # -- Atomic Form Field Interactions and Validations --
    When I fill in the 'Enter Name' field with 'Roostai'
    Then the 'Enter Name' field should have value 'Roostai'

    When I fill in the 'Enter EMail' field with 'roostai@zb.io'
    Then the 'Enter EMail' field should have value 'roostai@zb.io'

    When I fill in the 'Enter Phone' field with '9999999999'
    Then the 'Enter Phone' field should have value '9999999999'

    When I fill in the 'Address:' field with 'Bangalore , India'
    Then the 'Address:' field should have value 'Bangalore , India'

    # -- Explicit Radio Button Selection and Verification --
    When I select the 'Male' option for 'Gender'
    Then the 'Male' radio button should be selected

    # -- Atomic Checkbox Selections for Days and Verification --
    When I check the 'Monday' checkbox
    Then the 'Monday' checkbox should be checked

    When I check the 'Tuesday' checkbox
    Then the 'Tuesday' checkbox should be checked

    When I check the 'Wednesday' checkbox
    Then the 'Wednesday' checkbox should be checked

    When I check the 'Thursday' checkbox
    Then the 'Thursday' checkbox should be checked

    When I check the 'Friday' checkbox
    Then the 'Friday' checkbox should be checked

    # -- Dropdown and List Selections with Verification --
    When I select 'India' from the 'Country:' dropdown
    Then the 'Country:' dropdown should have 'India' selected

    When I select 'Yellow' from the 'Colors:' list
    Then the 'Colors:' list should have 'Yellow' highlighted

    When I select 'Dog' from the 'Sorted List:' dropdown
    Then the 'Sorted List:' dropdown should have 'Dog' selected

    # -- Date Picker Field Interactions with Test Data and Verification --
    When I fill in the Date Picker 1 field with '17/02/2026'
    Then the Date Picker 1 field should have value '17/02/2026'

    When I fill in the Date Picker 2 field with '01/01/2026'
    Then the Date Picker 2 field should have value '01/01/2026'

    When I fill in the 'Start Date' field with '2026-01-10'
    Then the 'Start Date' field should have value '2026-01-10'

    When I fill in the 'End Date' field with '2026-03-10'
    Then the 'End Date' field should have value '2026-03-10'

    # -- Submit Interaction and Behavior Validation --
    When I click the 'Submit' button inside the 'GUI Elements' section
    Then the 'Submit' button should be present
    And no visible confirmation message should be displayed

    # -- Retry Submission Action and Observability Step --
    When I click the 'Submit' button inside the 'GUI Elements' section again
    Then the 'Submit' button should still be present
    And still no visible confirmation message should be displayed

    # -- Final Outcome Documentation --
    Then the form should be considered submitted for automation reporting purposes
    And the test should log the submission outcome as 'No visible user confirmation after submit'