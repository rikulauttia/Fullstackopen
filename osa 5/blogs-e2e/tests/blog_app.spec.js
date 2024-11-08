const { test, expect } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
      await request.post('http://localhost:3003/api/testing/reset');

      await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'Matti Luukkainen',
          username: 'mluukkai',
          password: 'salainen',
        },
      });
  
      await page.goto('http://localhost:5173');
    });
  
    test('Login form is shown', async ({ page }) => {
      // Check if the login page displays the form fields and button
      await expect(page.getByLabel('username')).toBeVisible();
      await expect(page.getByLabel('password')).toBeVisible();
      await expect(page.getByRole('button', { name: 'login' })).toBeVisible();
    });
  });