/* browserify task
   ---------------
   Bundle javascripty things with browserify!

   If the watch task is running, this uses watchify instead
   of browserify for faster bundling using caching.
*/

var browserify   = require('browserify');
var ractify      = require('ractify');
var watchify     = require('watchify');
var bundleLogger = require('../util/bundleLogger');
var gulp         = require('gulp');
var handleErrors = require('../util/handleErrors');
var source       = require('vinyl-source-stream');


gulp.task('browserify', function() {

    var appsrc;

    switch (global.app) {
        case 'katrin':
            appsrc = './src/js/app_katrin.js';
            break;
        case 'bess':
            appsrc = './src/js/app_bess.js';
            break;
        default:
            appsrc = './src/js/app.js';
    }

    var bundleMethod = global.isWatching ? watchify : browserify;

    var bundler = bundleMethod({
        // Specify the entry point of your app
        //entries: ['../static/js/default/index.js'],
        entries: [ appsrc ],
        //entries: ['../static/js/default.js', '../static/js/default/index.js'],
        // Add file extentions to make optional in your requires
        extensions: ['.js']
    });

    bundler.transform({ extension: 'html' }, ractify);
    //bundler.plugin('minifyify', {map: 'bundle.map.json'});

    var bundle = function() {
        // Log when bundling starts
        bundleLogger.start();

        return bundler
            .bundle({debug: true})
            // Report compile errors
            .on('error', handleErrors)
            // Use vinyl-source-stream to make the
            // stream gulp compatible. Specifiy the
            // desired output filename here.
            .pipe(source('bundle.js'))
            // Specify the output destination
            .pipe(gulp.dest('./build/'))
            // Log when bundling completes!
            .on('end', bundleLogger.end);
    };

    if(global.isWatching) {
        // Rebundle with watchify on changes.
        bundler.on('update', bundle);
    }

    return bundle();
});

