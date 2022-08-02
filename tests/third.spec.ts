import { BaseStep } from '../steps/BaseStep'
import { test, type Page } from '@playwright/test';

test.describe('SMMTOUCH.TECH - ', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("https://smmtouch.tech")
  });

  test('passes3', async ({ page }) => {

  })
})