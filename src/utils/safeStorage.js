const memoryStore = {};

export const safeStorage = {
  getItem: (key) => {
    try {
      if (typeof window !== 'undefined') {
        return window.localStorage.getItem(key);
      }
    } catch (e) {
      // Access denied / Incognito mode
    }
    return Object.prototype.hasOwnProperty.call(memoryStore, key) ? memoryStore[key] : null;
  },

  setItem: (key, value) => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, value);
        return;
      }
    } catch (e) {
      // Access denied / Incognito mode
    }
    memoryStore[key] = String(value);
  },

  removeItem: (key) => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
        return;
      }
    } catch (e) {
      // Access denied
    }
    delete memoryStore[key];
  },

  clear: () => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.clear();
        return;
      }
    } catch (e) {
      // Access denied
    }
    Object.keys(memoryStore).forEach((k) => delete memoryStore[k]);
  }
};

export default safeStorage;
