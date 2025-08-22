import { test, expect } from '@playwright/test'
import { PageManager, checkVisibility } from '../../support/PageObject/pageManager'
import { cred, env } from '../../support/data';

test.use({ storageState: 'playwright/.auth/registered_accredited_invest_login.json' })

const { stageBaseUrl } = env;

const { change_surename, change_username } = cred;

test.describe("E2E test for accredited type of Investor", () => {
    let pm: PageManager

    test("e2e test for AI accredited", async ({ page }, testInfo) => {
        const isMobile = testInfo.project.use.isMobile;
        pm = new PageManager(page);
        await page.goto(stageBaseUrl, { waitUntil: "load" });
        await page.waitForLoadState("load");

        await checkVisibility("dashboard checking", [
            pm.dashboard().getNotification(),
            pm.dashboard().getCompeteKYCSection(),
            pm.dashboard().getCompeteKYCButton(),
            pm.dashboard().getCompleteKYCDescription(),
            pm.dashboard().getUncompetedKYCImage(),
            pm.dashboard().getRecentTransactionsBox(),
            pm.dashboard().getViewAllTransactionsButton(),
            pm.dashboard().getGridInfoTransactions(),
            pm.dashboard().getInfoTransactionsBoard(),
            pm.dashboard().getWalletBalanceBox(),
            pm.dashboard().getWalletIcon(),
            pm.dashboard().getWalletBalanceTitle(),
            pm.dashboard().getTopUpButton(),
            pm.dashboard().getWithdrawButton(),
            pm.dashboard().getFooterBox(),
            pm.dashboard().getFooterDescription(),
            pm.dashboard().getFooterPrivacyPolicy()
        ]);

        await checkVisibility("Checking navigetion bars", [
            pm.dashboard().getDashboardNav(),
            pm.dashboard().getInvestNav(),
            pm.dashboard().getPortfolioNav(),
            pm.dashboard().getTransactionsNav(),
            pm.dashboard().getStakingNav(),
            pm.dashboard().getGovernanceNav(),
            pm.dashboard().getSettingsNav(),
            pm.dashboard().getLogoutNav()
        ]);

        await pm.dashboard().clickOnViewAllTransactionsButton();
        await expect(page).toHaveURL('https://www.staging.invest.penomo.com/transactions');
        await page.goBack();
        await expect(page).toHaveURL('https://www.staging.invest.penomo.com/dashboard');

        await pm.dashboard().clickOnInvestNav();
        await expect(page).toHaveURL('https://www.staging.invest.penomo.com/marketplace');

        await checkVisibility("Checking the displaying projects on Invest page", [
            pm.invest().getProjectSection(),
            pm.invest().getRWAPoolsSection(),
            pm.invest().getProjectBox(),
            pm.invest().getProjectImage(),
            pm.invest().getProjectName(),
            pm.invest().getAccessToTheProject(),
            pm.invest().getAPYNumber(),
            pm.invest().getInvestedAmount(),
            pm.invest().getDurationAmount(),
            pm.invest().getInvestorTypeTitle()
        ]);



        // await expect(pm.invest().getProjectName()).toHaveText('Test Tokenization');

        // await expect(pm.invest().getAccessToTheProject()).toHaveText("Public");

        // await expect(pm.invest().getInvestedAmount()).toHaveText('Invested');

        // await expect(pm.invest().getDurationAmount()).toHaveText('Duration');

        // await expect(pm.invest().getInvestorTypeTitle()).toHaveText("Accredited");

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

        //const tabs = await pm.project().getOneTab();
        const tabs = page.locator('.custom-tab label');

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

        // перевіряємо, що сам iframe видимий
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
        console.log(sections);

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

        await checkVisibility("Checking box after click on Invest Now button",[
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

        await pm.dashboard().clickOnPortfolioNav();

        await expect(page).toHaveURL('https://www.staging.invest.penomo.com/portfolio');

        await checkVisibility("Portfolio checking", [
            pm.portfolio().getTotalInvested(),
            pm.portfolio().getUSDCountInvested(),
            pm.portfolio().getTotalYield(),
            pm.portfolio().getUSDCountYield(),
            pm.portfolio().getRWATokenHoldingsTitle(),
            pm.portfolio().getSearchFiled(),
            pm.portfolio().getPurchaseRequestsButton(),
            pm.portfolio().getHoldingsButton(),
            pm.portfolio().getNoTokenHoldings()
        ]);
        
        await pm.portfolio().clickOnPurchaseRequest();
        
        await expect(pm.portfolio().getNoPurchasingRequestsText()).toBeVisible();
        
        await pm.portfolio().getSearchFiled().fill('testdata');
        
        await pm.portfolio().getSearchFiled().clear();

        if (isMobile) {
            await pm.dashboard().clickOnBurgerMenu();
        };
        
        await pm.dashboard().clickOnTransactionsNav();
        
        //Transactions

        await expect(page).toHaveURL('https://www.staging.invest.penomo.com/transactions');
        
        await checkVisibility("Checking Transaction fuctionality", [
            pm.transaction().getTransactionPeriodTitle(),
            pm.transaction().getTransactionPeriodFilter(),
            pm.transaction().getTransactionCategoryTitle(),
            pm.transaction().getTransactionCategory(),
            pm.transaction().getTransactionCategoryButton(),
            pm.transaction().getProjectTitle(),
            pm.transaction().getProject(),
            pm.transaction().getProjectButton(),
            pm.transaction().getClearAllFilters(),
        ]);

        await pm.transaction().clickOnTransactionsPeriod();
        
        await expect(pm.transaction().getPeriodBox()).toBeVisible();
        
        await pm.transaction().clickOnTransactionsPeriod();
        
        await pm.transaction().clickOnTransactionCategory();

        await checkVisibility(" Transaction filters checking",[
            pm.transaction().getTransactionCategoryBox(),
            pm.transaction().getAllTransactionFilter(),
            pm.transaction().getSecondTransactionFilter()
        ]);

        await pm.transaction().clickOnSecondTransaction();
        
        await pm.transaction().clickOnTransactionCategory();
        
        await expect(pm.transaction().getAllTransactionFilterCheck()).toBeVisible();
        
        await expect(pm.transaction().getSecondTransactionFilterCheck()).toBeVisible();
        
        await pm.transaction().clickOnClearAllFilters();
        
        await expect(pm.transaction().getSecondTransactionFilterCheck()).not.toBeVisible();

        await pm.transaction().clickOncloseFilters();
        
        await expect(pm.transaction().getAllTransactionFilterCheck()).not.toBeVisible();

        if (isMobile) {
            await pm.dashboard().clickOnBurgerMenu();
        };

        await pm.dashboard().clickOnStakingNav();
        
        await expect(page).toHaveURL('https://www.staging.invest.penomo.com/staking');
        
        await expect(pm.dashboard().getComingSoonText()).toBeVisible();

        if (isMobile) {
            await pm.dashboard().clickOnBurgerMenu();
        };
        
        await pm.dashboard().clickOnGovernanceNav();
        
        await expect(page).toHaveURL('https://www.staging.invest.penomo.com/governance');
        
        await expect(pm.dashboard().getComingSoonText()).toBeVisible();

        if (isMobile) {
            await pm.dashboard().clickOnBurgerMenu();
        };
        
        await pm.dashboard().clickOnSettingsNav();
        
        await expect(page).toHaveURL("https://www.staging.invest.penomo.com/settings");

        //Settings

        await checkVisibility("Setting page global checking",[
            pm.settings().getAccountPage(),
            pm.settings().getNotificationPage(),
            pm.settings().getAccountTitle(),
            pm.settings().getUserDetailsTitle(),
            pm.settings().getUserDetailsDescription(),
            pm.settings().getFirstNameTitle(),
            pm.settings().getFirstNameInput(),
            pm.settings().getChangeFirstName(),
            pm.settings().getLastNameTitle(),
            pm.settings().getLastNameInput(),
            pm.settings().getChangeLastName(),
            pm.settings().getEmailTitle(),
            pm.settings().getEmailInput(),
            pm.settings().getKYCStatucTitle(),
            pm.settings().getKYCStatus(),
            pm.settings().getWalletDetailsTitle(),
            pm.settings().getWalletAddressDescription(),
            pm.settings().getWalletAddress(),
            pm.settings().getCopyWalletAddressButton(),
            pm.settings().getCompleteKYCBox(),
            pm.settings().getCompleteKYCTitle(),
            pm.settings().getCompleteKYCDescription(),
            pm.settings().getStartKYCButton(),
            pm.settings().getDeleteAccountButton()
        ]);

        await expect(pm.settings().getCompleteKYCDescription()).toHaveText('Required to claim PNMO.');

        await pm.settings().clickOnChangeFirstName();
        
        await pm.settings().getFirstNameInput().fill(change_username);
        
        await pm.settings().clickOnSaveChanges();
        
        await expect(pm.settings().getSuccessUpdateUserDataMessage()).toBeVisible();
        
        await pm.settings().clickOnChangeLastName(); 
        
        await pm.settings().getLastNameInput().fill(change_surename);
        
        await pm.settings().clickOnSaveChanges();
        
        await expect(pm.settings().getSuccessUpdateUserDataMessage()).toBeVisible(); 

        try {
            await pm.settings().clickOnCopyWalletAddress();
            
            await expect(pm.settings().getAddressCopiedMessage()).toBeVisible();
        } catch {
            await pm.settings().clickOnCopyWalletAddress();
            
            await expect(pm.settings().getAddressCopiedMessage()).toBeVisible();
        }
        
        await pm.settings().clickOnDeleteAccountButton();
        
        await checkVisibility("Delete account functionality checking",[
            pm.settings().getDeleteAccountBox(),
            pm.settings().getDeleteAccountTitle(),
            pm.settings().getDeleteAccountDescription(),
            pm.settings().getCancelDeleteButton(),
            pm.settings().getConfirmDeleteButton()
        ]);

        await pm.settings().clickOnCancelDeleteButton();
        
        await expect(pm.settings().getDeleteAccountBox()).not.toBeVisible();
        
        await pm.settings().clickOnNotificatonPage();
        
        await checkVisibility("Notification checking ", [
            pm.settings().getNotificationsTitle(),
            pm.settings().getEmailNotifications(),
            pm.settings().getEmailNotificationsDescription(),
            pm.settings().getNotificationSwitch(),
            pm.settings().getNotificationSwitchDescription()
        ]);

        await pm.settings().clickOnNotificationSwitch();
        
        await expect(pm.settings().getSuccessUpdateNotificationMessage()).toBeVisible();

        // if (isMobile) {
        //     await pm.dashboard().clickOnBurgerMenu();
        
        //     await pm.dashboard().clickOnLogoutButtonForMobile();
        // } 
        // else {
        //     await pm.dashboard().clickOnLogoutNav();
        // }

        // await page.waitForLoadState();
        
        // await page.waitForURL('https://www.staging.invest.penomo.com/');

    });
})