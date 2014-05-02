requirejs.config({
    paths: {
        Backbone: '../utils/backbone',
        jquery: '../utils/jquery',
        jqueryui: '../utils/jqueryui'
    },
    shim: {
        'Backbone': {
            deps: ['../utils/lodash', 'jquery'], // load dependencies
            exports: 'Backbone' // use the global 'Backbone' as the module value
        }
    }
});

require(['../views/Validation','../views/mobilenav','../views/Helpers','../views/Wysiwyg', '../views/ProductView', 'browser-config', '../utils/uploader/main', 'save-ajax'], function(Validation, MobileNav, Helpers, Wysiwyg, ProductView ) {

    var validate = new Validation(),
        Helpers = new Helpers(),
        MobileNav = new MobileNav(),
        Wysiwyg = new Wysiwyg(),
        ProductView = new ProductView();

});