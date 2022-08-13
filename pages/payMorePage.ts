import { Locator } from '@playwright/test';
import { Page } from '@playwright/test';
import { BasePage } from './basePage';
export class PayMorePage extends BasePage {
    readonly cardInput: Locator
    readonly cardExpire: Locator
    readonly cardCVC: Locator
    constructor(page: Page) {
        super(page)
        this.cardInput = page.locator("//input[@id='card_cardNumber']")
        this.cardExpire = page.locator("//input[@id='card_cardExpire']")
        this.cardCVC = page.locator("//input[@id='card_cardCvv']")
    }
}