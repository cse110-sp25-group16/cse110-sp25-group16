# Export Image ADR

## Status

Accepted

## Context

Our export image feature that allows users to share snapshots of their daily spread and horoscope pages requires rendering dynamic graphics and visual elements that can be exported or manipulated consistently across multiple devices and platforms. There are two main approaches:

- Using the native HTML5 Canvas API directly.

- Using a third-party library like html-to-canvas or html-to-image, which converts HTML DOM elements to canvas or image.

## Decision

We decided to use the HTML5 Canvas API, which is already native to HTML, instead of HTML2Image or HTML2Canvas

## Reasons

- Fewer Dependencies: Using native Canvas reduces external library dependencies, leading to smaller bundle sizes and fewer maintenance issues.

- Better Compatibility: Native Canvas is widely supported across all modern browsers and devices without compatibility issues that some third-party libraries face.

- More Consistent Output: Exporting the DOM to canvas with third-party libraries can lead to inconsistent rendering and export results, especially across different devices and browsers, while native Canvas rendering is more predictable and uniform.
- We reduce risk of bugs or inconsistencies caused by third-party library limitations.

## Consequences

- We must implement more rendering logic ourselves, but gain reliability and maintainability.
