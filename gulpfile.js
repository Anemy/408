const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint');
const livereload = require('gulp-livereload');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const webpack = require('webpack-stream');
const bower = require('gulp-bower');
const notify = require('gulp-notify');

const config = {
  sassPath: 'src/styles/**/*.scss',
  cssDestDir: 'public/css',
  jsClient: [
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/socket.io-client/socket.io.js',
    'bower_components/underscore/underscore-min.js',
    'src/client/index.js'
  ],
  jsPath: 'src/**/*.js',
  jsDependPath: 'src/client/lib/**/*.js',
  jsDestDir: 'public/js',
  clientJsPath: 'src/client/**/*.js',
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

var errorAlert = function(error) {
  notify.onError({message: error.message})(error); //Error Notification
  console.log(error.toString());//Prints Error to Console
  this.emit("end"); //End function
};

gulp.task('dev', function() {
  // livereload.listen({
  //   port: 18080
  // });

  gulp.watch([config.jsPath, 'index.js', 'gulpfile.js' /* That's me! */], ['lint']);

  // Watch for clientside changes and run building tasks.
  gulp.watch([config.clientJsPath], ['js']);

  // Watch for changes in the dependencies for clientside and build accordingly.
  gulp.watch([config.jsDependPath], ['jsClientDependencies']);

  gulp.watch([config.sassPath],['style']);

  // Watch for any changes on public files and live reload.
  gulp.watch('public/**', function(file) {
    livereload.changed(file.path);
  });
});

// JSLint
gulp.task('lint', function () {
  gulp.src(['**/*.js',
      '!node_modules/**' /* Ignore modules. */,
      '!**/lib/**' /* Ignore external libraries. */,
      '!public/**' /* Ignore built files. */])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format());
});

// SASS -> CSS
gulp.task('style', function() {
  gulp.src([config.sassPath])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.cssDestDir));
});

// Download bower dependencies
gulp.task('bower', function() {
  bower()
    .on('error', errorAlert)
    .pipe(gulp.dest('./bower_components'));
});

// Build the js using webpack and pipe it into a build.js file in the public folder.
gulp.task('js', function() {
  // Build in the client code starting from the entry point.
  gulp.src(config.jsClient)
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

gulp.task('default', ['bower', 'js', 'dev', 'server', 'style']);