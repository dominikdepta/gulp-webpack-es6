/**
 * PLUGINS
 */
const gulp          = require('gulp');
const $             = require('gulp-load-plugins')();
const browserSync   = require('browser-sync').create();

/**
 * CONFIG
 */
let config = {

    // Browser Sync
    browserSync: {
        server: {
            baseDir: ['./src', './.tmp']
        }
    },

    // Webpack
    webpack: require('./webpack.config.js')
};

/**
 * TASKS
 */

// Default
gulp.task('default', ['serve']);

// Watch
gulp.task('serve', ['js'], () => {
    browserSync.init(config.browserSync);

    gulp.watch('./src/*.html').on('change', browserSync.reload);
    gulp.watch('src/js/**/*.js', ['js']);
});

// JavaScript
gulp.task('js', () => {
    return gulp.src('./src/js/index.js')
        .pipe($.plumber())
        .pipe($.webpack(config.webpack))
        .pipe(gulp.dest('./.tmp/js/'))
        .pipe(browserSync.stream());
});

// TODO: js:build task
gulp.task('js:build', () => {});

// Build
// TODO: build task
// 1. Bundle.js to ./dist/js (js:build task)
// 2. Useref
// 3. index.html to ./dist
gulp.task('build', () => {

});