var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var jshint = require('gulp-jshint');
var browserify = require('browserify');
var babelify = require('babelify');
var vinylSourceStream = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');
var changed = require('gulp-changed');
var uglify = require('gulp-uglify');
var pump = require('pump');
var cleanCSS = require('gulp-clean-css');
var plumber = require('gulp-plumber');

gulp.task('sass', function() {
    return gulp.src('src/scss/main.scss')
        .pipe(plumber())
        .pipe(changed('dist/css/'))
        .pipe(sourcemaps.init())
        .pipe(sass.sync({
            outputStyle: 'expanded'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css/'))
});

gulp.task('lint', function(){
  return gulp.src('src/js/app.js')
  .pipe(jshint({esversion: 6}))
  .pipe(jshint.reporter('default'));
});

gulp.task('browserify', function() {
    var sources = browserify({
            entries: 'src/js/app.js',
            debug: true
        })
        .transform(babelify.configure({
            presets: ['es2015'],
            comments: true,
						compact: false
        }));

    return sources.bundle()
        .pipe(vinylSourceStream('app.js'))
        .pipe(vinylBuffer())
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('buildJs', function () {
  pump([
        gulp.src('dist/js/app.js'),
        uglify(),
        gulp.dest('dist/js')
    ]
  );
});

gulp.task('buildCss', function () {
  return gulp.src('dist/css/main.css')
     .pipe(cleanCSS({compatibility: 'ie8'}))
     .pipe(gulp.dest('dist/css/'));
});

gulp.task('default', function() {
    gulp.watch('src/js/**/*.js', ['browserify']);
    gulp.watch('src/js/**/*.js', ['lint']);
    gulp.watch('src/scss/**/*.scss', ['sass']);
});

gulp.task('build', ['buildJs', 'buildCss']);
