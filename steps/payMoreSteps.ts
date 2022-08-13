import { expect, Page } from '@playwright/test';
import { BaseStep } from './baseStep';
import { test } from '@playwright/test'
import { PayMorePage } from '../pages/payMorePage';

export class PayMoreStep extends BaseStep {
    readonly payMorePage: PayMorePage

    constructor(page: Page) {
        super(page);
        this.payMorePage = new PayMorePage(page)
    }

    async setExpireDate(expireDate: string) {
        await test.step(`ввести срок жизни карты ${expireDate}`, async () => {
            await this.payMorePage.cardExpire.type(expireDate)
        })
    }
    async setCVC(cvc: string) {
        await test.step(`ввести CVC ${cvc}`, async () => {
            await this.payMorePage.cardCVC.type(cvc)
        })
    }
    async setCard(cardNum: string) {
        await test.step(`ввести номер карты ${cardNum}`, async () => {
            await this.payMorePage.cardInput.type(cardNum)
        })
    }
    async waitForCardInputVisible() {
        await test.step(`поле ввода номера карточки отображается`, async () => {
            await expect(this.payMorePage.cardInput).toBeVisible({ timeout: 20000 })
        })
    }
}