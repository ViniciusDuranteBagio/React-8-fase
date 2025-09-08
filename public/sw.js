const CACHE = "todo-pwa-v4";
const ASSETS = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/styles.css",
  "/sw.js"
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

 
  if (request.url.startsWith("chrome-extension://")) {
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

  
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) {
        return cached;
      }

   
      return fetch(request).then(response => {
      
        if (response.status === 200) {
          const responseClone = response.clone();
        
          if (!request.url.startsWith("chrome-extension://")) {
            caches.open(CACHE).then(cache => {
              cache.put(request, responseClone);
            });
          }
        }
        return response;
      }).catch(() => {
       
        if (request.url.includes("styles.css")) {
          return new Response(`
            body { font-family: system-ui; margin: 0; padding: 1rem; }
            .header { background: #3b82f6; color: white; padding: 1rem; }
            .container { max-width: 800px; margin: 0 auto; }
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
});
