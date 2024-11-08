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

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
        await loginWith(page, 'mluukkai', 'salainen')
    })
  
    test('a new blog can be created', async ({ page }) => {
        await page.getByRole('button', { name: 'create new blog' }).click()
        await page.getByTestId('title').fill('Kansalle ruokaa')
        await page.getByTestId('author').fill('Kansan Make')
        await page.getByTestId('url').fill('www.example.com')
        await page.getByRole('button', { name: 'create' }).click()
        await expect(page.getByText('Kansalle ruokaa Kansan Make')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'create new blog' }).click();
        await page.getByTestId('title').fill('Test Blog for Liking');
        await page.getByTestId('author').fill('Test Author');
        await page.getByTestId('url').fill('www.example.com');
        await page.getByRole('button', { name: 'create' }).click();
        
        await expect(page.getByText('Test Blog for Liking Test Author')).toBeVisible();
        await page.getByText('view').click();
        const likeButton = page.getByRole('button', { name: 'like' });
        await expect(page.getByText('likes 0')).toBeVisible();
        await likeButton.click();
        await expect(page.getByText('likes 1')).toBeVisible();
    });

    test('a blog can be deleted by the user who created it', async ({ page }) => {
        await page.getByRole('button', { name: 'create new blog' }).click();
        await page.getByTestId('title').fill('Blog to be deleted');
        await page.getByTestId('author').fill('Author Delete');
        await page.getByTestId('url').fill('www.example.com');
        await page.getByRole('button', { name: 'create' }).click();
        await expect(page.getByText('Blog to be deleted Author Delete')).toBeVisible();
        
        await page.getByText('view').click();

        page.on('dialog', (dialog) => {
            dialog.accept();
        });

        await page.getByTestId('remove-button').click();
        await expect(page.getByText('Blog to be deleted Author Delete')).not.toBeVisible();
    });

  })
})