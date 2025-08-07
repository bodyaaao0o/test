import { test, expect, Page } from '@playwright/test';
import { LoginPage, ProfileInfo } from '../PageObject/loginPage.PO';
import { DashboardPage } from './dashboardPage.PO';



export class PageManager {
    private readonly page : Page;
    private readonly loginPage : LoginPage;
    private readonly profileInfo: ProfileInfo;
    private readonly dashboard: DashboardPage;


    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.profileInfo = new ProfileInfo(this.page);
        this.dashboard = new DashboardPage(this.page);
    }

    loginTo() {
        return this.loginPage
    }

    profile() {
        return this.profileInfo
    }

    dashboardTo() {
        return this.dashboard;
    }
}

export const checkVisibility = async (elements: any[]) => {
    for(const element of elements) {
        await expect(element).toBeVisible();
    }
}