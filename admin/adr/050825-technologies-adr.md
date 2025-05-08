# Technologies

What technologies should we use on the project?
- Favor vanilla JavaScript, CSS, HTML
- Rationale: the project is less technologically complex, focusing more on simple algorithmic generations for readings
  - Further, we don't need features like databases or network connectivity - all of the app will be stored locally, and any sharing features will generate images that can be sent, rather than having a transfer API written
  - We also don't need authentication features, as everything will be stored locally, and MBTI/horoscopes/tarot cards are not generally considered "sensitive information"

- For design, any app enabling collaboration and user-friendly design will fit our needs
  - Favor Figma, as Figma specializes in good UI & friendly user-experiences
  - As well, several groupmates have experience & comfortability with Figma platform

- For version control, favor GitHub - git is good for developer comfortability (industry standard) & most of team have experience, and GitHub is useful as GitHub issues can be used for organizing feature development

- For CI/CD, TBD

Therefore:

- Storage: JavaScript `localStorage` API
- Front-end: HTML, CSS
- Back-end: JavaScript
- Design: Figma
- Version Control: Git, GitHub
- Features & Issue Tracking: GitHub Issues