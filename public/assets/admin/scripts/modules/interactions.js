/**
 * If you pass in $ as a parameter for the function then 
 * the tests will break because for some reason it makes
 * jquery undefined.
 */
define( [ '../modules/Helpers', '../utils/jquery' ], function( Helpers ) {

	function Interactions() {
		this.error = false;
		this.helpers = new Helpers();
	}

	Interactions.prototype.toggle = function( e ) {

		var target = e.target,
			area = $( target ).attr( 'data-area' ),
			$to_toggle = $( '.js-' + area );

		if( this.helpers.check_null( area ) || this.helpers.check_null( $to_toggle.length ) ) {
			this.error = true;
		}

		if( this.error === false ) {
			$to_toggle.toggle();
		}

		e.preventDefault();
	}

	Interactions.prototype.slide_toggle = function( e ) {

		var target = e.target,
			area = $( target ).attr( 'data-area' ),
			speed = $( target ).attr( 'data-speed' ),
			$to_toggle = $( '.js-' + area );

		speed = !!speed ? speed : 'fast';

		if( this.helpers.check_null( area ) || this.helpers.check_null( speed ) ||  this.helpers.check_null( $to_toggle.length ) ) {
			this.error = true;
		}

		if( this.error === false ) {
			$to_toggle.slideToggle( speed );
		}

		/**
		 * This is here because the tests can not
		 * pass in a event
		 */
		if( typeof e.preventDefault === 'function' ) {
			e.preventDefault();
		}
	}

	return Interactions;
});