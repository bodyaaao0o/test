import { expect, Page } from "playwright/test";
import { DashboardPage } from "./dashboardPage.PO";
import { InvestPage } from "./investPage.PO";
import { PortfolioPage } from "./portfolioPage.PO";
import { ProjectPage } from "./projectPage.PO";
import { SettingPage } from "./settingsPage.PO";
import { SetupPage, LoginPage } from "./setupPage.PO";
import { StakingAndGovernancePages } from "./stakingAndGovernancePages.PO";
import { TransactionPage } from "./transacrionPage.PO";

export class PageManager {
    private readonly page:Page;
    private readonly loginPage:LoginPage;
    private readonly setupPage:SetupPage;
    private readonly dashboardPage:DashboardPage;
    private readonly investPage:InvestPage;
    private readonly portfolioPage:PortfolioPage;
    private readonly projectPage:ProjectPage;
    private readonly settingPage:SettingPage;
    private readonly stakingPage:StakingAndGovernancePages;
    private readonly governancePage:StakingAndGovernancePages;
    private readonly transactionPage:TransactionPage;

    constructor(page:Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.setupPage = new SetupPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.investPage = new InvestPage(this.page);
        this.portfolioPage = new PortfolioPage(this.page);
        this.projectPage = new ProjectPage(this.page);
        this.settingPage = new SettingPage(this.page);
        this.stakingPage = new StakingAndGovernancePages(this.page);
        this.governancePage = new StakingAndGovernancePages(this.page);
        this.transactionPage = new TransactionPage(this.page);
    }

    login() {
        return this.loginPage;
    };

    setup() {
        return this.setupPage;
    };

    dashboard() {
        return this.dashboardPage;
    };

    invest() {
        return this.investPage;
    };

    portfolio() {
        return this.portfolioPage;
    };

    project() {
        return this.projectPage;
    };

    settings() {
        return this.settingPage;
    };

    staking() {
        return this.stakingPage;
    };

    governance() {
        return this.governancePage;
    };

    transaction() {
        return this.transactionPage;
    };
}

export const checkVisibility = async (label: string, elements: any[]) => {
    const results = await Promise.allSettled(
        elements.map(e => expect(e).toBeVisible())
    );

    const failedElements = results
        .map((r, i) => ({ result: r, index: i }))
        .filter(x => x.result.status === 'rejected');

    if (failedElements.length > 0) {
        const messages = failedElements.map(({ index, result }) => {
            const err = (result as PromiseRejectedResult).reason;
            const fullMessage = err?.message || JSON.stringify(err, null, 2) || 'Unknown error';
            return `[${label}] Element #${index + 1} failed:\n${fullMessage}`;
        });

        messages.forEach(msg => console.error(msg));

        throw new Error(messages.join('\n\n'));
    }
};
