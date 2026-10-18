import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// --- 1. THE "NO-CRASH" DOM PATCH ---
// This stops React from exploding when Google Translate changes the text
if (typeof window !== 'undefined' && typeof Node === 'function' && Node.prototype) {
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
}

// --- 2. THE "NO-CRASH" STORAGE PATCH ---
// Silently handles Incognito/Private mode without throwing SecurityErrors
try {
  const testKey = '__storage_test__';
  window.localStorage.setItem(testKey, testKey);
  window.localStorage.removeItem(testKey);
} catch (e) {
  const memoryStore = {};
  const mock = {
    getItem: (k) => memoryStore[k] || null,
    setItem: (k, v) => { memoryStore[k] = String(v); },
    removeItem: (k) => { delete memoryStore[k]; },
    clear: () => { for (let k in memoryStore) delete memoryStore[k]; },
    length: 0,
    key: () => null
  };
  Object.defineProperty(window, 'localStorage', { value: mock, writable: true });
  Object.defineProperty(window, 'sessionStorage', { value: mock, writable: true });
}

// --- 3. RENDER WITH ERROR RECOVERY ---
const root = ReactDOM.createRoot(document.getElementById('root'));

function SafeRender() {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

try {
  root.render(<SafeRender />);
} catch (error) {
  console.error("Critical Render Error:", error);
  // If hydration fails, force a clean client-side render
  setTimeout(() => {
    window.location.reload();
  }, 100);
}
