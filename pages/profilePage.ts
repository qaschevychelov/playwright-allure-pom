import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class ProfilePage extends BasePage {
    readonly avatar: Locator
    readonly ofertaCheckBox: Locator
    readonly youMoney: Locator

    constructor(page: Page) {
        super(page)
        this.avatar = this.page.locator("//div[@class='avatar']/img")
        this.ofertaCheckBox = this.page.locator("//label[input[@id='payment_policy_agree']]")
        this.youMoney = this.page.locator("//div[img[@alt='ЮMoney']]")
    }
    getLogin(login: string) { return this.page.locator(`//div[@class='account'][starts-with(normalize-space(.),'${login} ')]`) }
    getTile(tileNum: number) { return this.page.locator(`//div[@class='thumb-list' and not(contains(@style,'none'))]//div[@class='col'][${tileNum}]`) }
    getBuy100Btn() { return this.page.locator(`(//div[@class='service-preview']//div[@class='service-list-item']//button)[1]`) }
}