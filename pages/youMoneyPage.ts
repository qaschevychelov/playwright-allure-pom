import { Locator } from '@playwright/test';
import { Page } from '@playwright/test';
import { BasePage } from './basePage';
export class YouMoneyPage extends BasePage {
    readonly cardInput: Locator
    readonly activeCardIcon: Locator
    constructor(page: Page) {
        super(page)
        this.cardInput = page.locator("//input[@id='cardNumber']")
        this.activeCardIcon = page.locator("//div[contains(@class,'bank-card2__icon') and contains(@class,'active')]")
    }
}