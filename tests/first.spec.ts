import * as errors from '../fixtures/data/errors.json'
import * as langs from '../fixtures/data/langs.json'
import * as logins from '../fixtures/data/logins.json'
import { test } from '../fixtures/extFixtures/extFixtures';


test.describe('SMMTOUCH.TECH - домашняя', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://smmtouch.tech")
  });
  test('отображаются основные элементы', async ({ app }) => {
    await app.homeStep.checkMainHintImageIsVisible()
    await app.homeStep.checkBurgerBtnIsVisible()
    await app.homeStep.checLogoVisible()
    await app.homeStep.checkLangSwitcherIsVisible()
    await app.homeStep.checkInputIsVisibleByPlaceHolder("Имя профиля Инстаграм")
    await app.homeStep.checkBtnIsVisible("Раскрутить Инстаграм")
    await app.homeStep.checkAnyTextIsVisible('В одном шаге от популярности')
  })

  test('отображается ошибка, если не ввести логин', async ({ app }) => {
    await app.homeStep.clickBtn("Раскрутить Инстаграм")
    await app.homeStep.checkAnyTextIsVisible(errors.emptyLogin)
  })

  for (const lang in langs) {
    if (lang === 'default') continue
    test(`можно переключить язык на ${lang}`, async ({ app }) => {
      await app.homeStep.changeLang(lang)
      let val = Object.entries(langs).filter(o => { return o[0] === lang }).map(o => o[1])[0]
      await app.homeStep.checkAnyTextIsVisible(val)
    })
  }

  test("бургер меню открывается", async ({ app }) => {
    await app.burgerStep.openBurger()
    await app.burgerStep.checkLinkIsVisible("Политика конфиденциальности")
    await app.burgerStep.checkLinkIsVisible("Публичная оферта")
    await app.burgerStep.checkLinkIsVisible("Политика возврата")
  })

  for (const login of logins.invalid) {
    test(`отображается ошибка, если логин невалидный ${login}`, async ({ app }) => {
      await app.homeStep.setField("Имя профиля Инстаграм", login)
      await app.homeStep.submit("Раскрутить Инстаграм")
      await app.homeStep.checkAnyTextIsVisible(errors.emptyLogin)
    });
  }

  test('происходит переход на страницу профиля', async ({ app }) => {
    await app.homeStep.setField("Имя профиля Инстаграм", logins.valid[0])
    await app.homeStep.submit("Раскрутить Инстаграм")
    await app.profileStep.checkAvatarIsVisible()
    await app.profileStep.checkLoginIsVisible(logins.valid[0])
    await app.profileStep.checkAvaImg()
  });
})