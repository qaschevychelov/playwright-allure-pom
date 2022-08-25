import { Locator, Page } from "@playwright/test";

export class BasePage {
    readonly page: Page;
    readonly langSwitcher: Locator;
    
    
    constructor(page: Page) {
        this.page = page
        this.langSwitcher = this.page.locator("//div[contains(@class,'nav-lang')][span]")
    }

    getCheckBox(checkBoxName: string): Locator {
        return this.page.locator(`//label[normalize-space(.)='${checkBoxName}']/input[@type='checkbox']`)
    }
    
    getInputByPlaceHolder(text: string): Locator {
        return this.page.locator(`//input[@placeholder='${text}']`)
    }

    getBtnByText(btnName: string): Locator {
        return this.page.locator(`//button[normalize-space(.)='${btnName}']`)
    }

    getAnyText(text: string): Locator {
        return this.page.locator(`(//*[normalize-space(.)='${text}'])[last()]`)
    }

    getAnyLink(text: string): Locator {
        return this.page.locator(`//a[normalize-space(.)='${text}']`)
    }
}