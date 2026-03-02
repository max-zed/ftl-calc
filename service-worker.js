// Dateien, die gecached werden sollen
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./index.js",
  "./index.css",
  "./manifest.json"
];

const CACHE_NAME = "rechner-cache-" + FILES_TO_CACHE.join(",").length;

// Install Event: Cache erstellen
self.addEventListener("install", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => caches.delete(key)) // alle alten Caches löschen
      )
    ).then(() =>
      caches.open("rechner-cache").then(cache => cache.addAll(FILES_TO_CACHE))
    ).then(() => self.skipWaiting())
  );
});

// Activate Event: Alte Caches löschen
self.addEventListener("activate", event => {
  console.log("[SW] Aktivieren...");
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch Event: offlinefähig + Update automatisch
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // Wenn gefunden, zurückgeben
      if (cachedResponse) {
        // Parallel: Cache im Hintergrund aktualisieren
        fetch(event.request).then(response => {
          if(response && response.status === 200) {
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()));
          }
        });
        return cachedResponse;
      }
      // Sonst normal fetch
      return fetch(event.request);
    })
  );
});