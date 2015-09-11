var path = require('path'),
    gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    compass = require('gulp-compass'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css'),
    gulpWatch = require('gulp-watch');


var js = [
        "./vendor/jquery/dist/jquery.min.js",
        "./vendor/underscore/underscore-min.js",
        "./vendor/backbone/backbone-min.js",
        "./vendor/xin/js/xin.js",
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
    ], jsExtensions = [
        "./vendor/hammerjs/hammer.min.js",
        "./vendor/jquery-hammerjs/jquery.hammer.min.js",
        "./vendor/jquery-mousewheel/jquery.mousewheel.min.js",
        "./vendor/tshirt-background/tshirt-background.js",
        "./vendor/owl-carousel/owl-carousel/owl.carousel.min.js",
        "./vendor/masonry/dist/masonry.pkgd.min.js"
    ], css = [
        "./vendor/lato/css/lato.css",   
        "./vendor/jacket-awesome/dist/css/jacket-awesome.css",
        "./vendor/xin/css/xin.min.css",
        "./vendor/xin/css/xin-contrib.min.css",
        "./vendor/naked-css/css/naked.css",
        "./css/main.css"
    ], cssExtensions = [
        "./vendor/owl-carousel/owl-carousel/owl.carousel.css",
        "./vendor/owl-carousel/owl-carousel/owl.transitions.css",
    ], fonts = [
        "./vendor/jacket-awesome/dist/fonts/*.*"
    ], font = [
        "./vendor/lato/font/*/*.*"
    ];


gulp.task('js', function() {
    gulp.src(js)
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./js'));
});

gulp.task('jsExtensions', function() {
    gulp.src(jsExtensions)
        .pipe(concat('extensions.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./js'));
});

gulp.task('css', function() {
    gulp.src(css)
        .pipe(concat('production.min.css'))
        .pipe(minifyCSS({keepBreaks: true}))
        .pipe(gulp.dest('./css'));
});

gulp.task('cssExtensions', function() {
    gulp.src(cssExtensions)
        .pipe(concat('extensions.min.css'))
        .pipe(minifyCSS({keepBreaks: true}))
        .pipe(gulp.dest('./css'));
});

gulp.task('fonts', function() {
    gulp.src(fonts)
    .pipe(gulp.dest('./fonts'));
});

gulp.task('font', function() {
    gulp.src(font)
    .pipe(gulp.dest('./font'));
});

gulp.task('watch', function() {
    gulp.watch(css, ['css']);
    gulp.watch(css, ['cssExtensions']);
    gulp.watch(js, ['js']);
    gulp.watch(js, ['jsExtensions']);
});

gulp.task('default', ['js', 'jsExtensions', 'css', 'cssExtensions', 'fonts', 'font', 'watch']);
