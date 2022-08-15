import { expect, Page } from '@playwright/test';
import { BaseStep } from './baseStep';
import { test } from '@playwright/test'
import { StripePage } from '../pages/stripePage';

export class StripeStep extends BaseStep {
    readonly stripePage: StripePage

    constructor(page: Page) {
        super(page);
        this.stripePage = new StripePage(page)
    }

    async setEmail(email: string) {
        await test.step(`указать фейковую почту`, async () => {
            await this.stripePage.emailField.type(email)
        })
    }
    async setBillingName(name: string) {
        await test.step(`указать фейковое имя плательщика`, async () => {
            await this.stripePage.nameField.type(name)
        })
    }
    async setCard(cardNum: string) {
        await test.step(`указать фейковый номер карты`, async () => {
            await this.stripePage.cardNum.fill(cardNum)
        })
    }
    async submit() {
        await test.step(`нажать pay`, async () => {
            await expect(this.stripePage.submit).toBeEnabled()
            await this.stripePage.submit.click()
        })
    }
}