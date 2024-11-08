const { test, expect, beforeEach, describe } = require('@playwright/test');
const { loginWith } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset');
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen',
      },
    });
    await page.goto('/');
  });

  test('Login form is shown', async ({ page }) => {
    const heading = await page.getByText('Log in to application');
    await expect(heading).toBeVisible();

    // Check if the login form displays the username and password input fields and login button
    await expect(page.getByText('username')).toBeVisible();
    await expect(page.getByText('password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible();
  });

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
        await loginWith(page, 'mluukkai', 'salainen');
        await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible();
    })

    test('fails with wrong credentials', async ({ page }) => {
        await loginWith(page, 'mluukkai', 'wrong')
        await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })
});