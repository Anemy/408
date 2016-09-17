const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const jshint = require('gulp-jshint');
const livereload = require('gulp-livereload');
const concat = require('gulp-concat');
const wrapper = require('gulp-wrapper');
const sass = require('gulp-sass');
const webpack = require('webpack-stream');
const path = require('path');

const config = {
  sassPath: './src/styles/**/*.scss',
  cssDestDir: './public/css',
  jsClientEntry: './src/client/index.js',
  jsPath: './src/client/**/*.js',
  jsDestDir: './public/js',
  serverJsPath: './src/server/**/*'
};

const webpackConfig = {
  output: {
      path: __dirname + config.jsDestDir,
      filename: 'build.js'
  },
  module: {
    loaders: [
      { 
        test: /\.js$/,// path.join(__dirname, 'es6'),
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
        // test: /\.js$/, include: __dirname + '/app', loader: "babel-loader"
      }
    ]
  }
};

gulp.task('dev', function() {
  // Watch for clientside changes and run building tasks.
  gulp.watch([config.jsPath], ['js', 'lint']);
  gulp.watch(['src/client/**/*.html'], ['js']);

  gulp.watch([config.sassPath],['style']);
});

// JSLint
gulp.task('lint', function () {
  gulp.src('./**/*.js')
    .pipe(jshint());
});

// SASS -> CSS
gulp.task('style', function() {
  gulp.src([config.sassPath])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.cssDestDir));
});

// Build the js using webpack and pipe it into a build.js file in the public folder.
gulp.task('js', function() {
  gulp.src(config.jsClientEntry)
    .pipe(webpack(webpackConfig))
    .on('error', function handleError() {
      this.emit('end'); // Recover from errors.
    })
    .pipe(gulp.dest(config.jsDestDir));
});

gulp.task('server', function() {
  // Watch for changes in server code and restart the server.
  nodemon({
    script: 'index.js',
    ext: 'js html',
    watch: [config.serverJsPath, 'index.js']
  })
    .on('restart', function() {
      setTimeout(function() {
        livereload.reload();
      }, 1000);
    });
});

gulp.task('default', ['dev', 'server', 'js', 'style']);