define( [ 'jquery' ], function( $ ) {

	return error_handlers = {

		flash: true,
		filereader: true,

		max_file_size: 5242880,
		image_types: [ 'jpeg', 'jpg', 'png', 'gif', 'JPG', 'JPEG' ],
		file_types: [ 'pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'txt', 'csv' ],

		error: false,
		error_type: '',
		error_name: '',

		base: function() {

			if( !swfobject.hasFlashPlayerVersion( '9.0.24' ) ) {
			    this.flash = false;
			}

			if( !window.File || !window.FileReader || !window.FileList || !window.Blob ) {
				this.filereader = false;
			}

			if( this.flash === false && this.filereader === false ) {
				this.show_fatal();
			}
		},

		show_fatal: function() {
			$( '#js-uploader__fatal_error' ).show();
		},

		file_validation: function( file, type ) {

			this.error = false;

			var size = file.size,
				format = file.type,
				name = file.name;

			//this.error = this.validate_size( size, name );
			this.error = this.validate_type( format, type, name );

			return { 'error' : this.error,
					 'type' : this.error_type,
					 'name' : this.error_name };
		},

		validate_size: function( size, name ) {

			var result = false;

			if( this.max_file_size < size ) {
				this.error_type = 'size';
				this.error_name = name;
				result = true;
			}

			return result;
		},

		validate_type: function( format, type, name ) {

			var result = this.error,
				split = name.split( '.' );

			if( $.inArray( split[ split.length - 1 ], ( type == 'image' ? this.image_types : this.file_types ) ) === -1 ) {
				this.error_type = 'type';
				this.error_name = name;
				result = true;
			}

			return result;
		},

		display_error: function( errors ) {

			var error_container = $( '#js-uploader__error_list' ),
				count = errors.length,
				error = '',
				middle;

			//Also remove any errors that are already on the page
            error_container.empty();

			for( var i = 0; i < count; i++ ) {

				if( errors[i].type == 'size' ) {
					middle = 'is to big. Maximum file size is 5MB';
				}
				else if( errors[i].type == 'type' ) {
					middle = 'is the wrong file type.';
				}

				error += '<li>The file ' + errors[i].name + ' ' + middle + '</li>';
			}

			error_container.html( error );

			$( '#js-uploader__error' ).show();
		}
	}
});