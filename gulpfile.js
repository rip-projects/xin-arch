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
        "./vendor/xin/js/xin.js"
    ];

    var js_extensions = [
        "./vendor/hammerjs/hammer.min.js",
        "./vendor/jquery-hammerjs/jquery.hammer.min.js",
        "./vendor/jquery-mousewheel/jquery.mousewheel.min.js",
        "./vendor/tshirt-background/tshirt-background.js",
        "./vendor/owl-carousel/owl-carousel/owl.carousel.min.js",
        "./vendor/masonry/dist/masonry.pkgd.min.js",
        "./vendor/tshirt-scroll/tshirt-scroll.js",
        "./vendor/tshirt-popup/tshirt-popup.js",
        "./js/collections/countries.js",
        "./js/api/db.js",
        "./js/app/constant.js",
        "./js/app/directives.js",
        "./js/app/middlewares.js",
        "./js/app/app.js",
        "./js/app/config.js",
        "./js/app/routes.js",
        "./js/app/init.js"
    ];

    gulp.src(vendor)
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));

    gulp.src(js_extensions)
        .pipe(concat('extensions.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('css', function() {

    var css = [
        "./vendor/xin/css/xin.min.css",
        "./vendor/xin/css/xin-contrib.min.css",
        "./vendor/jacket-awesome/dist/css/jacket-awesome.min.css",
        "./vendor/naked-css/css/naked.css"
    ];

    var css_extensions = [
        "./vendor/owl-carousel/owl-carousel/owl.carousel.css",
        "./vendor/owl-carousel/owl-carousel/owl.transitions.css",
        "./css/main.css"
    ];

    gulp.src(css)
        .pipe(concat('production.min.css'))
        .pipe(minifyCSS({keepBreaks: true}))
        .pipe(gulp.dest('./dist/css'));

    gulp.src(css_extensions)
        .pipe(concat('extensions.min.css'))
        .pipe(minifyCSS({keepBreaks: true}))
        .pipe(gulp.dest('./dist/css'));
});


gulp.task('move', function(){

    var filesToMove = [
            "./vendor/jacket-awesome/dist/fonts/*.*"
        ];

  gulp.src(filesToMove)
  .pipe(gulp.dest('./dist/fonts'));

    filesToMove = [
            "./vendor/jacket-awesome/dist/css/*.*"
        ];

  gulp.src(filesToMove)
  .pipe(gulp.dest('./dist/jacket-awesome/dist/css'));

});

gulp.task('default', ['js', 'css', 'move']);
