// @ts-check
import { test, expect, describe, beforeEach } from '@playwright/test';
const { loginWith, createNote } = require('./helper.js')

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
  beforeEach(async ({ page, request }) => {
    // delete all users and notes from DB
    await request.post('/api/testing/reset')

    // create a user for the db
    await request.post('/api/users', {
      data: {
        name: 'root',
        username: 'root',
        password: 'root'
      }
    })

    // go to the home page for each test
    await page.goto('/')
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
    await loginWith(page, 'root', 'root')

    // get element showing who is logged in
    await expect(page.getByText('root logged in')).toBeVisible()
  })

  test('login fails with wrong password', async ({ page }) => {
    await loginWith(page, 'root', 'arin')

    // get the error div
    const errorDiv = await page.locator('.error')

    // make sure the 'wrong credentials' message is displayed
    await expect(page.getByText('wrong credentials')).toBeVisible()
    await expect(errorDiv).toContainText('wrong credentials')

    // make sure the error message has the correct styling
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

    // make sure a user is logged in message is not displayed
    await expect(page.getByText('root logged in')).not.toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'root', 'root')
    })

    test('user can add note once logged in. root:root', async ({ page }) => {
      await createNote(page, 'playwright is crazy to learn as a first timer')

      // check to see if the new note is visible
      await expect(page.getByText('playwright is crazy to learn as a first timer')).toBeVisible()
    })

    describe('several notes exist', () => {
      beforeEach(async ({ page }) => {
        await createNote(page, 'note 1')
        await createNote(page, 'note 2')
        await createNote(page, 'note 3')       
      })
  
      // test('importance can be changed', async ({ page }) => {
      //   await page.getByRole('button', { name: 'make not important' }).click()
      //   await expect(page.getByText('make important')).toBeVisible()
      // })

      test('note 2 can be made important', async ({ page }) =>{
        // get the first note and mark is as not important
        await page.getByText('note 2').locator('..').getByRole('button', {name: 'make not important'}).click()

        // expect the first note to have make important next to it
        await expect(page.getByText('make important')).toBeVisible()
      })
    })

  })
})