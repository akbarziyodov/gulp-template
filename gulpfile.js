var gulp         = require('gulp');
var cleancss     = require('gulp-clean-css');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync  = require('browser-sync');
var notify       = require('gulp-notify');
var concat       = require('gulp-concat');
var rename       = require('gulp-rename');
var uglify       = require('gulp-uglify');
var tinypng      = require('gulp-tinypng-free');


var paths = {
	html:['index.html'],
	sass:['app/assets/scss/**/*.scss'],
	script:['app/assets/js/*']
};

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: "app"
		},
		port: 8082,
		open: true,
		notify: false
	});
});

gulp.task('html', function(){
	gulp.src(paths.html)
	.pipe(reload({stream:true}));
});

gulp.task('sass', function(){
	return gulp.src('app/assets/scss/**/*.scss')
	.pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } }))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload( {stream: true} ))
	});

gulp.task('js', function() {
	return gulp.src([
		'app/assets/js/jquery.js',
		'app/assets/js/bootstrap.js',
		'app/assets/js/wow.min.js',
		'app/assets/js/owl.carousel.min.js',
		])
	.pipe(concat('script.min.js'))
	.pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload( {stream: true} ))
});


gulp.task('tinypng', function() {
    gulp.src('app/assets/img/*')
        .pipe(tinypng({}))
        .pipe(gulp.dest('app/img'));
});

gulp.task('watch', ['sass', 'js', 'tinypng', 'browser-sync'], function(){
	gulp.watch(paths.sass, ['sass']);
	gulp.watch(paths.script, ['js'], browserSync.reload);
	gulp.watch('app/*.html', browserSync.reload)
});
gulp.task('default', ['watch']);
