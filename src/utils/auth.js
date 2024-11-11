// Example of how you might get an access token with MSAL
import { PublicClientApplication } from '@azure/msal-browser';

const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID, // Make sure this is set
    authority: 'https://login.microsoftonline.com/your-tenant-id',
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

export const getAccessToken = async () => {
  try {
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length === 0) {
      throw new Error('User is not logged in');
    }

    const response = await msalInstance.acquireTokenSilent({
      scopes: ['User.Read', 'Sites.Read.All'], // Add appropriate scopes for your API
      account: accounts[0],
    });

    return response.accessToken; // Return the access token
  } catch (error) {
    console.error("Failed to get access token", error);
    throw new Error('Failed to get access token');
  }
};
