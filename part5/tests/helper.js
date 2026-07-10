const loginWith = async (page, username, password) => {
    // open the login form
    await page.getByRole('button', {name: 'login form'}).click()

    // add username and password to inputs
    await page.getByLabel('username').fill(username)
    await page.getByLabel('password').fill(password)

    // click login
    await page.getByRole('button', {name: 'login'}).click()
}

const createNote = async (page, noteContent) => {
    // open the add a note form
    await page.getByRole('button', {name: 'new note'}).click()

    // enter a note
    await page.getByPlaceholder('write note content here').fill(noteContent)

    // click save button
    await page.getByRole('button', {name: 'save'}).click()
}

export {
    loginWith,
    createNote
}