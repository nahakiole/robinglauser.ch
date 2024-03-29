var gulp = require('gulp');


var concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    autoprefix = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    minifyHTML = require('gulp-minify-html'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    minifyInline = require('gulp-minify-inline'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    purgecss = require('gulp-purgecss');


var paths = {
    css: [
        './src/font-awesome/css/font-awesome.css',
        './src/css/bootstrap.css',
        './src/css/devicons.css',
        './src/css/style.scss'
    ],
    js: [
        './src/js/jquery.js',
        './src/js/lazysizes.min.js',
        './src/js/creative.js'
    ],
    html: './src/index.html'
};

gulp.task('default', ['js', 'css', 'html', 'watch']);


gulp.task('js', function () {
    gulp.src(paths.js)
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./js/'));
});


gulp.task('css', function () {

    gulp.src(paths.css)
        .pipe(sass())
        .pipe(concat('styles.css'))
        .pipe(autoprefix('> 1%'))
        .pipe(minifyCSS({
            keepSpecialComments: 0
        })).pipe(purgecss({
            content: ['src/*.html']
        }))
        .pipe(gulp.dest('./css/'));

});


gulp.task('html', function () {

    gulp.src(paths.html)
        .pipe(minifyHTML({
            conditionals: true,
            spare: true
        })).pipe(minifyInline())
        .pipe(gulp.dest('./'));
});


gulp.task('watch', function () {
    gulp.watch([paths.html], ['html']);
    gulp.watch(paths.css, ['css']);
    gulp.watch(paths.js, ['js']);
});
