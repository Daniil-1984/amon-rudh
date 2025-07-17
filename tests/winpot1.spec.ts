import { test, expect } from '@playwright/test';
import path from 'path';

test('winpot test with full video and all steps', async ({ browser }) => {
  test.setTimeout(120000); // увеличенный таймаут

  const context = await browser.newContext({
    recordVideo: {
      dir: 'videos/',
      size: { width: 1280, height: 720 },
    },
  });

  const page = await context.newPage();

  try {
    console.log('Step 1: Переход на сайт');
    await page.goto('https://www.winpot.mx/');

    console.log('Step 2: Нажатие на "Acceder"');
    await page.getByRole('button', { name: 'Acceder' }).click();

    console.log('Step 3: Ввод логина');
    await page.getByRole('textbox', { name: 'Usuario o Correo Electrónico' }).fill('wiztestAlvina_Vandervort@gmail.com');

    console.log('Step 4: Ввод пароля');
    await page.getByRole('textbox', { name: 'Contraseña Contraseña' }).fill('password');

    console.log('Step 5: Клик по первой кнопке в login-form');
    await page.locator('#login-form').getByRole('button').first().click();

    console.log('Step 6: Клик по кнопке submit');
    await page.locator('#login-form-submit-button').click();

    console.log('Step 7: Клик по первому ._7fSOQfbPYrndbIN8Ml17');
    await page.locator('._7fSOQfbPYrndbIN8Ml17').first().click();

    console.log('Step 8: Подтверждение кнопкой OK');
    await page.getByRole('button', { name: 'OK' }).click();

    console.log('Step 9: Клик по 7 элементу div > .Z5WRz53_W6H79QrziyAM > ._7fSOQfbPYrndbIN8Ml17');
    await page.locator('div:nth-child(7) > .Z5WRz53_W6H79QrziyAM > ._7fSOQfbPYrndbIN8Ml17').first().click();

    console.log('Step 10: Подтверждение кнопкой OK');
    await page.getByRole('button', { name: 'OK' }).click();


    console.log('✅ Все шаги выполнены');
  } catch (err) {
    console.error('❌ Ошибка в одном из шагов:', err);
  } finally {
    try {
      console.log('⏳ Ждём 15 секунд для завершения записи видео');
      await page.waitForTimeout(15000);
    } catch (e) {
      console.error('Ошибка при ожидании перед завершением:', e);
    }

    const video = page.video();

    try {
      await context.close(); // закрываем после получения video
    } catch (e) {
      console.error('Ошибка при закрытии контекста:', e);
    }

    if (video) {
      const savePath = path.join('videos', `video-${Date.now()}.webm`);
      try {
        await video.saveAs(savePath);
        console.log('✅ Видео сохранено по пути:', savePath);
      } catch (saveErr) {
        console.error('❌ Ошибка при сохранении видео:', saveErr);
      }
    } else {
      console.log('❌ Видео не было записано.');
    }
  }
});
