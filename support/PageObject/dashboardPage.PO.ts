import { Locator, Page, test } from '@playwright/test';
import { cred } from '../data';


export class DashboardPage {
    private readonly page: Page;
    private readonly user_name: string;

    constructor(page: Page) {
        this.page = page;
        this.user_name = cred.valid_username;
    }

    getHelloNotification(): Locator {
        return this.page.locator('.notification-card.flex.justify-between.items-center');
    };

    getCloseHelloNotificationButton(): Locator {
        return this.page.locator('div.ml-4.flex.flex-row.gap-2.justify-center.items-center');
    };

    clickOnCloseHelloNotificationButton() {
        return this.getCloseHelloNotificationButton().click();
    };

    getHelloNotificationText(): Locator {
        return this.page.locator('p', { hasText: `Hello ${this.user_name}, You can now start with submitting your first financing` }).nth(0);
    };

    getNavBox(): Locator {
        return this.page.locator('nav.lg\\:fixed.lg\\:h-full');
    };

    getDashboardNav(): Locator {
        return this.page.locator('nav li', { hasText: "Dashboard" });
    };

    getProjectsNav(): Locator {
        return this.page.locator('nav li', { hasText: "Projects" });
    };

    getTransactionsNav(): Locator {
        return this.page.locator('nav li', { hasText: "Transactions" });
    };

    getContactSupportNav(): Locator {
        return this.page.locator('nav li', { hasText: "Contact Support" });
    };

    getSettingsNav(): Locator {
        return this.page.locator('nav li', { hasText: "Settings" });
    };

    getLogoutNav(): Locator {
        return this.page.locator('.pl-4.flex.my-auto.text-xs', {hasText: "Logout"}).nth(1);
    }

    getFinanceYourProject(): Locator {
        return this.page.locator('section .col-span-2.bg-white');
    };

    getFinanceYourProjectTitle(): Locator {
        return this.page.locator('h4', { hasText: "Finance your project" });
    };

    getFinanceYourProjectDescription(): Locator {
        return this.page.locator('p', { hasText: "Grow your sustainability project with liquid capital at flexible term." });
    };

    getButtonGetStarted(): Locator {
        return this.page.locator('button', { hasText: "Get Started" });
    };

    getTotalFinancingReceived(): Locator {
        return this.page.locator('.bg-white.p-4.grow.flex.flex-column');
    };

    getWalletBalance(): Locator {
        return this.page.locator('.bg-white.p-4.flex.gap-4.flex-column', { hasText: "Wallet Balance" });
    };

    getProjectListed(): Locator {
        return this.page.locator('.bg-white.p-4.flex.flex-column.rounded-lg.gap-4').nth(0);
    }

    getProjectInProgress(): Locator {
        return this.page.locator('.bg-white.p-4.flex.flex-column.rounded-lg.gap-4').nth(1);
    };

    getProjects(): Locator {
        return this.page.locator('.bg-white.p-4.flex.flex-col.rounded-lg').nth(0);
    }

    getProjectViewAllButton(): Locator {
        return this.page.locator('a[href="/projects"]', { hasText: "View All" });
    };

    getRecentTransactions(): Locator {
        return this.page.locator('.bg-white.p-4.flex.flex-col.rounded-lg').nth(0);
    };

    getRecentTransactionsViewAllButton(): Locator {
        return this.page.locator('button.py-2.px-6.flex.flex-row', { hasText: "View All" });
    };

    getFillFormBox(): Locator {
        return this.page.locator('.flex-1.overflow-auto.p-4');
    };

    getCloseButton(): Locator {
        return this.page.locator('button', { hasText: "Close" });
    };

    //Contact Support 
    getContactSupportTitle(): Locator {
        return this.page.locator('h3', { hasText: "Contact Support" });
    };

    getQuestionTitle(): Locator {
        return this.page.locator('h6', { hasText: "Have Any Questions ?" });
    };

    getQuestionDescription(): Locator {
        return this.page.locator('p', { hasText: "Please send a mail to" });
    };

    getContactSupportEmail(): Locator {
        return this.page.locator('a[href="mailto:support@penomo.io"]', { hasText: "hello@penomo.io" });
    };

    getClosecontactSupport(): Locator {
        return this.page.locator('.py-2.px-6.flex.flex-row.items-center.cursor-pointer.justify-center').nth(4);
    };


    //Mobile

    getBurgerMenu(): Locator {
        return this.page.locator('button.inline-flex.items-center.justify-center.text-sm.text-monochrome-500');
    };

    clickOnBurgerMenu() {
        return this.getBurgerMenu().click();
    };

    getCloseBurgerMenu(): Locator {
        return this.page.locator('button.inline-flex.items-center.justify-center.text-monochrome-500');
    };

    clickOnCloseBurgerMenu() {
        return this.getCloseBurgerMenu().click();
    };

    getMobileLogoutNav(): Locator {
        return this.page.locator('.pl-4.flex.my-auto.text-xs', {hasText: "Logout"}).nth(0);
    };

}