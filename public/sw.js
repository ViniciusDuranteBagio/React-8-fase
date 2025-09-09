const CACHE_NAME = "todo-pwa-v5";
const ASSETS = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/styles.css",
  "/src/main.jsx",   
  "/icone.jpg",      
  "/sw.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") return;

  if (request.mode === "navigate") {
    event.respondWith(
      caches.match("/index.html").then(cached => {
        return cached || fetch(request).catch(() => {
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

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;

      return fetch(request).then(response => {
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, responseClone);
          });
        }
        return response;
      }).catch(() => {
        // Fallback CSS básico
        if (request.url.includes("styles.css")) {
          return new Response(`
            body { font-family: system-ui; margin: 0; padding: 1rem; }
            .header { background: #3b82f6; color: white; padding: 1rem; }
            .container { max-width: 800px; margin: 0 auto; }
          `, { headers: { "Content-Type": "text/css" }});
        }

        // Para outros recursos
        return new Response("Recurso não disponível offline", {
          status: 404,
          statusText: "Not Found"
        });
      });
    })
  );
});
