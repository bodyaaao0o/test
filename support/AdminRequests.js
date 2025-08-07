import { randomInt } from "crypto";
import fs from 'fs';
import path from 'path';


export class AdminRequests {
    constructor(requestContext, authToken, email, totalPrnmoTokens) {
        this.request = requestContext;
        this.authToken = authToken;
        this.email = email;
        //this.penomo_tokens = penomo_tokens;
        this.totalPrnmoTokens = totalPrnmoTokens;
        this.userId = null;
        this.walletId = null;
        this.ChallengeStaticId = `CH${randomInt(1, 11)}`
        this.ChallengeId = null;
        this.FlipStaticId = `RW${randomInt(1, 65)}`
        this.FlipId = null;
        this.RandomXpCount = randomInt(500);
        this.assetId = null;
        this.xpPoints = randomInt(0, 2000);
    };

    async GetPresaleWalletId() {
        const response = await this.request.get('https://staging.api.penomo.com/api/admin/users', {
            headers: {
                Authorization: `Bearer ${this.authToken}`,
                'Content-Type': 'application/json',
            }
        });

        const json = await response.json();
        const list = json.data;

        const item = list.find(entry => entry.email === this.email);
        if (!item) {
            throw new Error(`User with email ${this.email} not found`);
        }

        if (!item.walletDetails || item.walletDetails.length === 0) {
            throw new Error(`No walletDetails found for user ${this.email}`);
        }

        this.userId = item._id;
        this.walletId = item.walletDetails[0]._id;

        console.log(`Found userId: ${this.userId}`);
        console.log(`Found walletId: ${this.walletId}`);

        return this.walletId, this.userId;
    }

    async VerifiUser() {
        console.log(`Verifying user with ID: ${this.userId}`);

        const response = await this.request.patch(`https://staging.api.penomo.com/api/users/${this.userId}`, {
            data: {
                kycStatus: "Verified"
            },
            headers: {
                Authorization: `Bearer ${this.authToken}`,
                'Content-Type': 'application/json',
            }
        });

        console.log(`VerifiUser status: ${response.status()}`);
        console.log(`VerifiUser response:`, await response.json());

        return response;
    }


    async UpdateWallet() {
        console.log(`Updating wallet whitelist for user ID: ${this.walletId}`);

        const response = await this.request.patch('https://staging.api.penomo.com/api/admin/wallets/bitbond/statusUpdate', {
            data: {
                isWalletWhitelistedBitbond: true,
                walletIds: [this.walletId]
            },
            headers: {
                Authorization: `Bearer ${this.authToken}`,
                'Content-Type': 'application/json',
            }
        });

        console.log(`UpdateWallet status: ${response.status()}`);
        console.log(`UpdateWallet response:`, await response.json());

        return response;
    }

    async sendTokenToInvestor() {
        console.log(`Sending PRNMO tokens to user ID: ${this.userId}, amount: ${this.totalPrnmoTokens}`);

        const response = await this.request.patch(`https://staging.api.penomo.com/api/users/${this.userId}`, {
            data: {
                prnmoTransactions: [{ allocation: this.totalPrnmoTokens, txHash: "test" }],
            },
            headers: {
                Authorization: `Bearer ${this.authToken}`,
                'Content-Type': 'application/json',
            }
        });

        console.log(`sendTokenToInvestor status: ${response.status()}`);
        console.log(`sendTokenToInvestor response:`, await response.json());

        return response;
    }

    async sendXPToInvestor() {
        console.log(`Sending XP to user ID: ${this.userId}`);

        const response = await this.request.patch(`https://staging.api.penomo.com/api/challenges/quests/updateXP/${this.userId}`, {
            data: {
                reason: "test",
                type: "OTHER",
                xpPoints: this.xpPoints
            },
            headers: {
                Authorization: `Bearer ${this.authToken}`,
                'Content-Type': 'application/json',
            }
        });

        console.log(`sendXPToInvestor status: ${response.status()}`);
        console.log(`sendXPToInvestor response:`, await response.json());

        return response;
    }

    // Quests

    async getQuestDiagram() {
        return await this.request.post('https://staging.api.penomo.com/api/admin/getQuestDiagram', {
            headers: {
                Authorization: `Bearer ${this.authToken}`,
                'Content-Type': 'application/json',
            }
        })
    };

    async getChallengesId() {
        const response = await this.request.get('https://staging.api.penomo.com/api/challenges', {
            headers: {
                Authorization: `Bearer ${this.authToken}`,
                'Content-Type': 'application/json',
            }
        });

        const json = await response.json();
        const list = json.data?.challengeDetails || [];

        const item = list.find(entry => entry.challengeStaticId === this.ChallengeStaticId);
        if (!item) {
            throw new Error(`Challenge with staticId ${this.ChallengeStaticId} not found`);
        }

        this.ChallengeId = item._id;

        console.log(`Found ChallengeStaticId: ${this.ChallengeStaticId}`);
        console.log(`Found ChallengeId: ${this.ChallengeId}`);

        return this.ChallengeId;
    }

    async getFlipcardsId() {
        const response = await this.request.get('https://staging.api.penomo.com/api/flipcards/flipcards', {
            headers: {
                Authorization: `Bearer ${this.authToken}`,
                'Content-Type': 'application/json',
            }
        });

        const json = await response.json();
        const list = Array.isArray(json.data) ? json.data : [];

        const item = list.find(entry => entry.flipCardStaticId === this.FlipStaticId);
        if (!item) {
            throw new Error(`Flipcard with staticId ${this.FlipStaticId} not found`);
        }

        this.FlipId = item._id;

        console.log(`Found FlipStaticId: ${this.FlipStaticId}`);
        console.log(`Found FlipId: ${this.FlipId}`);

        return this.FlipId;
    }

    async LockChallenges() {
        const response = await this.request.patch(`https://staging.api.penomo.com/api/challenges/quests/${this.ChallengeId}`, {
            data: {
                isExpired: true,
                isLocked: true
            },
            headers: {
                Authorization: `Bearer ${this.authToken}`,
                'Content-Type': 'application/json'
            }
        })

        return response;
    };

    async noLockChallenges() {
        const response = await this.request.patch(`https://staging.api.penomo.com/api/challenges/quests/${this.ChallengeId}`, {
            data: {
                isExpired: false,
                isLocked: false
            },
            headers: {
                Authorization: `Bearer ${this.authToken}`,
                'Content-Type': 'application/json'
            }
        })

        return response;
    };

    async changeFlipcards() {
        const response = await this.request.patch(`https://staging.api.penomo.com/api/flipcards/flipcards/${this.FlipId}`, {
            data: {
                description: "Flip Card 1 description 1 autotest",
                flipCardPoints: this.RandomXpCount,
            },
            headers: {
                Authorization: `Bearer ${this.authToken}`,
                'Content-Type': 'application/json'
            }
        });

        return response;
    };

    //Create a project

    async getCompanyId(retries = 5, delayMs = 2000) {
        for (let attempt = 0; attempt < retries; attempt++) {
            const response = await this.request.get('https://staging.api.penomo.com/api/admin/users', {
                headers: {
                    Authorization: `Bearer ${this.authToken}`,
                    'Content-Type': 'application/json'
                }
            });
            const json = await response.json();
            const item = json.data.find(entry => entry.email === this.email);

            if (item) {
                this.companyId = item.companyId;
                return typeof item.companyId === 'string' ? item.companyId : item.companyId._id;
            }

            console.log(`Company ID not found for ${this.email}, retrying in ${delayMs}ms...`);
            await new Promise(res => setTimeout(res, delayMs));
        }
        throw new Error(`User with email ${this.email} not found after ${retries} retries`);
    }

    async getAssetId() {
        const response = await this.request.post('https://staging.api.penomo.com/api/assets/me/new', {
            data: {
                assetType: "SOLAR",
                companyId: this.companyId,
                powerCapacity: "1555"
            },
            headers: {
                Authorization: `Bearer ${this.authToken}`
            }
        })

        const json = await response.json();
        console.log("getAssetId response:", json);
        const assetId = json?.data?._id;

        if (!assetId || typeof assetId !== 'string' || assetId.length !== 24) {
            throw new Error(`Invalid assetId received: ${assetId}`);
        }
        this.assetId = assetId;
        return this.assetId;
    }

    async submitProject(companyId, assetId) {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];

        const filePath = path.resolve("support/assets/test.pdf");
        if (!fs.existsSync(filePath)) {
            throw new Error(`File does not exist at path: ${filePath}`);
        }

        const multipartData = {
            companyId: companyId,
            fundingGoal: "2121",
            name: `testss${randomInt(1, 100)}`,
            websiteLink: "https://staging.admin.penomo.com/project",
            projectDescription: "test",
            commercialOperationDate: formattedDate,
            powerCapacity: `${randomInt(15000)}`,
            revenueStreams: JSON.stringify({
                type: "N/A",
                name: "INITIAL_PROJECTION",
                monthlyRevenue: null,
                yearlyRevenue: `${randomInt(15000)}`
            }),
            assetLocation: "Germany",
            spvLocation: "Germany",
            'dataRoomLink[]': "https://staging.admin.penomo.com/project",
            revenueGeneratingAsset: "SOLAR",
            operational: "yes",
            file: fs.createReadStream(filePath),
            assetId: JSON.stringify([assetId])
        };

        try {
            const response = await this.request.post('https://staging.api.penomo.com/api/projects/me/new', {
                headers: {
                    Authorization: `Bearer ${this.authToken}`
                },
                multipart: multipartData
            });

            const body = await response.json();
            console.log('Status:', response.status());
            console.log('Response:', body);

            if (response.status() !== 200 && response.status() !== 201) {
                throw new Error(`Project creation failed with status ${response.status()}: ${JSON.stringify(body)}`);
            }

            return body;
        } catch (error) {
            console.error('Error in submitProject:', error);
            throw error;
        }
    }

}