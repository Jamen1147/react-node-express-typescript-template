# A shared component package

**A component package that is supposed to be shared across multiple client apps if there are multiple client apps in the monorepo.**

Comes with storybook so that we can easily play around with the components.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn storybook`

Reads all available `component.stories.tsx` can runs `storybook` on port `6006`.

### `yarn build-storybook`

Makes a deployable storybook build.

### `yarn typecheck`

Performce type-check against all typescript files in this package.
