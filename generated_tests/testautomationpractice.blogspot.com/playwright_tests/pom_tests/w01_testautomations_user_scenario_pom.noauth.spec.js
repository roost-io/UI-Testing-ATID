import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { HomePage } from './pom/HomePage.js';
import { GuiElementsPage } from './pom/GuiElementsPage.js';
import { DownloadFilesPage } from './pom/DownloadFilesPage.js';
import { DownloadConfirmationPage } from './pom/DownloadConfirmationPage.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.BASE_URL || 'https://testautomationpractice.blogspot.com';
const BASE_HOST_URL = process.env.BASE_HOST_URL || 'https://testautomationpractice.blogspot.com';
let stepTimeout30 = { timeout: 30000 };

// Main business workflow test

test('Discovered Workflow: e2e_business_workflow - Complete User Journey', { tag: ['@smoke'] }, async ({ page, context }) => {
  // Step 1: Navigate to homepage
  const homePage = new HomePage(page);
  await homePage.navigateToHomePage(stepTimeout30.timeout);
  await expect(page).toHaveURL(BASE_URL);

  // Step 2: Click GUI Elements link
  await homePage.clickGuiElementsLink(stepTimeout30.timeout);
  await expect(page).toHaveURL(`${BASE_HOST_URL}/2018/09/automation-form.html`);

  // Step 3: Click Download Files link
  const guiElementsPage = new GuiElementsPage(page);
  await guiElementsPage.clickDownloadFilesLink(stepTimeout30.timeout);
  await expect(page).toHaveURL(`${BASE_HOST_URL}/p/download-files_25.html`);

  // Step 4: Generate and Download Text File (triggers download)
  const downloadFilesPage = new DownloadFilesPage(page);
  await downloadFilesPage.generateAndDownloadTextFile(stepTimeout30.timeout);
  await expect(page).toHaveURL(`${BASE_HOST_URL}/p/download-files_25.html`);

  // Step 5: Generate and Download PDF File
  await downloadFilesPage.generateAndDownloadPdfFile(stepTimeout30.timeout);
  await expect(page).toHaveURL(`${BASE_HOST_URL}/p/download-files_25.html`);

  // Step 6: Download PDF File (triggers new tab)
  await downloadFilesPage.downloadPdfFile(stepTimeout30.timeout, context);
  await expect(page).toHaveURL(`${BASE_HOST_URL}/p/download-files_25.html`);

  // Step 7: Tab switch and verification (download confirmation)
  // The downloadPdfFile method now handles tab switch and blob URL assertion.
});

