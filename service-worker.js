// Dateien, die gecached werden sollen
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./index.js",
  "./index.css",
  "./manifest.json"
];

const CACHE_NAME = "ftl-calc"

// Install Event: Cache erstellen
self.addEventListener("install", event => {
  console.log("SW Install...")
  
});

self.addEventListener("activate", event => {
  console.log("SW Activate...")
  event.waitUntil((async () => {
    // Alle Caches löschen
    const keys = await caches.keys();
    await Promise.all(keys.map(key => caches.delete(key)));

    // Neue Dateien cachen
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(FILES_TO_CACHE);

    await self.clients.claim();
  })());
});

// Fetch Event: offlinefähig + Update automatisch
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const fetchPromise = fetch(event.request).then(networkResponse => {
        if(networkResponse && networkResponse.status === 200) {
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, networkResponse.clone()));
        }
        return networkResponse;
      });

      return cachedResponse || fetchPromise;
    })
  );
});