var ENV = process.env.APP_ENV || 'dev';
if (ENV === 'dev') {
  require('dotenv').load();
}

var gulp = require('gulp');
var ngConfig = require('gulp-ng-config');
var config = require('../config.js');
var fs = require('fs');
console.log(ENV);


gulp.task('ng-config', function() {
    console.log("Env2:", ENV);
 fs.writeFileSync('./config.json',
      JSON.stringify(config[ENV]));
  gulp.src('./config.json')
    .pipe(
      ngConfig('parkingLots', {
        createModule: false,
        wrap: "ESCONSTANT",
        pretty: true
      })
    )
    .pipe(gulp.dest('./src/app'))
});
