import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// --- DOM SAFETY PATCH (Fixes "removeChild" crashes from auto-translators) ---
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

// --- ERROR BOUNDARY (Displays the error message if the app fails to load) ---
class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorLog: "" };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, errorLog: error.toString() };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'white', textAlign: 'center', background: '#0a0f1d', minHeight: '100vh' }}>
          <h2>Platform Initialization Error</h2>
          <p style={{ color: '#ef4444' }}>{this.state.errorLog}</p>
          <button onClick={() => window.location.reload()} style={{ padding: '10px 20px', background: '#2563eb', border: 'none', color: 'white', borderRadius: '5px' }}>
            Reload Platform
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalErrorBoundary>
      <App />
    </GlobalErrorBoundary>
  </React.StrictMode>
);
