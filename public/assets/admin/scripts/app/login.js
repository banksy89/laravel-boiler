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

require(['../views/Validation', '../views/Helpers', 'jquery'], function(Validation, Helpers, $) {

    var validate = new Validation(),
        Helpers = new Helpers();

    /**
     * Handles the interaction of the 
     * login/forgotten password forms
     */
    $('.js-forgot').on('click', function(e) {

        var elem = $(e.target);
        var action = elem.attr('data-action');

        elem.parent().fadeOut(function() {
            $('.js-'+action).fadeIn();
        });

    });

    /**
     * This click event handles both the login
     * and forgotten password using two buttons with one class
     * to determine which action to take
     */
    $('.js-action-btn').on('click', function(e) {
        
        var btn = $(e.target);
        var action = btn.attr('data-action');
        var inputs = {};
        var formId = action+'-form';
        var alertMsg = $('.js-alert');

        $('#'+formId+' .form__input--login').each(function(i, input){
           inputs[input.name] = input.value;
        });
        
        $.ajax({ url: window.site_path + 'admin/login/'+action,
                 data: inputs,
                 type: 'POST',
                 dataType: 'JSON',
                 success: function (data) {
                    
                    // If the action is successful
                    if (data.status == 200) {

                        if (action == 'login') {
                            $('#'+formId).submit();
                        } else {
                            alertMsg.removeClass('alert--error').addClass('alert--success');
                            $('.js-alert-msg').html(data.msg);
                            alertMsg.fadeIn();
                        }

                    } else {

                        // Otherwise display an error message
                        if (alertMsg.hasClass('alert--success')) {
                            alertMsg.removeClass('alert--success').addClass('alert--error');
                        }

                        $('.js-alert-msg').html(data.msg);

                        alertMsg.fadeIn();
                    }
                }
        });

        e.preventDefault();
    });


});