import { test, expect } from '@playwright/test';

test('test the full run of the login stage', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Registrer' }).click();
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('even@playtest.no');
  await page.locator('input[name="email"]').press('Tab');
  await page.locator('input[name="password"]').fill('Test1234@');
  await page.locator('input[name="password"]').press('Tab');
  await page.locator('input[name="verifypassword"]').fill('Test123@');
  await page.getByRole('button', { name: 'Registrer meg' }).click();
  await page.locator('input[name="verifypassword"]').click();
  await page.locator('input[name="verifypassword"]').press('ArrowLeft');
  await page.locator('input[name="verifypassword"]').fill('Test1234@');
  await page.getByRole('button', { name: 'Registrer meg' }).click();
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('even@playtest.no');
  await page.locator('input[name="email"]').press('Tab');
  await page.locator('input[name="password"]').fill('Test1234@');
  await page.locator('input[name="password"]').press('Enter');
  await page.getByRole('button', { name: 'Logg ut' }).click();
});