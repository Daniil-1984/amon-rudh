import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { delay5Seconds } from './utils';
import path from 'path';

const test = base.extend<{}>({
  context: async ({ browser }, use) => {
    const context = await browser.newContext({
      httpCredentials: {
        username: 'luckystake',
        password: 'luckystake1!',
      },
      recordVideo: {
        dir: path.join(__dirname, 'videos'), // Путь до tests/videos
        size: { width: 1280, height: 720 },
      },
    });

    await use(context);
    await context.close();
  },
});

test('Вход и нажатие Redeem', async ({ context }) => {
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await page.goto('https://luckystake.dev/');
  await homePage.closePopupIfVisible();
  await loginPage.openLoginForm();
  await loginPage.login('wiztestIsabell_Borer@hotmail.com', 'password');
  await page.waitForLoadState('networkidle');

  // Ждём исчезновения возможного блокирующего баннера
  await page.waitForSelector('.NewHeader_wrapper__8_z0Y', { state: 'detached', timeout: 5000 }).catch(() => {});
  await homePage.closePopupIfVisible();

  await homePage.clickRedeem();
  await delay5Seconds();

   // Важно: чтобы сохранить видео, дождись завершения всех действий
  const video = page.video();
  if (video) {
    const targetPath = path.join(__dirname, 'videos', `redeem-video-${Date.now()}.webm`);
    await video.saveAs(targetPath);
    console.log('Видео сохранено по пути:', targetPath);
  }
await page.close(); 
});
