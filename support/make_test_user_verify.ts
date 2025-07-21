import { Page } from '@playwright/test'
import { PageManager } from './PageObject/pageManager';

export async function userVerification(page: Page, pm: PageManager) {
    await pm.adminTo().getUsersNavigation().click();
    await page.waitForTimeout(8000);
    await pm.adminTo().getLastUser().click();
    await pm.adminTo().getUserInformatiomEditButton().click();
    await pm.adminTo().getKYCStatus().selectOption({ value: 'Verified' });
    await pm.adminTo().getSaveButton().click();
    await pm.adminTo().getCloseButton().click();
}
