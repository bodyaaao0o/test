import { env } from '../support/data'
import { Page, BrowserContext, chromium } from 'playwright';
import { PageManager } from './PageObject/pageManager';
import Mailosaur from 'mailosaur';
import dotenv from 'dotenv';
dotenv.config();


const { stageAdminUrl } = env;

export async function adminLogin(page: Page, context: BrowserContext, pm: PageManager): Promise<{ page: Page, email: string }> {
    await page.goto(stageAdminUrl);
    const mailosaur = new Mailosaur(process.env.MAILOSAUR_API_KEY!);
    const serverId = process.env.MAILOSAUR_SERVER_ID!;
    const testEmail = process.env.LOGIN_ADMIN_EMAIL!;
    await pm.loginTo().getInputAdminEmail().fill(testEmail);
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
    await page.waitForTimeout(10000);
//     const web3Token = await page.evaluate(() => {
//         return localStorage.getItem('web3AuthToken');
//     });

//     console.log("🔥 Web3Auth idToken:", web3Token);
    return { page, email: testEmail }
//
}

async function waitForPopup(context: BrowserContext): Promise<Page> {
    const [popup] = await Promise.all([context.waitForEvent('page')]);
    await popup.waitForLoadState();
    return popup;
}

// (async () => {
//     const browser = await chromium.launch({ headless: false });
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     const pm = new PageManager(page);

//     await adminLogin(page, context, pm);

//     await browser.close();
// })();