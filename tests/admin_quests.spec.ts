import { test, chromium, request as playwrightRequest } from '@playwright/test';
import { PageManager } from '../support/PageObject/pageManager';
import { adminLogin } from '../support/login_as_admin';
import { AdminRequests } from '../support/AdminRequests';


test.describe("Quest Methods Tests", () => {
    
    test("All Quest Methods Test", async () => {
        
        const browser2 = await chromium.launch({ headless: true });
        
        const adminContext = await browser2.newContext();
        
        const adminPage = await adminContext.newPage();
        
        const requestContext = await playwrightRequest.newContext();
        
        const pm2 = new PageManager(adminPage);

        const {page, email} = await adminLogin(adminPage, adminContext, pm2)
        
        const adminAuthToken = await adminPage.evaluate(() => localStorage.getItem('authToken'));

        const admin = new AdminRequests(requestContext, adminAuthToken, email);

        try {    
            try {
                
                // Test Challenges
                const challengeId = await admin.getChallengesId();
                console.log('Challenge ID found:', challengeId);
                console.log('\n3. Testing LockChallenges...');
                
                const lockResponse = await admin.LockChallenges();
                console.log('Lock Challenge Status:', lockResponse.status());
                console.log('\n4. Testing noLockChallenges...');

                const unlockResponse = await admin.noLockChallenges();
                console.log('Unlock Challenge Status:', unlockResponse.status());
                
            } catch (error) {
                console.log('Challenge not found:', error.message);
            }
            
            //Test Flipcards
            console.log('\n5. Testing getFlipcardsId...');
            try {
                const flipId = await admin.getFlipcardsId();
                console.log('Flipcard ID found:', flipId);
                
                console.log('\n6. Testing changeFlipcards...');
                
                const changeResponse = await admin.changeFlipcards();
                console.log('Change Flipcard Status:', changeResponse.status());
                
                const changeBody = await changeResponse.json();
                console.log('Change Flipcard Response:', changeBody);
                
            } catch (error) {
                console.log('Flipcard not found:', error.message);
            }
            
            console.log('\n All quest methods test completed');
            
        } catch (error) {
            console.log('Quest methods test failed:', error.message);
            throw error;
        } finally {
            await browser2.close();
            await requestContext.dispose();
        }
    });
});