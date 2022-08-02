import { ProfileStep } from './profileStep';
import { HomeStep } from './homeStep';
import { BurgerStep } from './burgerStep';
import { Page } from '@playwright/test';
import { BaseStep } from './baseStep';
export const App = (page: Page) => ({
    baseStep: BaseStep(page),
    burgerStep: BurgerStep(page),
    homeStep: HomeStep(page),
    profileStep: ProfileStep(page)
})