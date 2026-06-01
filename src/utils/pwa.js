const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY || '';
const API_URL = import.meta.env.VITE_API_URL || 'https://quantyrexmarkets-api.vercel.app/api';

export async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return null;
  try {
    const reg = await navigator.serviceWorker.register('/sw.js');
    console.log('[PWA] Service worker registered:', reg.scope);
    return reg;
  } catch (err) {
    console.error('[PWA] SW registration failed:', err);
    return null;
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)));
}

export async function subscribeToPush() {
  if (!VAPID_PUBLIC_KEY) {
    console.warn('[PWA] No VAPID public key');
    return null;
  }

  try {
    const reg = await navigator.serviceWorker.ready;
    let subscription = await reg.pushManager.getSubscription();

    if (!subscription) {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') return null;

      subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
      });
    }

    const token = localStorage.getItem('token');
    await fetch(`${API_URL}/push/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ subscription })
    });

    return subscription;
  } catch (err) {
    console.error('[PWA] Subscribe failed:', err);
    return null;
  }
}

function setupInstallPrompt() {
  let deferredPrompt = null;

  if (typeof window !== 'undefined') {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      window.dispatchEvent(new CustomEvent('pwa-installable'));
    });
  }

  return {
    canInstall: () => !!deferredPrompt,
    install: async () => {
      if (!deferredPrompt) return false;
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      deferredPrompt = null;
      return outcome === 'accepted';
    }
  };
}

export const installer = setupInstallPrompt();
