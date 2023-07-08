const gulp = require('gulp');
// const imagemin = require('gulp-imagemin');
// import gulp from 'gulp'
// import imagemin from 'gulp-imagemin';
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));

/*
    -- TOP LEVEL FUNCTIONS --
    gulp.task - Define tasks
    gulp.src - Points to files to use and compile
    gulp.dest -- Points to folder to output
    gulp.watch -- Watch files and folders for changes
*/

gulp.task('message', async function () {
  return console.log('Gulp is running...')
});

// Copy all HTML files to dist folder
gulp.task('copyHTML', async function () {
  gulp.src('src/*.html').pipe(gulp.dest('dist'));
});

// Optimize images via imagemin
// the newest version does not support reqire any more
// gulp.task('imageMin', async function () {
//     gulp.src('src/img/*')
//     .pipe(imagemin())
//     .pipe(gulp.dest('dist/img'));
// });
// export default () => (
// 	gulp.src('src/images/*')
// 		.pipe(imagemin())
// 		.pipe(gulp.dest('dist/images'))
// );

// Minify the javascript files
gulp.task('minifyJS', async function () {
  gulp.src('src/js/*.js').pipe(uglify()).pipe(gulp.dest('dist/js'))
});

gulp.task('sass', async function () {
    gulp.src('src/sass/*.scss').pipe(sass().on('error', sass.logError)).pipe(gulp.dest('dist/css'))
});

gulp.task('default', ['message', 'copyHTML', 'minifyJS', 'sass']);
