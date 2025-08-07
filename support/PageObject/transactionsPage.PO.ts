import { Page, Locator } from '@playwright/test'

export class Transactions {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    };

    getTransactionsPageTitle(): Locator {
        return this.page.locator('h1', { hasText: "Transactions" });
    };

    getSearchTransactionsInput(): Locator {
        return this.page.locator('input[placeholder="Search transactions..."]');
    };

    getNewestOldestTransactions(): Locator {
        return this.page.locator('.css-hlgwow');
    };

    getDropDownButton(): Locator {
        return this.page.locator('.css-1wy0on6');
    };

    getSelectOptions(): Locator {
        return this.page.locator('.css-7doaba-menu');
    };

}    