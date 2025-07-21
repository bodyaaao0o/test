import { Page, Locator } from '@playwright/test'

export class Settings {
    private readonly page: Page

    constructor(page: Page) {
        this.page = page;
    };

    getSettingsPageTitle(): Locator {
        return this.page.locator('h1', { hasText: "Settings" });
    };

    getUserSettingsTitle(): Locator {
        return this.page.locator('div span', { hasText: "User Settings" });
    };

    getCompanySettingsTitle(): Locator {
        return this.page.locator('div span', { hasText: "Company Settings" });
    };

    getUserDiteils(): Locator {
        return this.page.locator('div.flex.justify-between.items-center', { hasText: 'User Basic Details' });
    };

    getCompanyDiteils(): Locator {
        return this.page.locator('div.flex.justify-between.items-center', { hasText: "Basic Company Details" });
    };

    //User
    // getUserBasicDetails(): Locator {
    //     return this.page.locator('.flex.flex-col.sm:flex-row.bg-white.p-4.rounded');
    // };

    getUserBasicDetailsTitle(): Locator {
        return this.page.locator('h6', { hasText: 'Basic Details' });
    };

    getBasicDetailsDescription(): Locator {
        return this.page.locator('p', { hasText: "Manage essential account information" });
    };

    getUserFirstName(): Locator {
        return this.page.locator('label', { hasText: 'First Name' });
    };

    getUserLastName(): Locator {
        return this.page.locator('label', { hasText: 'Last Name' });
    };

    getUserFirstNameInput(): Locator {
        return this.page.locator('input[placeholder="Enter your first name here"]');
    };

    getUserLastNameInput(): Locator {
        return this.page.locator('input[placeholder="Enter your last name here"]');
    };

    getUserPosition(): Locator {
        return this.page.locator('label', { hasText: 'Position' });
    };

    getUserPositionInput(): Locator {
        return this.page.locator('input[placeholder="Enter your position here"]');
    };

    getUserEmail(): Locator {
        return this.page.locator('label', { hasText: "Email" });
    };

    getUserEmailInput(): Locator {
        return this.page.locator('input[placeholder="Enter your email here"]');
    };

    getUserKYCStatus(): Locator {
        return this.page.locator('div', { hasText: 'KYC Status' }).nth(6);
    };

    getEditButton(): Locator {
        return this.page.locator('button', { hasText: "Edit" });
    };

    getEmailNotivication(): Locator {
        return this.page.locator('h6', { hasText: "Email Notification" });
    };

    getEmailNotivicationDescription(): Locator {
        return this.page.locator('p', { hasText: "Manage preferences for receiving email notifications" });
    };

    getSwitchButton(): Locator {
        return this.page.locator('.react-switch-handle');
    };

    getSwitchButtonDescription(): Locator {
        return this.page.locator('.flex.items-center.gap-2', { hasText: 'Receive Email Notifications' });
    };

    getEmailNotificarionMessage(): Locator {
        return this.page.locator('.go3958317564', {hasText: "Email notification setting updated successfully!"});
    };

    getDeleteAccountButton(): Locator {
        return this.page.locator('button', { hasText: "Delete Account " });
    };

    getCancelButton(): Locator {
        return this.page.locator('button', { hasText: "Cancel" });
    };

    getSaveButton(): Locator {
        return this.page.locator('button', { hasText: "Save" });
    };

    getUserUpdateMessage(): Locator {
        return this.page.locator('.go3958317564');
    };

    getSureToDeleteAccount(): Locator {
        return this.page.locator('.flex-1.overflow-auto.p-6');
    };

    getSureToDeleteAccountTitle(): Locator {
        return this.page.locator('h3', { hasText: "Delete Account" });
    };

    getSureToDeleteAccountDescription(): Locator {
        return this.page.locator('p', { hasText: "Are you sure you want to delete your account? This action cannot be undone." });
    };

    getSureToDeleteAccountCancelButton(): Locator {
        return this.page.locator('button', { hasText: "Cancel" });
    };

    getSureToDeleteAccountDeleteButton(): Locator {
        return this.page.getByRole('button', { name: 'Delete' });
    };


    //Company

    getCompanyDetailsTitle(): Locator {
        return this.page.locator('h6', { hasText: "Basic Company Details" });
    };

    getCompanyTicker(): Locator {
        return this.page.locator('label', { hasText: "Company Ticker" });
    };

    getInputCompanyTicker(): Locator {
        return this.page.locator('input[placeholder="Enter your company ticker here"]');
    };

    getCompanyWalletAddress(): Locator {
        return this.page.locator('label', { hasText: "Wallet Address" });
    };

    getInputCompanyWalletAddress(): Locator {
        return this.page.locator('input[placeholder="Enter your wallet address here"]');
    };

    getErrorMessage(): Locator {
        return this.page.locator('.go3958317564');
    };

    getCompanyErrorMessage(): Locator {
        return this.page.locator('.go3958317564', {hasText: "Please correct the errors before submitting."});
    };

    getSuccessCompanyUpdateMessage(): Locator {
        return this.page.locator('.go3958317564', {hasText: "Company Details Updated Successfully"});
    };



}