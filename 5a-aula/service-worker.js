self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll([
        '/index.html',
        './about.jsx',
        './styles.css',
        './game.jsx',
        './home.jsx',
        './about.jsx', 
        './app.jsx',
        './navigation.jsx',       
        '/manifest.json'
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
