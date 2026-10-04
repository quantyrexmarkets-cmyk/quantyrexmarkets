// Safety patch for React DOM removeChild/insertBefore crashes (e.g. browser translation)
if (typeof window !== 'undefined' && typeof Node === 'function' && Node.prototype) {
  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) {
      if (console) console.warn('Cannot remove child: parent mismatch avoided', child, this);
      return child;
    }
    return originalRemoveChild.apply(this, arguments);
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (newNode, referenceNode) {
    if (referenceNode && referenceNode.parentNode !== this) {
      if (console) console.warn('Cannot insert before: parent mismatch avoided', referenceNode, this);
      return newNode;
    }
    return originalInsertBefore.apply(this, arguments);
  };
}

import { registerServiceWorker, subscribeToPush } from './utils/pwa';
import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/themes.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext.jsx'
import { CurrencyProvider } from './context/CurrencyContext.jsx'

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ background: '#0e1628', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'white', fontFamily: 'monospace', padding: '20px' }}>
          <h2 style={{ color: '#ef4444' }}>App Error</h2>
          <pre style={{ color: '#f59e0b', fontSize: '11px', whiteSpace: 'pre-wrap', maxWidth: '90vw' }}>{this.state.error.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <CurrencyProvider>
            <App />
          </CurrencyProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
)

if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-mode');
}

registerServiceWorker().then(() => {
  if (localStorage.getItem('token')) {
    setTimeout(() => {
      try {
        const userData = JSON.parse(sessionStorage.getItem('user') || localStorage.getItem('user') || '{}');
        const isAdmin = userData.isAdmin === true || userData.role === 'admin';
        if (isAdmin) {
          console.log('[Push] Skipped for admin');
          return;
        }
        subscribeToPush().catch(e => console.log('Push subscribe:', e.message));
      } catch(e) {
        console.log('Push setup error:', e.message);
      }
    }, 2000);
  }
});
