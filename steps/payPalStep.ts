import { expect, Page } from '@playwright/test';
import { BaseStep } from './BaseStep';
import { test } from '@playwright/test'
import { PayPalPage } from '../pages/payPalPage';

export class PayPalStep extends BaseStep {
    readonly payPalPage: PayPalPage

    constructor(page: Page) {
        super(page);
        this.payPalPage = new PayPalPage(page)
    }

    async clickPay() {
        await test.step(`кликаем оплатить пэйПал`, async () => {
            await this.payPalPage.payBtn.click()
        })
    }
}