var gulp = require('gulp');
var changed = require('gulp-changed');

var dest = './vendor';

gulp.task('vendor', function() {
    return gulp.src([
        './node_modules/jquery/dist/jquery.min.**',
        './node_modules/bootstrap/dist/css/bootstrap.min.css',
        './node_modules/bootstrap/dist/js/bootstrap.min.js'
    ]).pipe(changed(dest))
      .pipe(gulp.dest(dest));
});


