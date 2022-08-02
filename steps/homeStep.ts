import { BaseStep } from "./BaseStep";
import { HomePage } from "../pages/homePage";
import { expect, Page, test } from "@playwright/test";
import { BasePage } from "../pages/basePage";

export const HomeStep = (page: Page) => ({
    homePage: HomePage(page),
    basePage: BasePage(page),

    async checkBurgerBtnIsVisible() {
        await test.step("Кнопка бургер отображается", async() => {
            await expect(this.homePage.burgerBtn).toBeVisible()
        })
    },
    async checkMainHintImageIsVisible() {
        await test.step("Изображение с подсказкой для Инсты отображается", async() => {
            await expect(this.homePage.hintImage).toBeVisible()
        })
    },

    async checLogoVisible() {
        await test.step("Лого в шапке отображается", async() => {
            await expect(this.homePage.logo).toBeVisible()
        })
    }
})