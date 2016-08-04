var gulp = require('gulp');

var webpack = require('webpack-stream');

gulp.task('webpack', function() {
  return gulp.src('src/boot.ts')
    .pipe(webpack(require('../webpack.config.js')))
    .pipe(gulp.dest('dist/'));
});

