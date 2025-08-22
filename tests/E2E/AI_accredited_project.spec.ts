import { test, expect } from '@playwright/test';
import { PageManager, checkVisibility } from '../../support/PageObject/pageManager';
import { env } from '../../support/data';


const { stageBaseUrl } = env;

test.use({ storageState: 'playwright/.auth/registered_accredited_invest_login.json' })

test.describe("Checking the project information in IA(accredited type)", () => {
    let pm: PageManager;

    test.beforeAll(async({ page }) => {
        pm = new PageManager(page);
    });

    test("Checking the project info", async ({ page }) => {

        await page.goto(stageBaseUrl);

        await expect(page).toHaveURL('https://www.staging.invest.penomo.com/dashboard');

        await pm.dashboard().clickOnInvestNav();
        
        await expect(page).toHaveURL('https://www.staging.invest.penomo.com/marketplace');

        

        await pm.invest().clickOnProject();

        await expect(page).toHaveURL(/.*marketplace\/details\?projectId=[^&]+/);

        await checkVisibility("Project display checking", [
            pm.project().getSolarProjectImage(),
            pm.project().getPtojectTitleSection(),
            pm.project().getProjectType(),
            pm.project().getProjectCountry(),
            pm.project().getTokenPriceImage(),
            pm.project().getTokenPriceTitle(),
            pm.project().getTokenPrice(),
            pm.project().getTabsPanel()
        ]);

        const tabs = await pm.project().getOneTab();

        await expect(tabs).toHaveCount(6);

        await expect(tabs).toHaveText([
            'Summary',
            'Overview',
            'Details',
            'Financials',
            'Documents',
            'Updates'
        ]);

        const count = await tabs.count();

        for (let i = 0; i < count - 1; i++) {
            const panels = page.locator(`label[for=custom-test${i}]`);
            const tab = tabs.nth(i);
            await tab.click();

            const tabPanel = panels;
            await expect(tabPanel).toBeVisible({ timeout: 5000 });
        }


        const frame = page.frameLocator('iframe[src*="drive.google.com"]');

        await expect(page.locator('iframe[src*="drive.google.com"]')).toBeVisible({ timeout: 10000 });;

        await expect(pm.project().getViewFullscreenButton()).toBeVisible();

        await pm.project().clickOnViewFullscreen();

        await checkVisibility("Checking FullScreen visability", [
            pm.project().getFullScreenSummary(),
            pm.project().getFullscreenSummaryTitle(),
            pm.project().getCloseFullscreenButton(),
        ]);

        await expect(page.locator('iframe[src*="drive.google.com"]').nth(1)).toBeVisible({ timeout: 10000 });

        await pm.project().clickOnCloseFullscreen();

        const sections = await pm.project().getAllSections();

        // Checking information in each section

        expect(sections['Overview']['Issuer Name'])
        .toBe('Dutch Solar Developer & EPC (confidential)');

        expect(sections['Overview']['Industry']).toBe('Solar');

        expect(sections['Details']['Power Capacity']).toBe('10,000 kW');

        expect(sections['Details']['Physical Location']).toContain('Germany');

        expect(sections['Financials']['Yield']).toBe('10%');

        expect(sections['Financials']['Payout']).toBe('Quarterly');

        await expect(pm.project().getDocumentTitle()).toBeVisible();

        await expect(pm.project().getViewDocumentsButton()).toBeVisible();

        await expect(pm.project().getViewDocumentsButton()).toBeEnabled();

        await checkVisibility("Invest checking", [
            pm.project().getInvestSectionImage(),
            pm.project().getInvestSectionProjectType(),
            pm.project().getInvestNowButton()
        ]);

        const invest_items = await pm.project().getInvestSectionTokenPriceAndAPYTitles();

        const count_invest_items = await invest_items.count();

        for (let i = 0; i < count_invest_items; i++) {
            let item = invest_items.nth(i);
            await expect(item).toBeVisible();
        }

        await expect(pm.project().getInvestNowButton()).toBeEnabled();

        await pm.project().clickOnInvestNowButton();

        await checkVisibility("Checking box after click on Invest Now button", [
            pm.project().getComingSoonBox(),
            pm.project().getComingSoonBoxTitle(),
            pm.project().getCloseComingSoonBoxButton(),
            pm.project().getTextInComingSoonBox(),
            pm.project().getCloseButton()
        ]);

        await expect(pm.project().getComingSoonBoxTitle()).toHaveText("Invest");

        await expect(pm.project().getTextInComingSoonBox()).toHaveText("Investor Purchase Page Coming Soon");

        await pm.project().closeComingSoonBox();

        await expect(pm.project().getComingSoonBox()).not.toBeVisible();

        await pm.project().clickOnInvestNowButton();

        await expect(pm.project().getComingSoonBox()).toBeVisible();

        await pm.project().clickOnCloseButton();

        await expect(pm.project().getComingSoonBox()).not.toBeVisible();
    });
});