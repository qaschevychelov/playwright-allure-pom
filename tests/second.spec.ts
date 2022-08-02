import { BaseStep } from './../steps/baseStep';
import { BurgerStep } from '../steps/burgerStep'
import * as policy from '../fixtures/confidentPolicy.json'
import * as oferta from '../fixtures/oferta.json'
import * as returnPolicy from '../fixtures/returnPolicy.json'
import { test, Browser, chromium, type Page, BrowserContext, expect } from '@playwright/test';
import { myTest } from './baseTest';


myTest.describe('SMMTOUCH.TECH - проверка соглашений', () => {

  myTest.beforeEach(async ({ page, app }) => {
    await page.goto("https://smmtouch.tech")
    await app.burgerStep.openBurger()
  });
  myTest('политика конфиденциальности', async ({ context, app }) => {
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      await app.burgerStep.clickLink("Политика конфиденциальности")
    ])
    await newPage.waitForLoadState();
    app.baseStep = BaseStep(newPage)
    app.burgerStep = BurgerStep(newPage)
    await app.baseStep.checkAnyTextIsVisible(policy.ttl)
    await app.burgerStep.checkSectionTextIsVisible(policy.body)
  })
  myTest('публичная оферта', async ({ context, app }) => {
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      await app.burgerStep.clickLink("Публичная оферта")
    ])
    await newPage.waitForLoadState();
    app.baseStep = BaseStep(newPage)
    app.burgerStep = BurgerStep(newPage)
    await app.baseStep.checkAnyTextIsVisible(oferta.ttl)
    await app.burgerStep.checkSectionTextIsVisible(oferta.body)
  })
  myTest('политика возврата', async ({ context, app }) => {
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      await app.burgerStep.clickLink("Политика возврата")
    ])
    await newPage.waitForLoadState();
    app.baseStep = BaseStep(newPage)
    app.burgerStep = BurgerStep(newPage)
    await app.baseStep.checkAnyTextIsVisible(returnPolicy.ttl)
    await app.burgerStep.checkSectionTextIsVisible(returnPolicy.body)
  })
})