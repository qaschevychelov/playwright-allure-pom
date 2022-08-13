import { OrderResultStep } from './orderResultStep';
import { YouMoneyStep } from './youMoneySteps';
import { ProfileStep } from './profileStep';
import { Page } from '@playwright/test';
import { BaseStep } from './baseStep';
export class ComplexStep extends BaseStep {
    readonly profileStep: ProfileStep
    readonly youMoneyStep: YouMoneyStep
    readonly orderResultStep: OrderResultStep

    constructor(page: Page) {
        super(page)
        this.profileStep = new ProfileStep(page)
        this.youMoneyStep = new YouMoneyStep(page)
        this.orderResultStep = new OrderResultStep(page)
    }

    async makeSubsOrder(cardNum: string, mm: string, yy: string, cvc: string) {
        await this.profileStep.clickBuy100Subs()
        await this.profileStep.chooseYouMoney()
        await this.profileStep.agreeWithOferta()
        await this.profileStep.clickBtn("Оплатить")

        await this.youMoneyStep.waitForCardInputVisible()
        await this.youMoneyStep.setField("Номер карты", cardNum)
        await this.youMoneyStep.waitForCardValidating()
        await this.youMoneyStep.setField("ММ", mm)
        await this.youMoneyStep.setField("ГГ", yy)
        await this.youMoneyStep.setField("CVC", cvc)
        await new Promise(r => setTimeout(r, 2000));
        await this.youMoneyStep.clickBtn("Заплатить", true)

        await this.youMoneyStep.checkBtnIsVisible("Confirm", { timeout: 20000 })
        await this.youMoneyStep.clickBtn("Confirm")
        await this.youMoneyStep.clickLink("Вернуться в магазин")
        await new Promise(r => setTimeout(r, 2000));
        
        for (let index = 0; index < 5; index++) {
            if (await this.youMoneyStep.isAnyTextViisible("Ваш платеж обрабатывается")) {
                await new Promise(r => setTimeout(r, 2000));
                await this.basePage.page.reload()
            }
        }

        await this.orderResultStep.waitForPageLoaded()
    }

    async makeLikeViewOrder(cardNum: string, mm: string, yy: string, cvc: string) {
        await this.profileStep.clickBuy100LikePost()
        await this.profileStep.chooseYouMoney()
        await this.profileStep.agreeWithOferta()
        await this.profileStep.clickBtn("Оплатить")

        await this.youMoneyStep.waitForCardInputVisible()
        await this.youMoneyStep.setField("Номер карты", cardNum)
        await this.youMoneyStep.waitForCardValidating()
        await this.youMoneyStep.setField("ММ", mm)
        await this.youMoneyStep.setField("ГГ", yy)
        await this.youMoneyStep.setField("CVC", cvc)
        await new Promise(r => setTimeout(r, 2000));
        await this.youMoneyStep.clickBtn("Заплатить", true)

        await this.youMoneyStep.checkBtnIsVisible("Confirm", { timeout: 20000 })
        await this.youMoneyStep.clickBtn("Confirm")
        await this.youMoneyStep.clickLink("Вернуться в магазин")
        await this.orderResultStep.waitForPageLoaded()
    }
}