import 'dotenv/config';
import { test, expect } from '@playwright/test';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.BASE_URL;
const BASE_HOST_URL = process.env.BASE_HOST_URL;

// Capture accessibility tree and screenshot on failure

test.setTimeout(120000);

test('Homepage Accessibility - Initial Entry Point', async ({ page }) => {
  // Step 1: Navigate to website homepage
  // Use BASE_URL for initial navigation, fallback to BASE_HOST_URL if not set
  await page.goto(BASE_URL || BASE_HOST_URL);
  await page.waitForLoadState('networkidle');

  // Verify page is reachable at the root URL
  // Accept both with and without trailing slash
  const expectedHomeUrl = (BASE_URL || BASE_HOST_URL).endsWith('/') ? (BASE_URL || BASE_HOST_URL) : (BASE_URL || BASE_HOST_URL) + '/';
  await expect(page).toHaveURL(new RegExp(`^${expectedHomeUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`));
});