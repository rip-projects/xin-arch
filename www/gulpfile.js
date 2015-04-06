var path = require('path'),
    gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    compass = require('gulp-compass'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css');

gulp.task('js', function() {

    var vendor = [
        "./vendor/jquery/dist/jquery.min.js",
        "./vendor/underscore/underscore-min.js",
        "./vendor/backbone/backbone-min.js",
        "./vendor/localforage/dist/localforage.min.js",
        "./vendor/touchswipe/jquery.touchSwipe.min.js",
        "./vendor/xin/js/xin.js"
    ];

    gulp.src(vendor)
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('css', function() {

    var css = [
        "./vendor/xin/css/xin.min.css",
        "./vendor/xin/css/xin-contrib.min.css",
        "./vendor/jacket-awesome/jacket-awesome.css",
        "./vendor/xin-theme/style/style.css",
        "./vendor/naked/css/naked.min.css"
    ];

    gulp.src(css)
        .pipe(concat('production.min.css'))
        .pipe(minifyCSS({keepBreaks: true}))
        .pipe(gulp.dest('./dist/css'));
});


gulp.task('move', function(){

    var filesToMove = [
            "./vendor/font-awesome/fonts/*.*"
        ];

  gulp.src(filesToMove)
  .pipe(gulp.dest('./dist/font-awesome/fonts'));

    filesToMove = [
            "./vendor/font-awesome/css/*.*"
        ];

  gulp.src(filesToMove)
  .pipe(gulp.dest('./dist/font-awesome/css'));

});

gulp.task('default', ['js', 'css', 'move']);
