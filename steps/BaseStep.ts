import { BasePage } from './../pages/basePage';
import { expect, Page, test } from "@playwright/test";

export class BaseStep {
    readonly basePage: BasePage

    constructor(page: Page) {
        this.basePage = new BasePage(page)
    }

    async setCheckbox(checkBoxName: string, state: boolean) {
        await test.step(`ставим чекбокс ${checkBoxName} в ${state}`, async () => {
            if (await this.basePage.getCheckBox(checkBoxName).isChecked() !== state)
            await this.basePage.getCheckBox(checkBoxName).click()
        })
    }
    async isAnyTextViisible(text: string): Promise<boolean> {
        await test.step(`текст отображается? ${text}`, async () => {
        });
        return await this.basePage.getAnyText(text).isVisible();
    }
    async submit(btnName: string) {
        await test.step(`Нажать кнопку ${btnName}`, async () => {
            await this.basePage.getBtnByText(btnName).click()
        })
    }
    async setField(field: string, value: string, delay?: number) {
        await test.step(`Ввести в поле ${field} значение ${value}`, async () => {
            if (typeof delay == 'undefined')
                await this.basePage.getInputByPlaceHolder(field).type(value)
            else
                await this.basePage.getInputByPlaceHolder(field).type(value, { delay: delay })
        })
    }

    async changeLang(lang: string) {
        await test.step(`Сменить язык на ${lang}`, async () => {
            await this.basePage.langSwitcher.hover()
            await this.basePage.getAnyLink(lang).click()
        })
    }
    async clickBtn(btnName: string, isDouble?: boolean) {
        await test.step(`нажать кнопку ${btnName}`, async () => {
            if (typeof isDouble == 'undefined')
                await this.basePage.getBtnByText(btnName).click()
            else
                await this.basePage.getBtnByText(btnName).dblclick()
        })
    }
    async checkBtnIsVisible(btnName: string, params?: { timeout?: number }) {
        await test.step(`Кнопка '${btnName}' отображается`, async () => {
            await expect(this.basePage.getBtnByText(btnName)).toBeVisible(params)
        })
    }
    async checkInputIsVisibleByPlaceHolder(placeHolder: string, timeout?: number) {
        await test.step(`Поле ввода '${placeHolder}' отображается`, async () => {
            if (typeof timeout == 'undefined')
                await expect(this.basePage.getInputByPlaceHolder(placeHolder)).toBeVisible()
            else
                await expect(this.basePage.getInputByPlaceHolder(placeHolder)).toBeVisible({ timeout: timeout })
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
    async checkLinkVisible(linkName: string) {
        await test.step("кликнуть по ссылке " + linkName, async () => {
            await expect(this.basePage.getAnyLink(linkName)).toBeVisible()
        })
    }
}