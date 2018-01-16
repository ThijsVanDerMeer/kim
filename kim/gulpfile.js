var gulp 			= require('gulp'),
    sass 			= require('gulp-sass'),
    cleanCSS 		= require('gulp-clean-css'),
    notify 			= require('gulp-notify'),
    uglify          = require('gulp-uglify'),
    concat 			= require('gulp-concat');

gulp.task('styles', function() {
    gulp.src('client/src/styles/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(concat('all.min.css'))
        .pipe(gulp.dest('./client/dist/assets/css/'))
        .pipe(notify({ message: 'SCSS compile complete!' }));
});

gulp.task('scripts', function() {

    gulp.src([
        'client/src/framework/core.js',
        'client/src/framework/api.js',
        'client/src/framework/components/**/*.js',
        'client/src/framework/router.js'
    ])
    .pipe(concat('app.js'))
   // .pipe(uglify())
    .pipe(gulp.dest('./client/dist/framework/'))
    .pipe(notify({ message: 'Framework JS compile complete!' }));

});

gulp.task('default',function() {
   	gulp.start(['styles', 'scripts']);
    gulp.watch('client/src/styles/**/*.scss',['styles']);    
    gulp.watch('client/src/framework/**/**/*.js',['scripts']);

});