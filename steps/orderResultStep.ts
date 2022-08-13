import { expect, Page } from '@playwright/test';
import { BaseStep } from './baseStep';
import { test } from '@playwright/test'
import { OrderResultPage } from '../pages/orderResultPage';

export class OrderResultStep extends BaseStep {
    readonly orderResultPage: OrderResultPage

    constructor(page: Page) {
        super(page);
        this.orderResultPage = new OrderResultPage(page)
    }

    async waitForPageLoaded() {
        await test.step(`отображается страница с результатом заказа`, async () => {
            await expect(this.orderResultPage.cardImg).toBeVisible({ timeout: 30000 })
        })
    }
}