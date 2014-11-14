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
        "./js/vendor/modernizr.js",
        "./js/vendor/jquery.min.js",
        "./js/vendor/underscore-min.js",
        "./js/vendor/backbone-min.js",
        "./js/vendor/xin/js/xin.js",
        "./js/vendor/jquery.cookie.js",
        "./js/vendor/touchswipe.js"
    ];

    var data = [
        "./js/data/constant.js",
        "./js/data/data.js",
        "./js/data/lang.js",
        "./js/data/floor.js"
    ];

    var helper = [
        "./js/helper/plugins.js",
        "./js/helper/input.js",
        "./js/helper/dataTarget.js",
        "./js/helper/aside.js",
        "./js/helper/scroll.js",
        "./js/helper/swipeSwitcher.js",
        "./js/helper/map.js",
        "./js/helper/table.js",
        "./js/helper/popup.js",
        "./js/helper/touch.js",
        "./js/helper/toolbar.js"
    ];

    var collection = [
        "./js/collection/collection.js",
        "./js/model/model.js"
    ];

    var view = [
        "js/view/base.js",
        "js/view/overview.js",
        "js/view/list.js",
        "js/view/messages.js",
        "js/view/room.js",
        "js/view/unit.js",
        "js/view/manage.js",
        "js/view/addUnit.js",
        "js/view/iconUnit.js",
        "js/view/groupUnit.js",
        "js/view/login.js",
        "js/view/do.js"
    ];

    var api = [
        "./js/api/*.js"
    ];

    var app = [
        "./js/app/api.js",
        "./js/app/middleware.js",
        "./js/app/app.js",
        "./js/app/routes.js",
        "./js/app/init.js"
    ];

    gulp.src(vendor)
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));

    gulp.src(data)
        .pipe(concat('data.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));

    gulp.src(helper)
        .pipe(concat('helper.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));

    gulp.src(collection)
        .pipe(concat('collection.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));

    gulp.src(view)
        .pipe(concat('view.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));

    gulp.src(api)
        .pipe(concat('api.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));

    gulp.src(app)
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));

});

// gulp.task('lib', function() {
//     gulp.src('./bower_components/backbone/backbone-min.js')
//         .pipe(gulp.dest('./vendor'));

//     gulp.src('./bower_components/underscore/underscore-min.js')
//         .pipe(gulp.dest('./vendor'));

//     gulp.src('./bower_components/jquery/index.js')
//         .pipe(rename({
//             basename: 'jquery.min'
//         }))
//         .pipe(gulp.dest('./vendor'));
// });

gulp.task('css', function() {

    var css = [
        "./css/normalize.css",
        "./css/login.css",
        "./css/animate.css",
        "./css/sprite/icons.css",
        "./js/vendor/xin/css/xin.min.css",
        "./js/vendor/xin/css/xin-contrib.min.css",
        "./css/main.css"
    ];

    // gulp.src(css)
    //     // .pipe(compass({
    //     //     css: 'css',
    //     //     image: 'img',
    //     // }))
    //     .pipe(minifyCSS())
    //     .pipe(rename({
    //         suffix: ".min"
    //     }))
    //     .pipe(gulp.dest('./dist/css'));

    gulp.src(css)
        .pipe(concat('hive.min.css'))
        .pipe(minifyCSS({keepBreaks: true}))
        .pipe(gulp.dest('./dist/css'));

    // gulp.src(css)
    //     .pipe(concat('hive.min.css'))
    //     .pipe(minifyCSS())
    //     .pipe(gulp.dest('./dist/css'));


});

gulp.task('default', ['js', 'css']);
// gulp.task('default', ['js']);

// gulp.task('watch', ['default'], function() {
//     gulp.watch('src/**/*.js', ['js']);
//     gulp.watch('scss/**/*.scss', ['css']);
// });