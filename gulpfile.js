var gulp = require('gulp');


var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

// JS concat, strip debugging and minify
gulp.task('default', function() {
    gulp.src(['./src/js/jquery.min.js','./src/js/bootstrap.js','./src/js/bootstrapValidator.min.js','./src/js/jquery.easing.1.3.js','./src/js/main.js'])
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./js/'));

    gulp.src(['./src/css/bootstrap.min.css','./src/css/bootstrapValidator.css','./src/css/devicons.css','./src/css/font-awesome.min.css','./src/css/main.css'])
        .pipe(concat('styles.css'))
        .pipe(autoprefix('last 2 versions'))
        .pipe(minifyCSS({
            keepSpecialComments: 0
        }))
        .pipe(gulp.dest('./css/'));


    gulp.src('./src/index.html')
        .pipe(minifyHTML({
            conditionals: true,
            spare:true
        }))
        .pipe(gulp.dest('./'));


    gulp.src('./src/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./img'));
});