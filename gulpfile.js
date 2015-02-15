var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    fs = require('fs'),
    del = require('del'),
    paths;

// read paths on load
readPaths()
function readPaths() {
  return paths = JSON.parse(fs.readFileSync('./assets.json', 'utf8'))
}

var isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('js', function() {
  del(['dist/**/*.js'])
  var stream = gulp.src(paths.js).
    pipe(plugins.concat('application.js'));

  if( !isDevelopment ) {
    stream = stream.pipe(plugins.uglify())
  }

  return stream.pipe(gulp.dest('dist/'));
});

gulp.task('css', function() {
  del(['dist/**/*.css'])
  var stream = gulp.src(paths.css).
    pipe(plugins.sass({outputStyle: isDevelopment ? 'nested' : 'compressed'})).
    on('error', function(err) { console.error("SCSS compile error:" + err.message); this.emit('end'); }).
    pipe(plugins.concat('application.css')).
    pipe(gulp.dest('dist/'));

  return isDevelopment ?
    stream.pipe(browserSync.reload({stream: true})) :
    stream;
})

gulp.task('img', function() {
  return gulp.src(paths.img, {base: 'app/img/'}).
    pipe(gulp.dest('dist/images/'));
})

gulp.task('rev', ['js', 'css', 'img'], function() {
  return gulp.src(['dist/**/*.css', 'dist/**/*.js'])
    .pipe(plugins.rev())
    .pipe(gulp.dest('dist'))
    .pipe(plugins.rev.manifest())
    .pipe(gulp.dest('dist'));
})

gulp.task('html', ['rev'], function() {
  var manifest = JSON.parse(fs.readFileSync('dist/rev-manifest.json', 'utf8'));

  return gulp.src(paths.html, {base: 'app/'}).
    pipe(plugins.htmlReplace({
      css: manifest['application.css'],
      js: {
        src: manifest['application.js'],
        tpl: '<script src="%s" async="async"></script>'
      }
    })).
    pipe(gulp.dest('dist'));
})
gulp.task('build', ['html'])

if( isDevelopment ) {
  var server = require('gulp-express'),
      browserSync = require('browser-sync');

  // Watches asset paths and reloads browser on changes
  gulp.task('watch', function() {
    setWatchers()

    // Restart process when gulpfile is changed
    gulp.watch('gulpfile.js', function() {
      console.log("Gulpfile changed, you should restart")
      process.exit(0)
    })

    // Reset paths and watchers when assets.json is changed
    gulp.watch('assets.json', function() {
      readPaths()
      setWatchers()
      gulp.run('build')
    })

    process.stdin.on('data', function(line) {
      if( line.toString() === "\n" ) {
        gulp.run('build')
      }
    })

    // (Re)sets watchers
    function setWatchers() {
      gulp.watch(paths.js, ['js', browserSync.reload])
      gulp.watch(paths.css, ['css']) // browserSync automatically reloads
      gulp.watch(paths.html, ['html', browserSync.reload])
      gulp.watch(paths.img, ['img', browserSync.reload])
    }
  })

  gulp.task('server', function() {
    server.run({
      file: 'index.js'
    })

    browserSync({
      proxy: 'localhost:3000',
      port: 5000
    })

    gulp.watch(['index.js'], [server.run])
  })
  gulp.task('default', ['build', 'server', 'watch'])
}
