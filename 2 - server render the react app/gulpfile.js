var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var nodemon = require('gulp-nodemon');
 
gulp.task('build', function() {
	gulp.src('client/main.js')
		.pipe(browserify({
			transform: ['babelify']
		}))
		.pipe(rename('app.js'))
		.pipe(gulp.dest('./public/js'))
});

gulp.task('nodemon', function () {

	nodemon({
		script: 'app.js',
		ext: 'js jsx',
		delay: 1000,
		ignore: [
			'gulp/**/*',
			'public/**/*',
			'node_modules/**/*',
			'tests/**/*',
			'tmp/**/*',
			'logs/**/*',
			'uploads/**/*'
		]
	})
	.on('restart', function (files) {
		console.log('Change detected:', files);
	});
});

gulp.task('watch', function () {
	gulp.watch(['./client/**/*.jsx', './client/**/*.js'], ['build']);
});
 
gulp.task('default', ['build', 'watch', 'nodemon']);