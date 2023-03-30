if ('function' === typeof importScripts) {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
  );
}

if (workbox) {
  console.log('Workbox is loaded');
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new workbox.strategies.CacheFirst({
      cacheName: 'images',
    })
  );
} else {
  console.log('Workbox failed to load');
}