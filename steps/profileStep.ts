import { BaseStep } from "./baseStep";
import { ProfilePage } from "../pages/profilePage";
import { expect, Page, test } from "@playwright/test";

export class ProfileStep extends BaseStep {
  readonly profilePage: ProfilePage

  constructor(page: Page) {
    super(page);
    this.profilePage = new ProfilePage(page)
  }

  async chooseYouMoney() {
    await test.step(`выбираем юМани`, async () => {
      await this.profilePage.youMoney.click()
    })
  }
  async agreeWithOferta() {
    await test.step(`соглашаемся с офертой`, async () => {
      await this.profilePage.ofertaCheckBox.click({ position: { "x": 10, "y": 5 } })
    })
  }
  async clickBuy100Subs() {
    await test.step(`кликаем купить 100 штук`, async () => {
      await this.profilePage.buy100SubsBtn.click()
    })
  }
  async clickBuy100LikePost() {
    await test.step(`кликаем купить 100 штук`, async () => {
      await this.profilePage.buy100LikePostBtn.click()
    })
  }
  async selectTile(tileNum: number) {
    await test.step(`выбираем пост № ${tileNum}`, async () => {
      await this.profilePage.getTile(tileNum).click()
    })
  }
  async checkAvaImg() {
    await test.step("проверим фотографию на аватаре", async () => {
      await expect(await this.profilePage.avatar.screenshot()).toMatchSnapshot()
    })
  }
  async checkLoginIsVisible(login: string) {
    await test.step("отображается логин " + login, async () => {
      await expect(this.profilePage.getLogin(login)).toBeVisible()
    })
  }
  async checkAvatarIsVisible() {
    await test.step("отображается аватар", async () => {
      await expect(this.profilePage.avatar).toBeVisible({ timeout: 10000 })
    })
  }
}