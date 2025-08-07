import { test, expect } from '@playwright/test';
import { PageManager } from '../support/PageObject/pageManager';
import { env, cred } from '../support/data';
import { LoginImages } from '../support/PageObject/loginPage.PO';
import { checkVisibility } from '../support/PageObject/pageManager';
import Mailosaur from 'mailosaur';
import dotenv from 'dotenv';
dotenv.config();


const { stageCompanyUrl, stageCompanyDashboard } = env;
const { valid_username,
    valid_surename,
    invalid_userName,
    invalid_sureName,
    company_name } = cred;


test.describe("Login as company", () => {

    let pm: PageManager;
    let images: LoginImages;

    test.beforeEach(async ( {context, page} ) => {
        await context.clearCookies();
        await page.goto(stageCompanyUrl);
        await page.evaluate(() => {
            localStorage.clear();
            sessionStorage.clear();
        });

        pm = new PageManager(page);
        images = new LoginImages(page);
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    })

    test('Register on company page', async ({ context, page }, testInfo) => {
        const isMobile = testInfo.project.use.isMobile;
        await page.goto(stageCompanyUrl);
        await expect(page).toHaveURL(stageCompanyUrl);
        if (!isMobile) {
            await images.checkAllImagesAreVisible();
        }
        await checkVisibility([
            pm.loginTo().getLogoImage(),
            pm.loginTo().getInputEmail(),
            pm.loginTo().getLogInButton(),
            pm.loginTo().getHelpText(),
        ]);
        await expect(pm.loginTo().getFooter()).toHaveText('© 2025 Penomo B.V.');


        const mailosaur = new Mailosaur(process.env.MAILOSAUR_API_KEY!);
        const serverId = process.env.MAILOSAUR_SERVER_ID!;

        const shortId = Math.random().toString(36).slice(2, 9);
        const testEmail = `${shortId}@${serverId}.mailosaur.net`;

        await pm.loginTo().getInputEmail().fill(testEmail);
        const [popup] = await Promise.all([
            context.waitForEvent('page'),
            pm.loginTo().getLogInButton().click(),
        ])
        await popup.waitForLoadState();

        const searchCriteria = {
            sentTo: testEmail
        };

        const email = await mailosaur.messages.get(serverId, searchCriteria, { timeout: 20000 });
        let code: string | null = null;

        if (email.subject) {
            const subjectMatch = email.subject.match(/\b(\d{6})\b/);
            if (subjectMatch && subjectMatch[1]) {
                code = subjectMatch[1];
                console.log(`The code: ${code}`);
            }
        }

        if (!code) {
            throw new Error('Verification code not found');
        }


        const codeInputes = popup.locator('form.flex >> input[autocomplete="one-time-code"]');

        for (let i = 0; i < code.length; i++) {
            await codeInputes.nth(i).fill(code[i]);
            await popup.waitForTimeout(50);
        }

        await popup.waitForEvent('close');
        await page.waitForURL('**/setupProfile', { timeout: 90000 })

        await checkVisibility([
            pm.profile().getSetupProfileBox(),
            pm.profile().getFirstNameTitle(),
            pm.profile().getFirstNameInput(),
            pm.profile().getLastNameTitle(),
            pm.profile().getLastNameInput(),
            pm.profile().getEmailTitle(),
            pm.profile().getEmailInput(),
            pm.profile().getCompanyNameTitle(),
            pm.profile().getCompanyNameInput(),
            pm.profile().getSubmitButton()
        ])
        const actualEmail = await pm.profile().getEmailInput().inputValue();
        expect(actualEmail).toEqual(testEmail);
        await pm.profile().getFirstNameInput().fill(invalid_userName);
        await pm.profile().getLastNameInput().fill(invalid_sureName);
        await pm.profile().getCompanyNameInput().fill(company_name);
        await pm.profile().getSubmitButton().click();
        await checkVisibility([
            pm.profile().getErrorFirstNameMessage(),
            pm.profile().getErrorLastNameMessage()
        ]);
        await pm.profile().getFirstNameInput().fill(valid_username);
        await pm.profile().getLastNameInput().fill(valid_surename);
        await pm.profile().getSubmitButton().click();
        await page.waitForLoadState();
        await expect(page).toHaveURL(stageCompanyDashboard);
    });

    test("Log in on company page", async ({ context, page }, testInfo) => {
        const isMobile = testInfo.project.use.isMobile;
        await page.goto(stageCompanyUrl);
        await expect(page).toHaveURL(stageCompanyUrl);
        if (!isMobile) {
            await images.checkAllImagesAreVisible();
        }
        await checkVisibility([
            pm.loginTo().getLogoImage(),
            pm.loginTo().getInputEmail(),
            pm.loginTo().getLogInButton(),
            pm.loginTo().getHelpText(),
        ]);
        await expect(pm.loginTo().getFooter()).toHaveText('© 2025 Penomo B.V.');
        const mailosaur = new Mailosaur(process.env.MAILOSAUR_API_KEY!);
        const serverId = process.env.MAILOSAUR_SERVER_ID!;
        const testEmail = process.env.LOGIN_COMPANY_EMAIL!;
        await pm.loginTo().getInputEmail().fill(testEmail);
        const [popup] = await Promise.all([
            context.waitForEvent('page'),
            pm.loginTo().getLogInButton().click()
        ]);
        await popup.waitForLoadState();

        console.log('Waiting for verification email to arrive...');
        await page.waitForTimeout(5000);

        const now = new Date();

        const receivedAfter = new Date(now.getTime() - 60000);

        const searchOptions = {
            receivedAfter: receivedAfter.toISOString()
        };

        let email;
        let attempts = 0;
        const maxAttempts = 3;

        while (attempts < maxAttempts) {
            try {
                email = await mailosaur.messages.get(
                    serverId,
                    {
                        sentTo: testEmail,
                        ...searchOptions
                    },
                    { timeout: 15000 }
                );
                break;
            } catch (error) {
                attempts++;
                console.log(`Attempt ${attempts}/${maxAttempts} failed. Waiting and retrying.`);

                if (attempts >= maxAttempts) {
                    throw new Error(`Failed to get verification email after ${maxAttempts} attempts: ${Error}`);
                }
                await page.waitForTimeout(3000);
            }
        }

        let code: string | null = null;

        if (!email) {
            throw new Error("Email not found");
        };

        if (email.subject) {
            const subjectMatch = email.subject.match(/\b(\d{6})\b/);
            if (subjectMatch && subjectMatch[1]) {
                code = subjectMatch[1];
                console.log(`The code: ${code}`);
            }
        }

        if (!code) {
            throw new Error('Verification code not found');
        }

        const codeInputs = popup.locator('form.flex >> input[autocomplete="one-time-code"]');

        for (let i = 0; i < code.length; i++) {
            await codeInputs.nth(i).fill(code[i]);
            await popup.waitForTimeout(50);
        }

        await popup.waitForEvent('close');
        await page.waitForURL('**/dashboard');
        await page.waitForTimeout(15000);
        await context.storageState({ path: 'playwright/.auth/company_login.json' })
    });
})