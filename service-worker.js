const CACHE_NAME = "my-cache-v6"; // 🔥 Yeni bir versiyon numarası belirle

self.addEventListener("install", (event) => {
  self.skipWaiting(); // Yeni worker hemen aktif olsun
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "/strenly/",
        "/strenly/index.html",
        "/strenly/src/assets/icons/icon-192x192.png",
        "/strenly/src/assets/icons/icon-512x512.png",
        "/strenly/src/css/main.css",
        "/strenly/src/scripts/loading.js",
      ]);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log(`🗑 Eski cache siliniyor: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

  self.clients.claim(); // Yeni worker hemen devreye girsin

  // 🔥 Kullanıcılara güncelleme bildirimi gönder
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({ type: "UPDATE_AVAILABLE" });
    });
  });
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone()); // Güncel içeriği cache'e ekle
          return response;
        });
      })
      .catch(() => caches.match(event.request)) // Eğer internet yoksa cache'den al
  );
});
