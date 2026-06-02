// Service Worker version - bump to force update
const SW_VERSION = 'v3-20250602';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const senderName = data.title || 'New Message';
  const messageBody = data.body || 'You have a new support message';
  const url = data.url || '/admin/support';

  // Use a tag based on the chat URL so messages from same chat group together
  const tag = 'qm-support-' + (url.includes('?') ? url.split('?')[0] : url);

  const options = {
    body: messageBody,
    icon: '/support-icon-192.png',
    badge: '/support-icon-192.png',
    image: undefined,
    tag: tag,
    renotify: true,
    requireInteraction: false,
    silent: false,
    vibrate: [100, 50, 100, 50, 100],
    timestamp: Date.now(),
    data: { url: url, senderName: senderName },
    actions: [
      { action: 'reply', title: 'Reply' },
      { action: 'view', title: 'View Chat' }
    ]
  };

  // Title becomes the sender name, body becomes the message preview
  event.waitUntil(
    self.registration.showNotification('Quantyrex Support · ' + senderName, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const url = event.notification.data.url || '/admin/support';
  const action = event.action;

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      // Try to focus existing PWA window first
      for (const client of clientList) {
        if (client.url.includes('/admin/support') && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise open new window
      if (self.clients.openWindow) {
        return self.clients.openWindow(url);
      }
    })
  );
});

self.addEventListener('notificationclose', function(event) {
  // Optional: track dismissals
});
