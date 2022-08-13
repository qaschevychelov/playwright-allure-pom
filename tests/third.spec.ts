import { test } from '../fixtures/extFixtures/extFixtures';
import * as logins from '../fixtures/data/logins.json'
import * as cards from '../fixtures/data/youMoney.json'
import { faker } from '@faker-js/faker/locale/ru'

test.describe('Создание заказов', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  });

  const types = ["Лайки", "Просмотры"]

  types.forEach(service => {
    test(`${service} на пост - успех`, async ({ app }) => {
      await app.homeStep.setField("Имя профиля Инстаграм", logins.valid[0])
      await app.homeStep.submit("Раскрутить Инстаграм")

      await app.profileStep.checkAvatarIsVisible()
      await app.profileStep.clickBtn(service)
      await app.profileStep.selectTile(1)
      await app.profileStep.clickBuy100LikePost()
      await app.profileStep.chooseYouMoney()
      await app.profileStep.agreeWithOferta()
      await app.profileStep.clickBtn("Оплатить")

      await app.youMoneyStep.waitForCardInputVisible()
      await app.youMoneyStep.setField("Номер карты", cards.valid[0].number)
      await app.youMoneyStep.waitForCardValidating()
      await app.youMoneyStep.setField("ММ", cards.valid[0].MM)
      await app.youMoneyStep.setField("ГГ", cards.valid[0].YY)
      await app.youMoneyStep.setField("CVC", cards.valid[0].CVC)
      await app.youMoneyStep.clickBtn("Заплатить")

      await app.youMoneyStep.checkBtnIsVisible("Confirm", { timeout: 20000 })
      await app.youMoneyStep.clickBtn("Confirm")
      await app.youMoneyStep.clickLink("Вернуться в магазин")

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

  test(`подписчики - успех`, async ({ app }) => {
    await app.homeStep.setField("Имя профиля Инстаграм", logins.valid[0])
    await app.homeStep.submit("Раскрутить Инстаграм")

    await app.profileStep.checkAvatarIsVisible()
    await app.profileStep.clickBuy100Subs()
    await app.profileStep.chooseYouMoney()
    await app.profileStep.agreeWithOferta()
    await app.profileStep.clickBtn("Оплатить")

    await app.youMoneyStep.waitForCardInputVisible()
    await app.youMoneyStep.setField("Номер карты", cards.valid[0].number)
    await app.youMoneyStep.waitForCardValidating()
    await app.youMoneyStep.setField("ММ", cards.valid[0].MM)
    await app.youMoneyStep.setField("ГГ", cards.valid[0].YY)
    await app.youMoneyStep.setField("CVC", cards.valid[0].CVC)
    await app.youMoneyStep.clickBtn("Заплатить")

    await app.youMoneyStep.checkBtnIsVisible("Confirm", { timeout: 20000 })
    await app.youMoneyStep.clickBtn("Confirm")
    await app.youMoneyStep.clickLink("Вернуться в магазин")

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