import { test, expect, Page } from '@playwright/test';

function captureDialogMessage(page: Page): Promise<string> {
  return new Promise(resolve => {
    page.once('dialog', dialog => {
      resolve(dialog.message());
      dialog.dismiss().catch(() => {});
    });
  });
}

test('test', async ({ page }) => {
  await page.goto('');
  await page.getByRole('button', { name: 'Create Account' }).click();
  await page.getByRole('textbox', { name: 'Choose a username' }).click();
  await page.getByRole('textbox', { name: 'Choose a username' }).fill(process.env.TEST_USERNAME!);
  await page.getByRole('textbox', { name: 'Choose a username' }).press('Tab');
  await page.getByRole('textbox', { name: 'your@email.com' }).fill('invalid-email');
  await page.getByRole('textbox', { name: 'your@email.com' }).click();
  await page.getByRole('textbox', { name: 'your@email.com' }).click();
  await page.getByRole('textbox', { name: 'your@email.com' }).click();
  await page.getByRole('textbox', { name: 'your@email.com' }).fill(process.env.TEST_EMAIL!);
  await page.getByRole('textbox', { name: 'your@email.com' }).press('Tab');
  await page.getByRole('textbox', { name: 'Choose a password' }).fill(process.env.TEST_PASSWORD!);
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Register' }).click();
  await page.getByRole('textbox', { name: 'Enter your username' }).click();
  await page.getByRole('textbox', { name: 'Enter your username' }).fill(process.env.TEST_USERNAME!);
  await page.getByRole('textbox', { name: 'Enter your username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Enter your password' }).fill(process.env.TEST_PASSWORD!);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: '🤖 Gunpla Kits' }).click();
  await page.getByRole('button', { name: '🤖 Gunpla Kits' }).click();
  await page.getByRole('button', { name: '➕ Add Kit' }).click();
  await page.getByRole('textbox', { name: 'e.g., RX-78-2 Gundam' }).click();
  await page.getByRole('textbox', { name: 'e.g., RX-78-2 Gundam' }).fill('RX-78-2 Gundam version 2.0');
  await page.locator('select[name="grade"]').selectOption('MG');
  await page.getByRole('textbox', { name: 'e.g., Mobile Suit Gundam' }).click();
  await page.getByRole('textbox', { name: 'e.g., Mobile Suit Gundam' }).fill('Mobile Suit Gundam (0079)');
  await page.locator('select[name="status"]').selectOption('built');
  await page.getByRole('textbox', { name: 'https://example.com/image.jpg' }).click();
  await page.locator('input[name="purchaseDate"]').fill('2026-09-01');
  await page.getByRole('textbox', { name: 'Add any notes about this kit' }).click();
  await page.getByRole('textbox', { name: 'Add any notes about this kit' }).fill('This is an amazing kit');
  await page.getByRole('textbox', { name: 'https://example.com/image.jpg' }).click();
  await page.getByRole('textbox', { name: 'https://example.com/image.jpg' }).fill('https://gunpla.fandom.com/wiki/MG_RX-78-2_Gundam_(Ver._2.0)?file=MG-RX-78-2-Gundam-ver.2.0.-box-art.jpg');

  const saveAlert = captureDialogMessage(page);
  await page.locator('form').getByRole('button', { name: '➕ Add Kit' }).click();
  expect(await saveAlert).toBe('Kit saved successfully!');

  const kitCard = page.locator('.kit-card', { hasText: 'RX-78-2 Gundam version 2.0' });
  await expect(kitCard).toBeVisible();
  await expect(kitCard.locator('.kit-grade')).toHaveText('MG');
});