/**
 * PLUGINS
 */
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const browserSync = require('browser-sync').create();

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
    webpack: {
        output: {
            filename: 'bundle.js'
        },

        devtool: 'source-maps',

        module: {
            loaders: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }]
        }
    },

    // Sass
    sass: {
        outputStyle: 'expanded'
    }
};

/**
 * TASKS
 */

// Default
gulp.task('default', ['sass', 'js', 'serve']);

// Watch
gulp.task('serve', () => {
    browserSync.init(config.browserSync);

    gulp.watch('./src/*.html').on('change', browserSync.reload);
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/sass/**/*.scss', ['sass']);
});

// JavaScript
gulp.task('js', () => {
    return gulp.src('./src/js/index.js')
        .pipe($.plumber())
        .pipe($.webpack(config.webpack))
        .pipe(gulp.dest('./.tmp/js/'))
        .pipe(browserSync.stream());
});

gulp.task('sass', () => {
    return gulp.src('./src/sass/**/*.scss')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass(config.sass))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('./.tmp/css/'))
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