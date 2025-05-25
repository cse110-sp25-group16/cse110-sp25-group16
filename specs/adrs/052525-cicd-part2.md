# CI/CD Part 2

## Quick Rundown of Each Aspect

- **Code Coverage Reporting**
  - Code coverage reports show which parts of our source code are exercised by automated tests. This helps ensure our tests are thorough.
- **Packaging**
  - Packaging is the process of bundling our code and assets into a format that's distributable or installable.
- **Deployment**
  - Deployment is moving our packaged application to a target environment (like a server, cloud function, or container registry).
- **Minification**
  - Minification reduces the size of our code by removing unnecessary characters (like whitespace and comments) to improve load times and performance.

## Tools to Use

### Code Coverage Reporting

**Tools Considered:**

- _Jest_
- _nyc (Istanbul CLI)_

**Decision**
Since Jest has built in coverage reporting, to keep this project simple and avoid adding extra tools Jest would be best for coverage reporting for our project.

### Packaging

**Tools Considered:**

- _Webpack_
- _Rollup_
- _Vite_
- _Parcel_

**Decision**
After the consideration, the best option seems to be with Vite as it is the one most tailored to a small-medium vanilla JS project. It is also simple and has a very fast dev speed.
Vite also provides minification.

### Deployment

**Tools Considered:**

- _Github Pages_
- _Vercel_
- _Netlify_

**Decision**
This one isn't an easy choice. This one is between Vercel and Github Pages. The reason it isn't an easy choice is because due to the labs, we already are pretty experienced with github pages.
Vercel, on the other hand, is a good choice as it has a simple UI/UX, connects to GitHub, and also has auto-deployment when you push to your repo. This we would have to discuss further.

### Minification

As said earlier, Vite would be the best option for minification as it already includes Packaging and as we plan on keeping this project simple, the best option here is Vite.
