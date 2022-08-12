import { Locator } from '@playwright/test';
import { Page } from '@playwright/test';
import { BasePage } from './basePage';
export class OrderResultPage extends BasePage {
    readonly cardImg: Locator
    constructor(page: Page) {
        super(page)
        this.cardImg = page.locator("//div[@class='container']/*[@xmlns]")
    }
}