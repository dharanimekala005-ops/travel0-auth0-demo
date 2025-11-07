# Instructions on running Cruise0 PoC

## What you'll need
- Node.js 18+ and npm
- Auth0 Tenant (will be included in email)
- Gmail or test inbox for email verification


1. Clone the repo using ```git clone <REPO_URL>```
2. Navigate to the root directory in terminal if not already there
3. Install dependencies if needed using ```npm install```
4. We'll need to create a local .env file to run the app. Use the steps below to do this:
    - Create new .env file in root directory
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

## Optional Steps

1. Navigate to Auth0 Dashboard then go to User Management -> Users -> click on your user (google or non-social)
2. Scroll down and you should see both app_metadata populated with ```privacy_policies: true`` from terms and conditions and user_metadata populated with the countryName from IP during login
3. To enable MFA (non-social):
  - This will only work if you did not use google to sign in initially. If you used google do not follow steps below
  - Navigate to user_metadata in your user profile. Add ```"use_mfa": true``` under countryName. Should look something like this:
  ```
    {
      "country": "United States",
      "use_mfa": true
    }
  ```
  - MFA options should already be enabled in the Multi-Factor-Auth section of the dashboard. No need to change anything there
  - Logout of the app and login again with the same user (non-social user)
  - You will be prompted to scan QR code and enter code and click continue
  - You should be verified and logged in after this step
