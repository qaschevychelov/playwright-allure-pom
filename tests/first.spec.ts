import { HomeStep } from '../steps/HomeStep'
import { BurgerStep } from '../steps/burgerStep'
import { ProfileStep } from '../steps/profileStep'
import * as errors from '../fixtures/errors.json'
import * as langs from '../fixtures/langs.json'
import * as logins from '../fixtures/logins.json'
import { test, expect, type Page } from '@playwright/test';


test.describe('SMMTOUCH.TECH - домашняя', () => {
  let homeStep: HomeStep
  let burgerStep: BurgerStep
  let profileStep: ProfileStep

  test.beforeEach(async ({ page }) => {
    await page.goto("https://smmtouch.tech")
    homeStep = new HomeStep(page)
    burgerStep = new BurgerStep(page)
    profileStep = new ProfileStep(page)
  });
  test('отображаются основные элементы', async ({ page }) => {
    await homeStep.checkMainHintImageIsVisible()
    await homeStep.checkBurgerBtnIsVisible()
    await homeStep.checLogoVisible()
    await homeStep.checkLangSwitcherIsVisible()
    await homeStep.checkInputIsVisibleByPlaceHolder("Имя профиля Инстаграм")
    await homeStep.checkBtnIsVisible("Раскрутить Инстаграм")
    await expect(page.locator(`//*[normalize-space(.)='В одном шаге от популярности']`)).toBeVisible()
  })

  test('отображается ошибка, если не ввести логин', async ({ page }) => {
    await homeStep.clickBtn("Раскрутить Инстаграм")
    await expect(page.locator(`//*[normalize-space(.)='${errors.emptyLogin}']`)).toBeVisible()
  })

  for (const lang in langs) {
    if (lang === 'default') continue
    test(`можно переключить язык на ${lang}`, async ({ page }) => {
      await homeStep.changeLang(lang)
      await expect(page.locator(`//*[normalize-space(.)='${langs[lang]}']`)).toBeVisible()
    })
  }

  test("бургер меню открывается", async ({ page }) => {
    await burgerStep.openBurger()
    await burgerStep.checkLinkIsVisible("Политика конфиденциальности")
    await burgerStep.checkLinkIsVisible("Публичная оферта")
    await burgerStep.checkLinkIsVisible("Политика возврата")
  })

  for (const login of logins.invalid) {
    test(`отображается ошибка, если логин невалидный ${login}`, async ({ page }) => {
      await homeStep.setField("Имя профиля Инстаграм", login)
      await homeStep.submit("Раскрутить Инстаграм")
      await expect(page.locator(`//*[normalize-space(.)='${errors.emptyLogin}']`)).toBeVisible()
    });
  }

  test('происходит переход на страницу профиля', async ({ page }) => {
    await homeStep.setField("Имя профиля Инстаграм", logins.valid[0])
    await homeStep.submit("Раскрутить Инстаграм")
    await profileStep.checkAvatarIsVisible()
    await profileStep.checkLoginIsVisible(logins.valid[0])
  });
})