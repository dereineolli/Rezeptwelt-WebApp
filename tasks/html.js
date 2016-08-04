'use strict';

// Prequisites
var gulp = require('gulp');
var htmlreplace = require('gulp-html-replace');

var config = require('../gulpfile.config');

// Gulp HTML Compiling
gulp.task('views', function () {

    gulp.src(config.appFiles.html)
        .pipe(gulp.dest());

    return gulp.src([config.paths.html.src])
        .pipe(gulp.dest(config.paths.html.dest));
});

gulp.task("copy:font", function() {
  return gulp.src(['src/fonts/*'])
    .pipe(gulp.dest('dist/css/fonts'));
});
