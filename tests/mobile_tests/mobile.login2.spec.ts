import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { delay5Seconds } from '../utils/utils';


// Если нужно будет подключить iPhone:
// const iPhone15 = devices['iPhone 15'];

const test = base.extend<{}>({
  context: async ({ browser }, use) => {
    const context = await browser.newContext({
       //...iPhone15, // если хочешь эмуляцию iPhone
      httpCredentials: {
        username: 'luckystake',
        password: 'luckystake1!',
      },
    });
    await use(context);
    await context.close();
  },
});

// ✅ Сам тест теперь внутри test()
test('Login and Redeem flow', async ({ context }) => {
  const page = await context.newPage();
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  await page.goto('https://luckystake.dev/');
          await page.locator('.WizIconButton_base__pi4E4.WizPopupWrapper_close__AbJBr').click();


await page.getByRole('button', { name: 'Log In' }).click();
 await page.getByText('Email or Username').click();
    await page.getByRole('textbox', { name: 'Email or Username' }).fill('wiztestIsabell_Borer@hotmail.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('password');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.locator('.WizPopupWrapper_wrapper__container__D4qDj > button').click();

  await delay5Seconds();

      await page.locator('.loading-overlay, .modal-background').waitFor({ state: 'detached', timeout: 5000 });

await delay5Seconds();
    
});

  