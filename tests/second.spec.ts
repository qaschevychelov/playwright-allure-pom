import { BurgerStep } from '../steps/burgerStep'
import * as policy from '../fixtures/confidentPolicy.json'
import * as oferta from '../fixtures/oferta.json'
import * as returnPolicy from '../fixtures/returnPolicy.json'
import { test, Browser, chromium, type Page, BrowserContext, expect } from '@playwright/test';


test.describe('SMMTOUCH.TECH - проверка соглашений', () => {
  let burgerStep: BurgerStep

  test.beforeEach(async ({ page }) => {
    await page.goto("https://smmtouch.tech")
    burgerStep = new BurgerStep(page)
    await burgerStep.openBurger()
  });
  test('политика конфиденциальности', async ({ context }) => {
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      await burgerStep.clickLink("Политика конфиденциальности")
    ])
    await newPage.waitForLoadState();
    burgerStep = new BurgerStep(newPage)
    // await burgerStep.checkAnyTextIsVisible(policy.ttl)
    // await burgerStep.checkAnyTextIsVisible(policy.body)
  })
  test('публичная оферта', async ({ context }) => {
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      await burgerStep.clickLink("Публичная оферта")
    ])
    await newPage.waitForLoadState();
    burgerStep = new BurgerStep(newPage)
    // await burgerStep.checkAnyTextIsVisible(oferta.ttl)
    // await burgerStep.checkAnyTextIsVisible(oferta.body)
  })
  test('политика возврата', async ({ context }) => {
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      await burgerStep.clickLink("Политика возврата")
    ])
    await newPage.waitForLoadState();
    burgerStep = new BurgerStep(newPage)
    // await burgerStep.checkAnyTextIsVisible(returnPolicy.ttl)
    // await burgerStep.checkAnyTextIsVisible(returnPolicy.body)
  })
})