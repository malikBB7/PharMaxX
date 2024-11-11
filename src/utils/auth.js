export const getAccessToken = async () => {
    const response = await fetch('http://localhost:5000/get-access-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            clientId: process.env.REACT_APP_CLIENT_ID,
            tenantId: process.env.REACT_APP_TENANT_ID,
            clientSecret: process.env.REACT_APP_CLIENT_SECRET,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch access token');
    }
    return await response.json();
};
