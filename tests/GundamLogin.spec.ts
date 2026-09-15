import { test, expect, Page, devices } from '@playwright/test';

function captureDialogMessage(page: Page): Promise<string> {
  return new Promise(resolve => {
    page.once('dialog', dialog => {
      resolve(dialog.message());
      dialog.dismiss().catch(() => {});
    });
  });
}

test('GundamLogin', async ({ page }) => {
  await page.goto('./');
  
  await page.getByRole('textbox', { name: 'Enter your username' }).click();
  await page.getByRole('button', { name: 'Create Account' }).click();
  await page.getByRole('textbox', { name: 'Choose a username' }).click();
  await page.getByRole('textbox', { name: 'Choose a username' }).fill(process.env.TEST_USERNAME!);
  await page.getByRole('textbox', { name: 'Choose a username' }).press('Tab');
  await page.getByRole('textbox', { name: 'your@email.com' }).fill(process.env.TEST_EMAIL!);
  await page.getByRole('textbox', { name: 'Choose a username' }).click();
  await page.getByRole('textbox', { name: 'Choose a username' }).fill(process.env.TEST_USERNAME!);
  await page.getByRole('textbox', { name: 'Choose a password' }).click();
  await page.getByRole('textbox', { name: 'Choose a password' }).fill(process.env.TEST_PASSWORD!);

  const registerAlert = captureDialogMessage(page);
  await page.getByRole('button', { name: 'Register' }).click();
  expect(await registerAlert).toBe('Registration successful! Please log in.');

  await page.getByRole('textbox', { name: 'Enter your username' }).click();
  await page.getByRole('textbox', { name: 'Enter your username' }).fill(process.env.TEST_USERNAME!);
  await page.getByRole('textbox', { name: 'Enter your username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Enter your password' }).fill(process.env.TEST_PASSWORD!);
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText(`Welcome, ${process.env.TEST_USERNAME}!`)).toBeVisible();
});

test('GundamLogin - invalid credentials show error', async ({ page }) => {
  await page.goto('');

  await page.getByRole('textbox', { name: 'Enter your username' }).fill(process.env.TEST_USERNAME!);
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('wrong-password');

  const loginAlert = captureDialogMessage(page);
  await page.getByRole('button', { name: 'Login' }).click();
  expect(await loginAlert).toBe('Invalid username or password');
});

test.describe('GundamLogin - mobile view', () => {
  const { defaultBrowserType, ...iPhone12 } = devices['iPhone 12'];
  test.use({ ...iPhone12 });

  test('login form stacks into a single column and login succeeds', async ({ page }) => {
    await page.goto('');

    const navbar = page.locator('.navbar');
    await expect(navbar).toHaveCSS('flex-direction', 'column');

    const loginContent = page.locator('.login-content');
    const box = await loginContent.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeLessThanOrEqual(page.viewportSize()!.width);

    await page.getByRole('textbox', { name: 'Enter your username' }).click();
    await page.getByRole('button', { name: 'Create Account' }).click();
    await page.getByRole('textbox', { name: 'Choose a username' }).click();
    await page.getByRole('textbox', { name: 'Choose a username' }).fill(process.env.TEST_USERNAME!);
    await page.getByRole('textbox', { name: 'Choose a username' }).press('Tab');
    await page.getByRole('textbox', { name: 'your@email.com' }).fill(process.env.TEST_EMAIL!);
    await page.getByRole('textbox', { name: 'Choose a username' }).click();
    await page.getByRole('textbox', { name: 'Choose a username' }).fill(process.env.TEST_USERNAME!);
    await page.getByRole('textbox', { name: 'Choose a password' }).click();
    await page.getByRole('textbox', { name: 'Choose a password' }).fill(process.env.TEST_PASSWORD!);

    const registerAlert = captureDialogMessage(page);
    await page.getByRole('button', { name: 'Register' }).click();
    expect(await registerAlert).toBe('Registration successful! Please log in.');

    await page.getByRole('textbox', { name: 'Enter your username' }).click();
    await page.getByRole('textbox', { name: 'Enter your username' }).fill(process.env.TEST_USERNAME!);
    await page.getByRole('textbox', { name: 'Enter your username' }).press('Tab');
    await page.getByRole('textbox', { name: 'Enter your password' }).fill(process.env.TEST_PASSWORD!);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText(`Welcome, ${process.env.TEST_USERNAME}!`)).toBeVisible();
  });
});
