var gulp = require('gulp');
var changed = require('gulp-changed');

var dest = './build';

gulp.task('copy', function() {
    return gulp.src(['src/css/**', 'src/fonts/**'], {'base': './src'})
            .pipe(changed(dest))
            .pipe(gulp.dest(dest));
});

var imgsrc;

switch (global.app) {
    case 'katrin':
        imgsrc = 'src/images/katrin**.png'
        break;
    case 'bess':
        imgsrc = 'src/images/katrin**.png'
}


gulp.task('img')

