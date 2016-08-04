"use strict";

// Prequisites
var gulp = require("gulp");
var debug = require("gulp-debug");
var inject = require("gulp-inject");

var browserSync = require('browser-sync').create();
var superstatic = require("superstatic");


var config = require("../gulpfile.config");


// Gulp Watcher
gulp.task("watch", function () {
  gulp.watch([config.scripts.src], ["script"]).on('change', browserSync.reload);
  gulp.watch([config.css.src], ["style"]).on('change', function (e) {
    return gulp.src(e.path)
      .pipe( browserSync.stream());
  });
  gulp.watch([config.html.src], ["html"]).on('change', browserSync.reload);
});

// Serve task
gulp.task("serve", ["build", "watch"], function () {
  process.stdout.write("Starting browserSync and superstatic...\n");
  browserSync.init({
    port: 3000,
    //files: ["**/*.html", "**/*.scss", "**/*.js"],
    injectChanges: true,
    logFileChanges: false,
    logLevel: "silent",
    logPrefix: "angular2typescript",
    notify: true,
    reloadDelay: 0,
    server: "dist"
  });
});
