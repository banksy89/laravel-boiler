define( [ '' ], function() {

	function Helpers () {}

	Helpers.prototype.check_null = function( value ) {

		var result = false;

		if( !value || typeof value == 'undefined' || value == false || value == null || value == '' ) {
			result = true;
		}

		return result;
	};

	Helpers.prototype.rounder = function( value, decimals ) {

		var sign = value >= 0 ? 1 : -1,
			rounded = ( Math.round( ( value * Math.pow( 10, decimals ) ) + ( sign * 0.001 ) ) / Math.pow( 10, decimals ) ).toFixed( decimals );
        
        return parseFloat( rounded );
	};
		
	Helpers.prototype.ucfirst = function( string ) {
		return string.charAt( 0 ).toUpperCase() + string.slice( 1 );
	}

	return Helpers;
});