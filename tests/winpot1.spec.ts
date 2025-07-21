import { test as base, expect, devices, BrowserContext } from '@playwright/test';
import { wait } from './utils';

// Эмуляция Pixel 5
//const pixel = devices['Pixel 5'];

// Расширяем тест, чтобы создавать context с мобильной эмуляцией
const test = base.extend<{ context: BrowserContext }>( {
  context: async ({ browser }, use) => {
    const context = await browser.newContext({
      //...pixel,
    });
    await use(context);
    // НЕ закрываем context, чтобы браузер не закрывался!
    // await context.close();
  },
});

test('winpot test clicking game and popup OK by MuiButton-label with infinite wait', async ({ context }) => {
  const page = await context.newPage();

  await page.goto('https://www.winpot.mx/');
  await page.getByRole('button', { name: 'Acceder' }).click();

  await page.getByRole('textbox', { name: 'Usuario o Correo Electrónico' }).fill('wiztestAlvina_Vandervort@gmail.com');
  await page.getByRole('textbox', { name: 'Contraseña Contraseña' }).fill('password');

  await page.locator('#login-form').getByRole('button').first().click();
  await page.locator('#login-form-submit-button').click();

  // Ищем секцию "Winpot Exclusivo" и кликаем по первой игре внутри неё
  const section = page.locator('text=Winpot Exclusivo').first();
  await section.scrollIntoViewIfNeeded();

  const firstGame = section.locator('xpath=following::div[contains(@class, "_7fSOQfbPYrndbIN8Ml17")]').first();
  await firstGame.scrollIntoViewIfNeeded();
  await firstGame.click();
  await wait(5000);

  // Кнопка "Jugar ahora"
  const jugarAhoraButton = page.locator('span.MuiButton-label', { hasText: 'Jugar ahora' });

  if (await jugarAhoraButton.isVisible({ timeout: 0 })) {
    await jugarAhoraButton.click();
    console.log('✅ Кнопка "Jugar ahora" нажата.');
  } else {
    console.log('Кнопка "Jugar ahora" не найдена — пропускаем её.');
  }

  // В любом случае ждем кнопку "OK" и нажимаем её (игра либо подтверждение, либо недоступна)
  const okButton = page.locator('span.MuiButton-label', { hasText: 'OK' });
  await okButton.waitFor({ state: 'visible' }); // ждем видимость кнопки "OK"
  await okButton.click();
  await wait(5000);

  console.log('✅ Кнопка "OK" нажата, тест завершён.');
});
