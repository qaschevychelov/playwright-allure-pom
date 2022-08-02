import { BasePage } from './../pages/basePage';
import { expect, Page, test } from '@playwright/test';
import { HomePage } from "../pages/homePage";
import { BurgerPage } from "../pages/burgerPage";
import { BaseStep } from "./BaseStep";

export const BurgerStep = (page: Page) => ({
    homePage: HomePage(page),
    burgerPage: BurgerPage(page),
    basePage: BasePage(page),

    async checkPageBodyTextIsVisible(body: string) {
        await test.step(`страница содержит текст`, async () => {
            await expect(this.basePage.getAnyText(body)).toBeVisible()
        })
    },
    async clickLink(linkName: string) {
        await test.step(`перейти по ссылке ${linkName}`, async () => {
            await this.burgerPage.getLink(linkName).click()
        })
    },
    async checkLinkIsVisible(linkName: string) {
        await test.step(`ссылка ${linkName} отображается`, async () => {
            await expect(this.burgerPage.getLink(linkName)).toBeVisible()
        })
    },
    async openBurger() {
        await test.step("кликнуть на бургер меню", async () => {
            await this.homePage.burgerBtn.click()
        })
    },

    async checkSectionTextIsVisible(text: string) {
        await test.step("текст отображается " + text, async () => {
            await expect(page.locator(`//section[normalize-space(.)='${text}']`)).toBeVisible()
        })
    }
})