const gulp = require('gulp');
const {Jasmine} = require('pui-react-tools');
const runSequence = require('run-sequence');

Jasmine.install({
  browserSpecRunnerOptions: {sourcemappedStacktrace: true, profile: false},
  headlessSpecRunnerOptions: {},
  headlessServerOptions: {driver: 'phantomjs', random: false, profile: false},
  appGlobs: ['spec/**/*spec.js'],
  serverOptions: {config: {random: false}},
  webpack: {
    test: () => {
      return {
        // entry: {spec: './spec/**/*spec.js'},
        module: {
          rules: [
            {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'},
          ]
        },
        output: {filename: '[name].js'}
      }
    }
  }
});

gulp.task('default', cb => runSequence('spec-app', cb));