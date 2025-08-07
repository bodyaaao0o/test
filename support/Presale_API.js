import { randomInt } from "crypto";

export class PresaleRequest {
    constructor(requestContext, authToken, email, penomoWalletAddress, totalPrnmoTokens) {
        this.request = requestContext;
        this.authToken = authToken;
        this.email = email;
        this.penomoWalletAddress = penomoWalletAddress;
        this.totalPrnmoTokens = totalPrnmoTokens;
        this.PNMOTokens = randomInt(1000, 2500)
    };

    async sendTokenToPresale() {
        await this.request.post('https://staging.api.penomo.com/api/users/whitelist/wallet/me', {
            data: {
                penomoWalletAddress: this.penomoWalletAddress,
                presaleAmountInterestedToInvest: this.PNMOTokens
            },
            headers: {
                Authorization: `Bearer ${this.authToken}`,
                'Content-Type': 'application/json'
            }
        })
    }

    async checkUserData() {
        const ExpectUserData = {
            totalPrnmoTokens: this.totalPrnmoTokens
        }

        const response = await this.request.get('https://staging.api.penomo.com/api/users/me', {
            headers: {
                Authorization: `Bearer ${this.authToken}`,
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        console.log(json);
        const userData = json.data;

        const isMatch =
            userData.totalPrnmoTokens === ExpectUserData.totalPrnmoTokens

        if (isMatch) {
            console.log("User data matches expected:", isMatch);
        } else {
            console.warn("User data does not match expected");
        }
    };

    // async NotificationCheck() {
    //     return await this.request.patch('https://staging.api.penomo.com/api/users/me', {
    //         data: {
    //             emailNotifications: false
    //         }
    //     })
    // }
}