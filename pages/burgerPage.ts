import { Locator, Page } from '@playwright/test';
import { BasePage } from "./basePage";

export class BurgerPage extends BasePage {
    constructor(page: Page) {
        super(page)
    }
    getLink(linkName: string): Locator {
        return this.page.locator(".links a", {hasText: linkName})
    }
}