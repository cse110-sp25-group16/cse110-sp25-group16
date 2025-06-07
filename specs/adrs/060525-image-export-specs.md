# Backend Specs ADR

## Status

Accepted

## Core issue

- - How will we export easily shareable images for users?

## User stories:

- - Partner Paul will want a simple share button storing easily sendable (small filesizes, probably < 2MB)

## Candidates

- HTML2Canvas - renders DOM into `<canvas>` element via reading styles
- - does not use SVG or CSS parsing, but re-implements layout/rendering
- - Pros: simple, no external dependencies
- - Cons: innacurrate, cannot handle CSS or web fonts

- HTML-TO-IMAGE - converts DOM nodes to images by using SVG + `foreignObject` & `cloneNode`
- - Pros: able to use webfonts, shadows, SVGs, CSS effects
- - Cons: larger bundle size, requires modern browser features, more intensive

- Dom-to-image - DOM to SVG via foreignobject, predecessor to HTML2CANVAS
- - Cons: outdated

## Decision

Use HTML-TO-IMAGE, as web fonts & stylized theming via CSS are a core part of our branding, and HTML-TO-IMAGE supports it, while the other packages don't.
