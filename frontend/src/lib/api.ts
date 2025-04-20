const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${BACKEND_API_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};