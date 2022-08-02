import { App } from './../steps/app';
import test from "@playwright/test";
import { BurgerStep } from "../steps/burgerStep";
import { HomeStep } from "../steps/homeStep";
import { ProfileStep } from "../steps/profileStep";
export const myTest = test.extend<{ app: ReturnType<typeof App> }>({
    app: async ({ page }, use) => {
      await use(App(page));
    }
  })