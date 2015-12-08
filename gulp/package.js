var gulp = require('gulp');
var tar = require('gulp-tar');
var conf = require('./conf');

gulp.task('package',  ['build'],  function () {
  return gulp.src('dist/**')
    .pipe(tar('parking-web.tar'))
    .pipe(gulp.dest(conf.paths.out));
});
