import { test as base, expect, devices } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { delay5Seconds } from './utils';
import path from 'path';

const iPhone15 = {
  name: 'iPhone 15',
  userAgent:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  viewport: { width: 393, height: 852 },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
  defaultBrowserType: 'chromium',
};

const test = base.extend<{}>({
  context: async ({ browser }, use) => {
    const context = await browser.newContext({
      ...iPhone15,
      httpCredentials: {
        username: 'luckystake',
        password: 'luckystake1!',
      },
      recordVideo: {
        dir: path.join(__dirname, 'videos'), 
        size: iPhone15.viewport, 
      },
    });

    await use(context);
    await context.close();
  },
});

test('Вход и нажатие Redeem на iPhone 15', async ({ context }) => {
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

  const video = page.video();
  if (video) {
    const targetPath = path.join(__dirname, 'videos', `redeem-video-${Date.now()}.webm`);
    await video.saveAs(targetPath);
    console.log('Видео сохранено по пути:', targetPath);
  }
  await page.close();
});
