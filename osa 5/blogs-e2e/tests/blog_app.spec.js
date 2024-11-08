const { test, expect, beforeEach, describe } = require('@playwright/test');

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // Reset the database
    await request.post('http://localhost:3003/api/testing/reset');

    // Create a new user
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen',
      },
    });

    // Navigate to the app's URL
    await page.goto('http://localhost:5173');
  });

  test('Login form is shown', async ({ page }) => {
    const heading = await page.getByText('Log in to application');
    await expect(heading).toBeVisible();

    // Check if the login form displays the username and password input fields and login button
    await expect(page.getByText('username')).toBeVisible();
    await expect(page.getByText('password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible();
  });

});