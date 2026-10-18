import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// 1. DOM PROTECTION PROTOTYPES
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

// 2. THE INVISIBLE ROOT FIX
// We create a fresh div and append it to the body at the last possible second.
// This prevents mobile browsers from "polluting" the root element before React starts.
const initApp = () => {
  try {
    const freshRoot = document.createElement('div');
    freshRoot.id = 'quantyrex-fresh-root';
    document.body.appendChild(freshRoot);

    const root = ReactDOM.createRoot(freshRoot);
    root.render(<App />);
    
    console.log('✅ App mounted to clean root successfully.');
  } catch (err) {
    console.error('Render error:', err);
    // Silent recovery: try again in 500ms if it fails
    setTimeout(initApp, 500);
  }
};

// Start the app after a slight delay for browser stability
if (document.readyState === 'complete') {
  setTimeout(initApp, 100);
} else {
  window.addEventListener('load', () => setTimeout(initApp, 100));
}
