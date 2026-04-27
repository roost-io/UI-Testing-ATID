import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { HomePage } from './pom/HomePage.js';
import { MortgageStartPage } from './pom/MortgageStartPage.js';
import { MortgageWorkflowPage } from './pom/MortgageWorkflowPage.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let stepTimeout30 = { timeout: 30000 };

const BASE_URL = process.env.BASE_URL;
const BASE_HOST_URL = process.env.BASE_HOST_URL;

// Regex for workflow page URL to allow query params
const WORKFLOW_URL_REGEX = /https:\/\/mortgage\.leumi\.co\.il\/minisite\/mortgage.*/;

test('Discovered Workflow: e2e_business_workflow - Complete User Journey', { tag: ['@smoke'] }, async ({ page }) => {
  // Step 1: Navigate to homepage
  const homePage = new HomePage(page);
  await homePage.navigateToHomepage();
  await expect(page).toHaveURL('https://www.mortgage.leumi.co.il', stepTimeout30);

  // Step 2: Click the 'בואו נתחיל' button to initiate mortgage workflow
  const mortgageStartPage = new MortgageStartPage(page);
  await mortgageStartPage.clickStartButton();
  await expect(page).toHaveURL(WORKFLOW_URL_REGEX, stepTimeout30);

  // Step 4: Return to homepage for fresh start
  await homePage.navigateToHomepage();
  await expect(page).toHaveURL('https://www.mortgage.leumi.co.il', stepTimeout30);

  // Step 5: Repeat click on 'בואו נתחיל' button to confirm selector stability
  await mortgageStartPage.clickStartButton();
  await expect(page).toHaveURL(WORKFLOW_URL_REGEX, stepTimeout30);
});

