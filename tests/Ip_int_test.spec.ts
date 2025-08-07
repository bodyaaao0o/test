import { SetupProfileRequest } from '../support/SetupProfileRequest';
import { test, expect, request as playwrightRequest, Page, BrowserContext, chromium } from '@playwright/test';
import { investorLogin } from '../support/login_as_investor';
import { PageManager } from '../support/PageObject/pageManager';
import { adminLogin } from '../support/login_as_admin';
import { PresaleRequest } from '../support/Presale_API';
import { AdminRequests } from '../support/AdminRequests';
import { cred } from '../support/data';
import { Wallet } from 'ethers';

const wallet = Wallet.createRandom();

const { total_penomo_tokens } = cred


test.describe("Test", () => {

    test('Update user profile and investor type, done presale flow via API', async () => {
        
        const browser1 = await chromium.launch({ headless: true });
        
        const investorContext = await browser1.newContext();
        
        const investorPage = await investorContext.newPage();
        
        const pm = new PageManager(investorPage);
        
        const requestContext = await playwrightRequest.newContext();
        
        const { page, email } = await investorLogin(investorPage, investorContext, pm);
        
        const authToken = await investorPage.evaluate(() => localStorage.getItem('authToken'));
        
        if (!authToken) throw new Error('Auth token not found in localStorage');

        const browser2 = await chromium.launch({ headless: true });
        
        const adminContext = await browser2.newContext();
        
        const adminPage = await adminContext.newPage();
        
        const pm2 = new PageManager(adminPage);

        await adminLogin(adminPage, adminContext, pm2)

        const adminAuthToken = await adminPage.evaluate(() => localStorage.getItem('authToken'));

        if (!adminAuthToken) throw new Error('Admin auth token not found');

        const setup = new SetupProfileRequest(requestContext, authToken, email);

        const userRes = await setup.patchUserData();

        expect(userRes.status()).toBe(200);

        const investorRes = await setup.patchInvestorData();

        expect(investorRes.status()).toBe(200);

        await setup.checkUserData();

        await setup.checkUserType();

        const admin = new AdminRequests(requestContext, adminAuthToken, email, total_penomo_tokens);

        await admin.GetPresaleWalletId();

        const makeUserVerify = await admin.VerifiUser();

        expect(makeUserVerify.status()).toBe(200);

        const investorPresale = new PresaleRequest(requestContext, authToken, email, wallet, total_penomo_tokens);

        await investorPresale.sendTokenToPresale();

        const updateWallet = await admin.UpdateWallet();

        expect(updateWallet.status()).toBe(200);

        const sendTokens = await admin.sendTokenToInvestor()

        expect(sendTokens.status()).toBe(200);

        const sendXP = await admin.sendXPToInvestor();

        expect(sendXP.status()).toBe(200);

        await investorPresale.checkUserData();

        const deleteUser = await setup.deleteUser(authToken);

        expect(deleteUser.status()).toBe(200);

    });
})
