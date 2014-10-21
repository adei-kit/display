var gulp = require('gulp');
var changed = require('gulp-changed');

var dest = './vendor';

gulp.task('vendor', function() {
    return gulp.src([
        './node_modules/jquery/dist/jquery.min.**' 
        ])
        .pipe(changed(dest))
        .pipe(gulp.dest(dest));
});


