import { test, expect } from '@playwright/test';
import path from 'path';

test('test with video recording', async ({ browser }) => {
  const context = await browser.newContext({
    recordVideo: {
      dir: 'videos/', // Папка, куда будет сохранено видео
      size: { width: 1280, height: 720 }, // Необязательно
    },
  });

  const page = await context.newPage();

  try {
    await page.goto('https://www.winpot.mx/');
    await page.getByRole('button', { name: 'Acceder' }).click();
    await page.getByRole('textbox', { name: 'Usuario o Correo Electrónico' }).fill('wiztestAlvina_Vandervort@gmail.com');
    await page.getByRole('textbox', { name: 'Contraseña Contraseña' }).fill('password');
    await page.locator('#login-form').getByRole('button').first().click();
    await page.locator('#login-form-submit-button').click();
    await page.getByTestId('popular-games-button').click();
    await page.getByTestId('game-modal-popup').getByRole('img', { name: 'Super Hot Bell Link' }).click();
    await page.goto('https://www.winpot.mx/game/real/7572');
    await page.getByRole('button', { name: 'OK' }).click();
  } catch (error) {
    console.error('❌ Ошибка во время выполнения теста:', error);
  } finally {
    const video = await page.video().catch(() => null);
    try {
      await context.close();
    } catch (e) {
      console.warn('⚠️ Контекст уже закрыт:', e);
    }

    if (video) {
      const filePath = path.join('videos', `video-${Date.now()}.webm`);
      await video.saveAs(filePath);
      console.log('✅ Видео сохранено по пути:', filePath);
    } else {
      console.log('❌ Видео не было записано.');
    }
  }
}, { timeout: 120_000 }); // ⏱ Увеличенный таймаут
