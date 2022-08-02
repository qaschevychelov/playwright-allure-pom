import { Locator, Page } from '@playwright/test';
import { BasePage } from "./basePage";

export const BurgerPage = (page: Page) => ({
    basePage: BasePage(page),
    getLink(linkName: string): Locator {
        return page.locator(".links a", {hasText: linkName})
    }
})