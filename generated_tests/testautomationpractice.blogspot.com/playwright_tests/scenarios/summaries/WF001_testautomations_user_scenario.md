# Testautomations User Scenario

> **Status**: Preview — awaiting worker execution for full scenario details

## Overview

| Field | Value |
|-------|-------|
| Workflow ID | WF001 |
| Feature Area | e60a3c82-10ba-446c-9dc2-ffb74d9e717e |
| Priority | high |
| Goal | Testautomations User Scenario |

## Navigation Hint

# Generated Gherkin Scenarios
# Created by Azure OpenAI Document Analyzer
# Generated on: 2026-03-26 04:10:32

Feature: End-to-end form submission workflow on Automation Testing Practice site

Background:
  Given I open the website "https://testautomationpractice.blogspot.com/"
  And I am on the homepage with the "GUI Elements" section visible

Scenario: Complete form submission using highlighted and marked UI elements
  When I enter the following details in the "GUI Elements" section:
    | Field    | Value               |
    | Name     | Roostai             |
    | Email    | roostai@zb.io       |
    | Phone    | 9999999999          |
    | Address  | Bangalore , India   |
  Then the entered values should be visible in the respective fields in the "GUI Elements" section

  When I select the "Male" radio button in the "Gender" field within the "GUI Elements" section
  Then the "Male" radio button should be selected in the "Gender" field within the "GUI Elements" section

  When I check the following days in the "Days" field within the "GUI Elements" section:
    | Day       |
    | Monday    |
    | Tuesday   |
    | Wednesday |
    | Thursday  |
    | Friday    |
  Then the selected days should be checked in the "Days" field within the "GUI Elements" section

  When I select "India" from the "Country" dropdown in the "GUI Elements" section
  Then "India" should be displayed as the selected country in the "Country" dropdown in the "GUI Elements" section

  When I select "Yellow" from the "Colors" list in the "GUI Elements" section
  Then "Yellow" should be highlighted as the selected color in the "Colors" list in the "GUI Elements" section

  When I select "Dog" from the "Sorted List" in the "GUI Elements" section
  Then "Dog" should be highlighted as the selected item in the "Sorted List" in the "GUI Elements" section

  When I enter "17/02/2026" in the "Date Picker 1" field in the "GUI Elements" section
  Then "17/02/2026" should be displayed in the "Date Picker 1" field in the "GUI Elements" section

  When I enter "01/01/2026" in the "Date Picker 2" field in the "GUI Elements" section
  Then "01/01/2026" should be displayed in the "Date Picker 2" field in the "GUI Elements" section

  When I select the date range "10/01/2026 – 10/03/2026" in the "Date Picker 3" field in the "GUI Elements" section
  Then the date range "10/01/2026 – 10/03/2026" should be displayed in the "Date Picker 3" field in the "GUI Elements" section

  When I click the "Submit" button in the "GUI Elements" section
  Then the form should be submitted or a confirmation message should be displayed in the "GUI Elements" section


