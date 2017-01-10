"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');

var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var eslint = require('gulp-eslint');

var config = {
  port: 9005,
  devBaseUri: 'http://localhost',
  paths: {
    html: './src/*.html',
    js: './src/**/*.js',
    dist: './dist',
    mainJs: './src/main.js'
  }
};

gulp.task('connect', function(){
  connect.server({
    root: ['dist'],
    port: config.port,
    base: config.devBaseUri,
    livereload: true
  });
});

gulp.task('open', ['connect'], function(){
  var options = {
    uri: config.devBaseUri + ':' + config.port,
    app: 'google-chrome'
  };
  gulp.src('./dist/index.html')
    .pipe(open(options));
});

gulp.task('html', function(){
  gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
    .pipe(connect.reload());
});

gulp.task('js', function(){
  browserify(config.paths.mainJs)
    .transform(reactify)
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(config.paths.dist + '/scripts'))
    .pipe(connect.reload());
});

gulp.task('lint', function(){
  return gulp.src(config.paths.js)
    .pipe(eslint({config: 'eslint.config.json'}))
    .pipe(eslint.format());
})

gulp.task('watch', function(){
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.js, ['js', 'lint']);
});

gulp.task('default', ['html', 'js', 'lint', 'open', 'watch']);
