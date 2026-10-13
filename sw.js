const CACHE_NAME = 'slider-pwa-v1';
const ASSETS_TO_CACHE = [
'./',
'./index.html',
'./manifest.json',
'https://cdn.tailwindcss.com',
'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];
​self.addEventListener('install', event => {
event.waitUntil(
caches.open(CACHE_NAME).then(cache => {
return cache.addAll(ASSETS_TO_CACHE);
}).then(() => self.skipWaiting())
);
});
​self.addEventListener('activate', event => {
event.waitUntil(
caches.keys().then(keys => {
return Promise.all(
keys.map(key => {
if (key !== CACHE_NAME) {
return caches.delete(key);
}
})
);
}).then(() => self.clients.claim())
);
});
​self.addEventListener('fetch', event => {
event.respondWith(
caches.match(event.request).then(response => {
return response || fetch(event.request);
})
);
});
