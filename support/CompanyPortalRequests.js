export class CompanyRequests {
    constructor(requestContext, authToken, email) {
        this.request = requestContext;
        this.authToken = authToken;
        this.email = email;
    }


    async patchUserData() {
        return await this.request.patch('https://staging.api.penomo.com/api/users/me', {
            data: {
                companyName: "Test Company",
                email: this.email,
                firstName: "test",
                lastName: "test"
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
            companyName: "Test Company"
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
            userData.companyName === ExpectUserData.companyName;

        if (isMatch) {
            console.log("User data matches expected:", isMatch);
        } else {
            console.warn("User data does not match expected");
        }
    };

    async patchCompanyData() {
        return await this.request.patch('https://staging.api.penomo.com/api/companies/me', {
            data: {
                companyName: "Test Company",
                companyTicker: "test",
            },
            headers: {
                Authorization: `Bearer ${this.authToken}`,
                'Content-Type': 'application/json'
            }
        });
    }

    async checkCompanyData() {
        const ExpectUserData = {
            companyName: "Test Company",
            companyTicker: "test"
        }

        const response = await this.request.get('https://staging.api.penomo.com/api/companies/me', {
            headers: {
                Authorization: `Bearer ${this.authToken}`,
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        console.log(json);
        const userData = json.data;

        const isMatch =
            userData.companyName === ExpectUserData.companyName &&
            userData.companyTicker === ExpectUserData.companyTicker;

        if (isMatch) {
            console.log("Company data matches expected:", isMatch);
        } else {
            console.warn("Company data does not match expected");
        }
    };

    async checkProject(expectedCompanyId) {
        const response = await this.request.get('https://staging.api.penomo.com/api/projects/me/company', {
            headers: {
                Authorization: `Bearer ${this.authToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status() !== 200) throw new Error(`Unexpected status: ${response.status()}`);

        const json = await response.json();
        const projects = json.data;

        if (!projects || projects.length === 0) throw new Error('No projects found');

        if (!projects.every(p => p.companyId === expectedCompanyId)) {
            throw new Error('Not all projects belong to expected company');
        }

        console.log(`Found ${projects.length} project(s) for companyId ${expectedCompanyId}`);
    }

}