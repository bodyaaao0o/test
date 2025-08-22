import { Page, Locator } from '@playwright/test';

export class InvestPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    };
    
    //If user doesn't have access to projects

    getProjectSection(): Locator {
        return this.page.locator('a.inline-flex.items-center.justify-center.p-4.border-b', {hasText: "Projects"});
    };

    getRWAPoolsSection(): Locator {
        return this.page.locator('a.inline-flex.items-center.justify-center.p-4.border-b', {hasText: "RWA Pools"});
    };

    getDontAccessDescription(): Locator {
        return this.page.locator('p', {hasText: "You don't have access to this page."});
    };

    //If user have access to projects

    getProjectBox(): Locator {
        return this.page.locator('button.cursor-pointer');
    };

    clickOnProject() {
        return this.getProjectBox().click();
    }

    getProjectImage(): Locator {
        return this.page.locator('img[src="/assets/dummy/other.png"]');
    };

    getProjectName(): Locator {
        return this.page.locator('h6.font-medium.text-lg.text-left.absolute');
    };

    getAccessToTheProject(): Locator {
        return this.page.locator('div.flex.items-center.text-monochrome-20');
    };

    getAPYNumber(): Locator {
        return this.page.locator('div.pb-4.mb-4.border-b.border-monochrome-60.flex.justify-between.items-center div.bg-monochrome-60.text-white');
    };

    getInvestedAmount(): Locator {
        return this.page.locator('div.border-r.border-monochrome-40 p', {hasText: "Invested"});
    };

    getDurationAmount(): Locator {
        return this.page.locator('div.pl-4 p', {hasText: 'Duration'});
    };

    getInvestorTypeTitle(): Locator {
        return this.page.locator('h3', {hasText: 'Accredited'});
    };




}