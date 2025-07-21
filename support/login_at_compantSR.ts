import { chromium } from '@playwright/test';
import { PageManager } from './PageObject/pageManager';

export async function loginStorage() {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    const pm = new PageManager(page);

    await page.goto("http://localhost:3002");
    await pm.loginTo().getInputEmail().fill("testuout778@yopmail.com");
    await pm.loginTo().getLogInButton().click();

    console.log('➡️ Введи код вручну у браузері. Після входу — зачекай 2-3 секунди...');

    await page.waitForURL('**/dashboard', { timeout: 180_000 });

    await context.storageState({ path: 'storageState.json' });
    console.log('✅ Сесію збережено у storageState.json');

    await browser.close();
}

loginStorage();