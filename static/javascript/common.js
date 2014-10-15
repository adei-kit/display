require.config({
    paths: {
        'helper': 'lib/helper',
        'backbone': 'lib/backbone-min',
        'underscore': 'lib/underscore-min',
        'jquery': 'lib/jquery/jquery',
        'jquery-ui': 'lib/jquery/jquery-ui.min',
        'domReady': 'lib/require/domReady',
        'text': 'lib/require/text',
        'json': 'lib/require/json',
        'highcharts': 'lib/highcharts/modules/exporting',
        'highcharts-theme': 'lib/highcharts/themes/dark-unica',
        'highcharts-module': 'lib/highcharts/highcharts',
        'config': '../config',
        'ractive': 'lib/ractive/ractive',
        'rvc': 'lib/ractive/plugins/rvc',
        'ractive-adaptors-backbone': 'lib/ractive/plugins/ractive-adaptors-backbone',
    },
    shim: {
        "highcharts-module": {
            "exports": "Highcharts",
            "deps": [ "jquery"] 
        },
        "highcharts-theme": {
            "deps": [ "highcharts-module" ]
        },
        "highcharts": {
            "deps": ["highcharts-module", "highcharts-theme"],
            "exports": "Highcharts"
        }
    }
});

