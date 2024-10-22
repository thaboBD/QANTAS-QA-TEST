import { test } from '../fixtures/base-test';
import { expect } from '@playwright/test';
import { productFilterOptions } from '../page-object-models/inventory-page';

test.describe('Products functionality', () => {
    test.beforeEach(async ({ loginPage, page }) => {
        await page.goto('/');
        await loginPage.login(page, 'standard_user', 'secret_sauce');
    });

    test('E2E : Purchase flow with random products', async ({ 
        page,
        inventoryPage, 
        checkoutPage 
    }) => {
        await test.step('Verify price sorting functionality', async () => {
            await inventoryPage.filterProducts(productFilterOptions.PRICE_LOW_TO_HIGH);
            const prices = await inventoryPage.getItemPrices();
            const sortedPrices = [...prices].sort((a, b) => a - b);
            expect(prices).toEqual(sortedPrices);
        });

        let selectedProducts;
        await test.step('Add random products to cart', async () => {
            selectedProducts = await inventoryPage.addRandomProducts(2);
        });

        await test.step('Verify cart count', async () => {
            await inventoryPage.validateCartCount();
            const cartCount = await inventoryPage.getShoppingCartCount();
            expect(cartCount).toBe(2);
        });

        await test.step('Navigate to cart and verify', async () => {
            await inventoryPage.shoppingCartButton.click();
            await page.waitForURL('**/cart.html');
            expect(page.url()).toContain('/cart.html');
            await expect(checkoutPage.cartPageTitle).toBeVisible();
        });

        await test.step('Verify products in cart', async () => {
            for (const product of selectedProducts) {
                await expect(
                    page.locator('.inventory_item_name', { hasText: product.name })
                ).toBeVisible();
            }
        });

        await test.step('Checkout process', async () => {
            await checkoutPage.checkoutButton.click();
            expect(page.url()).toContain('/checkout-step-one.html');
            await checkoutPage.enterCustomerInformation('John', 'Doe', '1234');
            await expect(checkoutPage.checkoutOverviewTitle).toBeVisible();
            await inventoryPage.validateAllSelectedProducts();
            const expectedTotal = await inventoryPage.calculateTotalPrice();
            const actualTotal = await checkoutPage.getCartSubtotal();
            expect(actualTotal).toBe(expectedTotal);
        });

        await test.step('Complete purchase and verify confirmation', async () => {
            await checkoutPage.finishButton.click();
            expect(page.url()).toContain('/checkout-complete.html');
            await expect(checkoutPage.checkoutCompleteTitle).toBeVisible();
            await expect(checkoutPage.checkoutCompleteMessage).toBeVisible();
        });
    });
});