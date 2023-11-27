const BASE_URL = 'https://dummyjson.com';

const productServiceApi = async (endpoint: string, method: string = 'GET', data?: any) => {
    const url = `${BASE_URL}/${endpoint}`;

    const headers: HeadersInit_ = {
        'Content-Type': 'application/json',
    };

    const options: RequestInit = {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
    };

    try {
        const response = await fetch(url); // use options for more required information
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        return await response.json();
    
    } catch (error) {
        console.error('API request error:', error);
        throw error;
    }
};

export default productServiceApi;
