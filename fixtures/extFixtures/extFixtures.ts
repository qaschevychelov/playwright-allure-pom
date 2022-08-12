import { YouMoneyStep } from './../../steps/youMoneySteps';
import { Browser, BrowserContext, Page, test as base } from '@playwright/test'
import { BurgerStep } from '../../steps/burgerStep';
import { HomeStep } from '../../steps/homeStep';
import { ProfileStep } from '../../steps/profileStep';
import { OrderResultStep } from '../../steps/orderResultStep';

export const app = (page: Page) => ({
    burgerStep: new BurgerStep(page),
    homeStep: new HomeStep(page),
    profileStep: new ProfileStep(page),
    youMoneyStep: new YouMoneyStep(page),
    orderResultStep: new OrderResultStep(page),
})

export const test = base.extend<{ app: ReturnType<typeof app> }>({
    app: async ({ page }, use) => {
        Object.assign(page.context(), {
            locale: "ru-RU",
            timezoneId: "Europe/Moscow"
        })
        await use(app(page));
    }
})