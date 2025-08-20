import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { delay5Seconds } from '../utils/utils';

test('redeem test', async ({ browser }) => {
  const context = await browser.newContext({
    httpCredentials: {
      username: 'luckystake',
      password: 'luckystake1!',
    },
  });
  const page = await context.newPage();

  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await page.goto('https://luckystake.dev/');
  await page.locator('.WizIconButton_base__pi4E4.WizPopupWrapper_close__AbJBr').click();
  await page.getByRole('button', { name: 'LOG IN' }).click();
  await page.getByText('Email or Username').click();

  await page.getByRole('textbox', { name: 'Email or Username' }).fill('wiztestIsabell_Borer@hotmail.com');
  await page.getByText('Password', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('password');
  await page.getByRole('textbox', { name: 'Password' }).press('Enter');
    await homePage.closePopupIfVisible();

  await page.locator('.WizIconButton_base__JfGpY.WizPopupWrapper_close__hKtRn').click();

  await page.getByRole('button', { name: 'Redeem' }).click();
  await page.getByText('SC 980.25').click();
  await page.getByText('SC 500.25').click();
  await page.getByText('SC 480.00').click();
  await page.getByRole('button', { name: 'Redeem Gift Cards' }).click();
  await page.locator('iframe[title="WizCashier"]').contentFrame().getByRole('button', { name: 'Redeem' }).click();
  await page.locator('iframe[title="WizCashier"]').contentFrame().locator('iframe').contentFrame().locator('.clear-image-overlay').first().click();
  await page.locator('iframe[title="WizCashier"]').contentFrame().locator('iframe').contentFrame().getByRole('button', { name: 'Select Gift Card' }).click();
  await page.locator('iframe[title="WizCashier"]').contentFrame().locator('iframe').contentFrame().getByRole('button', { name: 'Confirm purchase' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('button', { name: 'Redeem' }).click();
  await page.getByText('SC 975.25').click();
  await page.getByText('SC 500.25').click();
  await page.getByText('SC 475.00').click();
  await page.getByRole('button', { name: 'Cancel' }).first().click();
  await page.getByText('SC 475.00').click();
  await page.getByText('SC 500.25').click();
  await page.getByText('SC 975.25').click();
  await page.locator('.RedeemPopup_close__3XX1x > svg').click();
    await delay5Seconds();
  await page.getByRole('button', { name: 'Redeem' }).click();
  await delay5Seconds();
  
  await page.getByText('SC 480.00').click();
  await page.getByText('SC 500.25').click();
  await page.getByText('SC 980.25').click();
  }
);
