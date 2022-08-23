import { Locator } from '@playwright/test';
import { Page } from '@playwright/test';
import { BasePage } from './basePage';
export class PayPalPage extends BasePage {
    readonly payBtn: Locator
    constructor(page: Page) {
        super(page)
        this.payBtn = page.locator("//button[@id='payment-submit-btn']")
    }
}