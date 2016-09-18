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
  jsClientDependencies: 'src/client/lib/**/*.js',
  jsPath: './src/client/**/*.js',
  jsDependPath: './src/client/lib/**/*.js',
  jsDestDir: './public/js',
  serverJsPath: 'src/server/**/*.js'
};

const webpackConfig = {
  output: {
      path: __dirname + config.jsDestDir,
      filename: 'build.js'
  },
  module: {
    loaders: [
      { 
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};

gulp.task('dev', function() {
  livereload.listen({
    port: 18080
  });

  // Watch for clientside changes and run building tasks.
  gulp.watch([config.jsPath], ['js', 'lint']);
  gulp.watch([config.jsDependPath], ['jsClientDependencies']);

  gulp.watch([config.sassPath],['style']);

  // Watch for any changes on public files and live reload.
  gulp.watch('public/**', function(file) {
    livereload.changed(file.path);
  });
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

gulp.task('jsClientDependencies', function() {
  // First build in the dependencies.
  gulp.src(config.jsClientDependencies)
    .pipe(concat('dependencies.js'))
    .pipe(gulp.dest(config.jsDestDir));
});

// Build the js using webpack and pipe it into a build.js file in the public folder.
gulp.task('js', function() {
  // Build in the client code starting from the entry point.
  gulp.src(config.jsClientEntry)
    .pipe(webpack(webpackConfig))
    .on('error', function handleError() {
      this.emit('end'); // Recover from errors.
    })
    .pipe(concat('build.js'))
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

gulp.task('default', ['dev', 'server', 'js', 'style', 'jsClientDependencies']);