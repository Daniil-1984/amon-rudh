import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('winpot test', async ({ browser }) => {
  const context = await browser.newContext({
    recordVideo: {
      dir: 'videos/',
      size: { width: 1280, height: 720 },
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
    await page.locator('._7fSOQfbPYrndbIN8Ml17').first().click();
    await page.getByRole('button', { name: 'OK' }).click();
    await page.locator('div:nth-child(7) > .Z5WRz53_W6H79QrziyAM > ._7fSOQfbPYrndbIN8Ml17').first().click();
    await page.getByRole('button', { name: 'OK' }).click();
    await page.getByRole('textbox', { name: 'Contraseña Contraseña' }).fill('password');
    await page.locator('#login-form-submit-button').click();
    await page.goto('https://www.winpot.mx/casino');
    await page.locator('._7fSOQfbPYrndbIN8Ml17').first().click();
    await page.getByRole('button', { name: 'OK' }).click();
    await page.locator('div:nth-child(3) > .Z5WRz53_W6H79QrziyAM > ._7fSOQfbPYrndbIN8Ml17 > .PZ8ZaOpks07Oi_hYsviP > .ziBQ1bhS7DU13APWezwD').first().click();
    await page.getByRole('button', { name: 'OK' }).click();
  } finally {
    const video = await page.video(); // получить ссылку ДО закрытия
    await context.close();

    if (video) {
      const savePath = path.join('videos', `video-${Date.now()}.webm`);
      await video.saveAs(savePath);
      console.log('✅ Видео сохранено по пути:', savePath);
    } else {
      console.log('❌ Видео не было записано.');
    }
  }
});
