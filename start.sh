#!/usr/bin/env bash

pushd ../pivotal-ui
  yarn install --no-progress
  gulp build
popd

rm -rf node_modules
yarn cache clean
yarn --no-progress

rm -rf dist
./node_modules/.bin/webpack --config ./frontend_webpack.config.babel.js -p

cp public/* dist/
cp -R static dist/