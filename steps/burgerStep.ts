import { expect, Page } from '@playwright/test';
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
        await expect(this.homePage.getAnyText(body)).toBeVisible()
        // cy.allure().step(`страница содержит текст`, true)
    }
    async clickLink(linkName: string) {
        // cy.allure().step(`перейти по ссылке ${linkName}`, true)
        await this.burgerPage.getLink(linkName).click()
    }
    async checkLinkIsVisible(linkName: string) {
        //   cy.allure().step(`ссылка ${linkName} отображается`, true)
        await expect(this.burgerPage.getLink(linkName)).toBeVisible()
    }
    async openBurger() {
        // cy.allure().step("кликнуть на бургер меню", true)
        await this.homePage.burgerBtn.click()
    }
}