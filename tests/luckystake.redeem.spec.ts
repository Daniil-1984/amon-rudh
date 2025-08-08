import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

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

  try {
    await page.goto('https://luckystake.dev/');
    await homePage.closePopupIfVisible();
    await page.locator('.WizIconButton_base__pi4E4.WizPopupWrapper_close__AbJBr').click();
  
    await loginPage.openLoginForm();
    await loginPage.login('wiztestIsabell_Borer@hotmail.com', 'password');
    await homePage.closePopupIfVisible();
await page.locator('.WizIconButton_base__JfGpY.WizPopupWrapper_close__hKtRn').click();
    await page.getByRole('button', { name: 'Redeem' }).click();
    await page.getByText('SC 500.00', { exact: true }).click();
    await page.getByText('SC 500.25', { exact: true }).click();
    await page.getByText('SC 1,000.25', { exact: true }).click();
    await page.getByRole('button', { name: 'Redeem Gift Cards' }).click();

    const outerFrameElement = await page.locator('iframe[title="WizCashier"]').elementHandle();
    const outerFrame = await outerFrameElement?.contentFrame();
    if (!outerFrame) throw new Error('Outer iframe not loaded');

    await outerFrame.getByRole('button', { name: 'Redeem' }).click();

    const innerFrameElement = await outerFrame.locator('iframe').elementHandle();
    const innerFrame = await innerFrameElement?.contentFrame();
    if (!innerFrame) throw new Error('Inner iframe not loaded');

    await innerFrame.locator('.clear-image-overlay').first().click();
    await innerFrame.getByRole('button', { name: 'Select Gift Card' }).click();
    await innerFrame.getByRole('button', { name: 'Confirm purchase' }).click();

    await page.getByRole('button', { name: 'Close' }).click();

    await page.getByRole('button', { name: 'Redeem' }).click();
    await page.getByText('SC 495.00', { exact: true }).click();
    await page.getByText('SC 995.25', { exact: true }).click();
    await page.getByText('SC 500.25', { exact: true }).click();
    await page.getByRole('button', { name: 'Cancel' }).click();

    await page.locator('.RedeemPopup_close__3XX1x > svg').click();
    await page.waitForTimeout(5000);

    await page.getByRole('button', { name: 'Redeem' }).click();
    await page.getByText('SC 500.25', { exact: true }).click();
    await page.getByText('SC 1,000.25', { exact: true }).click();

    await page.waitForTimeout(5000);
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await context.close();
  }
});
