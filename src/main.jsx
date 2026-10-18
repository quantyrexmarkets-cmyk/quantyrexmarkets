import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// --- 1. SAFE LOCALSTORAGE POLYFILL FOR INCOGNITO & RESTRICTED BROWSERS ---
(function initSafeStorage() {
  if (typeof window === 'undefined') return;

  var isStorageSupported = false;
  try {
    var testKey = '__quantyrex_test__';
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    isStorageSupported = true;
  } catch (e) {
    isStorageSupported = false;
  }

  if (!isStorageSupported) {
    var memoryStore = {};
    var dummyStorage = {
      getItem: function(key) {
        return Object.prototype.hasOwnProperty.call(memoryStore, key) ? memoryStore[key] : null;
      },
      setItem: function(key, value) {
        memoryStore[key] = String(value);
      },
      removeItem: function(key) {
        delete memoryStore[key];
      },
      clear: function() {
        memoryStore = {};
      },
      key: function(index) {
        return Object.keys(memoryStore)[index] || null;
      },
      get length() {
        return Object.keys(memoryStore).length;
      }
    };

    try {
      Object.defineProperty(Window.prototype, 'localStorage', {
        get: function() { return dummyStorage; },
        configurable: true
      });
      Object.defineProperty(Window.prototype, 'sessionStorage', {
        get: function() { return dummyStorage; },
        configurable: true
      });
    } catch (e1) {
      try {
        Object.defineProperty(window, 'localStorage', {
          get: function() { return dummyStorage; },
          configurable: true
        });
        Object.defineProperty(window, 'sessionStorage', {
          get: function() { return dummyStorage; },
          configurable: true
        });
      } catch (e2) {
        console.warn('Storage polyfill fallback:', e2);
      }
    }
  }
})();

// --- 2. DOM TRANSLATION HYDRATION PATCH ---
if (typeof window !== 'undefined' && typeof Node === 'function' && Node.prototype) {
  try {
    const originalRemoveChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function (child) {
      if (child.parentNode !== this) return child;
      return originalRemoveChild.apply(this, arguments);
    };
    const originalInsertBefore = Node.prototype.insertBefore;
    Node.prototype.insertBefore = function (newNode, referenceNode) {
      if (referenceNode && referenceNode.parentNode !== this) return newNode;
      return originalInsertBefore.apply(this, arguments);
    };
  } catch (err) {
    console.warn('DOM translation patch failed:', err);
  }
}

// --- 3. RENDER APP DIRECTLY ---
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
