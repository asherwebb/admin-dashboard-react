var gulp = require('gulp'),
	browserSync = require('browser-sync').create();

var watchedFilesArray = [
	'build/app.js',
	'build/createUserBox.js',
	'build/dashboard.js',
	'build/hotelUser.js',
	'build/loginForm.js',
	'build/profileForm.js', 
	'index.html',
	'css/local.css'
];
gulp.task('browser-sync', function() {
	gulp.watch( watchedFilesArray ).on('change', browserSync.reload);
    browserSync.init({
        server: {
        	files: ['index.html'],
           baseDir: "./",
           directory: true
        }
    });
});
