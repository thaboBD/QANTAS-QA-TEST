import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-object-models/login-page';

test.describe('Login functionality', () => {
    test('Login in to swag labs successfully', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await page.goto('/');
        const title = await page.title();
        expect(title).toBe('Swag Labs');

        await loginPage.login(page,'standard_user', 'secret_sauce');

        expect(page.url()).toContain('/inventory.html');  
        expect(await page.title()).toBe('Swag Labs');

    });
});