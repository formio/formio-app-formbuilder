/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are splitted in several files in the gulp directory
 *  because putting all here was really too long
 */

'use strict';

var gulp = require('gulp');
require('./gulp/build');
require('./gulp/conf');
require('./gulp/e2e-tests');
require('./gulp/inject');
require('./gulp/scripts');
require('./gulp/server');
require('./gulp/styles');
require('./gulp/unit-tests');
require('./gulp/watch');

/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
