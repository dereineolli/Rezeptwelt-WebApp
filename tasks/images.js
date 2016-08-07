var gulp = require("gulp");
var config = require('../gulpfile.config');

gulp.task('image', ["favicon"], function(){

    /*
    Maybe for later?

    return gulp.src([config.images.src])
        .pipe(gulp.dest(config.images.dest));*/
});


gulp.task('favicon', function(){
    return gulp.src([config.images.favicon.src])
        .pipe(gulp.dest(config.images.favicon.dest));
});