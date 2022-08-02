import { BaseStep } from '../steps/BaseStep'
import { test, type Page } from '@playwright/test';

test.describe('spec4', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://smmtouch.tech")
  });

  test('passes4', async ({ page }) => {
    await page.goto("https://smmtouch.tech")
  })
})