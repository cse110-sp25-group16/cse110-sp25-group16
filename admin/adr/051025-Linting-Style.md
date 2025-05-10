# Linting and Code Style Style Enforcement

## Context

We want consistent code style and early error detection in our vanilla HTML/CSS/JavaScript project. This helps improve maintainability, readability, and alignment with industry standards. Without linting or formatting tools, it's easy for small inconsistencies and potential bugs to go unnoticed, especially in team-based development.

## Decision

We will use both **ESLint** and **Prettier** together:

- ESLint will handle code quality and catch bugs (e.g., unused variables, unsafe equality).
- Prettier will handle automatic formatting (e.g., indentation, semicolons, quotes).

We will run Prettier and ESLint in the editor (for real-time feedback) and enforce ESLint in the CI/CD pipeline so that simple errors aren't merged into the main branch.

## Rationale

There are several tools for linting and formatting. After research, we chose this combination for the following reasons:

- ESLint is the industry-standard linter for JavaScript. It offers strong support for modern JavaScript, has a wide range of plugins, and is highly customizable.

- Prettier is widely adopted for code formatting and removes the burden of debating personal style preferences.

- Many people already have experience using Prettier as an extension in VSCode

- Using both together is common practice in modern web development and reduces manual formatting errors.

## Additional Notes:

- Developers must install and configure ESLint and Prettier in their editors.

- ESLint and Prettier configuration files will be added to the codebase (.eslintrc.json, .prettierrc).

- A GitHub Actions workflow will be set up to run npm run lint on pushes and pull requests.
