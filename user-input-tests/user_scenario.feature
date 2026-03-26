Feature: E-commerce Checkout Process
  As a customer
  I want to purchase products online
  So that I can complete my shopping experience

  Background:
    Given I am on the e-commerce website "atid.store"

  Scenario: Complete checkout process with validation errors
    When I click on "SHOP NOW" button in "Latest Eyewear For You" category
    Then I should be redirected to the products page
    
    When I navigate to page 2 by clicking on "2" or the next arrow
    Then I should see page 2 products
    
    When I click on "Red Hoodie" product
    Then I should be on the Red Hoodie product detail page
    And I should see the price "150.00 ₪"
    
    When I click on "ADD TO CART" button
    Then I should see confirmation message "Red Hoodie has been added to your cart"
    
    When I click on "VIEW CART" button
    Then I should be on the cart page
    
    When I select "Local pickup" shipping option
    And I select "Delivery Express" shipping option
    And I select "Registered Mail" shipping option
    And I click on "PROCEED TO CHECKOUT" button
    Then I should be on the checkout page
    
    When I fill in the following billing details:
      | Field           | Value                    |
      | First name      | Meital                   |
      | Last name       | Kenzi                    |
      | Company name    | Menora                   |
      | Country/Region  | Israel                   |
      | Street address  | Burla yehuda 1           |
      | Town/City       | Tel Aviv                 |
      | Phone           | 0544344345               |
      | Email address   | meitalkenzi@gmail.com    |
    
    And I click on "PLACE ORDER" button
    Then I should see error message "Billing Postcode / ZIP is a required field"
    
    When I fill in "Postcode / ZIP" field with "316547"
    And I click on "PLACE ORDER" button
    Then I should see error message "Invalid payment method"