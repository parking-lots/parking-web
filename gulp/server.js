'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var connect = require('gulp-connect');
var util = require('util');

var proxyMiddleware = require('http-proxy-middleware');


gulp.task('serve', ['watch'], () => {
    connect.server({
        root:"./.tmp/serve"
    });
});
