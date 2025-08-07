import { Locator, Page, test } from '@playwright/test';

export class DashboardPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    getWhiteList(): Locator {
        return this.page.locator('.flex.grow.items-center');
    };

    getWhiteListButton(): Locator {
        return this.page.locator('button svg').nth(1);
    };

    getWhiteListLogo(): Locator {
        return this.page.locator('.aspect-square.bg-monochrome-60');
    };

    getWhiteListDescription(): Locator {
        return this.page.locator('div h3', { hasText: "Whitelist your wallet to join the PNMO presale" });
    };

    getDashboardNav(): Locator {
        return this.page.locator('span', { hasText: "Dashboard" });
    };

    getPNMOPresaleRound2Nav(): Locator {
        return this.page.locator('span', {hasText: "PNMO Presale (Round 2)"});
    };

    getInvestNav(): Locator {
        return this.page.locator('span', {hasText: "Invest"});
    };

    getCampaignsNav(): Locator {
        return this.page.locator('span', {hasText: "Campaigns"});
    };

    getReferralLink(): Locator {
        return this.page.locator('span', {hasText: "Referral Link"});
    };

    getQuests(): Locator {
        return this.page.locator('span', {hasText: "Quests"}).first();
    };

    getLeaderboard(): Locator {
        return this.page.locator('span', {hasText: "Leaderboard"}).first();
    };

    getPortfolioNav(): Locator {
        return this.page.locator('span', {hasText: "Portfolio"});
    };

    getTransactionsNav(): Locator {
        return this.page.locator('span', {hasText: "Transactions"});
    };

    getStakingNav(): Locator {
        return this.page.locator('span', {hasText: "Staking"});
    };

    getGovernanceNav(): Locator {
        return this.page.locator('span', {hasText: "Governance"});
    };

    getSettingsNav(): Locator {
        return this.page.locator('span', {hasText: "Settings"});
    };

    getLogoutNav(): Locator {
        return this.page.locator('.flex.justify-items-center', {hasText: "Logout"}).nth(1);
    };

    getPNMORewardsBox(): Locator {
        return this.page.locator('.bg-monochrome-100.p-4.flex.flex-col.justify-between');
    };

    getPNMORewardsInfo(): Locator {
        return this.page.locator('.flex.flex-row.gap-4.items-start').nth(1);
    };

    getPNMORewardsLogo(): Locator {
        return this.page.locator('img[alt="Penomo Rewards"]');
    };

    getPNMORewardsTitle(): Locator {
        return this.page.locator('div p', { hasText: 'PNMO Rewards' });
    };

    getCountPNMOTokens(): Locator {
        return this.page.locator('div.flex.justify-start', {hasText: "PNMO"});
    }

    getCountXP(): Locator {
        return this.page.locator('div.flex.justify-start', { hasText: 'XP' });
    }
    getEarnButton(): Locator {
        return this.page.locator('button', { hasText: "Earn" });
    };

    getClaimButton(): Locator {
        return this.page.locator('button', { hasText: "Claim" });
    };

    getRecentTransactionsBox(): Locator {
        return this.page.locator('.bg-monochrome-100.p-4.flex.flex-col.rounded-lg').nth(1);
    };

    getViewAllTransactionsButton(): Locator {
        return this.page.locator('button', { hasText: "View All" }).nth(1);
    };

    getGridInfoTransactions(): Locator {
        return this.page.locator('div.grid.grid-cols-4.border-b').nth(1);
    };

    getInfoTransactionsBoard(): Locator {
        return this.page.locator('div', { hasText: "No Recent Transactions." });
    };

    getTransactions(): Locator {
        return this.page.locator('.grid.grid-cols-4.py-4.cursor-pointer.border-b')
    };

    getAmountTokensInTransactions(): Locator {
        return this.page.locator('.text-start.text-green-500').first();
    };

    getNotification(): Locator {
        return this.page.locator('.notification-card.flex.border.border-monochrome-60');
    };

    getWalletBalanceBox(): Locator {
        return this.page.locator('.bg-monochrome-100.p-4.flex.gap-4.flex-column.rounded-lg');
    };

    getWalletIcon(): Locator {
        return this.page.locator('img[alt="Wallet Icon"]');
    };

    getWalletBalanceTitle(): Locator {
        return this.page.locator('p', {hasText: "Wallet Balance"});
    };

    getUSDCCountBox(): Locator {
        return this.page.locator(".flex.flex-row.gap-2.font-medium");
    };

    getTopUpButton(): Locator {
        return this.page.locator('button', {hasText: "Top Up"});
    };

    getWithdrawButton(): Locator {
        return this.page.locator('button', {hasText: "Withdraw"});
    };

    getComingSoonText(): Locator {
        return this.page.locator('p', {hasText: "Coming Soon."})
    };

}