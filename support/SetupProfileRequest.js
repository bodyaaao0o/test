export class SetupProfileRequest {
    constructor(requestContext, authToken, email) {
        this.request = requestContext;
        this.authToken = authToken;
        this.email = email;
    }


    async patchUserData() {
        await new Promise((res) => setTimeout(res, 2000));
        return await this.request.patch('https://staging.api.penomo.com/api/users/me', {
            data: {
                countryOfResidence: "AL",
                //email: this.email,
                firstName: "test",
                lastName: "test"
            },
            headers: {
                Authorization: `Bearer ${this.authToken}`,
                'Content-Type': 'application/json'
            }
        });
    }

    async patchInvestorData() {
        return await this.request.patch('https://staging.api.penomo.com/api/investors/me', {
            data: {
                investorType: "Retail"
            },
            headers: {
                Authorization: `Bearer ${this.authToken}`,
                'Content-Type': 'application/json'
            }
        });
    }

    async checkUserData() {
        const ExpectUserData = {
            firstName: "test",
            lastName: "test",
            email: this.email,
            countryOfResidence: "AL"
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
            userData.firstName === ExpectUserData.firstName &&
            userData.lastName === ExpectUserData.lastName &&
            userData.email === ExpectUserData.email &&
            userData.countryOfResidence === ExpectUserData.countryOfResidence;

        if (isMatch) {
            console.log("User data matches expected:", isMatch);
        } else {
            console.warn("User data does not match expected");
        }
    };

    async checkUserType() {
        const ExpectUserType = {
            investorType: "Retail"
        }

        const response = await this.request.get('https://staging.api.penomo.com/api/investors/me', {
            headers: {
                Authorization: `Bearer ${this.authToken}`,
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        console.log(json);
        const userType = json.data;

        const isMatch =
            userType.investorType === ExpectUserType.investorType

        if (isMatch) {
            console.log("type:", isMatch);
        } else {
            console.warn("type isnt found");
        }
    };

    async logOutFromIP(token) {
        return await this.request.post('https://staging.api.penomo.com/api/users/logout', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    };

    async deleteUser(token) {
        return await this.request.delete('https://staging.api.penomo.com/api/users/me', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    };
}
