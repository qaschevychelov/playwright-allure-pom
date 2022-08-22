import { faker } from '@faker-js/faker/locale/en';
import { test } from '../../fixtures/extFixtures/extFixtures';
import * as logins from '../../fixtures/data/logins.json'
import * as path from 'path'
import * as sinon from 'sinon'

// тест не закончен
test.describe('Создание заказов Крипта', () => {
  test.beforeEach(async ({ page, context }) => {
    await page.goto("/")
    // В браузере можно менять время
    // способ 1
    // await context.addInitScript({
    //   path: path.join(__dirname, '..', './../node_modules/sinon/pkg/sinon.js'),
    // });
    // await context.addInitScript(() => {
    //   window.__clock = sinon.useFakeTimers({
    //     now: new Date(Date.now() + 10740000).getTime(),
    //     shouldAdvanceTime: true
    //   });
    // });
    // Pick the new/fake "now" for you test pages.
    const fakeNow = new Date(Date.now() + 10800000).getTime();

    // способ 2
    await page.addInitScript(`{
      Date = class extends Date {
        constructor(...args) {
          if (args.length === 0) {
            super(${fakeNow});
          } else {
            super(...args);
          }
        }
      }
      const __DateNowOffset = ${fakeNow} - Date.now();
      const __DateNow = Date.now;
      Date.now = () => __DateNow() + __DateNowOffset;
    }`);
  });

  test(`подписчики - ошибка`, async ({ app, page }) => {
    await app.homeStep.setField("Имя профиля Инстаграм", logins.valid[0])
    await app.homeStep.submit("Раскрутить Инстаграм")

    await app.profileStep.checkAvatarIsVisible()
    await app.profileStep.clickBuy100Subs()
    await app.profileStep.agreeWithOferta()
    await app.profileStep.chooseCrypto()
    await app.profileStep.clickBtn("Оплатить")
    await app.profileStep.setField("test@test.com", faker.internet.email())
    await app.profileStep.clickBtn("Подтвердить")
    await app.profileStep.clickBtn("Я оплатил")
    await app.profileStep.checkAnyTextIsVisible("Проверяем платеж")
    // await page.evaluate(() => window.__clock.tick("00:40"));
  })
})