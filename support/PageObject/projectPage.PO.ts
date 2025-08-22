import { Locator, Page } from "playwright/test";

export class ProjectPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    };

    getSolarProjectImage(): Locator {
        return this.page.locator('img[src="/assets/dummy/solar.jpg"]');
    };

    getPtojectTitleSection(): Locator {
        return this.page.locator('div.z-10.relative.grid.grid-cols-1.gap-4 div.title');
    };

    getProjectType(): Locator {
        return this.page.locator('div.flex.items-center.gap-10 div.subtitle.text-gray');
    };

    getProjectCountry(): Locator {
        return this.page.locator('div.w-1.h-1.bg-monochrome-20.rounded-full ');
    };

    getTokenPriceImage(): Locator {
        return this.page.locator('img[src="/static/media/iconWallet3.f5688ba0d201faa84378eec195dff52c.svg"]');
    };

    getTokenPriceTitle(): Locator {
        return this.page.locator('div.info-item span.info-label.text-gray.flex', { hasText: "Token Price" });
    };

    getTokenPrice(): Locator {
        return this.page.locator('div.info-item span.info-value').nth(0);
    };

    //дописати перевірку для токен волум і АПЮ

    getTabsPanel(): Locator {
        return this.page.locator('.custom-tabs-panel');
    };

    getOneTab(): Locator {
        return this.page.locator('.custom-tab label');
    };

    //Checking Sections

    getTitle(): Locator {
        return this.page.locator('.marketplace-card.custom-card h5');
    };

    getSection(): Locator {
        return this.page.locator('.card-body.divide-y.divide-monochrome-40.border-b.border-monochrome-40')
    };

    getSectionsRow(): Locator {
        return this.page.locator('div.flex.details-wraper span.text-gray');
    };

    //Summary 

    getViewFullscreenButton(): Locator {
        return this.page.locator('button.text-sm.text-green-100.underline');
    };

    clickOnViewFullscreen() {
        return this.getViewFullscreenButton().click();
    };

    getFullScreenSummary(): Locator {
        return this.page.locator('.bg-gray-900.rounded-lg.w-full.h-full.max-w-7xl.max-h-full.overflow-hidden');
    };

    getFullscreenSummaryTitle(): Locator {
        return this.page.locator('h2.text-xl.font-bold.text-white');
    };

    getCloseFullscreenButton(): Locator {
        return this.page.locator('button.text-gray-400.text-2xl.font-bold.px-2');
    };

    clickOnCloseFullscreen() {
        return this.getCloseFullscreenButton().click();
    };


    // Documents section

    getDocumentTitle(): Locator {
        return this.page.locator('h5.card-title', {hasText: "Documents"});
    };

    getViewDocumentsButton(): Locator {
        return this.page.locator('div a.text-xs.btn');
    };

    clickOnViewDocumentsButton() {
        return this.getViewDocumentsButton().click();
    };

    // Invest Section

    getInvestSectionImage(): Locator {
        return this.page.locator('img[src="/static/media/carbon_energy-renewable.2c1fc1ef698516606447eb135d61d435.svg"]');
    };

    getInvestSectionProjectType(): Locator {
        return this.page.locator('p.flex.text-md.text-monochrome-20');
    };

    getInvestSectionTokenPriceAndAPYTitles(): Locator {
        return this.page.locator('div.flex.flex-col.gap-2 p.flex.text-monochrome-20');
    };

    getInvestSectionTokenPriceAndAPY(): Locator {
        return this.page.locator('div.flex.flex-col.gap-2 p.font-medium');
    };

    getInvestNowButton(): Locator {
        return this.page.locator('.btn.btn-primary.w-full');
    };

    clickOnInvestNowButton() {
        return this.getInvestNowButton().click();
    };

    //Coming soon invest section

    getComingSoonBox(): Locator {
        return this.page.locator('.flex-1.overflow-auto.p-4.bg-monochrome-100');
    };

    getComingSoonBoxTitle(): Locator {
        return this.page.locator('h1.mb-0', {hasText: "Invest"});
    };

    getCloseComingSoonBoxButton(): Locator {
        return this.page.locator('.py-2.px-2.flex.flex-row.items-center.cursor-pointer.justify-center.gap-2.bg-monochrome-60.border.border-monochrome-40.px-2');
    };

    closeComingSoonBox() {
        return this.getCloseComingSoonBoxButton().click();
    };

    getTextInComingSoonBox(): Locator {
        return this.page.locator('.text-xl.font-bold.text-monochrome-20');
    };

    getCloseButton(): Locator {
        return this.page.locator('.py-2.px-2.flex.flex-row.items-center.cursor-pointer.justify-center.gap-2.btn');
    };

    clickOnCloseButton() {
        return this.getCloseButton().click();
    };


    //Invest Tokens section

    getInvestWindow(): Locator {
        return this.page.locator('.flex-1.overflow-auto.p-4.bg-monochrome-100');
    };

    getInvestWindowTitle(): Locator {
        return this.page.locator('div.flex.justify-between.items-center.pb-5 h1.mb-0');
    }

    getCloseInvestWindowButton(): Locator {
        return this.page.locator('button.py-2.px-2.flex.flex-row.items-center.cursor-pointer.justify-center.gap-2.bg-monochrome-60.border.border-monochrome-40');
    };

    clickOnCloseInvestWindowButton() {
        return this.getCloseInvestWindowButton().click();
    };

    //Token section

    getTokenSectionTitle(): Locator {
        return this.page.locator('div.my-4.space-y-4 h5.my-1.font-bold');
    };

    getTokenSectionImage(): Locator {
        return this.page.locator('.flex.justify-center.items-center.bg-monochrome-60.p-2.rounded-full')
    };

    getProjectName(): Locator {
        return this.page.locator('div.flex.flex-col p.font-bold');
    };

    getProjectDescription(): Locator {
        return this.page.locator('div.flex.flex-col p').nth(1);
    };

    getTokensPriceAndAPY(): Locator {
        return this.page.locator('.py-1.px-2.h-max.w-max.flex.justify-center.items-center.rounded-xl');
    };

    // Token Amount section

    getTokenAmountTitle(): Locator {
        return this.page.locator('div.my-4 space-y-4 h5.mb-2.mt-3.font-bold');
    };

    getInputTokensCount(): Locator {
        return this.page.locator('input[type="text"]');
    };

    getInputCurrencyType(): Locator {
        return this.page.locator('p.text-xs.text-right.text-monochrome-20')
    };

    getCancelButton(): Locator {
        return this.page.locator('button', { hasText: "Cancel" });
    };

    getNextButton(): Locator {
        return this.page.locator('button', { hasText: "Next" });
    };

    // Rules Window

    getRulesTitle(): Locator {
        return this.page.locator('div.my-4.space-y-4 h5.my-1.font-bold');
    };

    getRulesContainer(): Locator {
        return this.page.locator('.overflow-y-auto.max-h-40.border.border-monochrome-40.p-2.my-4.rounded-sm.bg-monochrome-60');
    };

    getCheckboxesForConfirmatio(): Locator {
        return this.page.locator('.w-5.h-5.flex.items-center.justify-center.border-2.rounded.border-monochrome-40.bg-monochrome-60');
    };

    getCheckBoxesDescription(): Locator {
        return this.page.locator('.flex.items-center.gap-2.cursor-pointer label.select-none');
    };

    getSmartContractRegistryTitle(): Locator {
        return this.page.locator('div.my-4.space-y-4 h5.my-1.font-bold.pt-6.text-sm');
    };

    getRefToSmartContractPage(): Locator {
        return this.page.locator('div.my-4 a[href="https://docs.google.com/document/d/1Q5kc-o7H_G8lEP4_uNNaMUkAnVxQiru5/edit?usp=sharing&ouid=114294399236093119021&rtpof=true&sd=true"]');
    };

    getBackButton(): Locator {
        return this.page.locator('.py-2.px-2.flex.flex-row.items-center.cursor-pointer.justify-center.gap-2.btn', { hasText: "Back" });
    };

    getRequestTokenPurchase(): Locator {
        return this.page.locator('.py-2.px-2.flex.flex-row.items-center.cursor-pointer.justify-center.gap-2.btn', { hasText: "Request Token Purchase" });
    };

    //Competed Purchase Request window

    getCompetedRequestImage(): Locator {
        return this.page.locator('img[alt="Success"]');
    };

    getCompetedRequestTitle(): Locator {
        return this.page.locator('div.space-y-2 h3');
    };

    getCompletedRequestDescription(): Locator {
        return this.page.locator('div.space-y-2 h3 p.text-monochrome-20')
    }

    getCloseRequestButton(): Locator {
        return this.page.locator('button.py-2.px-2.flex.flex-row.items-center.cursor-pointer.justify-center.gap-2', { hasText: "Close" });
    };

    getViewPortfolioButton(): Locator {
        return this.page.locator('div.grid.grid-cols-2.items-center.gap-4.w-full button.btn.btn-primary.w-full');
    };

    clickOnCloseRequestButton() {
        return this.getCloseRequestButton().click();
    };

    clickOnViewPortfolioButton() {
        return this.getViewPortfolioButton().click();
    };

    getCards(): Locator {
        return this.page.locator('.marketplace-card.custom-card');
    }

    async getAllSections(): Promise<Record<string, Record<string, string>>> {
        const cards = this.getCards();
        const sections: Record<string, Record<string, string>> = {};
        const count = await cards.count();

        for (let i = 0; i < count - 1; i++) {
            const card = cards.nth(i);
            const title = (await card.locator('h5.card-title').innerText()).trim();
            const rows = card.locator('div.flex.details-wraper');

            const rowsCount = await rows.count();
            const sectionData: Record<string, string> = {};

            for (let j = 0; j < rowsCount - 1; j++) {
                const row = rows.nth(j);
                const label = await row.locator('span.text-gray').innerText();
                const value = await row.locator(':scope > :not(.text-gray)').innerText();
                sectionData[label.trim()] = value.trim();
            }

            if (Object.keys(sectionData).length > 0) {
                sections[title] = sectionData;
            }
        }
        return sections;
    }
}