'use strict';

const gulp = require('gulp');

var browser = require("./tasks/browser");
var script = require("./tasks/script");
var html = require("./tasks/html");
var style = require("./tasks/style");


gulp.task("build", ["script", "html", "style"], function(){

});

gulp.task("run", ["serve"], function() {

});
