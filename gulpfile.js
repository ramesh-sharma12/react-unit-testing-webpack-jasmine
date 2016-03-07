'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var path = require('path');
var merge = require('merge-stream');
var runSequence = require('run-sequence');
var webpack = require('webpack');
var browserSync = require('browser-sync');
var pagespeed = require('psi');
var argv = require('minimist')(process.argv.slice(2));
var Server = require('karma').Server;
var react = require('gulp-react');

// Settings
var DEST = './build';                         // The build output folder
var RELEASE = !!argv.release;                 // Minimize and optimize during a build?

var src = {};
var watch = false;
var pkgs = (function () {
  var temp = {};
  var map = function (source) {
    for (var key in source) {
      temp[key.replace(/[^a-z0-9]/gi, '')] = source[key].substring(1);
    }
  };
  map(require('./package.json').dependencies);
  return temp;
}());

// Clean up
gulp.task('clean', del.bind(null, [DEST]));

// 3rd party libraries
gulp.task('vendor', function () {
  return merge(
    gulp.src('./node_modules/jquery/dist/**')
      .pipe(gulp.dest(DEST + '/vendor/jquery-' + pkgs.jquery)),
    gulp.src('./node_modules/bootstrap/dist/fonts/**')
      .pipe(gulp.dest(DEST + '/fonts'))
  );
});

// Static files
gulp.task('assets', function () {
  src.assets = 'src/assets/**';
  return gulp.src(src.assets)
    .pipe($.changed(DEST))
    .pipe(gulp.dest(DEST))
    .pipe($.size({title: 'assets'}));
});

// Images
gulp.task('images', function () {
    src.images = 'src/assets/images/**';
  return gulp.src(src.images)
    .pipe($.changed(DEST + '/images'))
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(DEST + '/images'))
    .pipe($.size({title: 'images'}));
});

// HTML pages
gulp.task('pages', function (cb) {
  src.pages = 'src/pages/**/*.html';
  return gulp.src(src.pages)
    .pipe($.changed(DEST))
    .pipe($.if(RELEASE, $.htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      minifyJS: true
    })))
    .pipe(gulp.dest(DEST))
    .pipe($.size({ title: 'pages' }));
  cb();
});

// CSS style sheets
gulp.task('styles', function (cb) {
    src.styles = 'src/less/*.less';
    return gulp.src(['src/assets/styles/bootstrap.less',
                    'node_modules/react-datepicker/dist/react-datepicker.css',
                    'src/less/base.less',
                    'src/less/todo.less'
    ])
    .pipe($.plumber())
    .pipe($.less({
      sourceMap: !RELEASE,
      sourceMapBasepath: __dirname
    }))
    .on('error', console.error.bind(console))   
    .pipe($.csscomb())
    .pipe($.if(RELEASE, $.minifyCss()))
    .pipe(gulp.dest(DEST + '/css'))
    .pipe($.size({ title: 'styles' }));
    cb();
});

// Bundle
gulp.task('bundle', function (cb) {
  var started = false;
  var config = require('./config/webpack.js')(RELEASE);
  var bundler = webpack(config);

  function bundle(err, stats) {
    if (err) {
      throw new $.util.PluginError('webpack', err);
    }

    !!argv.verbose && $.util.log('[webpack]', stats.toString({colors: true}));

    if (!started) {
      started = true;
      return cb();
    }
  }

  if (watch) {
    bundler.watch(200, bundle);
  } else {
    bundler.run(bundle);
  }
});

gulp.task('build-test', function () {
    return gulp.src('./src/**/*.jsx')
		.pipe(react())
		.pipe(gulp.dest('./build_jsx'));
});

// The default task
gulp.task('default', ['serve']);

// Build the app from source code
gulp.task('build', ['clean'], function (cb) {
  runSequence(['vendor', 'assets', 'images', 'pages', 'styles', 'bundle'], cb);
});


gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/tests/config/karma.conf.js',
    singleRun: false
  }, done).start();
});

// Launch a lightweight HTTP Server
gulp.task('serve', function (cb) {

  watch = true;

  runSequence('build', function () {
    browserSync({
      notify: false,
      // Customize the BrowserSync console logging prefix
      logPrefix: 'RSK',
      // Run as an https by uncommenting 'https: true'
      // Note: this uses an unsigned certificate which on first access
      //       will present a certificate warning in the browser.
      // https: true,
      server: DEST
    });

    gulp.watch(src.assets, ['assets']);
    gulp.watch(src.images, ['images']);
    gulp.watch(src.pages, ['pages']);
    gulp.watch(src.styles, ['styles']);
    gulp.watch(DEST + '/**/*.*', function (file) {
      browserSync.reload(path.relative(__dirname, file.path));
    });
    cb();
  });
});