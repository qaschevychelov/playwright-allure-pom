import { faker } from '@faker-js/faker/locale/en';
import { test } from '../../fixtures/extFixtures/extFixtures';
import * as logins from '../../fixtures/data/logins.json'
import * as payments from '../../fixtures/data/payments.json'

test.describe('Создание заказов PayPal @en', () => {
  test.beforeEach(async ({ page, context }) => {
    await page.goto("/")
  });

  test.only(`подписчики - успех`, async ({ app, page }) => {
    await app.homeStep.setField("Enter your Instagram username", logins.valid[0])
    await app.homeStep.submit("Promote Instagram")

    await app.profileStep.checkAvatarIsVisible()
    await app.complexStep.payPal.makeSubsOrder(
      Buffer.from(payments.payPal.email, "base64").toString("ascii"),
      Buffer.from(payments.payPal.pass, "base64").toString("ascii")
    )
    await app.orderResultStep.checkAnyTextIsVisible("Thanks for your order")
    await app.orderResultStep.checkAnyTextIsVisible("It will be launched shortly")
    await app.orderResultStep.checkAnyTextIsVisible("Order Status Tracking")
    await app.orderResultStep.checkAnyTextIsVisible("Instagram promotion guide")
    await app.orderResultStep.checkInputIsVisibleByPlaceHolder("Enter your email")
    await app.orderResultStep.checkBtnIsVisible("Get bonuses")
    await app.orderResultStep.checkAnyTextIsVisible("Go to main")
  })

  const types = ["Likes", "Views"]

  types.forEach(service => {
    test(`${service} на пост - успех`, async ({ app }) => {
      await app.homeStep.setField("Enter your Instagram username", logins.valid[0])
      await app.homeStep.submit("Promote Instagram")

      await app.profileStep.checkAvatarIsVisible()
      await app.profileStep.clickBtn(service)
      await app.profileStep.selectTile(1)
      await app.complexStep.payPal.makeLikeViewOrder(
        Buffer.from(payments.payPal.email, "base64").toString("ascii"),
        Buffer.from(payments.payPal.pass, "base64").toString("ascii")
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

  test('неудача, вернулись с окна оплаты', async ({ app }) => {
    await app.homeStep.setField("Enter your Instagram username", logins.valid[0])
    await app.homeStep.submit("Promote Instagram")

    await app.profileStep.checkAvatarIsVisible()
    await app.profileStep.clickBuy100Subs()
    await app.profileStep.agreeWithOferta()
    await app.profileStep.choosePayPal()
    await app.profileStep.clickBtn("Pay")
    await app.profileStep.clickLink("Cancel and return to Test Store")

    await app.orderResultStep.waitForPageLoaded()
    await app.orderResultStep.checkAnyTextIsVisible("Payment failed")
    await app.orderResultStep.checkAnyTextIsVisible("Write to us, we will help you make payment")
    await app.orderResultStep.checkLinkVisible("Write to Telegram")
    await app.orderResultStep.checkLinkVisible("Write to WhatsApp")
    await app.orderResultStep.checkLinkVisible("Send email")
    await app.orderResultStep.checkBtnIsVisible("Retry payment")
    await app.orderResultStep.checkLinkVisible("Go to main")
  })

  test('неудача - повторить заказ - успех', async ({ app }) => {
    await app.homeStep.setField("Enter your Instagram username", logins.valid[0])
    await app.homeStep.submit("Promote Instagram")

    await app.profileStep.checkAvatarIsVisible()
    await app.profileStep.clickBuy100Subs()
    await app.profileStep.agreeWithOferta()
    await app.profileStep.choosePayPal()
    await app.profileStep.clickBtn("Pay")
    await app.profileStep.clickLink("Cancel and return to Test Store")

    await app.orderResultStep.waitForPageLoaded()
    await app.orderResultStep.clickBtn("Retry payment")
    await app.profileStep.agreeWithOferta()
    await app.profileStep.choosePayPal()
    await app.orderResultStep.clickBtn("Pay")
    await app.profileStep.setField("Email or mobile number", Buffer.from(payments.payPal.email, "base64").toString("ascii"))
    await app.profileStep.clickBtn("Next")
    await app.profileStep.setField("Password", Buffer.from(payments.payPal.pass, "base64").toString("ascii"))
    await app.profileStep.clickBtn("Log In")
    await app.payPalStep.clickPay()
    await app.orderResultStep.waitForPageLoaded()
    await app.orderResultStep.checkAnyTextIsVisible("Thanks for your order")
    await app.orderResultStep.checkAnyTextIsVisible("It will be launched shortly")
    await app.orderResultStep.checkAnyTextIsVisible("Order Status Tracking")
    await app.orderResultStep.checkAnyTextIsVisible("Instagram promotion guide")
    await app.orderResultStep.checkInputIsVisibleByPlaceHolder("Enter your email")
    await app.orderResultStep.checkBtnIsVisible("Get bonuses")
    await app.orderResultStep.checkAnyTextIsVisible("Go to main")
  })

  test('неудача - на главную', async ({ app }) => {
    await app.homeStep.setField("Enter your Instagram username", logins.valid[0])
    await app.homeStep.submit("Promote Instagram")

    await app.profileStep.checkAvatarIsVisible()
    await app.profileStep.clickBuy100Subs()
    await app.profileStep.agreeWithOferta()
    await app.profileStep.choosePayPal()
    await app.profileStep.clickBtn("Pay")
    await app.profileStep.clickLink("Cancel and return to Test Store")

    await app.orderResultStep.waitForPageLoaded()
    await app.orderResultStep.clickLink("Go to main")

    await app.orderResultStep.checkBtnIsVisible("Pay")
    await app.profileStep.checkAvatarIsVisible()
  })
})