import { test, expect } from '@playwright/test';
import path from 'path';

test('My first test with video', async ({ browser }) => {
  const context = await browser.newContext({
    recordVideo: {
      dir: 'videos/',
      size: { width: 1280, height: 720 },
    },
  });

  const page = await context.newPage();

  try {
    await page.goto('https://www.winpot.mx/?modal=Login');
    await page.click('input[name="email"]');
    await page.fill('input[name="email"]', 'wiztestAlvina_Vandervort@gmail.com');
    await page.click('input[name="password"]');
    await page.fill('input[name="password"]', 'password');
    await page.click('button[id="login-form-submit-button"]');
  } catch (err) {
    console.error('❌ Ошибка во время выполнения теста:', err);
  } finally {
    const video = page.video(); // синхронный вызов, без .catch()
    await context.close(); // сначала закрываем контекст, иначе видео не сохраняется

    if (video) {
      const savePath = path.join('videos', `video-${Date.now()}.webm`);
      await video.saveAs(savePath);
      console.log('✅ Видео сохранено по пути:', savePath);
    } else {
      console.log('❌ Видео не было записано.');
    }
  }
}, { timeout: 60_000 });
