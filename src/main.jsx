import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

/**
 * 🛡️ HYDRATION SAFETY PATCH
 * Prevents "TypeError: Cannot destructure property 'current'"
 * This occurs when browser translation tools modify the DOM nodes
 * before React has finished hydrating them.
 */
if (typeof window !== 'undefined' && typeof Node === 'function' && Node.prototype) {
  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) {
      // If the browser moved the node (translation), don't let React crash
      if (console) console.warn('DOM Protection: Prevented crash on removeChild');
      return child;
    }
    return originalRemoveChild.apply(this, arguments);
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (newNode, referenceNode) {
    if (referenceNode && referenceNode.parentNode !== this) {
      // If the browser moved the reference node, don't let React crash
      if (console) console.warn('DOM Protection: Prevented crash on insertBefore');
      return newNode;
    }
    return originalInsertBefore.apply(this, arguments);
  };
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
