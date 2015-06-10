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
    css: ['./src/css/bootstrap.css', './src/css/bootstrapValidator.css', './src/css/devicons.css', './src/css/font-awesome.min.css', './src/css/main.css'],
    js: ['./src/js/jquery.min.js', './src/js/bootstrap.js', './src/js/bootstrapValidator.min.js', './src/js/jquery.easing.1.3.js', './src/js/main.js'],
    html: './src/index.html',
    images: './src/img/*'
};

gulp.task('default', ['js', 'css', 'html', 'img', 'watch']);


gulp.task('js', function () {
    gulp.src(paths.js)
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./js/'));
});


gulp.task('css', function () {

    gulp.src(paths.css)
        .pipe(concat('styles.css'))
        .pipe(autoprefix('last 2 versions'))
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


gulp.task('img', function () {

    gulp.src((paths.images))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./img'));
});

gulp.task('watch', function () {
    gulp.watch([paths.html], ['html']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.css, ['css']);
    gulp.watch(paths.js, ['js']);
});