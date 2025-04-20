const axios = require('axios');

const groqClient = {
    fetchData: async (query) => {
        const response = await axios.get(`https://api.example.com/groq?query=${query}`);
        return response.data;
    }
};

test('fetchData returns data for valid query', async () => {
    const query = '*[_type == "post"]';
    const data = await groqClient.fetchData(query);
    expect(data).toBeDefined();
    expect(Array.isArray(data)).toBe(true);
});