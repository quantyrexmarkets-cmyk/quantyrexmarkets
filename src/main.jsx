import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// 1. THE FATAL ERROR PROTECTION (Crucial for Mobile/Translators)
// Intercepts DOM changes to prevent React from crashing when 'current' is missing
if (typeof window !== 'undefined' && typeof Node === 'function' && Node.prototype) {
  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) return child; // Skip instead of crashing
    return originalRemoveChild.apply(this, arguments);
  };
  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (newNode, referenceNode) {
    if (referenceNode && referenceNode.parentNode !== this) return newNode; // Skip instead of crashing
    return originalInsertBefore.apply(this, arguments);
  };
}

// 2. STABLE CLIENT-SIDE RENDER
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  // We avoid <React.StrictMode> here to prevent double-mount race conditions on mobile
  root.render(<App />);
}

// 3. AUTO-RECOVERY
// If a hydration/destructure error still occurs, refresh the page automatically once
window.onerror = function(message) {
  if (message.includes('destructure') || message.includes('current')) {
    if (!window.sessionStorage.getItem('reloaded')) {
      window.sessionStorage.setItem('reloaded', 'true');
      window.location.reload();
    }
  }
};
