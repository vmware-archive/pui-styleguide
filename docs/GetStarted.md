# Getting Started with Pivotal UI

To get started using Pivotal UI with Create React App (CRA), follow these steps:

1. Install the latest version of Node LTS. [See here for instructions.](https://docs.npmjs.com/getting-started/installing-node)

2. Create a new CRA project with this command:
```
npx create-react-app some-directory
```

At this point, you'll be able to start up the default CRA app locally:
```
cd some-directory
yarn start
```

For more information on Create React App, see the [CRA readme](https://github.com/facebook/create-react-app).

3. Install the `pivotal-ui` node module:

```
yarn add pivotal-ui
```

4. Open `src/App.js` and replace the contents with:

```
import React, { Component } from 'react';
import {DefaultButton} from 'pivotal-ui/react/buttons';

export default class App extends Component {
  render() {
    return <DefaultButton>Click Me</DefaultButton>;
  }
}
```

## Unit testing with Jasmine

- Install jasmine?

- Install pui-react-tools

- Install gulp@next (^4.0.0)

- Install babel-core and babel-polyfill

- Create gulpfile.babel.js to install jasmine with a test webpack config

- Install gulp-jasmine
  - verify that we need this

- Install puppeteer

## PUI Cursor & p-flux

## Gulp

## Sass

## HMR Reloading with Webpack

## React Hot Loader

## Integration Testing with Selenium

## Routing with Grapnel

## Deployment to PCF

## Linting

