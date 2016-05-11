var gulp = require('gulp-task-doc');
var install = require('gulp-install');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var shell = require('gulp-shell');
var pm2 = require('pm2');

// Show the help
gulp.task('help', gulp.help());

// Default task (start the server)
gulp.task('default', ["start"], function() {});


// Install all necessary resources to run the server
gulp.task('install', ['get-resources'], function() {
	return gulp.src(['./bower.json'])
		.pipe(install());
});

// Run necessary actions before the tests
gulp.task('pre-test', ['stop'], function() {
	return gulp.src(['app/*/*.js', 'app/*.js', '*.js'])
		// Covering files
		.pipe(istanbul())
		// Force `require` to return covered files
		.pipe(istanbul.hookRequire());
});

// Run tests
gulp.task('test', ['pre-test'], function() {
	return gulp.src(['test/*.js'])
		.pipe(mocha())
		.pipe(istanbul.writeReports()));
});

// Start the server
gulp.task('start', ['test'], function() {
	return pm2.connect(function(err) {
		if (err) console.log(err);
		pm2.start('app.js', function(err, app) {
			if (err) console.log(err);
			pm2.disconnect();
		});
	});
});

// Stop the server
gulp.task('stop', function() {
	return pm2.connect(function(err) {
		if (err) console.log(err);
		pm2.stop('all', function(err, proc) {
			if (err) console.log(err);
			pm2.disconnect();
		});
	});
});
