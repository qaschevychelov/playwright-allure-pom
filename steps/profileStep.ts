import { BaseStep } from "./baseStep";
import { ProfilePage } from "../pages/profilePage";
import { expect, Page } from "@playwright/test";

export class ProfileStep extends BaseStep {
  readonly profilePage: ProfilePage

  constructor(page: Page) {
    super(page);
    this.profilePage = new ProfilePage(page)
  }
  
  async checkLoginIsVisible(login: string) {
    // cy.allure().step("отображается логин " + login, true)
    await expect(this.profilePage.getLogin(login)).toBeVisible()
  }
  async checkAvatarIsVisible() {
    // cy.allure().step("отображается аватар", true)
    await expect(this.profilePage.avatar).toBeVisible({timeout: 10000})
  }
}