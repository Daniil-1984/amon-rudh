import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://luckystake.dev/');
  await page.getByRole('button', { name: 'LOG IN' }).click();
  await page.getByRole('textbox', { name: 'Email or Username' }).click();

  await page.getByRole('textbox', { name: 'Email or Username' }).fill('wiztestIsabell_Borer@hotmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('password');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.locator('.WizIconButton_base__JfGpY.WizPopupWrapper_close__hKtRn').click();
});