import { Locator, Page } from '@playwright/test';

export class TransactionPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    getTransactionPeriodTitle() {
        return this.page.locator('label', { hasText: "Transaction Period" });
    };

    getTransactionPeriodFilter() {
        return this.page.locator('button.p-2\\.5.text-sm');
    }

    clickOnTransactionsPeriod() {
        return this.getTransactionPeriodFilter().click();
    };

    getPeriodBox(): Locator {
        return this.page.locator('.absolute.z-10.mt-1.w-full');
    };

    getTransactionCategoryTitle(): Locator {
        return this.page.locator('label', { hasText: "Transaction Category" });
    };

    getTransactionCategory(): Locator {
        return this.page.locator('.flex.items-center.gap-2', { hasText: "1 selected" });
    };

    getTransactionCategoryButton(): Locator {
        return this.page.locator('.css-1xc3v61-indicatorContainer').nth(0);
    };

    clickOnTransactionCategory() {
        return this.getTransactionCategoryButton().click();
    };

    getTransactionCategoryBox(): Locator {
        return this.page.locator('[role="listbox"][aria-multiselectable="true"]');
    };

    getAllTransactionFilter(): Locator {
        return this.page.locator('#react-select-4-option-0', { hasText: "All Transactions" });
    };

    getSecondTransactionFilter(): Locator {
        return this.page.locator('#react-select-4-option-2').filter({ hasText: 'Security Token Sale' });
    }

    clickOnSecondTransaction() {
        return this.getSecondTransactionFilter().click();
    };

    getProjectTitle(): Locator {
        return this.page.locator('label', { hasText: "Project" });
    };

    getProject(): Locator {
        return this.page.locator('.undefined.transactions-project-category.css-b62m3t-container').nth(1);
    };

    getProjectButton(): Locator {
        return this.page.locator('.css-1xc3v61-indicatorContainer').nth(1);
    };

    getAllTransactionFilterCheck(): Locator {
        return this.page.locator('span', { hasText: "All Transactions" });
    };

    getSecondTransactionFilterCheck(): Locator {
        return this.page.locator('span', { hasText: "Security Token Sale" });
    };

    getCloseFilters(): Locator {
        return this.page.locator('button.text-white.text-sm', { hasText: '✕' });
    };

    clickOncloseFilters() {
        return this.getCloseFilters().click();
    };


    getClearAllFilters(): Locator {
        return this.page.locator('button', { hasText: "Clear all filters" });
    };

    clickOnClearAllFilters() {
        return this.getClearAllFilters().click();
    };


}