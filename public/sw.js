// Service Worker version - bump to force update
const SW_VERSION = 'v4-20250603';
const NOTIFICATION_BADGE = '/notification-badge.png';
const NOTIFICATION_ICON = '/support-icon-512.png';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      // Clear old caches if any
      caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
    ])
  );
});

// Track unread counts per chat for grouping
function getChatId(url) {
  if (!url) return 'default';
  // Use the full URL path as the chat identifier
  return url.replace(/[^a-z0-9]/gi, '-').toLowerCase();
}

self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const senderName = data.title || 'New Message';
  const messageBody = data.body || 'You have a new support message';
  const url = data.url || '/admin/support';
  const chatId = data.chatId || getChatId(url);

  // One tag per chat so multiple messages from same user replace each other
  const tag = 'qm-chat-' + chatId;

  event.waitUntil((async () => {
    // Get existing notifications for this chat to count unread messages
    const existing = await self.registration.getNotifications({ tag });
    let unreadCount = 1;
    let messages = [messageBody];

    if (existing.length > 0) {
      const prev = existing[0];
      const prevData = prev.data || {};
      unreadCount = (prevData.unreadCount || 1) + 1;
      messages = (prevData.messages || []).concat([messageBody]).slice(-3);
    }

    // Build a clean title and body
    const title = senderName;
    let body;
    if (unreadCount === 1) {
      body = messageBody;
    } else if (unreadCount <= 3) {
      body = messages.join('\n');
    } else {
      body = `${unreadCount} new messages\n${messages.slice(-2).join('\n')}`;
    }

    const options = {
      body: body,
      icon: NOTIFICATION_ICON,
      badge: NOTIFICATION_BADGE,
      tag: tag,
      renotify: true,
      requireInteraction: true,
      silent: false,
      vibrate: [200, 100, 200, 100, 200],
      timestamp: Date.now(),
      data: {
        url: url,
        senderName: senderName,
        chatId: chatId,
        unreadCount: unreadCount,
        messages: messages
      },
      actions: [
        { action: 'reply', title: '💬 Reply' },
        { action: 'mark-read', title: '✓ Mark read' }
      ]
    };

    // Try to set app badge if supported (shows number on PWA icon)
    if ('setAppBadge' in self.navigator) {
      try {
        const all = await self.registration.getNotifications();
        const total = all.reduce((sum, n) => sum + ((n.data && n.data.unreadCount) || 1), 0) + 1;
        await self.navigator.setAppBadge(total);
      } catch (e) {}
    }

    return self.registration.showNotification(title, options);
  })());
});

self.addEventListener('notificationclick', function(event) {
  const action = event.action;
  const data = event.notification.data || {};
  const url = data.url || '/admin/support';

  event.notification.close();

  // "Mark read" action just dismisses
  if (action === 'mark-read') {
    if ('setAppBadge' in self.navigator) {
      try {
        const count = data.unreadCount || 0;
        if (count > 0) self.navigator.setAppBadge(Math.max(0, count - 1));
        else self.navigator.clearAppBadge();
      } catch (e) {}
    }
    return;
  }

  // For 'reply', 'view', or no action (body tap) — open the chat
  event.waitUntil((async () => {
    const clientList = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });

    // Try to focus existing PWA/tab on support page
    for (const client of clientList) {
      if (client.url.includes('/admin/support')) {
        await client.focus();
        // Tell the page to open this specific chat (and focus input if reply)
        client.postMessage({
          type: 'open-chat',
          chatId: data.chatId,
          url: url,
          focusInput: action === 'reply'
        });
        return;
      }
    }

    // Otherwise open new window
    if (self.clients.openWindow) {
      const w = await self.clients.openWindow(url + (action === 'reply' ? '?reply=1' : ''));
      return w;
    }
  })());

  // Clear app badge for this notification
  if ('clearAppBadge' in self.navigator) {
    try { self.navigator.clearAppBadge(); } catch (e) {}
  }
});

self.addEventListener('notificationclose', function(event) {
  const data = event.notification.data || {};
  // Decrement app badge when user swipes away
  if ('setAppBadge' in self.navigator) {
    try {
      const count = data.unreadCount || 0;
      if (count > 0) self.navigator.setAppBadge(Math.max(0, count - 1));
      else self.navigator.clearAppBadge();
    } catch (e) {}
  }
});

// Allow the app to clear notifications when admin opens a chat
self.addEventListener('message', function(event) {
  if (!event.data) return;

  if (event.data.type === 'clear-notifications') {
    self.registration.getNotifications().then(notifications => {
      notifications.forEach(n => {
        if (!event.data.chatId || (n.data && n.data.chatId === event.data.chatId)) {
          n.close();
        }
      });
      if ('clearAppBadge' in self.navigator) {
        try { self.navigator.clearAppBadge(); } catch (e) {}
      }
    });
  }
});
