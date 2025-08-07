import { cred, env } from './data';
import { Page, BrowserContext } from 'playwright';
import { PageManager } from './PageObject/pageManager';
import Mailosaur from 'mailosaur';
import dotenv from 'dotenv';
dotenv.config();



const { stageRaiseUrl } = env;
//const { valid_username, valid_surename, company_name } = cred

export async function companyLogin(page: Page, context: BrowserContext, pm: PageManager): Promise<{ page: Page, email: string }> {
    await page.goto(stageRaiseUrl);
    const mailosaur = new Mailosaur(process.env.MAILOSAUR_API_KEY!);
    const serverId = process.env.MAILOSAUR_SERVER_ID!;

    const shortId = Math.random().toString(36).slice(2, 9);
    const testEmail = `${shortId}@${serverId}.mailosaur.net`;

    await pm.loginTo().getInputAdminEmail().fill(testEmail);
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
    return { page, email: testEmail }
}

export async function waitForPopup(context: BrowserContext): Promise<Page> {
    const [popup] = await Promise.all([context.waitForEvent('page')]);
    await popup.waitForLoadState();
    return popup;
}
