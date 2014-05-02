define(['Backbone'], function(){

    return Backbone.View.extend({

        initialize: function(){

        },
        
        el: $('body'),
        
        events: {
            //'click .js-toggle-nav'      : 'show_nav',
            //'click .js-toggle-subnav'   : 'show_subnav',
            'click .js-show-nav'        : 'show_nav',
            'click .js-toggle-subnav'   : 'toggle_subnav'
        },

        /*
        show_nav: function(e) {

            $(e.target).parent().next().slideToggle('normal');

            e.preventDefault();
        },

        show_subnav: function(e) {

            if ($(window).width() > 569) {
                var nav = $('.nav');
                var subnav = $('.nav__sublinks');
                var nav_height = nav.height();
                var subnav_height = subnav.height();

                subnav.hide();

                $(e.target).next().slideToggle('normal');

                if (nav.css('position') == 'fixed') {
                    $('.wrapper').animate({marginTop: nav_height + subnav_height + 'px'}, 500);
                } else {
                    $('header').animate({marginTop: subnav_height + 'px'}, 500);
                }

            } else {
                $(e.target).next().slideToggle('normal');
            }

            e.preventDefault();
        }
        */

        show_nav: function(e) {

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

            if ($(window).width() <= 568) {
                $('#js-'+area).slideToggle('fast');
            } else {
                $('.js-'+area).toggle(300);
                //$('.container').css('margin-left', );

                var elem = $('.nav'),
                    action = elem.attr('data-action');

                var actionOverwrite = 'open';

                var animation = {marginLeft: $('.nav').width()+8+'px'};

                if (action == 'open') {
                    animation = {marginLeft: 58+'px'};                
                    actionOverwrite = 'closed';
                } 
                  
                $('.container').animate(animation, 400, _.bind(function() {
                    elem.attr('data-action', actionOverwrite)
                }, this));
            }

            $('.subnav-list').hide();

            //Close all areas before opening
            this.close_all( area );

            e.preventDefault();
        },

        toggle_subnav: function( e ) {

            var target = e.target,
                area = $( target ).attr( 'data-area' ),
                actionOverwrite;

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
                    $('.nav-list__links').find('span').fadeIn(100);
                }
                else if( display == 'none' ) {
                    $( target ).removeClass( 'active' );
                }
            });

            if ($(window).width() >= 569) {
                var elem = $('.nav'),
                    action = elem.attr('data-action');

                if (action == 'closed') {
                    var animation = {marginLeft: $('.nav').width()+'px'};
                }

                if (action == 'closed') {
                    actionOverwrite = 'open';
                }
                  
                $('.container').animate(animation, 400, _.bind(function() {
                    elem.attr('data-action', actionOverwrite)
                }, this));
            }

            //Close all areas before opening
            this.close_all( area );

            e.preventDefault();
        },

        close_all: function( clicked_area ) {

            var buttons = $( '.js-show, js-toggle' ),
                width = $( window ).width();

            for( var i = 0; i < buttons.length; i++ ) {

                var area = $( buttons[i] ).attr( 'data-area' ),
                    area_el = $( '#js-' + area );

                if( area_el.css( 'display' ) == 'block' && clicked_area != area ) {

                    if( width > 569 && area != 'search-input' ) {
                        //area_el.slideUp( 'fast' );
                    }
                    else if( width <= 568 ) {
                        area_el.slideUp( 'fast' );
                    }
                }
            }
        }
    })
});