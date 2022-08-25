import { faker } from '@faker-js/faker/locale/en';
import { test } from '../../../fixtures/extFixtures/extFixtures';

test.use({headless: false})
test.describe('регистрация ЛК', () => {
  test.beforeEach(async ({ page, app }) => {
    await page.goto("/")
    await app.burgerStep.openBurger()
  });
  test.only('регистрация через бургер меню успех', async ({ app }) => {
    await app.homeStep.clickLink("Личный кабинет")
    await app.homeStep.clickLink("Зарегистрироваться")
    await app.homeStep.setField("Электронная почта", faker.internet.email())
    let pass = faker.internet.password(8)
    await app.homeStep.setField("Пароль (8 символов и более)", pass)
    await app.homeStep.setField("Повторите пароль", pass)
    await app.homeStep.setCheckbox("Соглашаюсь с публичной офертой и политикой возврата", true)
    await app.homeStep.homePage.page.pause()
  })
})