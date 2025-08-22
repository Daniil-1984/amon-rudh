import { test as base, expect, devices, BrowserContext } from '@playwright/test';
import { wait } from '../utils/utils';

//const pixel = devices['Pixel 5'];

const test = base.extend<{ context: BrowserContext }>( {
  context: async ({ browser }, use) => {
    const context = await browser.newContext({
      //...pixel,
    });
    await use(context);
   
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

  const section = page.locator('text=Winpot Exclusivo').first();
  await section.scrollIntoViewIfNeeded();

  const firstGame = section.locator('xpath=following::div[contains(@class, "_7fSOQfbPYrndbIN8Ml17")]').first();
  await firstGame.scrollIntoViewIfNeeded();
  await firstGame.click();
  await wait(5000);

  const jugarAhoraButton = page.locator('span.MuiButton-label', { hasText: 'Jugar ahora' });

  if (await jugarAhoraButton.isVisible({ timeout: 0 })) {
    await jugarAhoraButton.click();
    console.log(' button "Jugar ahora" is clicked.');
  } else {
    console.log('button "Jugar ahora" is not found, skipping.');
  }

  const okButton = page.locator('span.MuiButton-label', { hasText: 'OK' });
  await okButton.waitFor({ state: 'visible' }); 
    await okButton.click();
  await wait(5000);

  console.log('✅ Кнопка "OK" нажата, тест завершён.');
});
