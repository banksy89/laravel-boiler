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

    /* Find out the width of the window and if a scrollbar take that away */
    function set_width() {

        if ($(window).width() >= 569) {

            $('.container').css('margin-left', $('.nav').width()+'px');

            if ($('.subnav-links').css('display') == 'block') {
                $('.container').css('margin-left', $('.subnav-links').width()+8+'px');
            }
        }
    }

    /* Create the function for when we resize the browser window */
    $(window).resize(function() {
       set_width();
       image_upload();
    });

    /* Trigger the function to react on resize */
    $(window).trigger('resize');

    function image_upload() {
        $('.image-upload__area i').css({
            'height': $('.image-upload__area').width(),
            'line-height': $('.image-upload__area').width()+'px',
            'width': $('.image-upload__area').width()
        });
    }
    
});