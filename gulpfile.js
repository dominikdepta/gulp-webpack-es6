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

gulp.task('clean:dist', () => {
    return gulp.src('./dist/', {read: false})
        .pipe($.clean());
});

gulp.task('js:build', () => {
    return gulp.src('./src/js/index.js')
        .pipe($.webpack({
            output: config.webpack.output,
            module: config.webpack.module
        }))
        .pipe($.uglify())
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('sass:build', () => {
    return gulp.src('./src/sass/**/*.scss')
        .pipe($.sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('serve:dist', () => {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
});

gulp.task('html:build', () => {
    return gulp.src('./src/*.html')
        .pipe($.htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['clean:dist', 'js:build', 'sass:build', 'html:build']);