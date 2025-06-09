if ('serviceWorker' in navigator) {
  // Use relative paths from your frontend directory
  const SW_PATH = '/source/service-worker.js';
  const SW_SCOPE = '/source/frontend/';
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
