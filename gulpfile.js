'use strict';

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    del = require('del'),
    browserSync = require('browser-sync').create();

gulp.task('watch', () => {
    browserSync.init({
        notify: false,
        server: {
            baseDir: './'
        }
    });

    watch('./index.html', () => {
        browserSync.reload();
    });

    watch('./scss/**/*.scss', () => {
        gulp.start('cssInject');
    });
});

gulp.task('cssInject', ['compileSass'], () => {
    return gulp.src('./css/application.css')
        .pipe(browserSync.stream());
});

gulp.task('compileSass', () => {
    gulp.src('scss/application.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'));
});

// gulp.task('watchFiles', () => {
//     gulp.watch('scss/**/*.scss', ['compileSass']);
// });

// gulp.task('clean', () => {
//     del('dist');
// });

// gulp.task('build', ['compileSass'], () => {
//     return gulp.src(['css/application.css', 'index.html', 'img/**'], {base: './'})
//         .pipe(gulp.dest(['dist', 'css/application.css*']));
// });

// gulp.task('serve', ['watchFiles']);

// gulp.task('default', ['clean'], () => {
//     gulp.start('build');
// });