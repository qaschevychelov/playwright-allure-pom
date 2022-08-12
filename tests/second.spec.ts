import { BurgerStep } from '../steps/burgerStep'
import * as policy from '../fixtures/data/confidentPolicy.json'
import * as oferta from '../fixtures/data/oferta.json'
import * as returnPolicy from '../fixtures/data/returnPolicy.json'
import { test } from '../fixtures/extFixtures/extFixtures';


test.describe('проверка соглашений', () => {

  test.beforeEach(async ({ page, app }) => {
    await page.goto("/")
    await app.burgerStep.openBurger()
  });
  test('политика конфиденциальности', async ({ context, app }) => {
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      await app.burgerStep.clickLink("Политика конфиденциальности")
    ])
    await newPage.waitForLoadState();
    app.burgerStep = new BurgerStep(newPage)
    await app.burgerStep.checkAnyTextIsVisible(policy.ttl)
    await app.burgerStep.checkSectionTextIsVisible(policy.body)
  })
  test('публичная оферта', async ({ context, app }) => {
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      await app.burgerStep.clickLink("Публичная оферта")
    ])
    await newPage.waitForLoadState();
    app.burgerStep = new BurgerStep(newPage)
    await app.burgerStep.checkAnyTextIsVisible(oferta.ttl)
    await app.burgerStep.checkSectionTextIsVisible(oferta.body)
  })
  test('политика возврата', async ({ context, app }) => {
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      await app.burgerStep.clickLink("Политика возврата")
    ])
    await newPage.waitForLoadState();
    app.burgerStep = new BurgerStep(newPage)
    await app.burgerStep.checkAnyTextIsVisible(returnPolicy.ttl)
    await app.burgerStep.checkSectionTextIsVisible(returnPolicy.body)
  })
})