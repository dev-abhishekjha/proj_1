self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("iskcon-gn-v1").then((cache) =>
      cache.addAll([
        "/",
        "/site.webmanifest",
        "/logo.jpg",
        "/deities_3.jpeg",
      ]),
    ),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== "iskcon-gn-v1") {
            return caches.delete(key);
          }
          return Promise.resolve();
        }),
      ),
    ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          const responseClone = networkResponse.clone();
          caches.open("iskcon-gn-v1").then((cache) => {
            cache.put(event.request, responseClone);
          });
          return networkResponse;
        })
        .catch(() => caches.match("/"));
    }),
  );
});
