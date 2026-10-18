const memoryStore = {};

export const storage = {
  get: (key) => {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      return memoryStore[key] || null;
    }
  },
  set: (key, value) => {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      memoryStore[key] = String(value);
    }
  }
};
