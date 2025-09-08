self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll([
        '/index.html',
        '/public/icon-192.png',
        '/public/icon-512.png',
        '/manifest.json',
        '/src/main.jsx',
        '/src/App.jsx',
        '/src/styles.css',
        '/src/pages/Home.jsx',
        '/src/pages/Game.jsx',
        '/src/pages/About.jsx',
        '/src/components/Navigation.jsx'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
