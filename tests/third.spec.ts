// import { BaseStep } from '../steps/BaseStep'
import { test } from '../fixtures/extFixtures/extFixtures';
import * as links from '../fixtures/data/links.json'
import * as logins from '../fixtures/data/logins.json'

test.describe('Создание заказов', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  });

  test('лайки на пост фото', async ({ app }) => {
    await app.homeStep.setField("Имя профиля Инстаграм", logins.valid[0])
    await app.homeStep.submit("Раскрутить Инстаграм")
    await app.profileStep.checkAvatarIsVisible()
    await app.profileStep.clickBtn("Лайки")
    await app.profileStep.selectTile(1)
    await app.profileStep.clickBuy100()
  })
})