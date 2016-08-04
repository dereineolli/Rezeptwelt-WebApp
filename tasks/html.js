'use strict';

// Prequisites
var gulp = require('gulp');
var htmlreplace = require('gulp-html-replace');

var config = require('../gulpfile.config');

gulp.task('html', ['views', 'fonts'], function(){

});

// Gulp HTML Compiling
gulp.task('views', function () {
    return gulp.src([config.html.src])
        .pipe(gulp.dest(config.html.dest));
});

gulp.task("fonts", function() {
    return gulp.src([config.font.src])
        .pipe(gulp.dest(config.font.dest));
});
