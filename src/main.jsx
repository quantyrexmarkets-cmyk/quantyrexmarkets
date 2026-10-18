import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// --- 1. DOM SAFETY PATCH FOR GOOGLE TRANSLATE HYDRATION CRASHES ---
if (typeof window !== 'undefined' && typeof Node === 'function' && Node.prototype) {
  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) {
      if (console && console.warn) {
        console.warn('Cannot remove child, parent is not the current node:', child);
      }
      return child;
    }
    return originalRemoveChild.apply(this, arguments);
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (newNode, referenceNode) {
    if (referenceNode && referenceNode.parentNode !== this) {
      if (console && console.warn) {
        console.warn('Cannot insert before, reference parent is not current node:', referenceNode);
      }
      return newNode;
    }
    return originalInsertBefore.apply(this, arguments);
  };
}

// --- 2. GLOBAL STORAGE SAFETY PATCH FOR INCOGNITO / BLOCKED LOCALSTORAGE ---
(function patchLocalStorage() {
  if (typeof window === 'undefined') return;

  const memoryStore = {};
  const dummyStorage = {
    getItem: (key) => (Object.prototype.hasOwnProperty.call(memoryStore, key) ? memoryStore[key] : null),
    setItem: (key, value) => { memoryStore[key] = String(value); },
    removeItem: (key) => { delete memoryStore[key]; },
    clear: () => { Object.keys(memoryStore).forEach((k) => delete memoryStore[k]); },
    key: (i) => Object.keys(memoryStore)[i] || null,
    get length() { return Object.keys(memoryStore).length; }
  };

  let storageAccessible = false;
  try {
    if (window.localStorage) {
      const testKey = '__quantyrex_test__';
      window.localStorage.setItem(testKey, testKey);
      window.localStorage.removeItem(testKey);
      storageAccessible = true;
    }
  } catch (e) {
    storageAccessible = false;
  }

  if (!storageAccessible) {
    try {
      Object.defineProperty(window, 'localStorage', {
        value: dummyStorage,
        configurable: true,
        enumerable: true,
        writable: true
      });
    } catch (e) {
      console.warn('Could not override window.localStorage, fallback active:', e);
    }
  }
})();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
