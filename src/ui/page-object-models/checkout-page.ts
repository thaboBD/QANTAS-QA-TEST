
import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";

export class CheckoutPage {
    readonly checkoutButton: Locator;
    readonly customerFirstName: Locator;
    readonly customerLastName: Locator;
    readonly customerPostalCode: Locator;
    readonly submitCustomerInformationButton: Locator;
    readonly finishButton: Locator;
    readonly cartSubtotal: Locator;
    readonly cartPageTitle: Locator;
    readonly checkoutOverviewTitle: Locator;
    readonly checkoutCompleteTitle: Locator;
    readonly checkoutCompleteMessage: Locator;

    constructor(page: Page) {
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
        this.customerFirstName = page.locator('[data-test="firstName"]');
        this.customerLastName = page.locator('[data-test="lastName"]')
        this.customerPostalCode = page.locator('[data-test="postalCode"]')
        this.finishButton = page.getByRole('button', { name: 'Finish' });
        this.submitCustomerInformationButton = page.getByRole('button', { name: 'Continue' });
        this.cartSubtotal = page.locator('[data-test="subtotal-label"]')
        this.cartPageTitle= page.getByText('Your Cart');
        this.checkoutOverviewTitle = page.getByText('Checkout: Overview');
        this.checkoutCompleteTitle = page.getByText('Checkout: Complete!');
        this.checkoutCompleteMessage = page.getByText('Thank you for your order!');

    }

    public async enterCustomerInformation(firstName: string, lastName: string, postalCode: string) {
        await this.customerFirstName.fill(firstName);
        await this.customerLastName.fill(lastName);
        await this.customerPostalCode.fill(postalCode);
        await this.submitCustomerInformationButton.click();
        await expect(this.submitCustomerInformationButton.page()).toHaveURL(/checkout-step-two/);
    }

    public async getCartSubtotal(): Promise<number> {
        const subtotalText = await this.cartSubtotal.textContent();
        if (subtotalText === null) {
            throw new Error('Failed to locate cart subtotal element');
        }
        
        const subtotalValue = subtotalText.replace('Item total: $', '');
        const parsedValue = parseFloat(subtotalValue);
        
        if (isNaN(parsedValue)) {
            throw new Error(`Failed to parse subtotal value: ${subtotalText}`);
        }
        
        return parsedValue;
    }
}