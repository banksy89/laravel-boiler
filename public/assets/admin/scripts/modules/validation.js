/**
 * If you pass in $ as a parameter for the function then 
 * the tests will break because for some reason it makes
 * jquery undefined.
 */
define( [ '../modules/helpers', '../utils/jquery' ], function( Helpers ) {

	function Validation() {
		this.pass = true;
		this.helpers = new Helpers();
	}

	Validation.prototype.process = function( dom ) {

		var l = dom.length;

		for( var i = 0; i < l; i++ ) {
			var $ele = $( dom[ i ] ),
				value = $ele.val(),
				type = $ele.attr( 'data-type' ),
				second_type = $ele.attr( 'data-second-type' );

			if( this.helpers.check_null( value ) ) {
				this.pass = false;
				this.show_error( type );
			}
			else {
				this.hide_error( type );

				if( $( $ele ).hasClass( 'js-validate-email' ) ) {
					if( !this.email( value ) ) {
						this.pass = false;

						/**
						 * There could be more than one email field on the
						 * page so I ended up using the the data-type attribute to 
						 * add the class because this method will not break if DOM
						 * changes.
						 *
						 * This same technique will be used for everything that has
						 * null and format validation
						 */
						this.show_error( second_type );
					}
					else {
						this.hide_error( second_type );
					}
				}

				if( $( $ele ).hasClass( 'js-validate-phone' ) ) {
					if( !this.phone( value ) ) {
						this.pass = false;
						this.show_error( second_type );
					}
					else {
						this.hide_error( second_type );
					}
				}

				if( $( $ele ).hasClass( 'js-validate-password' ) ) {
					if( !this.password( value ) ) {
						this.pass = false;
						this.show_error( second_type );
					}
					else {
						this.hide_error( second_type );
					}
				}

				if( $ele.hasClass( 'js-match' ) ) {

					var matcher = $ele.attr( 'data-match' ),
						$matcher_ele = $( '.js-' + matcher );

					if( !this.check_match( value, $matcher_ele.val() ) ) {
						this.pass = false;
						this.show_error( matcher );
					}
				}
			}
		}
	}

	/**
	 * Sub function for Validation::process
	 * Shows a error message if a error type is passed in
	 *
	 * @param string type
	 */
	Validation.prototype.show_error = function( type ) {
		if( !!type ) {
			$( '.js-' + type + '-error' ).show();
		}
	}

	/**
	 * Sub function for Validation::process
	 * Hides the error message if the thing being validated has a value
	 *
	 * @param string type
	 */
	Validation.prototype.hide_error = function( type ) {
		if( !!type ) {
			$( '.js-' + type + '-error' ).hide();
		}
	}

	/**
	 * Sub function for Validation::process
	 * Checks if two inputs are the same
	 *
	 * @param string item
	 * @param string compare
	 */
	Validation.prototype.check_match = function( item, compare ) {

		var result = true;

		if( item != compare ) {
			result = false;
		}

		return result;
	}

	/**
	 * Checks the email variable is in the correct format by testing against the
	 * regular expression.
	 *
	 * @param string email
	 * @return boolean
	 */
	Validation.prototype.email = function( email ) {

		var regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
			result = true;

		if( regex.test( email ) == false ) {
			result = false;
		}

		return result;
	}

	/**
	 * Checks the password has is between 6 and 16 characters and
	 * make sure it is a mixture of letters and numbers
	 *
	 * @param string password
	 * @return boolean
	 */
	Validation.prototype.password = function( password ) {

		var l = password.length,
			result = true,
			number_regex =  /\d/;

		if( l < 6 || l > 16 ) {
			result = false;
		}
		else if( number_regex.test( password ) == false ) {
			result = false;
		}

		return result;
	}

	/**
	 * Checks the string is a number
	 *
	 * @param string phone
	 * @return boolean
	 */
	Validation.prototype.phone = function( phone ) {

		var result = true;

		if( isNaN( phone ) ) {
			result = false;
		}

		return result;
	}

	return Validation;
});