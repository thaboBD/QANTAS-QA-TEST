import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";

export class LoginPage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.usernameInput = page.locator('[data-test=username]');
        this.passwordInput = page.locator('[data-test=password]');
        this.loginButton = page.locator('[data-test=login-button]');
    }

    public async login(page: Page, username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        expect(page.url()).toContain('/inventory.html');
    }
}