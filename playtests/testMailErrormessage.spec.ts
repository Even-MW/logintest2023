import { test, expect } from '@playwright/test';

test('Register as a new user', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Registrer' }).click();
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('even@test.no');
  await page.locator('input[name="email"]').press('Tab');
  await page.locator('input[name="password"]').fill('Test123@');
  await page.locator('input[name="password"]').press('Tab');
  await page.locator('input[name="verifypassword"]').fill('Test123@');
  await page.getByRole('button', { name: 'Registrer meg' }).click();
  await expect(page.locator('div[role="banner"]')).toHaveText('Registrering fullført, logg inn under!');
  await expect(page.locator('div[role="banner"]')).toBeVisible();
});

test('Getting error message for invalid email.', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('even@test');
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill('testet');
  await page.getByRole('button', { name: 'Logg inn' }).click();
  await expect(page.locator('div[role="alert"]')).toHaveText('Feil passord eller epost');
});

test('Getting popup for registration complete', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Registrer' }).click();
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('even@test.no');
  await page.locator('input[name="email"]').press('Tab');
  await page.locator('input[name="password"]').fill('Test123@');
  await page.locator('input[name="password"]').press('Tab');
  await page.locator('input[name="verifypassword"]').fill('Test123@');
  await page.getByRole('button', { name: 'Registrer meg' }).click();
  await expect(page.locator('div[role="banner"]')).toHaveText('Registrering fullført, logg inn under!');
  await expect(page.locator('div[role="banner"]')).toBeVisible();
  await expect(page.locator('div[role="banner"]')).toBeHidden();
});



test('Test login as existing user', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Registrer' }).click();
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('even@test.no');
  await page.locator('input[name="email"]').press('Tab');
  await page.locator('input[name="password"]').fill('Test123@');
  await page.locator('input[name="password"]').press('Tab');
  await page.locator('input[name="verifypassword"]').fill('Test123@');
  await page.getByRole('button', { name: 'Registrer meg' }).click();
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('even@test.no');
  await page.locator('input[name="email"]').press('Tab');
  await page.locator('input[name="password"]').fill('Test123@');
  await page.getByRole('button', { name: 'Logg inn' }).click();
  await expect(page.getByTestId('loggedInUser')).toBeVisible();
});

test('Getting error message for invalid password.', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('even@test.no');
  await page.locator('input[name="email"]').press('Tab');
  await page.locator('input[name="password"]').fill('tes23');
  await page.getByRole('button', { name: 'Logg inn' }).click();
  await expect(page.getByText('Feil passord eller epost')).toBeVisible();
});


test("Getting error that passwords don't match", async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Registrer' }).click();
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('even@test.no');
  await page.locator('input[name="email"]').press('Tab');
  await page.locator('input[name="password"]').fill('Test123@');
  await page.locator('input[name="password"]').press('Tab');
  await page.locator('input[name="verifypassword"]').fill('Test123');
  await page.getByRole('button', { name: 'Registrer meg' }).click();
  await expect(page.locator('div[role="alert"]')).toHaveText('Passordene må være like');
});

test("That strength bar is visible", async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Registrer' }).click();
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('even@test.no');
  await page.locator('input[name="email"]').press('Tab');
  await page.locator('input[name="password"]').fill('Test123@');
  await page.locator('input[name="password"]').press('Tab');
  await page.locator('input[name="verifypassword"]').fill('Test123');
  await page.locator('input[name="verifypassword"]').press('Tab');
  await expect(page.locator('div[role="progressbar"]')).toBeVisible();
});


test("That each step of the progressbar is the correct color", async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Registrer' }).click();
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('even@test.no');
  await page.locator('input[name="email"]').press('Tab');
  await page.locator('input[name="password"]').fill('test');
  await expect(page.getByRole('progressbar').locator('div').first()).toHaveClass('password-strength__bar password-strength__bar--low  ');
  await expect(page.getByRole('progressbar').locator('div').nth(1)).toHaveClass('password-strength__bar password-strength__bar--default  ');
  await expect(page.getByRole('progressbar').locator('div').nth(2)).toHaveClass('password-strength__bar password-strength__bar--default  ');
  await page.locator('input[name="password"]').fill('Test123');
  await expect(page.getByRole('progressbar').locator('div').first()).toHaveClass('password-strength__bar  password-strength__bar--medium ');
  await expect(page.getByRole('progressbar').locator('div').nth(1)).toHaveClass('password-strength__bar  password-strength__bar--medium ');
  await expect(page.getByRole('progressbar').locator('div').nth(2)).toHaveClass('password-strength__bar  password-strength__bar--default ');
  await page.locator('input[name="password"]').fill('Test123@');
  await expect(page.getByRole('progressbar').locator('div').first()).toHaveClass('password-strength__bar   password-strength__bar--strong');
  await expect(page.getByRole('progressbar').locator('div').nth(1)).toHaveClass('password-strength__bar   password-strength__bar--strong');
  await expect(page.getByRole('progressbar').locator('div').nth(2)).toHaveClass('password-strength__bar   password-strength__bar--strong');
});



