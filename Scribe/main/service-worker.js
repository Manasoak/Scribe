// Name of the cache
const CACHE_NAME = 'scribe-cache-v1';

// Files to cache
const FILES_TO_CACHE = [
    '/',
    'index.html',
    'style.css',
    'script.js',
    'manifest.json',
    'icon-192x192.png',
    'icon-512x512.png',
    // Add any other assets you want to cache
];

// Install event - caching files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Caching files');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch event - serve cached files or fetch from network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Return cached response if found, otherwise fetch from network
            return response || fetch(event.request);
        })
    );
}); 