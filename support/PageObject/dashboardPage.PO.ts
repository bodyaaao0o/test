import { Locator, Page, test } from '@playwright/test';

export class DashboardPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    getDashboardNav(): Locator {
        return this.page.locator('span', { hasText: "Dashboard" });
    };

    clickOnDashboardNav() {
        return this.getDashboardNav().click();
    };

    getInvestNav(): Locator {
        return this.page.locator('span.pl-4.flex.my-auto', { hasText: "Invest" });
    };

    clickOnInvestNav() {
        return this.getInvestNav().click();
    };

    getPortfolioNav(): Locator {
        return this.page.locator('span', { hasText: "Portfolio" });
    };

    clickOnPortfolioNav() {
        return this.getPortfolioNav().click();
    };

    getTransactionsNav(): Locator {
        return this.page.locator('span', { hasText: "Transactions" });
    };

    clickOnTransactionsNav() {
        return this.getTransactionsNav().click();
    };

    getStakingNav(): Locator {
        return this.page.locator('span', { hasText: "Staking" });
    };

    clickOnStakingNav() {
        return this.getStakingNav().click();
    };

    getGovernanceNav(): Locator {
        return this.page.locator('span', { hasText: "Governance" });
    };

    clickOnGovernanceNav() {
        return this.getGovernanceNav().click();
    };

    getSettingsNav(): Locator {
        return this.page.locator('span', { hasText: "Settings" });
    };

    clickOnSettingsNav() {
        return this.getSettingsNav().click();
    };

    getLogoutNav(): Locator {
        return this.page.locator('.flex.justify-items-center', { hasText: "Logout" }).nth(1);
    };

    clickOnLogoutNav() {
        return this.getLogoutNav().click();
    };

    getCompeteKYCSection(): Locator {
        return this.page.locator('div.flex.grow h4', { hasText: "Complete KYC" });
    };

    getCompleteKYCDescription(): Locator {
        return this.page.locator('p', { hasText: "Required to claim PNMO" });
    };

    getUncompetedKYCImage(): Locator {
        return this.page.locator('img[src="./assets/ic_kyc_incomplete.svg"]');
    };

    getCompeteKYCButton(): Locator {
        return this.page.locator('button', { hasText: "Start" });
    };

    clickOnCompeteKYCButton() {
        return this.getCompeteKYCButton().click();
    };

    getRecentTransactionsBox(): Locator {
        return this.page.locator('.bg-monochrome-100.p-4.flex.flex-col.rounded-lg');
    };

    getViewAllTransactionsButton(): Locator {
        return this.page.locator('button', { hasText: "View All" }).nth(1);
    };

    clickOnViewAllTransactionsButton() {
        return this.getViewAllTransactionsButton().click();
    };

    getGridInfoTransactions(): Locator {
        return this.page.locator('div.grid.grid-cols-4.border-b').nth(1);
    };

    getInfoTransactionsBoard(): Locator {
        return this.page.locator('div.center.min-h-40.text-monochrome-20', { hasText: "No Recent Transactions." });
    };

    getNotification(): Locator {
        return this.page.locator('.notification-card.flex.border.border-monochrome-60').nth(0);
    };

    getWalletBalanceBox(): Locator {
        return this.page.locator('.bg-monochrome-100.p-4.flex.gap-4.flex-column.rounded-lg');
    };

    getWalletIcon(): Locator {
        return this.page.locator('img[alt="Wallet Icon"]');
    };

    getWalletBalanceTitle(): Locator {
        return this.page.locator('p', { hasText: "Wallet Balance" });
    };

    getTopUpButton(): Locator {
        return this.page.locator('button', { hasText: "Top Up" });
    };

    getWithdrawButton(): Locator {
        return this.page.locator('button', { hasText: "Withdraw" });
    };

    getComingSoonText(): Locator {
        return this.page.locator('p', { hasText: "Coming Soon." })
    };

    getFooterBox(): Locator {
        return this.page.locator('footer.w-full.mt-auto');
    };

    getFooterDescription(): Locator {
        return this.page.locator('p', { hasText: "© 2025 penomo Ltd." });
    };

    //Privacy Policy

    getFooterPrivacyPolicy(): Locator {
        return this.page.locator('p.cursor-pointer.mt-2.transition-all.duration-300.ease-in-out');
    };

    clickOnPrivacyPolicy() {
        return this.getFooterPrivacyPolicy().click();
    };

    getPrivacyPolicyTitle(): Locator {
        return this.page.locator("div.flex.justify-between.items-center.pb-4 h2.mb-0.font-semibold.leading-8");
    };

    getTopClosePrivacyPolicyButton(): Locator {
        return this.page.locator('div.flex.justify-between.items-center.pb-4 button.py-2.px-2.flex.flex-row.items-center.cursor-pointer.justify-center.gap-2');
    };

    clickOnTopClosePrivacyPolicyButton() {
        return this.getTopClosePrivacyPolicyButton().click();
    };

    getRulesContainer(): Locator {
        return this.page.locator('div.mx-auto.p-3.rounded-md.border.border-monochrome-20.bg-monochrome-150.overflow-y-scroll');
    };

    getBottomClosePrivacyPolicyButton(): Locator {
        return this.page.locator('button.py-2.px-2.flex.flex-row.items-center.cursor-pointer.justify-center.gap-2', { hasText: "Close" });
    };



    //Mobile locators

    getBurgerMenu(): Locator {
        return this.page.locator('svg.w-5.h-5');
    };

    clickOnBurgerMenu() {
        return this.getBurgerMenu().click();
    };

    getCloseBurgerMenu(): Locator {
        return this.page.locator('svg.w-7.h-7');
    }

    clickOnCloseBurgerMenu() {
        return this.getCloseBurgerMenu().click();
    };

    getLogoutButtonForMobile(): Locator {
        return this.page.locator('div.flex.justify-items-center span.pl-4.flex.my-auto.text-sm', { hasText: "Logout" }).first();
    };

    clickOnLogoutButtonForMobile() {
        return this.getLogoutButtonForMobile().click();
    };




}