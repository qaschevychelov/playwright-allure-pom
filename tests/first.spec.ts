import { myTest } from './baseTest';
import * as errors from '../fixtures/errors.json'
import * as langs from '../fixtures/langs.json'
import * as logins from '../fixtures/logins.json'
import { expect } from '@playwright/test';


myTest.describe('SMMTOUCH.TECH - домашняя', () => {
  myTest.beforeEach(async ({ page }) => {
    await page.goto("https://smmtouch.tech")
  });
  myTest('отображаются основные элементы', async ({ app, page }) => {
    await app.homeStep.checkMainHintImageIsVisible()
    await app.homeStep.checkBurgerBtnIsVisible()
    await app.homeStep.checLogoVisible()
    await app.baseStep.checkLangSwitcherIsVisible()
    await app.baseStep.checkInputIsVisibleByPlaceHolder("Имя профиля Инстаграм")
    await app.baseStep.checkBtnIsVisible("Раскрутить Инстаграм")
    await app.baseStep.checkAnyTextIsVisible(langs.Русский)
  })

  myTest('отображается ошибка, если не ввести логин', async ({ page, app }) => {
    await app.baseStep.clickBtn("Раскрутить Инстаграм")
    await app.baseStep.checkAnyTextIsVisible(errors.emptyLogin)
  })

  for (const lang in langs) {
    if (lang === 'default') continue
    myTest(`можно переключить язык на ${lang}`, async ({ page, app }) => {
      await app.baseStep.changeLang(lang)
      let val = Object.entries(langs).filter(o => { return o[0] === lang }).map(o => o[1])[0]
      await app.baseStep.checkAnyTextIsVisible(val)
    })
  }

  myTest("бургер меню открывается", async ({ app }) => {
    await app.burgerStep.openBurger()
    await app.burgerStep.checkLinkIsVisible("Политика конфиденциальности")
    await app.burgerStep.checkLinkIsVisible("Публичная оферта")
    await app.burgerStep.checkLinkIsVisible("Политика возврата")
  })

  for (const login of logins.invalid) {
    myTest(`отображается ошибка, если логин невалидный ${login}`, async ({ page, app }) => {
      await app.baseStep.setField("Имя профиля Инстаграм", login)
      await app.baseStep.submit("Раскрутить Инстаграм")
      await app.baseStep.checkAnyTextIsVisible(errors.emptyLogin, 10)
    });
  }

  myTest('происходит переход на страницу профиля', async ({ app }) => {
    await app.baseStep.setField("Имя профиля Инстаграм", logins.valid[0])
    await app.baseStep.submit("Раскрутить Инстаграм")
    await app.profileStep.checkAvatarIsVisible()
    await app.profileStep.checkAvaImage()
    await app.profileStep.checkLoginIsVisible(logins.valid[0])
  });
})