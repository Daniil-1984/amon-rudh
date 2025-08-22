import { test as base, expect, devices } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { delay5Seconds } from '../utils/utils';
import type { BrowserContext } from '@playwright/test';

//const pixel = devices['Pixel 5'];

const test = base.extend<{ context: BrowserContext }>({
  context: async ({ browser }, use) => {
    const context = await browser.newContext({
      //...pixel, //
      httpCredentials: {
        username: 'luckystake',
        password: 'luckystake1!',
      },
    });
    await use(context);
    await context.close();
  },
});

test('search testing using page objects', async ({ context }) => {
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await page.goto('https://luckystake.dev/');

  await homePage.closePopupIfVisible();

  await loginPage.openLoginForm();
  await loginPage.login('wiztestIsabell_Borer@hotmail.com', 'password');

  await page.waitForSelector('.NewHeader_wrapper__8_z0Y', { state: 'detached', timeout: 5000 }).catch(() => {});
  await homePage.closePopupIfVisible();
await page.locator('.WizIconButton_base__JfGpY.WizPopupWrapper_close__hKtRn').click();

const searchButton = page.locator('button.WizButton_primary-text__fH4gU.NavbarArea_searchButton__oD1Ic');
const searchInput = page.getByPlaceholder('Search');

  await searchButton.click();
  await searchInput.fill('siest');
  await searchInput.press('CapsLock'); 
  await searchInput.press('CapsLock');
  await searchInput.fill('siesta');

  await delay5Seconds();

  const firstGame = page.locator('.SearchGames_search_games__cards_wrapper__8c4ac > div > .WizGameCard_container_gameImage__cFsR9').first();
  await firstGame.scrollIntoViewIfNeeded();
  await firstGame.click();

  await page.getByRole('button', { name: 'Play now' }).click();

  await delay5Seconds();
});
