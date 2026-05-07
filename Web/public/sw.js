const CACHE_NAME = 'meditrack-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/register.html',
  '/styles.css',
  '/app.js',
  '/register.js',
  '/manifest.json'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
  self.skipWaiting();
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Interceptar Peticiones
self.addEventListener('fetch', (event) => {
  // Solo cacheamos peticiones GET (no las peticiones a la API POST/PUT/DELETE)
  if (event.request.method !== 'GET') return;
  
  // No interceptar llamadas a la API de Railway, esas siempre deben ir por red
  if (event.request.url.includes('railway.app') || event.request.url.includes('firebase')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Devuelve el recurso de la caché si existe, sino lo busca en la red
        return response || fetch(event.request).then(fetchRes => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request.url, fetchRes.clone());
            return fetchRes;
          });
        });
      })
  );
});
