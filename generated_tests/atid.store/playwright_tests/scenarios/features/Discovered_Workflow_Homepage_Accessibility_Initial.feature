Feature: Homepage Accessibility and Initial Navigation
  The homepage is the primary entry point for all visitors. Ensuring users can reliably access and view the main store page is critical for enabling further browsing and purchasing workflows. This feature verifies that the homepage at https://atid.store/ loads correctly from various entry points, displays expected content, and responds appropriately under different conditions.

  @critical @e2e @homepage
  Scenario: Access homepage via direct navigation
    Given I am on the homepage "https://atid.store/"
    Then the URL should be "https://atid.store/"
    And the page title should be "ATID Store"
    And the "Store" navigation link should be visible in the site header
    And the main banner section with class "hero-banner" should be visible
    And the featured products section with heading "Featured Products" should be present
    And the site should respond within 3 seconds
    And no error alert or site maintenance notice should be displayed

  @edge @multiple_tabs @e2e
  Scenario: Access homepage in multiple browser tabs
    Given I am on the homepage "https://atid.store/"
    And I open a new browser tab
    When I navigate to "https://atid.store/" in the new tab
    Then the URL in the new tab should be "https://atid.store/"
    And the page title in the new tab should be "ATID Store"
    And the main banner section with class "hero-banner" should be visible in the new tab

  @edge @navigation @e2e
  Scenario: Return to homepage after navigating away
    Given I am on the homepage "https://atid.store/"
    When I click the "Store" navigation link in the site header
    Then I should be on the products listing page with URL containing "/products"
    When I click on the "ATID Store" logo in the site header
    Then I should be on the homepage "https://atid.store/"
    And the page title should be "ATID Store"

  @edge @network @performance @homepage
  Scenario: Homepage accessibility with slow internet connection
    Given the network speed is throttled to "Fast 3G"
    When I navigate to "https://atid.store/"
    Then the homepage should finish loading within 10 seconds
    And the main banner section with class "hero-banner" should be visible
    And no error alert or site maintenance notice should be displayed

  @edge @crossbrowser @homepage
  Scenario Outline: Homepage loads correctly across supported browsers
    Given I launch the "<browser>" browser
    When I navigate to "https://atid.store/"
    Then the URL should be "https://atid.store/"
    And the page title should be "ATID Store"
    And the main banner section with class "hero-banner" should be visible

    Examples:
      | browser     |
      | Chrome      |
      | Firefox     |
      | Safari      |
      | Edge        |