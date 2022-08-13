import { test } from '../fixtures/extFixtures/extFixtures';
import * as logins from '../fixtures/data/logins.json'

test.describe('страница профиля', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/account/" + logins.valid[0])
  })

  test('Изменить логин', async ({ app }) => {
    await app.profileStep.checkAvatarIsVisible()
    await app.profileStep.clickLink("Изменить логин")
    await app.profileStep.checkBtnIsVisible("Раскрутить Инстаграм")
  })
})