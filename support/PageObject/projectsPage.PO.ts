import { Locator, Page, test } from '@playwright/test';

export class Projects {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    getProjectsBox(): Locator {
        return this.page.locator('.bg-white.rounded-lg.p-4');
    };

    getProjectsTitle(): Locator {
        return this.page.locator('h4', { hasText: "My Projects" });
    };

    getSearchBar(): Locator {
        return this.page.locator('input[placeholder="Search projects..."]');
    };

    getButtonGetCapital(): Locator {
        return this.page.locator('button', { hasText: "Get Capital" }).nth(0);
    };

    getInputPageNumber(): Locator {
        return this.page.locator('input[type="text"][value="1"]');
    };

    getLastPageButton(): Locator {
        return this.page.locator('.p-2.bg-monochrome-5.rounded-l-lg');
    };

    getNextPageButton(): Locator {
        return this.page.locator('.p-2.bg-monochrome-5.rounded-r-lg');
    };


}