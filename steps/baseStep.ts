import { BasePage } from './../pages/basePage';
import { expect, Page, test } from "@playwright/test";

export class BaseStep {
    readonly basePage: BasePage

    constructor(page: Page) {
        this.basePage = new BasePage(page)
    }

    async submit(btnName: string) {
        await test.step(`Нажать кнопку ${btnName}`, async () => {
            await this.basePage.getBtnByText(btnName).click()
        })
    }
    async setField(field: string, value: string) {
        await test.step(`Ввести в поле ${field} значение ${value}`, async () => {
            await this.basePage.getInputByPlaceHolder(field).type(value)
        })
    }

    async changeLang(lang: string) {
        await test.step(`Сменить язык на ${lang}`, async () => {
            await this.basePage.langSwitcher.hover()
            await this.basePage.getAnyLink(lang).click()
        })
    }
    async clickBtn(btnName: string) {
        await test.step(`нажать кнопку ${btnName}`, async () => {
            await this.basePage.getBtnByText(btnName).click()
        })
    }
    async checkBtnIsVisible(btnName: string, params?: { timeout?: number }) {
        await test.step(`Кнопка '${btnName}' отображается`, async () => {
            await expect(this.basePage.getBtnByText(btnName)).toBeVisible(params)
        })
    }
    async checkInputIsVisibleByPlaceHolder(placeHolder: string) {
        await test.step(`Поле ввода '${placeHolder}' отображается`, async () => {
            await expect(this.basePage.getInputByPlaceHolder(placeHolder)).toBeVisible()
        })
    }

    async checkLangSwitcherIsVisible() {
        await test.step("Переключатель языка отображается", async () => {
            await expect(this.basePage.langSwitcher).toBeVisible()
        })
    }

    async checkAnyTextIsVisible(text: string) {
        await test.step("текст отображается " + text, async () => {
            await expect(this.basePage.getAnyText(text)).toBeVisible()
        })
    }

    async clickLink(linkName: string) {
        await test.step("кликнуть по ссылке " + linkName, async () => {
            await this.basePage.getAnyLink(linkName).click()
        })
    }
}