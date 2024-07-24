// sw.js

const CACHE_NAME = 'tvify-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/TVify_9.0.0.apk'
];

// Instalando o service worker e armazenando os arquivos no cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptando requisições e retornando os arquivos do cache quando disponível
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna a resposta do cache se encontrada, senão faz a requisição normal
        return response || fetch(event.request);
      })
  );
});

// Atualizando o cache quando o service worker é ativado
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
