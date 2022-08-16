import { faker } from '@faker-js/faker/locale/en';
import { StripeStep } from './stripeStep';
import { PayMoreStep } from './payMoreSteps';
import { OrderResultStep } from './orderResultStep';
import { YouMoneyStep } from './youMoneySteps';
import { ProfileStep } from './profileStep';
import { Page } from '@playwright/test';
import { BaseStep } from './BaseStep';
export class ComplexStep extends BaseStep {
    readonly youMoney: YouMoney
    readonly payMore: PayMore
    readonly stripe: Stripe

    constructor(page: Page) {
        super(page)
        this.youMoney = new YouMoney(page)
        this.payMore = new PayMore(page)
        this.stripe = new Stripe(page)
    }
}

class YouMoney {
    readonly profileStep: ProfileStep
    readonly youMoneyStep: YouMoneyStep
    readonly orderResultStep: OrderResultStep

    constructor(page: Page) {
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
                await new Promise(r => setTimeout(r, 5000));
                await this.youMoneyStep.basePage.page.reload({waitUntil: "load"})
                continue
            }
            break
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

class PayMore {
    readonly profileStep: ProfileStep
    readonly payMoreStep: PayMoreStep
    readonly orderResultStep: OrderResultStep

    constructor(page: Page) {
        this.profileStep = new ProfileStep(page)
        this.payMoreStep = new PayMoreStep(page)
        this.orderResultStep = new OrderResultStep(page)
    }

    async makeSubsOrder(cardNum: string, mm: string, yy: string, cvc: string) {
        await this.profileStep.clickBuy100Subs()
        await this.profileStep.agreeWithOferta()
        await this.profileStep.clickBtn("Оплатить")

        await this.payMoreStep.waitForCardInputVisible()
        await this.payMoreStep.setCard(cardNum)
        await this.payMoreStep.setExpireDate(mm + yy)
        await this.payMoreStep.setCVC(cvc)
        await new Promise(r => setTimeout(r, 2000));
        await this.payMoreStep.clickBtn("Оплатить", true)

        await this.payMoreStep.clickLink("Завершить")
        await new Promise(r => setTimeout(r, 2000));

        for (let index = 0; index < 5; index++) {
            if (await this.payMoreStep.isAnyTextViisible("Ваш платеж обрабатывается")) {
                await new Promise(r => setTimeout(r, 5000));
                await this.payMoreStep.basePage.page.reload({waitUntil: "load"})
                continue
            }
            break
        }

        await this.orderResultStep.waitForPageLoaded()
    }

    async makeLikeViewOrder(cardNum: string, mm: string, yy: string, cvc: string) {
        await this.profileStep.clickBuy100LikePost()
        await this.profileStep.agreeWithOferta()
        await this.profileStep.clickBtn("Оплатить")

        await this.payMoreStep.waitForCardInputVisible()
        await this.payMoreStep.setCard(cardNum)
        await this.payMoreStep.setExpireDate(mm + yy)
        await this.payMoreStep.setCVC(cvc)
        await new Promise(r => setTimeout(r, 2000));
        await this.payMoreStep.clickBtn("Оплатить", true)

        await this.payMoreStep.clickLink("Завершить")
        await this.orderResultStep.waitForPageLoaded()
    }
}

class Stripe {
    readonly profileStep: ProfileStep
    readonly stripeStep: StripeStep
    readonly orderResultStep: OrderResultStep

    constructor(page: Page) {
        this.profileStep = new ProfileStep(page)
        this.stripeStep = new StripeStep(page)
        this.orderResultStep = new OrderResultStep(page)
    }

    async makeSubsOrder(cardNum: string, mm: string, yy: string, cvc: string) {
        await this.profileStep.clickBuy100Subs()
        await this.profileStep.agreeWithOferta()
        await this.profileStep.clickBtn("Pay")

        await this.profileStep.checkInputIsVisibleByPlaceHolder("1234 1234 1234 1234", 20000)
        await new Promise(r => setTimeout(r, 2000));
        await this.stripeStep.setBillingName(faker.name.fullName())
        await this.stripeStep.setEmail(faker.hacker.noun() + "@test.test")
        await this.profileStep.setField("MM / YY", mm + yy)
        await this.profileStep.setField("CVC", cvc)
        await this.profileStep.setField("Postal code", "AL3 8QE")
        await this.stripeStep.setCard(cardNum)
        await new Promise(r => setTimeout(r, 2000));
        await this.stripeStep.submit()

        for (let index = 0; index < 5; index++) {
            if (await this.stripeStep.isAnyTextViisible("Your payment is being processed")) {
                await new Promise(r => setTimeout(r, 5000));
                await this.stripeStep.basePage.page.reload({waitUntil: "load"})
                continue
            }
            break
        }

        await this.orderResultStep.waitForPageLoaded()
    }

    async makeLikeViewOrder(cardNum: string, mm: string, yy: string, cvc: string) {
        await this.profileStep.clickBuy100LikePost()
        await this.profileStep.agreeWithOferta()
        await this.profileStep.clickBtn("Pay")

        await this.profileStep.checkInputIsVisibleByPlaceHolder("1234 1234 1234 1234", 20000)
        await new Promise(r => setTimeout(r, 2000));
        await this.stripeStep.setBillingName(faker.name.fullName())
        await this.stripeStep.setEmail(faker.hacker.noun() + "@test.test")
        await this.profileStep.setField("MM / YY", mm + yy)
        await this.profileStep.setField("CVC", cvc)
        await this.profileStep.setField("Postal code", "AL3 8QE")
        await this.stripeStep.setCard(cardNum)
        await new Promise(r => setTimeout(r, 2000));
        await this.stripeStep.submit()

        await this.orderResultStep.waitForPageLoaded()
    }
}