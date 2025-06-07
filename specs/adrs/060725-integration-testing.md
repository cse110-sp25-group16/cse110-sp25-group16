# Integration Testing Strategy ADR

## Status
Accepted

## Context
Our project involves multiple interconnected components including card logic (`Card.js`, `CardDeck.js`), horoscope generation (`horoscope.js`), and UI rendering for tarot cards (`dailyspread.js`). While unit testing verifies individual modules, it is critical to validate that modules interact correctly, especially when one module depends on the structure or behavior of another.

## Decision
We decided to implement **integration testing** using **Jest** in a dedicated `__tests__/integration/` folder. This testing layer helps us confirm that:

- The `CardDeck` class correctly uses `Card` and `CardDictionary` to create full tarot decks.
- The `horoscope.js` module produces consistent readings when given valid dates.
- The `dailyspread.js` card-selection logic (`getDailySpread`) correctly returns 3 valid, unique cards from a data object.

These integration tests use mock data where needed and avoid full DOM interaction to remain fast and focused.

## Chosen Tools
- **Jest** was chosen as our integration testing framework because:
  - We already use it for unit and E2E tests.
  - It supports mocking and module-level testing well.
  - It's easy to run in GitHub Actions and integrates cleanly with our workflow.

## Consequences
- Integration tests give us confidence that core modules work together without needing to run full E2E tests.
- It helps catch bugs caused by mismatched expectations between modules (e.g., missing card properties, ID mismatches).
- We need to maintain mock data structures that resemble real input (e.g., `CardDictionary` or card JSON format).

## Alternatives Considered
- Skipping integration testing and relying only on unit and E2E tests. This was rejected because it leaves gaps between logic and UI.
- Using a different framework like Mocha or AVA. Rejected due to complexity and lack of consistency.