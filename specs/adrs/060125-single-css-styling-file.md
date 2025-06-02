# ADR: Consolidation of CSS Files into `styles.css`

## Status

Accepted

## Context

Initially, each HTML page in our frontend had its own CSS file (e.g., `settings.css`, `dailyspread.css`). This led to inconsistent styling across pages and made it difficult to maintain a unified design language. Additionally, having multiple full-sized CSS files increased redundancy and made global styling updates inefficient.

## Decision

We decided to consolidate all shared and common styles into a single CSS file named `styles.css`, located in the `source/frontend/` directory. This decision aligns with best practices for web development, where a central stylesheet enforces visual consistency and reduces maintenance overhead.

Each HTML file was updated to reference this new `styles.css` instead of their previous page-specific stylesheets. Any redundant or duplicate styles were removed or merged. Page-specific overrides were either removed or restructured to fit within the global stylesheet using class-based or contextual targeting where necessary.

### Example Change

Before (`settings.html`):

```html
<link rel="stylesheet" href="settings.css" />
```
