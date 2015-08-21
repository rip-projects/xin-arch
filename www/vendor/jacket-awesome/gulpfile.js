var gulp = require('gulp'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    minifyCSS = require('gulp-minify-css');

gulp.task('css', function() {
    gulp.src('./vendor/font-awesome/css/font-awesome.css')
        .pipe(replace('fa-', 'xn-'))
        .pipe(replace('fa-', 'xn-'))
        .pipe(replace('.fa', '.xn'))
        .pipe(rename("jacket-awesome.css"))
        .pipe(gulp.dest('dist/css'));

    gulp.src('./vendor/font-awesome/css/font-awesome.css')
        .pipe(replace('fa-', 'xn-'))
        .pipe(replace('.fa', '.xn'))
        .pipe(minifyCSS())
        .pipe(rename("jacket-awesome.min.css"))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('fonts', function() {
    gulp.src('./vendor/font-awesome/fonts/**/*.*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('default', ['css', 'fonts']);
