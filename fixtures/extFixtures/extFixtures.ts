import { PayPalStep } from './../../steps/payPalStep';
import { StripeStep } from './../../steps/stripeStep';
import { PayMoreStep } from './../../steps/payMoreSteps';
import { ComplexStep } from './../../steps/complexStep';
import { YouMoneyStep } from './../../steps/youMoneySteps';
import { Page, test as base } from '@playwright/test'
import { BurgerStep } from '../../steps/burgerStep';
import { HomeStep } from '../../steps/homeStep';
import { ProfileStep } from '../../steps/profileStep';
import { OrderResultStep } from '../../steps/orderResultStep';

export const app = (page: Page) => ({
    burgerStep: new BurgerStep(page),
    homeStep: new HomeStep(page),
    profileStep: new ProfileStep(page),
    youMoneyStep: new YouMoneyStep(page),
    payMoreStep: new PayMoreStep(page),
    stripeStep: new StripeStep(page),
    payPalStep: new PayPalStep(page),
    orderResultStep: new OrderResultStep(page),
    complexStep: new ComplexStep(page)
})

export const test = base.extend<{ app: ReturnType<typeof app> }>({
    app: async ({ page }, use) => {
        await use(app(page));
    }
})