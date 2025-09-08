const CACHE = "todo-pwa-v4";
const ASSETS = [
  "/",
  "/styles.css",
  "/index.html",
  "/manifest.webmanifest",
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
      // Assume controle de todos os clientes
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  // Ignora requisições que não são GET
  if (request.method !== "GET") {
    return;
  }

  // Para navegações (SPA), sempre retorna index.html
  if (request.mode === "navigate") {
    event.respondWith(
      caches.match("/index.html").then(cached => {
        if (cached) {
          return cached;
        }
        // Se não estiver em cache, tenta buscar da rede
        return fetch(request).catch(() => {
          // Se falhar, retorna uma página offline básica
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

  // Para outros recursos (CSS, JS, imagens, etc.)
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) {
        return cached;
      }

      // Se não estiver em cache, tenta buscar da rede
      return fetch(request).then(response => {
        // Se a resposta for válida, adiciona ao cache
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE).then(cache => {
            cache.put(request, responseClone);
          });
        }
        return response;
      }).catch(() => {
        // Se falhar e for CSS, retorna CSS básico
        if (request.url.includes("styles.css")) {
          return new Response(`
            body { font-family: system-ui; margin: 0; padding: 1rem; }
            .header { background: #3b82f6; color: white; padding: 1rem; }
            .container { max-width: 800px; margin: 0 auto; }
          `, {
            headers: { "Content-Type": "text/css" }
          });
        }

        // Para outros recursos, retorna erro
        return new Response("Recurso não disponível offline", {
          status: 404,
          statusText: "Not Found"
        });
      });
    })
  );
});
