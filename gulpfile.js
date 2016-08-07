'use strict';

var gulp = require('gulp');

var browser = require("./tasks/browser");
var script = require("./tasks/script");
var html = require("./tasks/html");
var style = require("./tasks/style");
var images = require("./tasks/images");


gulp.task("default", ["script", "html", "style", "image"], function(){

});

gulp.task("run", ["default", "serve"], function() {

});
