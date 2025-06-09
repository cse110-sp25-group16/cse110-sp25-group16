if ('serviceWorker' in navigator) {
  // Use absolute paths that work with GitHub Pages structure
  const SW_PATH = '/cse110-sp25-group16/source/service-worker.js';
  const SW_SCOPE = '/cse110-sp25-group16/source/frontend/';

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(SW_PATH, { scope: SW_SCOPE })
      .then((registration) => {
        console.log('ServiceWorker registered for scope:', registration.scope);
      })
      .catch((err) => {
        console.error('ServiceWorker registration failed:', err);
      });
  });
}
