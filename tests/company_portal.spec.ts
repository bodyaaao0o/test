import { test, BrowserContext, Page, chromium, request as playwrightRequest, expect } from '@playwright/test'
import { PageManager } from '../support/PageObject/pageManager';
import { companyLogin } from '../support/login_as_company';
import { CompanyRequests } from '../support/CompanyPortalRequests';
import { adminLogin } from '../support/login_as_admin';
import { AdminRequests } from '../support/AdminRequests';
import { cred } from '../support/data';

const { penomo_tokens } = cred;

test.describe("Company portal test", () => {
    
    test("Company login + admin creates project for company", async () => {
        
        const browserCP = await chromium.launch({ headless: true });
        
        const companyContext = await browserCP.newContext();
        
        const companyPage = await companyContext.newPage();
        
        const pm = new PageManager(companyPage);
        
        const requestContext = await playwrightRequest.newContext();
        
        const { page, email } = await companyLogin(companyPage, companyContext, pm);

        await expect(page).toHaveURL('https://www.staging.raise.penomo.com/setupProfile');

        const companyAuthToken = await page.evaluate(() => localStorage.getItem('authToken'));
        
        if (!companyAuthToken) throw new Error('Company authToken not found');

        const company = new CompanyRequests(requestContext, companyAuthToken, email);

        await company.patchUserData();
        
        await company.checkUserData();
        
        await company.patchCompanyData();
        
        await company.checkCompanyData();

        await page.waitForTimeout(3000);

        const browserAdmin = await chromium.launch({ headless: true });
        
        const adminContext = await browserAdmin.newContext();
        
        const adminPage = await adminContext.newPage();
        
        const pmAdmin = new PageManager(adminPage);

        await adminLogin(adminPage, adminContext, pmAdmin);

        const adminAuthToken = await adminPage.evaluate(() => localStorage.getItem('authToken'));

        const admin = new AdminRequests(requestContext, adminAuthToken, email, penomo_tokens);

        await adminPage.reload();

        const companyId = await admin.getCompanyId();
        console.log('Company ID:', companyId);

        const assetId = await admin.getAssetId();
        console.log('Asset ID:', assetId);

        const project = await admin.submitProject(companyId, assetId);
        console.log('Project created:', project);

        await company.checkProject(companyId);
        
    });
});
