// service-worker.js

const CACHE_NAME = 'tarot-images-v1';
const BASE_PATH = '/cse110-sp25-group16/source/'; // GitHub Pages path
const IMAGE_PATHS = [
  // Card images
  'cards/c01.jpg',
  'cards/c02.jpg',
  'cards/c03.jpg',
  'cards/c04.jpg',
  'cards/c05.jpg',
  'cards/c06.jpg',
  'cards/c07.jpg',
  'cards/c08.jpg',
  'cards/c09.jpg',
  'cards/c10.jpg',
  'cards/c11.jpg',
  'cards/c12.jpg',
  'cards/c13.jpg',
  'cards/c14.jpg',
  'cards/m00.jpg',
  'cards/m01.jpg',
  'cards/m02.jpg',
  'cards/m03.jpg',
  'cards/m04.jpg',
  'cards/m05.jpg',
  'cards/m06.jpg',
  'cards/m07.jpg',
  'cards/m08.jpg',
  'cards/m09.jpg',
  'cards/m10.jpg',
  'cards/m11.jpg',
  'cards/m12.jpg',
  'cards/m13.jpg',
  'cards/m14.jpg',
  'cards/m15.jpg',
  'cards/m16.jpg',
  'cards/m17.jpg',
  'cards/m18.jpg',
  'cards/m19.jpg',
  'cards/m20.jpg',
  'cards/m21.jpg',
  'cards/p01.jpg',
  'cards/p02.jpg',
  'cards/p03.jpg',
  'cards/p04.jpg',
  'cards/p05.jpg',
  'cards/p06.jpg',
  'cards/p07.jpg',
  'cards/p08.jpg',
  'cards/p09.jpg',
  'cards/p10.jpg',
  'cards/p11.jpg',
  'cards/p12.jpg',
  'cards/p13.jpg',
  'cards/p14.jpg',
  'cards/s01.jpg',
  'cards/s02.jpg',
  'cards/s03.jpg',
  'cards/s04.jpg',
  'cards/s05.jpg',
  'cards/s06.jpg',
  'cards/s07.jpg',
  'cards/s08.jpg',
  'cards/s09.jpg',
  'cards/s10.jpg',
  'cards/s11.jpg',
  'cards/s12.jpg',
  'cards/s13.jpg',
  'cards/s14.jpg',
  'cards/w01.jpg',
  'cards/w02.jpg',
  'cards/w03.jpg',
  'cards/w04.jpg',
  'cards/w05.jpg',
  'cards/w06.jpg',
  'cards/w07.jpg',
  'cards/w08.jpg',
  'cards/w09.jpg',
  'cards/w10.jpg',
  'cards/w11.jpg',
  'cards/w12.jpg',
  'cards/w13.jpg',
  'cards/w14.jpg',

  // Frontend images
  'frontend/images/advice.png',
  'frontend/images/appiconback.webp',
  'frontend/images/cardback.jpg',
  'frontend/images/logo-gold.png',
  'frontend/images/logo.png',
  'frontend/images/paul-volkmer-stars.jpg',
  'frontend/images/sweet16_bw.png',
  'frontend/images/tarot.jpg',
  'frontend/images/zodiacs.webp',

  // Zodiac images
  'frontend/images/zodiacs/Aquarius.png',
  'frontend/images/zodiacs/Aries.png',
  'frontend/images/zodiacs/Cancer.png',
  'frontend/images/zodiacs/Capricorn.png',
  'frontend/images/zodiacs/Gemini.png',
  'frontend/images/zodiacs/Leo.png',
  'frontend/images/zodiacs/Libra.png',
  'frontend/images/zodiacs/Pisces.png',
  'frontend/images/zodiacs/Sagittarius.png',
  'frontend/images/zodiacs/Scorpio.png',
  'frontend/images/zodiacs/Taurus.png',
  'frontend/images/zodiacs/Virgo.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(IMAGE_PATHS.map((path) => BASE_PATH + path));
    })
  );
});

self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // Only handle requests for our domain and image files
  if (
    requestUrl.origin === location.origin &&
    (event.request.destination === 'image' ||
      IMAGE_PATHS.some((path) => requestUrl.pathname.includes(path)))
  ) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then((response) => {
          // Check if we received a valid response
          if (
            !response ||
            response.status !== 200 ||
            response.type !== 'basic'
          ) {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        });
      })
    );
  }
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
