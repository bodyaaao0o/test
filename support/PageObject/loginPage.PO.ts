import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {

    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    getInputEmail(): Locator {
        return this.page.locator('[placeholder="Enter your email address"]');
    };

    getInputAdminEmail(): Locator {
        return this.page.locator('[placeholder="Enter your email"]')
    }

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

    getRulesContainer(): Locator {
        return this.page.locator('div:has(h3:text("Privacy Policy"))').first();
    };

    getRulesTitle(): Locator {
        return this.page.locator('h3:has-text("Privacy Policy")');
    };

    getRulesDescription(): Locator {
        return this.page.locator('div.rounded-md.border.border-monochrome-20');
    };

    getReadedCheckbox(): Locator {
        return this.page.locator('div.w-4.h-4.flex.items-center.justify-center');
    };

    getCheckBoxDescription(): Locator {
        return this.page.locator('label.select-none.w-full');
    };

    getContinueButton(): Locator {
        return this.page.locator('button', { hasText: "Continue" });
    };

}

export class ProfileInfo {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    getProfileInfoBox(): Locator {
        return this.page.locator('div.items-center.bg-monochrome-100.w-full');
    };

    getProfileInfoImage(): Locator {
        return this.page.locator('img[alt="profile"]');
    };

    getProfileTitle(): Locator {
        return this.page.locator('h3', { hasText: "Profile Info" });
    };

    getFirstNameInputTitle(): Locator {
        return this.page.locator('label', { hasText: "First Name" });
    };

    getFirstNameInput(): Locator {
        return this.page.locator('input[placeholder="Your first name"]');
    };

    getLastNameInputTitle(): Locator {
        return this.page.locator('label', { hasText: 'Last Name' });
    };

    getLastNameInput(): Locator {
        return this.page.locator('input[placeholder="Your last name"]');
    };

    getEmailnfo(): Locator {
        return this.page.locator('label', { hasText: "Email" });
    };

    getEmailInput(): Locator {
        return this.page.locator('input[placeholder="Your email"]');
    };

    getInvestorType(): Locator {
        return this.page.locator('label', { hasText: "Investor Type" });
    }

    getSelectInvestorType(): Locator {
        return this.page.locator('.css-1wy0on6').nth(0);
    };

    getInvestorTypesAfterSelect(): Locator {
        return this.page.locator('.css-1xshyjz-menu');
    };

    getNationalityTitle(): Locator {
        return this.page.locator('label', { hasText: 'Nationality' });
    };

    getSelectNationality(): Locator {
        return this.page.locator('.css-hlgwow').nth(1);
    };

    getCountryList(): Locator {
        return this.page.locator('.css-1xshyjz-menu');
    };

    getInputCountryName(): Locator {
        return this.page.locator('div.css-1yt0726 input');
    };

    getUkraineFromList(): Locator {
        return this.page.locator('#react-select-3-option-232');
    };

    getReferalCodeTitle(): Locator {
        return this.page.locator('label', { hasText: "Referral Code (Optional)" });
    };

    getInputReferalCode(): Locator {
        return this.page.locator('input[placeholder="Enter Referral Code"]');
    };

    getSubmiteButton(): Locator {
        return this.page.locator('button', { hasText: "Submit" });
    };

    getInvalidReferalCodeMessage(): Locator {
        return this.page.locator('div.go2072408551', { hasText: "Invalid referral code" });
    };

    getIncorectNameMessage(): Locator {
        return this.page.locator('p', { hasText: "First name must only contain letters and spaces" });
    };

    getIncorectLastNameMessage(): Locator {
        return this.page.locator('p', { hasText: "Last name must only contain letters and spaces" });
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

export const checkVisibility = async (elements: any[]) => {
    for (const element of elements) {
        await expect(element).toBeVisible();
    }
}