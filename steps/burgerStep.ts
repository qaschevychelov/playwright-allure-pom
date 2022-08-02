import { expect, Page, test } from '@playwright/test';
import { HomePage } from "../pages/homePage";
import { BurgerPage } from "../pages/burgerPage";
import { BaseStep } from "./BaseStep";

export class BurgerStep extends BaseStep {
    readonly homePage: HomePage;
    readonly burgerPage: BurgerPage;

    constructor(page: Page) {
        super(page)
        this.homePage = new HomePage(page)
        this.burgerPage = new BurgerPage(page)
    }
    async checkPageBodyTextIsVisible(body: string) {
        await test.step(`страница содержит текст`, async () => {
            await expect(this.homePage.getAnyText(body)).toBeVisible()
        })
    }
    async clickLink(linkName: string) {
        await test.step(`перейти по ссылке ${linkName}`, async () => {
            await this.burgerPage.getLink(linkName).click()
        })
    }
    async checkLinkIsVisible(linkName: string) {
        await test.step(`ссылка ${linkName} отображается`, async () => {
            await expect(this.burgerPage.getLink(linkName)).toBeVisible()
        })
    }
    async openBurger() {
        await test.step("кликнуть на бургер меню", async () => {
            await this.homePage.burgerBtn.click()
        })
    }
}