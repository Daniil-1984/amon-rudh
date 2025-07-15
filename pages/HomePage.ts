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
    await this.redeemButton.waitFor({ state: 'visible' });
    await this.redeemButton.scrollIntoViewIfNeeded();
    await this.redeemButton.click({ force: true });
  }

  async getBalance(): Promise<string | null> {
    const balanceLocator = this.page.getByText(/^SC \d+(\.\d{2})?$/);
    await balanceLocator.waitFor({ state: 'visible', timeout: 25000 });
    return balanceLocator.textContent();
  }
}
