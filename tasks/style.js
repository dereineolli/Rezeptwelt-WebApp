"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var cssGlobbing = require("gulp-css-globbing");

var config = require('../gulpfile.config').css;

gulp.task('style', function () {
     return gulp.src(config.file)
          .pipe(cssGlobbing({
               extensions: ['.css', '.scss'],
               ignoreFolders: ['../styles'],
               autoReplaceBlock: {
                    onOff: false,
                    globBlockBegin: 'cssGlobbingBegin',
                    globBlockEnd: 'cssGlobbingEnd',
                    globBlockContents: '../**/*.scss'
               },
               scssImportPath: {
                    leading_underscore: false,
                    filename_extension: false
               }
          }))
          .pipe(sass().on('error', sass.logError))
          .pipe(gulp.dest(config.dest));
});
