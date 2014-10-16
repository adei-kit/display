gulp = require('gulp');

gulp.task('copy', ['vendor', 'src']);

gulp.task('src', function() {
    return gulp.src(['src/css/**', 'src/fonts/**', 'src/images/katrin**.png'], {'base': './src'})
            .pipe(gulp.dest('build'));
});

gulp.task('vendor', function() {
    return gulp.src([
        './node_modules/ractive/ractive.min.**',
        './node_modules/jquery/dist/jquery.min.**' 
        ]).pipe(gulp.dest('vendor'));
});
