import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export const ProfilePage = (page: Page) => ({
    basePage: BasePage(page),
    avatar: page.locator("//div[@class='avatar']/img"),
    getLogin(login: string) { return page.locator(`//div[@class='account'][starts-with(normalize-space(.),'${login} ')]`) }
})