const CACHE_NAME = 'my-cache-v2';  // Her değişiklikte sürümü değiştir

self.addEventListener('install', (event) => {
  self.skipWaiting();  // Yeni worker hemen aktif olsun
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/src/assets/icons/icon-192x192.png',
        '/src/assets/icons/icon-512x512.png',
        '/src/css/main.css',
        '/src/scripts/loading.js',
      ]);
    })
  );
});

self.addEventListener('activate', (event) => {
  // Eski cache'leri temizle
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);  // Eski cache'leri sil
          }
        })
      );
    })
  );
  self.clients.claim();  // Yeni worker hemen devreye girsin
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
