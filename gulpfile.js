var gulp = require('gulp');


var concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    autoprefix = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    minifyHTML = require('gulp-minify-html'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    minifyInline = require('gulp-minify-inline'),
    watch = require('gulp-watch');

var paths = {
    css: ['./src/font-awesome/css/font-awesome.css', './src/css/animate.min.css', './src/css/bootstrap.css','./src/css/devicons.css', './src/css/creative.css'],
    js: ['./src/js/jquery.js', './src/js/bootstrap.js', './src/js/jquery.easing.min.js', './src/js/jquery.fittext.js', './src/js/wow.min.js', './src/js/classie.js','./src/js/github-stars.js', './src/js/creative.js'],
    html: './src/index.html',
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
        .pipe(concat('styles.css'))
        .pipe(autoprefix('> 1%'))
        .pipe(minifyCSS({
            keepSpecialComments: 0
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