'use strict';

// Prequisites
var gulp = require('gulp');
var sass = require('gulp-sass');

var config = require('../gulpfile.config');

gulp.task('styles', function () {
  gulp.src(config.appFiles.style)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.paths.styles.dest));
});
