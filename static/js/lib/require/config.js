require.config({
    baseUrl: "{{=URL('static','js')}}",
    paths: {
        'jquery': 'jquery/jquery',
        'jqueryui': 'jquery/jquery-ui.min',
        'text': 'require/text',
        'domReady': 'require/domReady',
        'modules': 'modules',
        'templates': '../templates'
    }
});
