import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// 1. SILENCE DOM ERRORS (Browser vs React fight)
if (typeof window !== 'undefined' && typeof Node === 'function' && Node.prototype) {
  const patch = (name) => {
    const original = Node.prototype[name];
    Node.prototype[name] = function() {
      try { return original.apply(this, arguments); }
      catch (e) { 
        console.warn(`Recovered from ${name} crash`);
        return arguments[0]; 
      }
    };
  };
  patch('removeChild');
  patch('insertBefore');
}

// 2. THE CLEAN START FUNCTION
const mountApp = () => {
  // Clear the entire body to remove browser-injected garbage (translators, autofill, etc)
  document.body.innerHTML = '<div id="quantyrex-stable-root"></div>';
  
  const rootElement = document.getElementById('quantyrex-stable-root');
  if (!rootElement) return;

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
    console.log('✅ App launched in Clean Mode');
  } catch (err) {
    console.error('Fatal Launch Error:', err);
    // Force a full clean reload if it still fails
    if (!window.location.hash.includes('reloaded')) {
      window.location.hash = 'reloaded';
      window.location.reload();
    }
  }
};

// 3. WAIT FOR BROWSER STABILITY (1 Second Delay)
// This gives Chrome/Android time to finish translating/filling before React starts
if (document.readyState === 'complete') {
  setTimeout(mountApp, 1000);
} else {
  window.addEventListener('load', () => setTimeout(mountApp, 1000));
}
