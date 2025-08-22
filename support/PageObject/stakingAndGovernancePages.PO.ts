import {Page, Locator} from "@playwright/test"

export class StakingAndGovernancePages {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    };

    getCommingSoonText(): Locator {
        return this.page.locator('p', {hasText: "Coming Soon."});
    };

    
}