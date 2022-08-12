import { expect, Page } from '@playwright/test';
import { YouMoneyPage } from './../pages/youMoneyPage';
import { BaseStep } from './baseStep';
import { test } from '@playwright/test'

export class YouMoneyStep extends BaseStep {
    readonly youMoneyPage: YouMoneyPage
    
    constructor(page: Page) {
        super(page);
        this.youMoneyPage = new YouMoneyPage(page)
    }
    
    async waitForCardValidating() {
        await test.step(`дождемся завершения анимации определения карты`, async () => {
            await expect(this.youMoneyPage.activeCardIcon).toBeVisible()
        })
    }
    async waitForCardInputVisible() {
        await test.step(`поле ввода номера карточки отображается`, async () => {
            await expect(this.youMoneyPage.cardInput).toBeVisible({ timeout: 20000 })
        })
    }
}