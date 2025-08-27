const STORAGE_KEYS = {
  AUTH_TOKEN: 'techcorp_auth_token',
  USER_DATA: 'techcorp_user_data',
  DARK_MODE: 'techcorp_dark_mode',
  PROJECTS: 'techcorp_projects',
  ANALYTICS: 'techcorp_analytics',
  NOTIFICATIONS: 'techcorp_notifications'
};

export const storage = {
  get: (key: string) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  
  set: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Handle storage errors
    }
  },
  
  remove: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch {
      // Handle storage errors
    }
  },
  
  clear: () => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    } catch {
      // Handle storage errors
    }
  }
};

export { STORAGE_KEYS };