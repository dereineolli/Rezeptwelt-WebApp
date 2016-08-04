"use strict";

var gulp = require('gulp');
var tslint = require('gulp-tslint');
var webpack = require('webpack-stream');
var webpackConfig = require('../webpack.config.js');

var config = require('../gulpfile.config');

gulp.task("script", ["ts-lint", "webpack"], function () {

});

// Gulp TypeScript Linter
gulp.task('ts-lint', function () {
  return gulp.src(config.listFilesTS).pipe(tslint()).pipe(tslint.report('prose'));
});


gulp.task('webpack', function() {
    
  return gulp.src(config.appFiles.script)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(config.basePaths.dest));
});
