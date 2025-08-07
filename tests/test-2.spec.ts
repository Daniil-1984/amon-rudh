import { test as base, expect, devices } from '@playwright/test';
import { delay5Seconds } from './utils';

const test = base.extend<{}>({
  context: async ({ browser }, use) => {
    const context = await browser.newContext({
      //...iPhone15, // эмуляция iPhone 15 с Safari
      httpCredentials: {
        username: 'luckystake',
        password: 'luckystake1!',
      },
    });
    await use(context);
    await context.close();
  },
});

test('MOBILE REDEEM', async ({ page }) => {
  await page.goto('https://luckystake.dev/');
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByText('Email or Username').click();
  await page.getByRole('textbox', { name: 'Email or Username' }).click();
  await page.getByRole('textbox', { name: 'Email or Username' }).fill('wiztestIsabell_Borer@hotmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('password');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button').filter({ hasText: /^$/ }).nth(1).click();
  await page.locator('div').filter({ hasText: /^Redeem$/ }).getByRole('button').click();
  await page.getByText('SC 1,000.25').click();
  await page.getByText('SC 500.25').click();
  await page.getByText('SC 500.00').click();
  
  await delay5Seconds();

  await page.getByRole('button', { name: 'Redeem Gift Cards' }).click();
  await page.locator('iframe[title="WizCashier"]').contentFrame().getByRole('button', { name: 'Redeem' }).click();
  await page.locator('iframe[title="WizCashier"]').contentFrame().locator('iframe').contentFrame().locator('.clear-image-overlay').first().click();
  await page.locator('iframe[title="WizCashier"]').contentFrame().locator('iframe').contentFrame().getByRole('button', { name: 'Select Gift Card' }).click();
  await page.locator('iframe[title="WizCashier"]').contentFrame().locator('iframe').contentFrame().getByRole('button', { name: 'Confirm purchase' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('div').filter({ hasText: /^Redeem$/ }).getByRole('button').click();
  await page.getByText('SC 995.25').click();
  await page.getByText('SC 500.25').click();
  await page.getByText('SC 495.00').click();

  await delay5Seconds();

  await page.getByRole('button', { name: 'Cancel' }).click();
  await page.locator('.RedeemPopup_close__3XX1x').click();
  await page.locator('div').filter({ hasText: /^Redeem$/ }).getByRole('button').click();
  await page.getByText('SC 1,000.25').click();
  await page.getByText('SC 500.25').click();
  await page.getByText('SC 500.00').click();

await delay5Seconds();

});