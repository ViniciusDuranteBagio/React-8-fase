const CACHE = "todo-pwa-v5";
const ASSETS = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/sw.js",
  "/styles.css",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  
  if (request.method !== "GET") {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      caches.match("/index.html").then(cached => {
        if (cached) {
          return cached;
        }
        return fetch(request).catch(() => {
          return new Response(`
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>To-Do PWA - Offline</title>
              <style>
                body { font-family: system-ui; text-align: center; padding: 2rem; }
                h1 { color: #3b82f6; }
              </style>
            </head>
            <body>
              <h1>📱 To-Do PWA</h1>
              <p>Você está offline. Conecte-se à internet para usar o app.</p>
            </body>
            </html>
          `, {
            headers: { "Content-Type": "text/html" }
          });
        });
      })
    );
    return;
  }

  if (request.url.includes('.css') || 
      request.url.includes('.js') || 
      request.url.includes('.png') || 
      request.url.includes('.jpg') || 
      request.url.includes('.svg') ||
      request.url.includes('manifest.webmanifest')) {
    
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) {
          return cached;
        }
        
        return fetch(request).then(response => {
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE).then(cache => {
              cache.put(request, responseClone);
            });
          }
          return response;
        }).catch(() => {
          if (request.url.includes("styles.css")) {
            return new Response(`
              body { font-family: system-ui; margin: 0; padding: 1rem; background: #f9fafb; }
              .header { background: #3b82f6; color: white; padding: 1rem; margin: -1rem -1rem 1rem -1rem; }
              .header h1 { margin: 0; }
              .header a { color: white; text-decoration: none; }
              .container { max-width: 800px; margin: 0 auto; }
              .nav { display: flex; gap: 0.5rem; }
              .nav a { color: white; text-decoration: none; padding: 0.5rem; border-radius: 0.25rem; }
              .nav a:hover, .nav a.active { background: rgba(255,255,255,0.2); }
              main { padding: 1rem 0; }
            `, {
              headers: { "Content-Type": "text/css" }
            });
          }
          
          return new Response("Recurso não disponível offline", {
            status: 404,
            statusText: "Not Found"
          });
        });
      })
    );
    return;
  }

  event.respondWith(
    fetch(request).then(response => {
      if (response.status === 200) {
        const responseClone = response.clone();
        caches.open(CACHE).then(cache => {
          cache.put(request, responseClone);
        });
      }
      return response;
    }).catch(() => {
      return caches.match(request).then(cached => {
        if (cached) {
          return cached;
        }
        
        return new Response("Recurso não disponível offline", {
          status: 404,
          statusText: "Not Found"
        });
      });
    })
  );
});
