import { Page, Locator, expect } from '@playwright/test';
 

export class HomePage {
  readonly page: Page;
  readonly popupCloseButton: Locator;
  readonly redeemButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.popupCloseButton = page.locator('.WizPopupWrapper_wrapper__container__D4qDj > .WizIconButton_base__JfGpY');
    this.redeemButton = page.getByRole('button', { name: 'Redeem' });
  }

  async closePopupIfVisible() {
    if (await this.popupCloseButton.isVisible()) {
      await this.popupCloseButton.click();
    }
  }

 async clickRedeem() {
  const redeemButton = this.page.getByRole('button', { name: 'Redeem' }).first();

  await redeemButton.waitFor({ state: 'visible' });
  await redeemButton.scrollIntoViewIfNeeded();
  await this.page.waitForTimeout(500); // небольшая пауза для стабилизации элемента
  
  try {
    await redeemButton.click({ force: true });
  } catch {
    const box = await redeemButton.boundingBox();
    if (box) {
      await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    } else {
      throw new Error('Redeem button bounding box not found');
    }
  }
}


  // Пример из HomePage.ts

  async getBalance(): Promise<string | null> {
    const balanceLocator = this.page.getByText(/^SC \d+(\.\d{2})?$/);
    await balanceLocator.waitFor({ state: 'visible', timeout: 25000 });
    return balanceLocator.textContent();
  }
}
