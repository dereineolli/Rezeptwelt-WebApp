"use strict";

var gulp = require('gulp');
var tslint = require('gulp-tslint');
var webpack = require('webpack-stream');
var webpackConfig = require('../webpack.config.js');

var config = require('../gulpfile.config').scripts;

gulp.task("script", [ "webpack"], function () {

});

gulp.task("build:script", ["ts-lint", "webpack"], function () {

});

// Gulp TypeScript Linter
gulp.task('ts-lint', function () {
  return gulp.src(config.src)
    .pipe(tslint({
      formatter: "prose"
    }))
    .pipe(tslint.report({
      emitError: false
    }));
});


gulp.task('webpack', function() {

  return gulp.src(config.app)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(config.dest));
});
