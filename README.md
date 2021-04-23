# Fullstack Template

## Typescript + React + Node + Express

Comes with a simple user authentication and basic UI components

### Stack in detail

#### - Tools

- [Lerna](https://lerna.js.org/) to manage the monorepo
- [ESLint](https://eslint.org/) to enforce coding styles
- [StyleLint](https://stylelint.io/) to enforce css styles
- [CommitLint](https://commitlint.js.org/#/) to enforce commit message styles
- [Prettier](https://prettier.io/) to enforce formatting
- [Husky](https://typicode.github.io/husky/#/) to use git hooks with husky
- [LintStaged](https://www.npmjs.com/package/lint-staged) to lint codes against staged files
- [CRA](https://create-react-app.dev/docs/getting-started/) to bootstrap react app initialization
- [CRACO](https://github.com/gsoft-inc/craco#documentation) to override CRA settings without ejecting the app
- [StoryBook](https://storybook.js.org/) to make UI components from component package interactive
- [Swagger](https://github.com/scottie1984/swagger-ui-express) to make APIs from server package interactive
- & many more ...

#### - FrontEnd

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- React hooks & contexts
- [React hook form](https://react-hook-form.com/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- & many more ...

#### - Backend

- [TypeScript](https://www.typescriptlang.org/)
- [NodeJS](https://nodejs.org/en/about/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://www.mongoose.com/)
- [Mocha](https://mochajs.org/)
- [PowerAsset](https://github.com/power-assert-js/power-assert)
- [SuperTest](https://www.npmjs.com/package/supertest)
- [Nyc](https://www.npmjs.com/package/nyc)
- & many more ...

## Get Started

**Must have node, yarn, and mongodb installed and setup locally**

1. `clone this repo`
2. `yarn install`
3. `yarn start`

## Available Scripts

### `yarn start`

Runs the client on port `3000` and runs the server on port `5000` at the same time.

### `yarn test`

Runs tests on all packages

### `yarn typecheck`

Runs typecheck on all packages

### `yarn story`

Runs storybook on component package

...

### For more commands please see `package.json`
