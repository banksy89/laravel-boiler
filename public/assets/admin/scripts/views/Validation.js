define( [ 'Backbone' ], function() {

    /*****************************************************************************************************************

        To use:

            You will need to assign an ID onto the fields corresponding error message starting with: js-valid-
            With the ending being the same as the ID of the the field before it.

            To set a field to be required to be validated - you just need to use the HTML5 tag 'required' and the 
            javascript will detect this and do the relevent validation.

            To validate the type of field - for example email, telephone, text - you will need to specify this in the
            inputs type, which also makes the form HTML5 ready.

            So the final HTML example will be that of below:
            
                <input type="text" name="post[name]" id="name" required="true"/>
                <span id="js-valid-name">Name must not be empty</span>

                <input type="tel" name="post[tel]" id="tel" required="true"/>
                <span id="js-valid-tel">Tel must not be empty</span>

                <input type="Email" name="post[Email]" id="Email" required="true"/>
                <span id="js-valid-Email">Email must be valid</span>

            The submit button will need the class of 'js-submit button' - for it to trigger any validation.

    */

    return Backbone.View.extend({

        error: false,

        form_element: '#js-form',

        form: '',

        initialize: function() {
            this.form = $(this.form_element);
        },
        
        el: $('body'),
        
        events: {
            'click .js-submit-form'        : 'process_form',
            'keyup .js-force-numeric'      : 'force_numeric',
            'keyup input'                  : 'validate_on_key_up',
            'change select'                : 'validate_on_key_up',
            'click input[type="checkbox"]' : 'validate_on_key_up'
        },

        /**
         * We need to validate on key up only if the error message is shown
         */
        validate_on_key_up: function( e ) {

            var target = e.target,
                error = $( target ).attr( 'data-error' );

            if( typeof error != 'undefined' ) {
                this.handle_field( target );
            }
        },

        /**
         * Forces user input to be numeric and above or equal to zero
         */
        force_numeric: function( e ) {

            var target = e.target;
            target.value = target.value.replace( /[a-zA-Z_]/, '' );

            if( $( target ).val() < 0 ) {
                $( target ).val( 0 );
            }

            e.preventDefault();
        },

        /**
         * Action to process the form, and do all validations
         * and submittions of the actual form
         */
        process_form: function(e) {

            var target = $(e.target);

            // If the submit button has a data-form attribute
            // we action a different form - this is to allow multiple
            // forms on one page
            if (!!target.attr('data-form')) {
                this.form_element = '#'+target.attr('data-form');
                this.form = $( this.form_element );
            }
            
            this.validate_fields();

            if (this.error) {
                $("html, body").animate({ scrollTop: this.form.offset().top-200 }, 300);
                e.preventDefault();
            } else {
                //$("html, body").animate({ scrollTop: this.form.offset().top }, 300);
            }

            //Added for testing purposes
            //e.preventDefault();
        },

        /**
         * Loop through the associated forms inputs ( including select )
         * and trigger to validate each individual input
         */
        validate_fields: function() {

            this.error = false;

            $(this.form_element+' input, ' + this.form_element+' select, ' + this.form_element + ' textarea' ).each(_.bind(function(input, item) {

                this.handle_field(item);

            }, this));
        },

        /**
         * Handles a given input object and validates
         * the field against what type of field it is.
         *
         * This sets the object property this.error to the result
         * of the validation
         * 
         * @param object item
         */
        handle_field: function(item) {

            var input = $( item ),
                input_id = input.attr( 'id' ),
                group = input.attr( 'data-group' ),
                group_defined = typeof group != 'undefined',
                error = false,
                match = input.attr( 'data-match' ),
                type = input.attr('data-type');

            /**
             * If the ID is undefined then the input must be part of a group
             * so we will need the data-group attribute instead
             */
            if( !input_id || typeof input_id == 'undefined' ) {
                input_id = group;
            }

            /**
             * If there is a data-group we need to make sure everything in
             * the group has a value associated
             */
            if( group_defined == true ) {
                this.validate_group( group );
            }

            /**
             * If there is a match we need to check both corresponding fields
             */
            if( !!match ) {
                this.validate_match( type );
            }
            
            // Relies on the input having the id set - to target the correct error message
            var error_message = $( '#js-valid-' + input_id );

            var value = input.val();
            var valid = true;

            if (!!input.attr('required')) {

                // First check the field is never empty
                valid = this.validate_empty(value);
            }

            switch ( type ) {
                case 'email':

                    var format_error = $( '#js-' + input_id + '-format' );

                    if( this.validate_email(value) === false && !!value ) {
                        format_error.show();
                        this.error = true;
                        error = true;
                    }
                    else {
                        format_error.hide();
                    }

                break;

                case 'tel':

                    var phone_error = $( '#js-' + input_id + '-format' );

                    if( this.validate_number(value) === true && !!value ) {
                        phone_error.show();
                        this.error = true;
                        error = true;
                    }
                    else {
                        phone_error.hide();
                    }

                break;

                case 'checkbox':
                    valid = this.validate_checkbox(input);
                break;

                case 'over-18' :
                    var over_18_error = $( '#js-over-18-error' );

                    if( this.validate_over_18( input ) === false ) {
                        over_18_error.show();
                        this.error = true;
                        error = true;
                    }
                    else {
                        over_18_error.hide();
                    }

                break;

                case 'postcode':

                    var postcode_error = $( input ).parent().nextAll( '#js-' + input_id + '-format' );

                    if( this.validate_postcode( group ) === false && !!value ) {
                        postcode_error.show();
                        this.error = true;
                        error = true;
                    }
                    else {
                        postcode_error.hide();
                    }

                break;

                case 'password' :

                    var password_error = $( '#js-' + input_id + '-format' );

                    if( this.validate_password( value ) === false && !!value ) {
                        password_error.show();
                        this.error = true;
                        error = true;
                    }
                    else {
                        password_error.hide();
                    }

                break;
            }

            if (!valid) {
                error_message.css('display', 'block');
                this.error = true;
                error = true;
            } else {
                error_message.hide();
            }

            if( error === true ) {
                this.add_error_attr( input );
                $( '.js-ajax-loader' ).hide();
                $( '#js-ajax-loader' ).hide();
            }
            else {
                this.remove_error_attr( input );
            }
        },

        add_error_attr: function( input ) {

            $( input ).attr( 'data-error', 'true' );
        },

        remove_error_attr: function( input ) {

            $( input ).removeAttr( 'data-error' );
        },

        validate_match: function( type ) {

            var items = $( '.js-' + type ),
                l = items.length,
                pass = true,
                values = [],
                error = $( '#js-' + type + '-match' );

            for( var i = 0; i < l; i++ ) {
                values.push( $( items[ i ] ).val() );
            }

            if( type == 'email' ) {
                if( !!values[1] &&  values[0] != values[1]) {
                    pass = false;
                }
            }
            else {
                if( values[0] != values[1] ) {
                    pass = false;
                }
            }

            if( pass == false ) {
                this.error = true;
                error.show();
            }
            else {
                error.hide();
            }
        },

        validate_password: function( value ) {

            var pass = true,
                regex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;

            if( value.length < 6 ) {
                pass = false;
            }

            if( regex.test( value ) === false ) {
                pass = false;
            }

            return pass;
        },

        /**
         * Validate that a field is not empty
         *
         * @param string value - the value of the input
         * @return boolean
         */
        validate_empty: function(value) {
            return (value !== "");
        },

        /**
         * Validates whether a checkbox field has been ticked
         *
         * @param object input
         * @return boolean
         */
        validate_checkbox: function(input) {
            return (input.attr('checked') == 'checked');
        },

        /**
         * Validates that a field value is a number
         *
         * @param string value
         * @return boolean
         */
        validate_number: function(value) {
            value = value.replace(',', '');
            return isNaN( value.replace( ' ', '' ) );
        },

        /**
         * Validates a field against a email valid regex 
         *
         * @param string value
         * @return boolean
         */
        validate_email: function(value) {
            return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value);
        },

        /**
         * Validates a group of inputs to make sure they all have a value
         * 
         */
        validate_group: function( group ) {

            var group_items = $( '[data-group="' + group + '"]' ),
                l = group_items.length,
                pass = true,
                error = $( '#js-valid-' + group );

            for( var i = 0; i < l; i++ ) {
                var value = $( group_items[i] ).val();

                if( !value ) {
                    pass = false;
                }
            }

            if( pass === false ) {
                error.show();
                this.error = true;
            }
            else {
                error.hide();
            }
        },

        validate_over_18: function( input ) {

            var day = $( '[data-dob="day"]' ).find( ':selected' ).val(),
                month = $( '[data-dob="month"]' ).find( ':selected' ).val(),
                year = $( '[data-dob="year"]' ).find( ':selected' ).val(),
                pass = true;

            var age = this.get_age( month + '/' + day + '/' + year );
            
            if( age < 18 ) {
                pass = false;
            }

            return pass;
        },

        get_age: function( dateString ) {
            var today = new Date();
            var birthDate = new Date(dateString);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        },

        /**
         * The postcode will always be in two sections so we have to get those sections
         * before passing it to the regular expression
         *
         * @param string postcode
         *
         * @return bool
         */
        validate_postcode: function( group ) {

            var postcodes = $( '[data-group="' + group + '"]' ),
                c = postcodes.length,
                postcode = '';

            for( var i = 0; i < c; i++ ) {
                postcode += $( postcodes[ i ] ).val();
            }

            postcode = postcode.replace(/\s/g, "");
            var regex = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i;

            return regex.test( postcode );
        }
    });
});