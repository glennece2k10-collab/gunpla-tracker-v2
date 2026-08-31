import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('');
  await page.getByRole('textbox', { name: 'Enter your username' }).click();
  await page.getByRole('button', { name: 'Create Account' }).click();
  await page.getByRole('textbox', { name: 'Choose a username' }).click();
  await page.getByRole('textbox', { name: 'Choose a username' }).fill('glenn');
  await page.getByRole('textbox', { name: 'Choose a username' }).press('Tab');
  await page.getByRole('textbox', { name: 'your@email.com' }).fill('glenn_ece2k10@yahoo.com');
  await page.getByRole('textbox', { name: 'Choose a username' }).click();
  await page.getByRole('textbox', { name: 'Choose a username' }).fill('glennyahoo');
  await page.getByRole('textbox', { name: 'Choose a password' }).click();
  await page.getByRole('textbox', { name: 'Choose a password' }).fill('no12alak');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Register' }).click();
  await page.getByRole('textbox', { name: 'Enter your username' }).click();
  await page.getByRole('textbox', { name: 'Enter your username' }).fill('glennyahoo');
  await page.getByRole('textbox', { name: 'Enter your username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('no12alak');
  await page.getByRole('button', { name: 'Login' }).click();
});