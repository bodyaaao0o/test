import { Locator, Page } from '@playwright/test';

export class PortfolioPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    getTotalInvested(): Locator {
        return this.page.locator('.flex.bg-monochrome-100.p-4').nth(0);
    };

    getUSDCountInvested(): Locator {
        return this.page.locator('.text-monochrome-20.mb-4',{hasText: "Total Invested"});
    };

    getTotalYield(): Locator {
        return this.page.locator('.flex.bg-monochrome-100.p-4').nth(1);
    };

    getUSDCountYield(): Locator {
        return this.page.locator('.text-monochrome-20.mb-4', {hasText: "Total Yield"});
    }

    getRWATokenHoldingsTitle(): Locator {
        return this.page.locator('h3', {hasText: "RWA Token Holdings"});
    };

    getSearchFiled(): Locator {
        return this.page.locator('input[placeholder="Search..."]');
    };

    getHoldingsButton(): Locator {
        return this.page.locator('button', {hasText: "Holdings"});
    };

    getPurchaseRequestsButton(): Locator {
        return this.page.locator('button', {hasText: "Purchase Requests"});
    };

    clickOnPurchaseRequest() {
        return this.getPurchaseRequestsButton().click();
    };

    getNoTokenHoldings(): Locator {
        return this.page.locator('p', {hasText: "No Token Holdings."});
    };

    getNoPurchasingRequestsText(): Locator {
        return this.page.locator('p', {hasText: "No Purchasing Requests."});
    };

    


}