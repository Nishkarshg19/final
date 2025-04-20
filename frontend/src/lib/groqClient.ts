import { apiRequest } from './api';

export const askGroq = async (prompt: string): Promise<string> => {
  try {
    const data = await apiRequest('/groq/chat', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
    });

    return data.response || 'No response from GROQ';
  } catch (error) {
    console.error('Error communicating with GROQ API:', error);
    return 'An error occurred while communicating with GROQ API.';
  }
};