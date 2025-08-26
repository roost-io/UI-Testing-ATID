# 🤖 RoostGPT: AI-Generated Playwright Test Suite

**Automatic UI Test Generation for ATID Store Demo Website**

## 📋 Overview

This repository contains sample test runs demonstrating **RoostGPT's automatic UI test generation** capabilities using Playwright for the [ATID Store](https://atid.store) demo website. The ATID Store is a demo e-commerce website specifically designed **For Practicing QA & Test Automation Only!**

RoostGPT showcases two different approaches to AI-powered test generation:
- **Fully Automated**: RoostGPT-generated tests without any user input
- **User-Guided**: RoostGPT-generated tests based on user-provided scenarios

## 🌐 Target Website

**Website**: [atid.store](https://atid.store)  
**Purpose**: Demo e-commerce site for QA practice and test automation learning  



## 📁 Repository Structure

```
├── ai-generated-tests/
│   ├── tests/                    # RoostGPT-generated test files
│   ├── scenarios/               # Generated test scenarios
│   ├── test-results/            # Test execution results
│   ├── package.json             # Project dependencies
│   ├── package-lock.json        # Locked dependencies
│   └── playwright.config.js     # Playwright configuration
│
├── user-input-tests/
│   ├── tests/                    # User-guided RoostGPT test files
│   ├── scenarios/               # User-defined test scenarios
│   ├── test-results/            # Test execution results
│   ├── package.json             # Project dependencies
│   ├── package-lock.json        # Locked dependencies
│   └── playwright.config.js     # Playwright configuration
│
└── README.md                    # This file
```

## 🔍 Sample Test Scenarios

### RoostGPT Auto-Generated Example
```javascript
// Auto-generated product search test by RoostGPT
test('Add Product to Shopping Cart', async ({ page }) => {
  // Step 1: Navigate to the Store page
  const storePageUrl = 'https://atid.store/store/';
  await page.goto(storePageUrl);

  // Verify the Store page loaded correctly
  await expect(page).toHaveURL(storePageUrl);

  // Step 2: Locate a product listing and click on it to view its details
  const productSelector = "//a[@href='https://atid.store/product/anchor-bracelet/' and contains(@class, 'woocommerce-LoopProduct-link')]";
  const productUrl = 'https://atid.store/product/anchor-bracelet/';
  await page.locator(productSelector).click();

  // Step 3: Verify the product detail page loaded
  await page.waitForURL(productUrl);
  await expect(page).toHaveURL(productUrl);
  // Additional RoostGPT-generated assertions...
});
```

### User-Guided RoostGPT Example
```javascript
test('Verify E-Commerce Checkout Process with Validation Errors', async ({ page }) => {
  // Step 1: Navigate to the e-commerce website
  await page.goto('https://atid.store/');
  await expect(page).toHaveURL(/.*atid\.store\/$/);

  // Step 2: Click on the 'SHOP NOW' button in the 'Latest Eyewear For You' category
  const shopNowButton = page.locator('html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > main > article > div > div > section:nth-of-type(1) > div:nth-of-type(2) > div > div > div:nth-of-type(4) > div > div > a > span');
  await shopNowButton.click();

  // Step 3: Verify navigation to the products page
  await expect(page).toHaveURL(/.*atid\.store\/store\/$/);

  // Step 4: Navigate to page 3 by clicking on '3'
  const pageThreeButton = page.locator('html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(2) > main > div > nav:nth-of-type(2) > ul > li:nth-of-type(3) > a.page-numbers');
  await pageThreeButton.click();
```

## 📝 User Requirements Workflow (User-Input Tests)

The `user-input-tests/` folder follows a structured workflow from user requirements to RoostGPT test generation:

### 1. Requirements Documentation
```
- *אפיון*.docx - Original user requirements/scenarios document (Hebrew specification)
- Contains detailed business requirements and user scenarios provided by stakeholders
```
### 2. Feature Specification  
- **`user_scenario.feature`** - Gherkin-formatted feature file generated from the requirements document
- Structured in Given-When-Then format for RoostGPT consumption
- Serves as the bridge between business requirements and RoostGPT implementation

### 3. RoostGPT Test Generation Flow
```
*אפיון*.docx → user_scenario.feature → RoostGPT → Playwright Tests 
```

This workflow ensures traceability from original user requirements through to automated test generation via RoostGPT.

## 📋 Scenario Documentation

Each `scenarios/` folder contains a `scenario_summary.md` file providing comprehensive documentation of all RoostGPT-generated test scenarios. These files include:

### Scenario Details
- **Metadata**: Complexity level, priority, risk assessment, and execution time estimates
- **Test Steps**: Detailed step-by-step instructions for each scenario
- **Element Selectors**: CSS/XPath selectors used for element targeting
- **Expected Results**: Success criteria and validation points
- **Tags**: Categorization labels (form-submission, navigation, accessibility, etc.)

### Example Scenario Structure
```markdown
### 1. Verify User Can Successfully Submit the Contact Form
**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: form-submission, error-handling, accessibility
**Est. Execution Time**: 50 seconds | **Flakiness Potential**: medium

#### Steps:
- Navigate to the Contact Us page
- Fill in required form fields with valid data
- Submit the form and verify confirmation message
```

The scenario documentation helps developers and QA engineers understand RoostGPT's test coverage, prioritize maintenance efforts, and plan execution schedules based on complexity and risk assessments.

## 🧪 Test Implementation Documentation

Each `tests/` folder contains a `test_summary.md` file that provides a concise overview of all RoostGPT-implemented Playwright test files. This documentation bridges the gap between scenario planning and actual test implementation.

### Test Summary Format
```markdown
## Verify Navigation to 'Return to Shop' from Empty Cart
**Description:** Ensure that users can navigate to the shop page from the empty cart page using the 'RETURN TO SHOP' button.
**Priority**: high | **Complexity**: high
**Tags**: accessibility, navigation, cross-browser, ui-test
**Test File:** [verify_navigation_to__return_to_shop__from_empty_cart.spec.js](./verify_navigation_to__return_to_shop__from_empty_cart.spec.js)
```

### Key Features
- **Direct File Links**: Clickable links to actual RoostGPT-generated Playwright test files
- **Implementation Focus**: Bridges scenario documentation to executable code  
- **Quick Reference**: Fast overview of all available tests
- **Tag-Based Filtering**: Easy identification of test types and coverage areas
- **Priority Mapping**: Helps prioritize test execution and maintenance


## 🚀 Test Execution

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation & Setup

1. **Navigate to test folder**: Choose either `ai-generated-tests/` or `user-input-tests/`
   ```bash
   cd ai-generated-tests/
   # OR
   cd user-input-tests/
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install Playwright browsers** (first time only):
   ```bash
   npx playwright install
   ```

### Running Tests

#### Basic Test Execution
```bash
# Run all tests
npx playwright test

```