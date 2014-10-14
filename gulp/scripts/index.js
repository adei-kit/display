var fs = require('fs');
var onlyScripts = require('./util/scriptFilter');
var tasks = fs.readdirSync('./scripts/tasks/').filter(onlyScripts);

tasks.forEach(function(task) {
    require('./tasks/' + task);
});

gulp = require('gulp');

gulp.task('default', ['watch']);
