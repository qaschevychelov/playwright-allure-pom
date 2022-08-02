import { Locator, Page } from '@playwright/test';
import {BasePage} from './basePage'

export const HomePage = (page: Page) => ({
    basePage: BasePage(page),
    logo: page.locator("(//header//a[.//*[contains(@clip-path, '#logo-colored')]])[1]"),
    hintImage: page.locator("//picture//img"),
    burgerBtn: page.locator("//button[@class='burger-cross']")
})