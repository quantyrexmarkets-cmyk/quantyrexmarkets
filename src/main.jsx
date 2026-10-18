import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// 1. SILENCE THE "REMOVECHILD" CRASH
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

// 2. THE CLEAN SLATE BOOT
const startApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) return;

  // Clear the root completely to prevent hydration mismatch crashes
  rootElement.innerHTML = ''; 

  try {
    const root = ReactDOM.createRoot(rootElement);
    // Remove StrictMode temporarily to stop double-rendering race conditions on mobile
    root.render(<App />);
  } catch (err) {
    console.error('Initial render failed, retrying...', err);
    setTimeout(startApp, 500);
  }
};

// 3. WAIT FOR BROWSER STABILITY
// We wait for the 'load' event + 200ms delay to let mobile browsers 
// finish auto-translating/auto-filling before React touches the DOM.
if (document.readyState === 'complete') {
  setTimeout(startApp, 200);
} else {
  window.addEventListener('load', () => setTimeout(startApp, 200));
}
