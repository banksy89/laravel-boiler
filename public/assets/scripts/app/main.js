requirejs.config({
    urlArgs: "bust=" + (new Date()).getTime(), // Prevent cache the javascript files
    paths: {
        Backbone: '../utils/backbone',
        jquery: '../utils/jquery'
    },
    shim: {
        'Backbone': {
            deps: ['../utils/lodash', 'jquery'], // load dependencies
            exports: 'Backbone' // use the global 'Backbone' as the module value
        }
    }
});

require(['../views/Example'], function (Example) {

    var example = new Example();

});