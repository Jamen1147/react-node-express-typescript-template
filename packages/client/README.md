# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## NOTE:

This project uses [craco](https://github.com/gsoft-inc/craco#documentation) to override webpack settings so that we can still benefit from using `cra` by not having to `eject` the app.

**Craco** is used in this project to

1. to include `babel-plugin-lodash` to improve lodash **tree-shaking**
2. to include `babel-plugin-react-remove-properties` to remove potential `/data-testid/` properties because of using `react-testing-library`.
3. to include other packages to the `babel-loader`.

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

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
