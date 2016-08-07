'use strict';

// Prequisites
var gulp = require('gulp');

var config = require('../gulpfile.config');

gulp.task('html', ['fonts'], function(){
    return gulp.src([config.html.src])
        .pipe(gulp.dest(config.html.dest));
});

gulp.task("fonts", function() {
    return gulp.src([config.font.src])
        .pipe(gulp.dest(config.font.dest));
});
