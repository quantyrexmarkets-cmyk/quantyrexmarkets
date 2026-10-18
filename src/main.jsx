import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { safeStorage } from './utils/safeStorage.js'

// --- 1. DOM SAFETY PATCH FOR GOOGLE TRANSLATE HYDRATION CRASHES ---
if (typeof window !== 'undefined' && typeof Node === 'function' && Node.prototype) {
  try {
    const originalRemoveChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function (child) {
      if (child.parentNode !== this) {
        return child;
      }
      return originalRemoveChild.apply(this, arguments);
    };

    const originalInsertBefore = Node.prototype.insertBefore;
    Node.prototype.insertBefore = function (newNode, referenceNode) {
      if (referenceNode && referenceNode.parentNode !== this) {
        return newNode;
      }
      return originalInsertBefore.apply(this, arguments);
    };
  } catch (e) {
    console.warn('DOM translation patch error:', e);
  }
}

// --- 2. GLOBAL NON-THROWING STORAGE PATCH ---
try {
  const dummyStorage = {
    getItem: safeStorage.getItem,
    setItem: safeStorage.setItem,
    removeItem: safeStorage.removeItem,
    clear: safeStorage.clear,
    key: () => null,
    length: 0
  };

  let isWorking = false;
  try {
    const testKey = '__quantyrex_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    isWorking = true;
  } catch (e) {
    isWorking = false;
  }

  if (!isWorking) {
    try {
      Object.defineProperty(window, 'localStorage', {
        get: () => dummyStorage,
        configurable: true
      });
    } catch (e1) {
      try {
        const proto = Object.getPrototypeOf(window) || Window.prototype;
        Object.defineProperty(proto, 'localStorage', {
          get: () => dummyStorage,
          configurable: true
        });
      } catch (e2) {
        // Fallback active via safeStorage helper
      }
    }
  }
} catch (globalStorageError) {
  console.warn('Storage patch skipped:', globalStorageError);
}

// --- 3. GLOBAL REACT ERROR BOUNDARY ---
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Caught app error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#0a0f1d',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          textAlign: 'center',
          fontFamily: 'sans-serif'
        }}>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '12px', color: '#38bdf8' }}>
            Quantyrex Markets
          </h2>
          <p style={{ color: '#9ca3af', marginBottom: '20px', maxWidth: '360px', fontSize: '14px' }}>
            Session initialized. Tap below to launch trading terminal.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              window.location.reload();
            }}
            style={{
              padding: '12px 28px',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Launch Platform
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
