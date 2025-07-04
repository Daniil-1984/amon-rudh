import { test, expect } from '@playwright/test';

import { generateRandomEmail, wait, startVideoRecording, stopVideoRecording } from './utils';

test('testing with id', async ({ page }) => {

await page.goto('file:///C:/Users/Dania%20Kolotii/AppData/Roaming/Sublime%20Text%203/Packages/User/bbb.html');
await page.getByTestId('register-username').click();
await page.getByTestId('register-username').fill('Daniil');
await page.getByTestId('register-password').click();
await page.getByTestId('register-password').fill('Kolotii');
await page.getByTestId('register-submit').click();
await wait(5000);
});