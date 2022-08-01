import { HomePage } from './../pages/homePage';
import { BasePage } from './../pages/basePage';
import { expect, Page } from "@playwright/test";

export class BaseStep {
    readonly basePage: BasePage

    constructor(page: Page) {
        this.basePage = new BasePage(page)
    }
    
    async submit(btnName: string) {
        // cy.allure().step(`Нажать кнопку ${btnName}`, true)
        await this.basePage.getBtnByText(btnName).click()
    }
    async setField(field: string, value: string) {
        // cy.allure().step(`Ввести в поле ${field} значение ${value}`, true)
        await this.basePage.getInputByPlaceHolder(field).type(value)
    }

    async changeLang(lang: string) {
        // cy.allure().step(`Сменить язык на ${lang}`, true)
        await this.basePage.langSwitcher.hover()
        await this.basePage.getAnyLink(lang).click()
    }
    async clickBtn(btnName: string) {
        // cy.allure().step(`нажать кнопку ${btnName}`, true)
        await this.basePage.getBtnByText(btnName).click()
    }
    async checkBtnIsVisible(btnName: string) {
        // cy.allure().step(`Кнопка '${btnName}' отображается`, true)
        await expect(this.basePage.getBtnByText(btnName)).toBeVisible()
    }
    async checkInputIsVisibleByPlaceHolder(placeHolder: string) {
        // cy.allure().step(`Поле ввода '${placeHolder}' отображается`, true)
        await expect(this.basePage.getInputByPlaceHolder(placeHolder)).toBeVisible()
    }

    async checkLangSwitcherIsVisible() {
        // cy.allure().step("Переключатель языка отображается", true)
        await expect(this.basePage.langSwitcher).toBeVisible()
    }

    async checkAnyTextIsVisible(text: string) {
        // cy.allure().step("текст отображается " + text, true)
        await expect(this.basePage.getAnyText(text)).toBeVisible()
    }
}