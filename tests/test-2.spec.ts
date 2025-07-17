import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://luckystake.dev/');
  await page.locator('.WizPopupWrapper_wrapper__container__D4qDj > .WizIconButton_base__JfGpY').click();
  await page.getByRole('button', { name: 'Log In' }).click();
});