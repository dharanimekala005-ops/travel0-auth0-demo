# Instructions on running Cruise0 PoC

## What you'll need
- Node.js 18+ and npm
- Auth0 Tenant (will be included in email)
- Gmail or test inbox for email verification


1. Clone the repo using ```git clone <REPO_URL>```
2. Navigate to the root directory in terminal if not already there
3. Install dependencies if needed using ```npm install```
4. We'll need to create a local .env file to run the app. Use the steps below to do this:
    - Create new .env file in root directions
    - Add these lines to .env: ```VITE_AUTH0_DOMAIN=<TENANT_DOMAIN>``` and ```VITE_AUTH0_CLIENT_ID=<CLIENT_ID>```
5. Run the app using ```npm run dev```
6. Open up a browser and navigate to ```http://localhost:5173```
7. You should see a login page. Click login and follow steps to sign in to Cruise0

**Note**: Follow steps 8-11 if you want to test login using non-social (non Google). Similary follow 12-15 to use Google to login

## Non-Social Login steps
8. Click sign up. To test fraudulent sign up, test an email like ```fakeuser@yopmail.com```. Sign up should be denied
9. Then sign up with real email address and after entering credentials you'll see a email verification page
10. Check your inbox and click on link to verify. Go back to the original verification page and select the button "I've verified- continue"
11. Then you should see a terms and conditions check box. Accept and check the box to continue. You should be verified and logged in after this step

## Google Login Steps
12. From the login page, continue with Google
13. Follow steps to sign in with email and password. Extra verification may be needed here as google prompts
14. After logging in and verifying you should see the terms and conditions check box. Accept and check the box to continue
15. You should be logged in and verified after this step

## Optional: Viewing Metadata and MFA

These steps describe what occurs in the Auth0 dashboard when completing login actions. The below instructions tell us how to view country metadata and enable MFA.

1. After login, the user's country is shown in User Management -> Users -> click on user and user_metadata
2. For non-social users, adding the ```"use_mfa" : true``` under user_metadata and under the countryName enables MFA during the next login. This does not need to be set again
3. On this following login, Auth0 prompts for MFA (QR code and authenticator app) before completing authentication 
