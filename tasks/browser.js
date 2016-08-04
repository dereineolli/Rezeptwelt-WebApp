'use strict';

// Prequisites
var gulp = require('gulp');
var debug = require('gulp-debug');
var inject = require('gulp-inject');
var tsc = require('gulp-typescript');
var tslint = require('gulp-tslint');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var tsProject = tsc.createProject('tsconfig.json');
var browserSync = require('browser-sync');
var superstatic = require('superstatic');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sysBuilder = require('systemjs-builder');


var ConfigFile = require('../gulpfile.config');
// Create config
var config = new ConfigFile();

// Gulp Watcher
gulp.task('watch', function () {
  gulp.watch([config.listFilesTS], ['ts-lint', 'script']);
  gulp.watch([config.listFilesSCSS], ['styles']);
  gulp.watch([config.listFilesHTML], ['views']);
});

// Serve task
gulp.task('serve', ['script', 'styles', 'views', "copy:font", 'watch'], function () {
  process.stdout.write('Starting browserSync and superstatic...\n');
  browserSync({
    port: 3000,
    //files: ['**/*.html', '**/*.scss', '**/*.js'],
    injectChanges: true,
    logFileChanges: false,
    logLevel: 'silent',
    logPrefix: 'angular2typescript',
    notify: true,
    reloadDelay: 0,
    server: "dist"
  });
});
