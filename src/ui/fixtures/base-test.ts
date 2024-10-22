import {test as base   } from '@playwright/test';
import { LoginPage } from '../page-object-models/login-page';
import { CheckoutPage } from '../page-object-models/checkout-page';
import { InventoryPage } from '../page-object-models/inventory-page';

export const test = base.extend<{
    loginPage: LoginPage;
    checkoutPage: CheckoutPage;
    inventoryPage: InventoryPage;
}>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },
    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    }
});