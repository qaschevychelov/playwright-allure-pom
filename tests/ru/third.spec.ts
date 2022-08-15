import { test } from '../../fixtures/extFixtures/extFixtures';
import * as logins from '../../fixtures/data/logins.json'
import * as cards from '../../fixtures/data/payments.json'
import { faker } from '@faker-js/faker/locale/ru'

test.describe('Создание заказов youMoney', () => {
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
      await app.complexStep.youMoney.makeLikeViewOrder(
        cards.youMoney.valid[0].number, 
        cards.youMoney.valid[0].MM, 
        cards.youMoney.valid[0].YY, 
        cards.youMoney.valid[0].CVC
      )
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
    await app.complexStep.youMoney.makeSubsOrder(
      cards.youMoney.valid[0].number, 
      cards.youMoney.valid[0].MM, 
      cards.youMoney.valid[0].YY, 
      cards.youMoney.valid[0].CVC
    )
    await app.orderResultStep.checkAnyTextIsVisible("Спасибо за заказ")
    await app.orderResultStep.checkAnyTextIsVisible("Оставьте свой email и получите полезные бонусы")
    await app.orderResultStep.checkAnyTextIsVisible("Отслеживание статуса заказа")
    await app.orderResultStep.checkAnyTextIsVisible("Гайд по продвижению в Инстаграм")
    await app.orderResultStep.checkInputIsVisibleByPlaceHolder("Введите ваш email")
    await app.orderResultStep.checkBtnIsVisible("Получить бонусы")
    await app.orderResultStep.checkAnyTextIsVisible("На главную")
  })

  test('подписчики - фейл, невалидная карта', async ({ app }) => {
    await app.homeStep.setField("Имя профиля Инстаграм", logins.valid[0])
    await app.homeStep.submit("Раскрутить Инстаграм")

    await app.profileStep.checkAvatarIsVisible()
    await app.complexStep.youMoney.makeSubsOrder(
      cards.youMoney.invalid[0], 
      cards.youMoney.valid[0].MM, 
      cards.youMoney.valid[0].YY, 
      cards.youMoney.valid[0].CVC
    )
    await app.orderResultStep.checkAnyTextIsVisible("Оплата не прошла")
    await app.orderResultStep.checkAnyTextIsVisible("Напишите нам, мы поможем вам провести оплату")
    await app.orderResultStep.checkLinkVisible("Написать в Telegram")
    await app.orderResultStep.checkLinkVisible("Написать в WhatsApp")
    await app.orderResultStep.checkLinkVisible("Написать на email")
    await app.orderResultStep.checkBtnIsVisible("Повторить оплату")
    await app.orderResultStep.checkLinkVisible("На главную")
  })

  test('неудача - повторить заказ', async ({ app }) => {
    await app.homeStep.setField("Имя профиля Инстаграм", logins.valid[0])
    await app.homeStep.submit("Раскрутить Инстаграм")

    await app.profileStep.checkAvatarIsVisible()
    await app.complexStep.youMoney.makeSubsOrder(
      cards.youMoney.invalid[0], 
      cards.youMoney.valid[0].MM, 
      cards.youMoney.valid[0].YY, 
      cards.youMoney.valid[0].CVC
    )

    await app.orderResultStep.clickBtn("Повторить оплату")
    await app.orderResultStep.checkBtnIsVisible("Оплатить")
    await app.orderResultStep.checkAnyTextIsVisible("Банковская карта")
  })

  test('неудача - на главную', async ({ app }) => {
    await app.homeStep.setField("Имя профиля Инстаграм", logins.valid[0])
    await app.homeStep.submit("Раскрутить Инстаграм")

    await app.profileStep.checkAvatarIsVisible()
    await app.complexStep.youMoney.makeSubsOrder(
      cards.youMoney.invalid[0], 
      cards.youMoney.valid[0].MM, 
      cards.youMoney.valid[0].YY, 
      cards.youMoney.valid[0].CVC
    )

    await app.orderResultStep.clickLink("На главную")
    await app.orderResultStep.checkBtnIsVisible("Оплатить")
    await app.profileStep.checkAvatarIsVisible()
  })
})