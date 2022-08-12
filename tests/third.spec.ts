// import { BaseStep } from '../steps/BaseStep'
import { test } from '../fixtures/extFixtures/extFixtures';
import * as logins from '../fixtures/data/logins.json'
import * as cards from '../fixtures/data/youMoney.json'

test.describe('Создание заказов', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  });

  test('лайки на пост фото', async ({ app, page }) => {
    await app.homeStep.setField("Имя профиля Инстаграм", logins.valid[0])
    await app.homeStep.submit("Раскрутить Инстаграм")

    await app.profileStep.checkAvatarIsVisible()
    await app.profileStep.clickBtn("Лайки")
    await app.profileStep.selectTile(1)
    await app.profileStep.clickBuy100()
    await app.profileStep.chooseYouMoney()
    await app.profileStep.agreeWithOferta()
    await app.profileStep.clickBtn("Оплатить")

    await app.youMoneyStep.waitForCardInputVisible()
    await app.youMoneyStep.setField("Номер карты", cards.valid[0].number)
    await app.youMoneyStep.waitForCardValidating()
    await app.youMoneyStep.setField("ММ", cards.valid[0].MM)
    await app.youMoneyStep.setField("ГГ", cards.valid[0].YY)
    await app.youMoneyStep.setField("CVC", cards.valid[0].CVC)
    await app.youMoneyStep.clickBtn("Pay")

    await app.youMoneyStep.checkBtnIsVisible("Confirm", { timeout: 20000 })
    await app.youMoneyStep.clickBtn("Confirm")
    await app.youMoneyStep.clickLink("Back to store")

    await app.orderResultStep.waitForPageLoaded()
    await app.orderResultStep.checkAnyTextIsVisible("Спасибо за заказ")
    await app.orderResultStep.checkAnyTextIsVisible("Оставьте свой email и получите полезные бонусы")
    await app.orderResultStep.checkAnyTextIsVisible("Отслеживание статуса заказа")
    await app.orderResultStep.checkAnyTextIsVisible("Гайд по продвижению в Инстаграм")
    await app.orderResultStep.checkInputIsVisibleByPlaceHolder("Введите ваш email")
    await app.orderResultStep.checkBtnIsVisible("Получить бонусы")
    await app.orderResultStep.checkAnyTextIsVisible("На главную")
  })
})