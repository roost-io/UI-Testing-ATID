Feature: Automation Testing Practice Form - GUI Elements Full Workflow
  To ensure the Automation Testing Practice site reliably captures user input,
  this feature verifies that every GUI Elements form field can be filled and selected,
  that the form behaves as expected after each interaction, and that submission is possible.
  All element interactions and state transitions are validated explicitly for robust e2e automation.

  @e2e @gui-elements @critical
  Scenario: Complete GUI Elements form fill and submission with explicit stepwise validation
    Given I am on the homepage 'https://testautomationpractice.blogspot.com/'
    Then the 'GUI Elements' section header should be visible
    And the 'Enter Name' field should be present
    And the 'Enter EMail' field should be present
    And the 'Enter Phone' field should be present
    And the 'Address:' textarea should be present
    And the 'Male' radio button should be present
    And the 'Monday' checkbox should be present
    And the 'Tuesday' checkbox should be present
    And the 'Wednesday' checkbox should be present
    And the 'Thursday' checkbox should be present
    And the 'Friday' checkbox should be present
    And the 'Country:' dropdown should be present
    And the 'Colors:' selection list should be present
    And the 'Sorted List:' selection list should be present
    And the 'Date Picker 1' field identified by id 'datepicker' should be present
    And the 'Date Picker 2' field identified by id 'txtDate' should be present
    And the 'Start Date' field with placeholder 'Start Date' should be present
    And the 'End Date' field with placeholder 'End Date' should be present
    And the 'Submit' button should be present

    #
    # Name Field Entry and Verification
    When I fill in the 'Enter Name' field with 'Roostai'
    Then the 'Enter Name' field should display the value 'Roostai'

    #
    # Email Field Entry and Verification
    When I fill in the 'Enter EMail' field with 'roostai@zb.io'
    Then the 'Enter EMail' field should display the value 'roostai@zb.io'

    #
    # Phone Field Entry and Verification
    When I fill in the 'Enter Phone' field with '9999999999'
    Then the 'Enter Phone' field should display the value '9999999999'

    #
    # Address Field Entry and Verification
    When I fill in the 'Address:' textarea with 'Bangalore , India'
    Then the 'Address:' textarea should display the value 'Bangalore , India'

    #
    # Gender Selection and Verification
    When I select the 'Male' radio button
    Then the 'Male' radio button should be selected

    #
    # Days Checkbox Selections and Verification
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

    #
    # Country Dropdown Selection and Verification
    When I select 'India' from the 'Country:' dropdown
    Then the 'Country:' dropdown should have 'India' selected

    #
    # Colors List Selection and Verification
    When I select 'Yellow' from the 'Colors:' list
    Then the 'Colors:' list should display 'Yellow' as selected

    #
    # Sorted List Selection and Verification
    When I select 'Dog' from the 'Sorted List:' list
    Then the 'Sorted List:' list should display 'Dog' as selected

    #
    # Date Picker 1 - Value Entry and Verification
    When I fill in the 'Date Picker 1' field (id 'datepicker') with '17/02/2026'
    Then the 'Date Picker 1' field should display the value '17/02/2026'

    #
    # Date Picker 2 - Value Entry and Verification
    When I fill in the 'Date Picker 2' field (id 'txtDate') with '01/01/2026'
    Then the 'Date Picker 2' field should display the value '01/01/2026'

    #
    # Date Picker 3 Start/End Date - Value Entry and Verification
    When I fill in the 'Start Date' field (placeholder 'Start Date') with '2026-01-10'
    Then the 'Start Date' field should display the value '2026-01-10'

    When I fill in the 'End Date' field (placeholder 'End Date') with '03/10/2026'
    Then the 'End Date' field should display the value '03/10/2026'

    #
    # Form Submission and Validation
    When I click the 'Submit' button inside the 'GUI Elements' section
    Then the form should be submitted successfully
    And no error message should be displayed

    #
    # Final Page Validation
    Then I should remain on the homepage 'https://testautomationpractice.blogspot.com/'
    And the 'GUI Elements' section should still be visible