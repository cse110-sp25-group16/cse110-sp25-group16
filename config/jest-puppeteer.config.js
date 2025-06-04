module.exports = {
  launch: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  },
  server: {
    command: 'npx live-server . --port=8080 --quiet',
    port: 8080,
    launchTimeout: 10000,
    debug: true
  }
};
