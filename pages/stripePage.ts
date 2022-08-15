import { Locator } from '@playwright/test';
import { Page } from '@playwright/test';
import { BasePage } from './basePage';
export class StripePage extends BasePage {
    readonly emailField: Locator
    readonly nameField: Locator
    readonly submit: Locator
    readonly cardNum: Locator
    constructor(page: Page) {
        super(page)
        this.emailField = page.locator("//input[@id='email']")
        this.nameField = page.locator("//input[@id='billingName']")
        this.submit = page.locator("//div[@class='SubmitButton-IconContainer']")
        this.cardNum = page.locator("//input[@id='cardNumber']")
    }
}