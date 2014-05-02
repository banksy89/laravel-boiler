define(['Backbone'], function(){

    return Backbone.View.extend({

        initialize: function(){

        },
        
        el: $('body'),
        
        events: {
            'click .js-toggle'        : 'toggle_area',
            'click .js-scroll'        : 'scroll_to_area',
            'submit .js-contact-form' : 'send_contact_form',
            'click .js-fade-close'    : 'fade_close',
            'click .js-show'          : 'show_area'
        },

        /**
         * Generic function to toggle an area
         *
         * Just add a attribute of data-area that contains the class of the area that needs to
         * to toggled on click
         */
        toggle_area: function( e ) {

            var target = e.target,
                area = $( target ).attr( 'data-area' );

            if( typeof area == 'undefined' ) {
                
                for( i = 0; i < 10; i++ ) {
                    var target = $( target ).parent(),
                        area = $( target ).attr( 'data-area' );

                    if( typeof area != 'undefined' ) {
                        break;
                    }
                }
            }

            $( '#js-' + area ).slideToggle( 'fast', function() {
                var display = $( '#js-' + area ).css( 'display' );

                if( display == 'block' ) {
                    $( target ).addClass( 'active' );
                }
                else if( display == 'none' ) {
                    $( target ).removeClass( 'active' );
                }
            });

            //Close all areas before opening
            this.close_all( area );

            e.preventDefault();
        },

        close_all: function( clicked_area ) {

            var buttons = $( '.js-toggle, .js-show' ),
                width = $( window ).width();

            for( var i = 0; i < buttons.length; i++ ) {

                var area = $( buttons[i] ).attr( 'data-area' ),
                    area_el = $( '#js-' + area );

                if( area_el.css( 'display' ) == 'block' && clicked_area != area ) {

                    if( width > 600 && area != 'search-input' ) {
                        //area_el.slideUp( 'fast' );
                    }
                    else if( width <= 568 ) {
                        area_el.slideUp( 'fast' );
                    }
                }
            }
        },

        scroll_to_area: function( e ) {

            var target = e.target,
                area = $( target ).attr( 'data-area' );

            $('.js-holder').animate({ scrollTop: $( '#js-' + area ).offset().top }, 800);

            e.preventDefault();
        },

        send_contact_form: function( e ) {

            var error = $( '.js-error' ).val();

            if( error == 0 ) {
                
                _gaq.push(['_trackEvent', 'Contact Forms', 'Send', window.contact_action]);
                
                var fields = $( e.target ).find( '.js-validate' ),
                    data = {};

                for( var i = 0; i < fields.length; i++ ) {

                    var name = $( fields[i] ).attr( 'data-type' ).replace( '-', '_' ),
                        val = $( fields[i] ).val();

                    data[ name ] = val;
                }

                //Also need to grab the hidden type
                data[ 'type' ] = $( '.js-contact-type' ).val();

                $('.js-contact-ajax').removeClass('hide');

                $.ajax({ url: window.site_path + 'pages/contact_send',
                         data: data,
                         type: 'POST',
                         dataType: 'JSON',
                         success: function( data ) {

                            if( !!data ) {
                                if( data[ 'data' ] == true ) {
                                    $( e.target ).hide();
                                    $( '.js-contact-success' ).show();
                                }
                                else {
                                    $( '.js-contact-failure' ).show();
                                }
                            }
                            else {
                                $( '.js-contact-failure' ).show();
                            }

                            $('.js-contact-ajax').addClass('hide');
                         }
                });
            }

            $("html, body").animate({ scrollTop: $('#js-form').offset().top - 100 }, 300);

            e.preventDefault();
        },

        fade_close: function(e) {

            $(e.target).parent().fadeOut(500);

            e.preventDefault();
        },

        show_area: function(e) {

            var target = e.target,
                area = $(target).attr('data-area');

            for( var i = 0; i < 10; i++ ) {
                if( !area ) {
                    var target = $( target ).parent(),
                        area = $( target ).attr( 'data-area' );
                }
                else {
                    break;
                }
            }

            $('#js-'+area).toggle();

            //Close all areas before opening
            this.close_all( area );

            e.preventDefault();
        }
    });
});