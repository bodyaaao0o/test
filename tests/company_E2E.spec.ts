import { test, expect, Page, BrowserContext } from '@playwright/test'
import { checkVisibility, PageManager } from '../support/PageObject/pageManager'
import { env, cred } from '../support/data';

const { stageCompanyProjects, stageCompanySettings, stageCompanyTransaction, stageCompanyUrl } = env;

const { changed_name, changed_lastName, position } = cred;

test.use({ storageState: 'playwright/.auth/company_login.json' });

test.describe("E2E company flow", () => {
    let pm: PageManager;
    let page: Page;
    let context: BrowserContext;
        
    test("E2E - company check visibility", async ({page}, testInfo) => {
        pm = new PageManager(page);
        await page.goto(stageCompanyUrl);
        const isMobile = testInfo.project.use.isMobile;
        //Dashboard
        await checkVisibility([
            pm.dashboardTo().getHelloNotification(),
            pm.dashboardTo().getHelloNotificationText(),
            pm.dashboardTo().getFinanceYourProject(),
            pm.dashboardTo().getFinanceYourProjectTitle(),
            pm.dashboardTo().getFinanceYourProjectDescription(),
            pm.dashboardTo().getButtonGetStarted(),
            pm.dashboardTo().getTotalFinancingReceived(),
            pm.dashboardTo().getWalletBalance(),
            pm.dashboardTo().getProjectListed(),
            pm.dashboardTo().getProjectInProgress(),
            pm.dashboardTo().getProjects(),
            pm.dashboardTo().getProjectViewAllButton(),
            pm.dashboardTo().getRecentTransactions(),
            pm.dashboardTo().getRecentTransactionsViewAllButton()
        ]);

        if (isMobile) {
            await pm.dashboardTo().clickOnBurgerMenu();

            await checkVisibility([
                pm.dashboardTo().getNavBox(),
                pm.dashboardTo().getDashboardNav(),
                pm.dashboardTo().getProjectsNav(),
                pm.dashboardTo().getTransactionsNav(),
                pm.dashboardTo().getContactSupportNav(),
                pm.dashboardTo().getSettingsNav(),
                pm.dashboardTo().getMobileLogoutNav(),
            ]);
        } else {
            await checkVisibility([
                pm.dashboardTo().getNavBox(),
                pm.dashboardTo().getDashboardNav(),
                pm.dashboardTo().getProjectsNav(),
                pm.dashboardTo().getTransactionsNav(),
                pm.dashboardTo().getContactSupportNav(),
                pm.dashboardTo().getSettingsNav(),
                pm.dashboardTo().getLogoutNav(),
            ]);
        }

        if (isMobile) {
            await pm.dashboardTo().clickOnCloseBurgerMenu();
        };

        await page.waitForTimeout(2000);

        await pm.dashboardTo().getButtonGetStarted().click();

        await expect(pm.dashboardTo().getFillFormBox()).toBeVisible();

        await pm.dashboardTo().getCloseButton().scrollIntoViewIfNeeded();

        await expect(pm.dashboardTo().getCloseButton()).toBeVisible();

        await pm.dashboardTo().getCloseButton().click();

        await pm.dashboardTo().getProjectViewAllButton().click();

        await expect(page).toHaveURL(stageCompanyProjects);

        await page.goBack();

        await pm.dashboardTo().getRecentTransactionsViewAllButton().click();

        await expect(page).toHaveURL(stageCompanyTransaction);

        await page.goBack();

        if (isMobile) {
            await pm.dashboardTo().clickOnBurgerMenu();
        };

        await expect(pm.dashboardTo().getContactSupportNav()).toBeVisible();

        await pm.dashboardTo().getContactSupportNav().click();

        await checkVisibility([
            pm.dashboardTo().getContactSupportTitle(),
            pm.dashboardTo().getQuestionTitle(),
            pm.dashboardTo().getQuestionDescription(),
            pm.dashboardTo().getContactSupportEmail(),
            pm.dashboardTo().getClosecontactSupport()
        ])

        await pm.dashboardTo().getClosecontactSupport().click();

        await expect(pm.dashboardTo().getContactSupportTitle()).not.toBeVisible();

        await pm.dashboardTo().getProjectsNav().click();

        if (isMobile) {
            await pm.dashboardTo().clickOnCloseBurgerMenu();
        }

        //Projects
        if (isMobile) {
            await checkVisibility([
                pm.projectTo().getProjectsBox(),
                pm.projectTo().getProjectsTitle(),
                pm.projectTo().getSearchBar(),
                pm.projectTo().getMobileButtonGetCapital(),
                pm.projectTo().getInputPageNumber(),
                pm.projectTo().getLastPageButton(),
                pm.projectTo().getNextPageButton()
            ]);
            
            await pm.projectTo().getMobileButtonGetCapital().click();
        } else {
            await checkVisibility([
                pm.projectTo().getProjectsBox(),
                pm.projectTo().getProjectsTitle(),
                pm.projectTo().getSearchBar(),
                pm.projectTo().getButtonGetCapital(),
                pm.projectTo().getInputPageNumber(),
                pm.projectTo().getLastPageButton(),
                pm.projectTo().getNextPageButton()
            ]);

            await pm.projectTo().getButtonGetCapital().click();
        }

        

        await expect(pm.dashboardTo().getFillFormBox()).toBeVisible();

        await expect(pm.dashboardTo().getCloseButton()).toBeVisible();

        await pm.dashboardTo().getCloseButton().click();

        //Transactions
        if (isMobile) {
            await pm.dashboardTo().clickOnBurgerMenu();
        };

        await pm.dashboardTo().getTransactionsNav().click();

        if (isMobile) {
            await pm.dashboardTo().clickOnCloseBurgerMenu();
        };

        await checkVisibility([
            pm.transaction().getTransactionsPageTitle(),
            pm.transaction().getSearchTransactionsInput(),
            pm.transaction().getNewestOldestTransactions(),
            pm.transaction().getDropDownButton(),
        ]);

        await pm.transaction().getDropDownButton().click();

        await expect(pm.transaction().getSelectOptions()).toBeVisible();

        await pm.transaction().getDropDownButton().click();

        await expect(pm.transaction().getSelectOptions()).not.toBeVisible();

        //Settings

        if (isMobile) {
            await pm.dashboardTo().clickOnBurgerMenu();
        };

        await pm.dashboardTo().getSettingsNav().click();

        if (isMobile) {
            await pm.dashboardTo().clickOnCloseBurgerMenu();
        }

        await expect(page).toHaveURL(stageCompanySettings);

        await checkVisibility([
            pm.settingsTo().getSettingsPageTitle(),
            pm.settingsTo().getUserSettingsTitle(),
            pm.settingsTo().getCompanySettingsTitle(),
            pm.settingsTo().getUserDiteils(),
            pm.settingsTo().getCompanyDiteils(),
            pm.settingsTo().getUserBasicDetailsTitle(),
            pm.settingsTo().getBasicDetailsDescription(),
            pm.settingsTo().getUserFirstName(),
            pm.settingsTo().getUserLastName(),
            pm.settingsTo().getUserFirstNameInput(),
            pm.settingsTo().getUserLastNameInput(),
            pm.settingsTo().getUserPosition(),
            pm.settingsTo().getUserPositionInput(),
            pm.settingsTo().getUserEmail(),
            pm.settingsTo().getUserEmailInput(),
            pm.settingsTo().getUserKYCStatus(),
            pm.settingsTo().getEditButton(),
            pm.settingsTo().getEmailNotivication(),
            pm.settingsTo().getEmailNotivicationDescription(),
            pm.settingsTo().getSwitchButton(),
            pm.settingsTo().getSwitchButtonDescription(),
            pm.settingsTo().getDeleteAccountButton(),
        ]);

        await pm.settingsTo().getEditButton().click();

        await expect(pm.settingsTo().getEditButton()).not.toBeVisible();

        await expect(pm.settingsTo().getCancelButton()).toBeVisible();

        await expect(pm.settingsTo().getSaveButton()).toBeVisible();

        await pm.settingsTo().getCancelButton().click();

        await expect(pm.settingsTo().getCancelButton()).not.toBeVisible();

        await expect(pm.settingsTo().getSaveButton()).not.toBeVisible();

        await pm.settingsTo().getEditButton().click();

        await pm.settingsTo().getUserFirstNameInput().fill(changed_name);

        await pm.settingsTo().getUserLastNameInput().fill(changed_lastName);

        await pm.settingsTo().getSaveButton().click();

        await expect(pm.settingsTo().getErrorMessage()).toBeVisible();

        await page.waitForLoadState();

        await pm.settingsTo().getUserPositionInput().fill(position);

        await pm.settingsTo().getSaveButton().click();

        await expect(pm.settingsTo().getUserUpdateMessage()).toBeVisible();

        await pm.settingsTo().getSwitchButton().click();

        await expect(pm.settingsTo().getEmailNotificarionMessage()).toBeVisible();

        await page.waitForLoadState();

        await pm.settingsTo().getSwitchButton().click();

        await expect(pm.settingsTo().getEmailNotificarionMessage()).toBeVisible();

        await pm.settingsTo().getDeleteAccountButton().click();

        await checkVisibility([
            pm.settingsTo().getSureToDeleteAccount(),
            pm.settingsTo().getSureToDeleteAccountTitle(),
            pm.settingsTo().getSureToDeleteAccountDescription(),
            pm.settingsTo().getSureToDeleteAccountCancelButton(),
            pm.settingsTo().getSureToDeleteAccountDeleteButton(),
        ]);

        await pm.settingsTo().getSureToDeleteAccountCancelButton().click();

        await expect(pm.settingsTo().getSureToDeleteAccount()).not.toBeVisible();

        await pm.settingsTo().getCompanyDiteils().click();

        await checkVisibility([
            pm.settingsTo().getCompanyDetailsTitle(),
            pm.settingsTo().getCompanyTicker(),
            pm.settingsTo().getInputCompanyTicker(),
            pm.settingsTo().getCompanyWalletAddress(),
            pm.settingsTo().getInputCompanyWalletAddress(),
        ]);
        await pm.settingsTo().getEditButton().click();

        await expect(pm.settingsTo().getCancelButton()).toBeVisible();

        await expect(pm.settingsTo().getSaveButton()).toBeVisible();

        await pm.settingsTo().getCancelButton().click();

        await expect(pm.settingsTo().getCancelButton()).not.toBeVisible();

        await expect(pm.settingsTo().getSaveButton()).not.toBeVisible();

        await pm.settingsTo().getEditButton().click();

        await pm.settingsTo().getSaveButton().click();

        await pm.settingsTo().getCancelButton().click();

        await pm.settingsTo().getEditButton().click();

        await page.waitForLoadState();

        await pm.settingsTo().getInputCompanyTicker().click();

        await pm.settingsTo().getInputCompanyTicker().fill("Test");

        await expect(page.locator("input[value=Test]")).toBeVisible();

        const screenshot = await page.screenshot();

        testInfo.attach('screenshot', {
            body: screenshot,
            contentType: 'image/png',
        });

        await page.waitForLoadState();

        await pm.settingsTo().getSaveButton().click();

        await expect(pm.settingsTo().getSuccessCompanyUpdateMessage()).toBeVisible({ timeout: 10000 });
    })
})