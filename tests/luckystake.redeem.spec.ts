import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('redeem test', async ({ browser }) => {
  
  const context = await browser.newContext({
    httpCredentials: {
      username: 'luckystake',
      password: 'luckystake1!',
    },
  });

  const page = await context.newPage();

  try {
    await page.goto('https://luckystake.dev/');
    await page.locator('.WizPopupWrapper_wrapper__container__D4qDj > .WizIconButton_base__JfGpY').click();
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.getByText('Email or Username').click();
    await page.getByRole('textbox', { name: 'Email or Username' }).fill('wiztestIsabell_Borer@hotmail.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('password');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.locator('.WizPopupWrapper_wrapper__container__D4qDj > button').click();
    await page.getByRole('button', { name: 'Redeem' }).click();
    await page.locator('span.RedeemPopup_highlight__pL8TA', { hasText: 'SC 500.00' }).click();
    await page.getByRole('button', { name: 'Redeem Gift Cards' }).click();
    await page.locator('iframe[title="WizCashier"]').contentFrame().getByRole('button', { name: 'Redeem' }).click();
    await page.locator('iframe[title="WizCashier"]').contentFrame().locator('iframe').contentFrame().locator('.clear-image-overlay').first().click();
    await page.locator('iframe[title="WizCashier"]').contentFrame().locator('iframe').contentFrame().getByTestId('button-option-500').getByText('$').click();
    await page.locator('iframe[title="WizCashier"]').contentFrame().locator('iframe').contentFrame().getByRole('button', { name: 'Select Gift Card' }).click();
    await page.locator('iframe[title="WizCashier"]').contentFrame().locator('iframe').contentFrame().getByRole('button', { name: 'Confirm purchase' }).dblclick();
    await page.getByRole('button', { name: 'Close' }).click();
    await page.getByRole('button', { name: 'Redeem' }).click();
    await page.getByText('SC 495.00').click();
    await page.getByText('SC 995.25').click();
    await page.getByText('SC 500.25').click();
    await page.getByRole('button', { name: 'Cancel' }).click();
    await page.getByText('SC 495.00').click();
    await page.waitForTimeout(5000);
    await page.locator('div').filter({ hasText: /^Redeem$/ }).locator('path').click();
    await page.getByRole('button', { name: 'Redeem' }).click();
    await page.getByText('SC 500.00').click();
    await page.getByText('SC 1,000.25').click();
    await page.waitForTimeout(5000); 
     } catch (error) {
    console.error('Test failed:', error);
  } finally {
  }
});
