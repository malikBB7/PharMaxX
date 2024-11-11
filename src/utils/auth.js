// src/utils/auth.js

export const getAccessToken = async () => {
    const response = await fetch('https://pharmaxx.powerappsportals.com/get-access-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            clientId: '41f46ae1-1e05-4e30-870d-5e684c8ea7e2',
            tenantId: 'e4da8020-3c09-40ab-8fa0-1707bc163563',
            clientSecret: 'SIN8Q~iOmz3lV_loTO3Y6Z3h4kjyWcA~pSEcbbRJ',
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch access token');
    }
    return await response.json();
};
