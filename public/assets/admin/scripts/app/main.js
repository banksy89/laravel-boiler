requirejs.config({
    paths: {
        Backbone: '../utils/backbone',
        jquery: '../utils/jquery',
        jqueryui: '../utils/jqueryui',
        bxslider: '../utils/jquery.bxslider'
    },
    shim: {
        'Backbone': {
            deps: ['../utils/lodash', 'jquery'], // load dependencies
            exports: 'Backbone' // use the global 'Backbone' as the module value
        }
    }
});

require( [ '../views/Validation','../views/mobilenav','../views/Helpers','../views/Wysiwyg', '../views/Listing', '../views/Tabs', '../utils/uploader/main', 'browser-config', 'save-ajax' ], function( Validation, MobileNav, Helpers, Wysiwyg, Listing ) {

    var validate = new Validation(),
        Helpers = new Helpers(),
        MobileNav = new MobileNav(),
        Wysiwyg = new Wysiwyg(),
        Listing = new Listing();

});

define(['jquery'], function($) {
    
    function image_upload() {
        $('.image-upload__area i').css({
            'height': $('.image-upload__area').width(),
            'line-height': $('.image-upload__area').width()+'px',
            'width': $('.image-upload__area').width()
        });
    }

});