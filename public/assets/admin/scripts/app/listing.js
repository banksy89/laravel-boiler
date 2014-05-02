requirejs.config({
    paths: {
        Backbone: '../utils/backbone',
        jquery: '../utils/jquery',
        bxslider: '../utils/jquery.bxslider'
    },
    shim: {
        'Backbone': {
            deps: ['../utils/lodash', 'jquery'], // load dependencies
            exports: 'Backbone' // use the global 'Backbone' as the module value
        }
    }
});

require(['../views/Validation','../views/mobilenav','../views/Helpers','../views/Wysiwyg', '../views/Listing', '../views/Tabs' ], function(Validation, MobileNav, Helpers, Wysiwyg, Listing) {

    var validate = new Validation(),
        Helpers = new Helpers(),
        MobileNav = new MobileNav(),
        Wysiwyg = new Wysiwyg(),
        Listing = new Listing();
});

define(['jquery'], function($) {

    /* Mini plugin to help detect if scrollbar is used */
    (function($) {
        $.fn.hasScrollBar = function() {
            return this.get(0).scrollHeight > this.height();
        }
    })(jQuery);

    /* Function to find the width of the scrollbar */
    function getScrollbarWidth() {
        var div = $('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div></div>'); 
        $('body').append(div); 
        var w1 = $('div', div).innerWidth(); 
        div.css('overflow-y', 'auto'); 
        var w2 = $('div', div).innerWidth(); 
        $(div).remove(); 
        return (w1 - w2);
    }

    function image_upload() {
        $('.image-upload__area i').css({
            'height': $('.image-upload__area').width(),
            'line-height': $('.image-upload__area').width()+'px',
            'width': $('.image-upload__area').width()
        });
    }
    
    /* Create the function for when we resize the browser window */
    $(window).resize(function() {
       image_upload();
    });

    /* Trigger the function to react on resize */
    $(window).trigger('resize');

});