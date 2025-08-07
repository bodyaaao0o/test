import { test, expect, Page } from '@playwright/test';
import { LoginPage, ProfileInfo } from '../PageObject/loginPage.PO';
import { DashboardPage } from './dashboardPage.PO';
import { Transactions } from './transactionsPage.PO';
import { Settings } from './settingPage.PO';
import { Projects } from './projectsPage.PO';

export class PageManager {
    private readonly page : Page;
    private readonly loginPage : LoginPage;
    private readonly profileInfo: ProfileInfo;
    private readonly transactions: Transactions;
    private readonly dashboard: DashboardPage;
    private readonly settings: Settings;
    private readonly projects: Projects;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.profileInfo = new ProfileInfo(this.page);
        this.transactions = new Transactions(this.page);
        this.dashboard = new DashboardPage(this.page);
        this.settings = new Settings(this.page);
        this.projects = new Projects(this.page);
    }

    loginTo() {
        return this.loginPage
    }

    profile() {
        return this.profileInfo
    }

    transaction() {
        return this.transactions;
    }

    dashboardTo() {
        return this.dashboard;
    }

    settingsTo() {
        return this.settings;
    }

    projectTo() {
        return this.projects;
    }

}

export const checkVisibility = async (elements: any[]) => {
    for(const element of elements) {
        await expect(element).toBeVisible();
    }
}