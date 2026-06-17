// @ts-check
import { test, expect, describe, beforeEach } from '@playwright/test';

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });

describe('Note App',() => {
  beforeEach(async({ page }) => {
    await page.goto('http://localhost:3001')
  })

  test('has title', async ({ page }) => {
    // expect a title 'to contain' a substring
    await expect(page).toHaveTitle(/notes/i)
  
    // select the h1 header 'Notes'
    const header = page.getByText('Notes')
  
    // expect a header 'to contain' a substring
    await expect(header).toBeVisible()
  })

  test('user can log in', async ({ page }) => {
    // find the login form button
    await page.getByRole('button', { name: 'login' }).click()

    // once the login form is visible, input the username and password
    // await page.getByRole('textbox').first().fill('arin')
    // await page.getByRole('textbox').last().fill('arin')
    await page.getByLabel('username').fill('arin')
    await page.getByLabel('password').fill('arin')

    // find the login button
    await page.getByRole('button', { name: 'login' }).click()

    // get element showing who is logged in
    await expect(page.getByText('arin logged in')).toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      // click the login form button
      await page.getByRole('button', { name: 'login' }).click()

      // enter user and password into the two inputs
      await page.getByLabel('username').fill('arin')
      await page.getByLabel('password').fill('arin')

      // click the login button
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('user can add note once logged in. arin:arin', async ({ page }) => {
      // click the new note button
      await page.getByRole('button', { name: 'new note' }).click()

      // add a note to the input
      await page.getByRole('textbox').fill('playwright is crazy to learn as a first timer')

      // click the save button
      await page.getByRole('button', { name: 'save' }).click()

      // check to see if the new note is visible
      await expect(page.getByText('playwright is crazy to learn as a first timer')).toBeVisible()
    })
  })
})