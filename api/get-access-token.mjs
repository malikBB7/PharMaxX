import fetch from 'node-fetch';

export default async function handler(req, res) {
    // Get environment variables
    const clientId = process.env.CLIENT_ID;
    const tenantId = process.env.TENANT_ID;
    const clientSecret = process.env.CLIENT_SECRET;

    // Construct the token request URL
    const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

    // Create the parameters for the POST request
    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('scope', 'https://graph.microsoft.com/.default');
    params.append('grant_type', 'client_credentials');

    try {
        // Make the token request
        const response = await fetch(tokenUrl, {
            method: 'POST',
            body: params,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        // Handle non-success response from Microsoft OAuth2
        if (!response.ok) {
            return res.status(response.status).json({ error: 'Failed to fetch access token' });
        }

        // Parse and return the response
        const data = await response.json();
        return res.json(data);
    } catch (error) {
        console.error('Error getting access token:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
