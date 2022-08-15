import { test } from '../../fixtures/extFixtures/extFixtures';
import * as logins from '../../fixtures/data/logins.json'
import * as cards from '../../fixtures/data/payments.json'
import { faker } from '@faker-js/faker/locale/ru'

test.describe('Создание заказов stripe @en', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  });

  const types = ["Likes", "Views"]

  types.forEach(service => {
    test(`${service} на пост - успех`, async ({ app }) => {
      await app.homeStep.setField("Enter your Instagram username", logins.valid[0])
      await app.homeStep.submit("Promote Instagram")

      await app.profileStep.checkAvatarIsVisible()
      await app.profileStep.clickBtn(service)
      await app.profileStep.selectTile(1)
      await app.complexStep.stripe.makeLikeViewOrder(
        cards.stripe.valid[0].number,
        cards.stripe.valid[0].MM,
        cards.stripe.valid[0].YY,
        cards.stripe.valid[0].CVC
      )
      await app.orderResultStep.checkAnyTextIsVisible("Thanks for your order")
      await app.orderResultStep.checkAnyTextIsVisible("It will be launched shortly")
      await app.orderResultStep.checkAnyTextIsVisible("Order Status Tracking")
      await app.orderResultStep.checkAnyTextIsVisible("Instagram promotion guide")
      await app.orderResultStep.checkInputIsVisibleByPlaceHolder("Enter your email")
      await app.orderResultStep.checkBtnIsVisible("Get bonuses")
      await app.orderResultStep.checkAnyTextIsVisible("Go to main")
    })
  })

  test(`подписчики - успех`, async ({ app }) => {
    await app.homeStep.setField("Enter your Instagram username", logins.valid[0])
    await app.homeStep.submit("Promote Instagram")

    await app.profileStep.checkAvatarIsVisible()
    await app.complexStep.stripe.makeSubsOrder(
      cards.stripe.valid[0].number,
      cards.stripe.valid[0].MM,
      cards.stripe.valid[0].YY,
      cards.stripe.valid[0].CVC
    )
    await app.orderResultStep.checkAnyTextIsVisible("Thanks for your order")
    await app.orderResultStep.checkAnyTextIsVisible("It will be launched shortly")
    await app.orderResultStep.checkAnyTextIsVisible("Order Status Tracking")
    await app.orderResultStep.checkAnyTextIsVisible("Instagram promotion guide")
    await app.orderResultStep.checkInputIsVisibleByPlaceHolder("Enter your email")
    await app.orderResultStep.checkBtnIsVisible("Get bonuses")
    await app.orderResultStep.checkAnyTextIsVisible("Go to main")
  })
})