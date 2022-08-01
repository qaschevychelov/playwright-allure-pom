import { BaseStep } from "./BaseStep";
import { HomePage } from "../pages/homePage";
import { expect, Page } from "@playwright/test";

export class HomeStep extends BaseStep {
    readonly homePage: HomePage
    
    constructor(page: Page) {
        super(page);
        this.homePage = new HomePage(page)
    }

    async checkBurgerBtnIsVisible() {
        // cy.allure().step("Кнопка бургер отображается", true)
        await expect(this.homePage.burgerBtn).toBeVisible()
    }
    async checkMainHintImageIsVisible() {
        // cy.allure().step("Изображение с подсказкой для Инсты отображается", true)
        await expect(this.homePage.hintImage).toBeVisible()
    }

    async checLogoVisible() {
        // cy.allure().step("Лого в шапке отображается", true)
        await expect(this.homePage.logo).toBeVisible()
    }
}