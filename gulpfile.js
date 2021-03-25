var gulp           = require('gulp'),
		rigger				 = require('gulp-rigger'),
		sass           = require('gulp-sass'),
		browserSync    = require('browser-sync'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		del            = require('del'),
		imagemin       = require('gulp-imagemin'),
		cache          = require('gulp-cache'),
		autoprefixer   = require('gulp-autoprefixer'),
		notify         = require("gulp-notify");

// Пользовательские скрипты проекта

gulp.task('common-js:dev', function() {
	return gulp.src([
		'src/static/js/common.js',
		])
	.pipe(concat('common.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('src/assets/js'));
});

gulp.task('js:dev', ['common-js:dev'], function() {
	return gulp.src([
		'assets/libs/jquery/dist/jquery.min.js',
		'assets/libs/fancybox/dist/jquery.fancybox.min.js',
		'assets/libs/swiper/dist/js/swiper.min.js',
		'src/assets/js/common.min.js', // Всегда в конце
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Минимизировать весь js (на выбор)
	.pipe(gulp.dest('src/assets/js'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'src'
		},
		notify: false,
	});
});

gulp.task('sass:dev', function() {
	return gulp.src('src/static/scss/**/*.scss')
	.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleanCSS()) // Опционально, закомментировать при отладке
	.pipe(gulp.dest('src/assets/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('html:dev', function () {
	gulp.src('src/pages/*.html')
		.pipe(rigger())
		.pipe(gulp.dest('src/html'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('img:dev', function() {
	return gulp.src('src/static/img/**/*')
	.pipe(cache(imagemin())) // Cache Images
	.pipe(gulp.dest('src/assets/img'));
});

gulp.task('fonts:dev', function() {
	return gulp.src('src/static/fonts/**/*')
	.pipe(gulp.dest('src/assets/fonts'));
});

gulp.task('watch', ['fonts:dev','img:dev','sass:dev', 'js:dev', 'html:dev', 'browser-sync'], function() {
	gulp.watch(['src/static/scss/**/*.scss','src/pages/modules/**/*.scss'], ['sass:dev']);
	gulp.watch(['assets/libs/**/*.js', 'src/static/js/common.js'], ['js:dev']);
	gulp.watch(['src/pages/**/*.html', 'src/pages/modules/**/*.html'], ['html:dev']);
	gulp.watch('src/static/img/**/*', ['img:dev']);
});

gulp.task('js:build', function () {
	return gulp.src('src/assets/js/**/*.js')
		.pipe(gulp.dest('assets/js'));
});

gulp.task('css:build', function () {
	return gulp.src('src/assets/css/**/*.css')
		.pipe(gulp.dest('assets/css'));
});

gulp.task('img:build', function () {
	return gulp.src('src/assets/img/**/*')
		.pipe(gulp.dest('assets/img'));
});

gulp.task('htnl:build', function () {
	return gulp.src('src/html/*.html')
		.pipe(gulp.dest('html'));
});

gulp.task('fonts:build', function () {
	return gulp.src('src/assets/fonts/**/*')
		.pipe(gulp.dest('assets/fonts'));
});

gulp.task('build', ['htnl:build', 'img:build', 'css:build', 'js:build', 'fonts:build']);

gulp.task('removedist', function() { return del.sync('dist'); });
gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);
