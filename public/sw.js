const CACHE = "todo-pwa-v5";
const ASSETS = [
  "/",                  
  "/index.html",
  "/manifest.webmanifest",
  "/sw.js",
  "/styles.css",
  "/icon-todo.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => key !== CACHE && caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") return;

  if (request.mode === "navigate") {
    event.respondWith(
      caches.match("/index.html").then(cached => cached || fetch(request))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      return cached || fetch(request).then(response => {
        if (response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE).then(cache => cache.put(request, clone));
        }
        return response;
      }).catch(() =>
        new Response("Offline e recurso não encontrado no cache", { status: 404 })
      );
    })
  );
});
