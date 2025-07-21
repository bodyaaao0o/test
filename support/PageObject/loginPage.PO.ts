import { Page, Locator, expect } from '@playwright/test';
import { LoadHookContext } from 'module';

export class LoginPage {

    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    getInputEmail(): Locator {
        return this.page.locator('[placeholder="Enter your email"]');
    };

    getLogInButton(): Locator {
        return this.page.locator('button', { hasText: "Log in" });
    };

    getImagesDiv(): Locator {
        return this.page.locator('div div .w-2\\/4 img');
    };

    getLogoImage(): Locator {
        return this.page.locator('img[alt="penomo logo"]');
    };

    getSiteDescription(): Locator {
        return this.page.locator('div p', { hasText: "Own physical " });
    };

    getHelpText(): Locator {
        return this.page.getByText("Haven't registered? Log in to create an account");
    };

    getFooter(): Locator {
        return this.page.locator('footer');
    };

}

export class ProfileInfo {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    getSetupProfileBox(): Locator {
        return this.page.locator('.bg-white.rounded-lg');
    };

    getFirstNameTitle(): Locator{
        return this.page.locator('label[for="firstName"]');
    };

    getFirstNameInput(): Locator {
        return this.page.locator('input[name=firstName]');
    };

    getLastNameTitle(): Locator {
        return this.page.locator('label[for="lastName"]');
    };

    getLastNameInput(): Locator {
        return this.page.locator('input[name=lastName]');
    };

    getEmailTitle(): Locator {
        return this.page.locator('label[for="email"]');
    };

    getEmailInput(): Locator {
        return this.page.locator('input[name="email"]');
    };

    getCompanyNameTitle(): Locator {
        return this.page.locator('label[for="companyName"]');
    };

    getCompanyNameInput(): Locator {
        return this.page.locator('input[name="companyName"]');
    };

    getSubmitButton(): Locator {
        return this.page.locator('button', {hasText: "Submit"});
    };

    getErrorFirstNameMessage(): Locator {
        return this.page.locator('p', {hasText: "First name must only contain letters and spaces"});
    };

    getErrorLastNameMessage(): Locator {
        return this.page.locator('p', {hasText: "Last name must only contain letters and spaces"});
    };



}

export class LoginImages {
    constructor(private page: Page) { }

    async checkAllImagesAreVisible(): Promise<void> {
        const images = this.page.locator('div.w-2\\/4 img');
        const count = await images.count();

        for (let i = 0; i < count; i++) {
            await expect(images.nth(i)).toBeVisible();
        }
    }
}
