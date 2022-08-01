import { Locator, Page } from '@playwright/test';
import {BasePage} from './basePage'

export class HomePage extends BasePage {
    readonly logo: Locator
    readonly hintImage: Locator
    readonly burgerBtn: Locator
    constructor(page: Page) {
        super(page);
        this.logo = this.page.locator("(//header//a[.//*[contains(@clip-path, '#logo-colored')]])[1]")
        this.hintImage = this.page.locator("//picture//img")
        this.burgerBtn = this.page.locator("//button[@class='burger-cross']")
    }
}