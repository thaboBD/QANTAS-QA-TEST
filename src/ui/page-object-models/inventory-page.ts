import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";

interface Product {
    name: string;
    price: string;
    testId: string;
}

export class InventoryPage {
    private readonly page: Page;
    readonly productFilter: Locator;
    readonly itemPrices: Locator;
    readonly shoppingCartButton: Locator;
    readonly shoppingCartBadge: Locator;
    readonly inventoryItems: Locator;
    private selectedProducts: Product[] = [];

    constructor(page: Page) {
        this.page = page;
        this.productFilter = page.locator('[data-test="product-sort-container"]');
        this.itemPrices = page.locator('[data-test="inventory-item-price"]');
        this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.shoppingCartButton = page.locator('[data-test="shopping-cart-link"]');
        this.inventoryItems = page.locator('[data-test="inventory-item"]');
    }

    private async getAllProducts(): Promise<Product[]> {
        const products: Product[] = [];
        const items = await this.inventoryItems.all();

        for (const item of items) {
            const name = await item.locator('[data-test="inventory-item-name"]').textContent() || '';
            const price = await item.locator('[data-test="inventory-item-price"]').textContent() || '';
            // Extract testId from the add to cart button
            const button = item.locator('button[data-test^="add-to-cart-"]');
            const buttonTestId = await button.getAttribute('data-test') || '';
            const testId = buttonTestId.replace('add-to-cart-', '');

            products.push({
                name,
                price,
                testId
            });
        }

        return products;
    }

    public async addRandomProducts(count: number = 1): Promise<Product[]> {
        const allProducts = await this.getAllProducts();
        const selectedProducts: Product[] = [];
        const maxCount = Math.min(count, allProducts.length);
        
        // Create copy of array for random selection
        const availableProducts = [...allProducts];

        for (let i = 0; i < maxCount; i++) {
            const randomIndex = Math.floor(Math.random() * availableProducts.length);
            const selectedProduct = availableProducts.splice(randomIndex, 1)[0];
            
            // Click the add to cart button using the stored page instance
            await this.page
                .locator(`[data-test="add-to-cart-${selectedProduct.testId}"]`)
                .click();
            
            selectedProducts.push(selectedProduct);
            this.selectedProducts.push(selectedProduct);
        }

        return selectedProducts;
    }

    public getSelectedProducts(): Product[] {
        return [...this.selectedProducts];
    }

    public async filterProducts(filter: productFilterOptions) {
        await this.productFilter.waitFor({ state: 'visible' });
        await this.productFilter.selectOption({ label: filter });
    }

    public async getItemPrices(): Promise<number[]> {
        const pricesText = await this.itemPrices.allTextContents();
        const prices = pricesText.map(price => parseFloat(price.replace('$', '')));
        return prices;
    }

    public async getShoppingCartCount(): Promise<number> {
        try {
            const cartCountText = await this.shoppingCartBadge.textContent();
            return cartCountText ? parseInt(cartCountText, 10) : 0;
        } catch (error) {
            // If badge is not found (cart is empty), return 0
            return 0;
        }
    }

    public async validateCartCount(): Promise<void> {
        const expectedCount = this.selectedProducts.length;
        const actualCount = await this.getShoppingCartCount();
        expect(actualCount).toBe(expectedCount);
    }

    public async calculateTotalPrice(): Promise<number> {
        return this.selectedProducts.reduce((total, product) => {
            return total + parseFloat(product.price.replace('$', ''));
        }, 0);
    }

    private getProductNameLocator(productName: string): Locator {
        return this.page.locator('.inventory_item_name', { hasText: productName });
    }

    public async validateProductInList(product: Product): Promise<void> {
        await expect(this.getProductNameLocator(product.name)).toBeVisible();
    }

    public async validateAllSelectedProducts(): Promise<void> {
        for (const product of this.selectedProducts) {
            await this.validateProductInList(product);
        }
    }

}

export enum productFilterOptions {
    NAME_A_TO_Z = 'Name (A to Z)',
    NAME_Z_TO_A = 'Name (Z to A)',
    PRICE_LOW_TO_HIGH = 'Price (low to high)',
    PRICE_HIGH_TO_LOW = 'Price (high to low)'
}