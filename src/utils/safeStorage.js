// Memory fallback store for when localStorage is blocked by browser settings
const memoryStore = {};

export const safeStorage = {
  getItem: (key) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch (e) {
      console.warn(`[SafeStorage] Access denied for getItem("${key}")`);
    }
    return Object.prototype.hasOwnProperty.call(memoryStore, key) ? memoryStore[key] : null;
  },

  setItem: (key, value) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
        return;
      }
    } catch (e) {
      console.warn(`[SafeStorage] Access denied for setItem("${key}")`);
    }
    memoryStore[key] = String(value);
  },

  removeItem: (key) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
        return;
      }
    } catch (e) {
      console.warn(`[SafeStorage] Access denied for removeItem("${key}")`);
    }
    delete memoryStore[key];
  },

  clear: () => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.clear();
        return;
      }
    } catch (e) {
      console.warn('[SafeStorage] Access denied for clear()');
    }
    Object.keys(memoryStore).forEach((k) => delete memoryStore[k]);
  }
};
