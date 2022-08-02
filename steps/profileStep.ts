import { BaseStep } from "./baseStep";
import { ProfilePage } from "../pages/profilePage";
import { expect, Page, test } from "@playwright/test";
import { BasePage } from "../pages/basePage";

export const ProfileStep = (page: Page) => ({
  profilePage: ProfilePage(page),
  basePage: BasePage(page),

  async checkLoginIsVisible(login: string) {
    await test.step("отображается логин " + login, async () => {
      await expect(this.profilePage.getLogin(login)).toBeVisible()
    })
  },
  async checkAvatarIsVisible() {
    await test.step("отображается аватар", async () => {
      await expect(this.profilePage.avatar).toBeVisible({ timeout: 10000 })
    })
  }
})