const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const jshint = require('gulp-jshint');
const livereload = require('gulp-livereload');

gulp.task('default', function() {
  console.log('Run \'gulp watch\' to watch for changes to live reload.');
});

gulp.task('lint', function () {
  gulp.src('./**/*.js')
    .pipe(jshint())
})

gulp.task('watch', function () {
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
})