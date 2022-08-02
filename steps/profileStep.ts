import { BaseStep } from "./baseStep";
import { ProfilePage } from "../pages/profilePage";
import { expect, Page, test } from "@playwright/test";

export class ProfileStep extends BaseStep {
  readonly profilePage: ProfilePage

  constructor(page: Page) {
    super(page);
    this.profilePage = new ProfilePage(page)
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