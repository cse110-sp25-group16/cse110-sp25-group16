# CI/CD Minification & Image Optimization

## Specifications

- GitHub Actions job `minify` runs on PR & push to `main` for all `source/frontend/**/*.css|.html|.js`.
- Uses `cssnano-cli`, `html-minifier` and `uglify-js` to minify in-place.
- Shrink all zodiac images under `source/frontend/images/zodiacs` (reducing file size without visible quality loss).

## Rationale

Automating minification and shrinking the images manually guarantees consistently small assets on every deployment, speeding up page loads, cutting bandwidth, and improving user experience.
