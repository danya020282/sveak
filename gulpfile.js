const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

// Компиляция Pug → HTML
function html() {
  return gulp.src('./src/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
}

// SCSS → CSS + минификация
function css() {
  return gulp.src('./src/scss/main.scss')
    .pipe(sass().on('error', sass.logError)) // компиляция SCSS
    .pipe(cssnano())                        // минификация CSS
    .pipe(concat('main.css'))               // объединение (если нужно)
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
}

// JS → объединение и минификация
function js() {
  return gulp.src('./src/js/*.js')
    .pipe(concat('main.js'))                // объединяем JS-файлы
    .pipe(uglify())                         // минифицируем JS
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
}

// Копирование статики (без обработки!)
function copyAssets() {
  return gulp.src('./src/assets/**/*', { encoding: false }) // важно для картинок
    .pipe(gulp.dest('./dist/assets'))
    .pipe(browserSync.stream());
}

// Локальный сервер с автообновлением
function serve() {
  browserSync.init({
    server: './dist'
  });

  gulp.watch('./src/*.pug', html).on('change', browserSync.reload);
  gulp.watch('./src/scss/**/*.scss', css).on('change', browserSync.reload);
  gulp.watch('./src/js/**/*.js', js).on('change', browserSync.reload);
  gulp.watch('./src/assets/**/*', copyAssets).on('change', browserSync.reload);
}

// Экспорт задач
exports.default = gulp.series(html, css, js, copyAssets, serve);