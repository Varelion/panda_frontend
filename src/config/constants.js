// Application constants
export const APP_NAME = 'Panda App';
export const VERSION = '1.0.0';

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Theme constants
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
};

// Local storage keys
export const STORAGE_KEYS = {
  THEME: 'app_theme',
  USER: 'app_user',
};
