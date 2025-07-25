import { test as base, expect, devices } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { delay5Seconds } from './utils';

// Используем встроенную конфигурацию iPhone 15
//const iPhone15 = devices['iPhone 15'];

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

test('Вход и нажатие Redeem на iPhone 15 (Safari)', async ({ context }) => {
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await page.goto('https://luckystake.dev/');
  await homePage.closePopupIfVisible();
  await loginPage.openLoginForm();
  await loginPage.login('wiztestIsabell_Borer@hotmail.com', 'password');

  await page
    .waitForSelector('.NewHeader_wrapper__8_z0Y', { state: 'detached', timeout: 5000 })
    .catch(() => {});
  await homePage.closePopupIfVisible();

  await homePage.clickRedeem();
  await delay5Seconds();
  await page.close();
});
