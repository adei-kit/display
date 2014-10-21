var gulp = require('gulp');

gulp.task('watch', [ 'setWatch', 'browserify' ], function() {
    gulp.watch('src/css/**', ['copy']);
    gulp.watch('src/fonts/**', ['copy']);
})
