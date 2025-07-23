export const environment = {
  development: import.meta.env.MODE === 'development',
  production: import.meta.env.MODE === 'production',
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001',
};
