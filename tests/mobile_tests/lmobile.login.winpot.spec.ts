import { test, expect } from '@playwright/test';

test('Login to Winpot', async ({ page }) => {

    await page.goto('https://www.winpot.mx/?modal=Login');
    await page.click('input[name="email"]');
    await page.fill('input[name="email"]', 'wiztestAlvina_Vandervort@gmail.com');
    await page.click('input[name="password"]');
    await page.fill('input[name="password"]', 'password');
    await page.click('button[id="login-form-submit-button"]');
    await page.waitForTimeout(8000); 
      });