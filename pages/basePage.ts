import { Locator, Page } from "@playwright/test";


export const BasePage = (page: Page) => ({
    langSwitcher: page.locator("//div[contains(@class,'nav-lang')][span]"),
    
    getInputByPlaceHolder(text: string): Locator {
        return page.locator(`//input[@placeholder='${text}']`)
    },

    getBtnByText(btnName: string): Locator {
        return page.locator(`//button[normalize-space(.)='${btnName}']`)
    },

    getAnyText(text: string): Locator {
        return page.locator(`//*[normalize-space(.)='${text}']`)
    },

    getAnyLink(text: string): Locator {
        return page.locator(`//a[normalize-space(.)='${text}']`)
    },
})