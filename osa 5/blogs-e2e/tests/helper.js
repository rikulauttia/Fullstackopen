const loginWith = async (page, username, password)  => {
    await page.getByRole('button', { name: 'login' }).click()
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

export { loginWith };