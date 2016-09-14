const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const jshint = require('gulp-jshint');
const livereload = require('gulp-livereload');
const concat = require('gulp-concat');
const wrapper = require('gulp-wrapper');

const config = {
  sassPath: './src/styles',
  cssDestDir: './build/assets/css',
  jsPath: './src/client/**/*.js',
  jsDevDir: './public/js',
  jsDestDir: './build/assets/js',
}

gulp.task('dev', function() {
  // Watch for clientside changes and run building tasks.
  gulp.watch(['src/client/js/**/*.js'], ['js', 'lint']);
  gulp.watch(['src/client/**/*.html'], ['js']);
});

// JSLint
gulp.task('lint', function () {
  gulp.src('./**/*.js')
    .pipe(jshint());
});

// Build the js and pipe it into a build.js file in the public folder.
gulp.task('js', function() {
  gulp.src([config.jsPath])
    .pipe(concat('build.js'))
    // Wrap the code in a self excecuting function.
    .pipe(wrapper({
      header: '(function(){',
      footer: '})();'
    }))
    .pipe(gulp.dest(config.jsDevDir));
});

gulp.task('server', function() {
  // Watch for changes in server code and restart the server.
  nodemon({
    script: 'index.js',
    ext: 'js html',
    watch: ['src/server/**/*']
  })
    .on('restart', function() {
      setTimeout(function() {
        livereload.reload();
      }, 1000);
    });
});

gulp.task('default', ['dev', 'server']);