/**
 * If you pass in $ as a parameter for the function then 
 * the tests will break because for some reason it makes
 * jquery undefined.
 */
define( [ '../utils/hogan', '../modules/helpers' ], function( Hogan, Helpers ) {

	function Templates() {
		/**
		 * Sometimes we want to pass in a short snippet of html
		 * to save a ajax call so this property will hold that
		 */
		this.template;

		this.helpers = new Helpers();
	}

	Templates.prototype.setter = function( key, value ) {
		this[ key ] = value;
	}

	Templates.prototype.get = function( template ) {

		var _this = this;

		$.ajax({ url: '../templates/' + template + '.html',
				 type: 'GET',
				 dataType: 'html',
				 async: false,
				 success: function( data ) {
				 	_this.template = data;
				 }
		});
	}

	Templates.prototype.compile = function( template, data ) {

		if( this.helpers.check_null( this.template ) ) {
			this.get( template );
		}

		var template = Hogan.compile( this.template ),
			html = template.render( data );

		return html;
	}

	return Templates;
});