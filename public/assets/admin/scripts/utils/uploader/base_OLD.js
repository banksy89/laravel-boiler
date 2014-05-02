define( [ 'jquery' ], function( $ ) {

	return base = {

		/**
         * These need to be written in a string format so we can put them
         * straight into the uploadify configuration
         */
        image_extensions: '*.jpg; *.jpeg; *.gif; *.png',
        image_extensions_description: 'Only files with the extensions JPG, JPEG, GIF and PNG are allowed',

        document_extensions: '*.pdf; *.doc; *.docx; *.ppt; *.pptx; *.xls; *.xlsx',
        document_extensions_description: 'Only files with the extensions PDF, DOC, DOCX, PPT, PPTX, XLS and XLSX are allowed',

		init: function() {

			var upload_objects = $( '.js-uploader__container' ),
				upload_objects_count = upload_objects.length;

			if( upload_objects_count > 0 ) {
				this.add_dom_elements( upload_objects, upload_objects_count );
			}
		},

		add_dom_elements: function( upload_objects, upload_objects_count ) {

			for( var i = 0; i < upload_objects_count; i++ ) {
				
				var container = $( upload_objects[i] ),
					type = container.attr( 'data-type' ),
					multiple = container.attr( 'data-multiple' ),
					name = container.attr( 'data-name' );

				if( type == 'image' ) {
					this.add_image( container, multiple, i, name );
				}
				else if( type == 'file' ) {
					this.add_file( container, multiple, i, name );
				}
			}

		},

		add_image: function( container, multiple, count, name ) {

			var upload_container = '<div class="js-uploader__upload_container_' + count + ' hide"></div>',
				upload_button = '<input id="js-input__' + name + '" accept="image/*" type="file" name="image[' + name + '][]" class="js-uploader__image_upload hide" data-multiple="' + multiple + '" value="Upload Image" ' + ( multiple == 'false' ? '' : 'multiple="multiple"' ) + ' />' + ( multiple == 'false' ? '' : '<input type="hidden" name="multi[' + name + ']" value="true" />' );

			container.html( upload_container + upload_button );
		},

		add_file: function( container, multiple, count, name ) {

			var file_container = '<div class="js-uploader__upload_container_' + count + ' hide"></div>',
				file_button = '<p><input accept=".pdf,.doc,.docx,.ppt,.pptx" type="file" name="file[' + name + '][]" class="js-uploader__file_upload" data-multiple="' + multiple + '" value="Upload File" ' + ( multiple == 'false' ? '' : 'multiple="multiple"' ) + ' /></p>' + ( multiple == 'false' ? '' : '<input type="hidden" name="multi[' + name + ']" value="true" />' );

			container.html( file_container + file_button );

		},

		return_uploadify_image_container: function( i, name, multiple, field, controller, crop ) {

			var container = '<div id="js-image-list"></div>' +
							'<div class="js-file-upload">' +                  
								'<input id="js-file-upload__' + name + '" type="file" class="js-bind-uploadify" name="image_upload" data-type="image" data-name="' + name + '" data-field="' + field + '" data-multiple="' + multiple + '" data-controller="' + controller + '" data-crop="' + crop + '" />' +
							'</div>';

			return container;
		},

		return_uploadify_file_container: function( i, name, multiple, field, controller ) {

			var container = '<div id="js-file-list"></div>' +
							'<div class="js-file-upload">' +                    
								'<input id="js-file-upload-' + i + '" class="js-bind-uploadify" type="file" name="file_upload" data-type="document" data-name="' + name + '" data-multiple="' + multiple + '" data-field="' + field + '" data-controller="' + controller + '" />' +
							'</div>';

			return container;
		},

		get: function( property ) {
			return this[ property ];
		},

		get_new_croppable_image: function( image, name, crop_dimensions, file_name, count ) {

			var template = $( '<div class="js-saved-image cropper"></div>' );

			var inner = $( '<div class="js-draggable-area draggable-area" style="position: relative;"></div>' );
			
			inner.append( '<div class="js-draggable cropper-area" style="width: ' + crop_dimensions.width + 'px; height: ' + crop_dimensions.height + 'px; position: absolute; display: none;"></div>' );
			inner.append( image );

			template.append( inner )
					.append( '<button type="button" class="js-uploader__delete_image_uploaded btn btn--delete" data-count="' + count + '">Delete</button>' )
					//.append( '<button type="button" data-popup="true" data-ajax="true" class="btn btn--crop js-crop" data-name="' + file_name + '"><i class="fa fa-crop"></i> Crop</button>' )
					.append( '<button type="button" class="btn btn--save js-activate-crop-button js-activate-crop__ajax" style="display: none;" data-name="' + file_name + '">Action Crop</button>' )
					.append( '<button type="button" class="btn btn--awaiting js-cancel-crop hide" data-name="' + file_name + '">Cancel crop</button>' );

		    return template;
		},

		get_new_image: function( image ) {

			var template = $( '<div></div>' );

			template.append( '<p>Uploading a new image will replace the existing one.</p>' )
					.append( image )
					.append( '<a href="" style="display: block;" class="js-uploader__delete_image_uploaded js-uploader__delete_image_uploadify btn btn--delete">Delete</a>' );

			return template;
		},

		get_new_croppable_image_uploadify: function( input_name, crop_width, crop_height, imgname, id ) {

			var template = '<div class="js-saved-image cropper">' +
                            '<input type="hidden" name="' + input_name + '" class="js-hidden-id" value="' + id + '" />' +

                            '<div class="js-draggable-area draggable-area" style="position: relative;">' +
                                '<div class="js-draggable cropper-area" style="width: ' + crop_width + 'px; height: ' + crop_height + 'px; position: absolute; display: none;"></div>' +
                                '<img src="' + window.site_path + '_admin/assets/uploads/images/' + imgname + '" alt="<?php echo $title; ?>" />' +
                            '</div>' +
							//'<button type="button" data-popup="true" class="js-crop btn btn--crop" data-imagename="' + imgname + '" data-id="' + id + '"><i class="fa fa-crop"></i> Crop</button>' +
                            '<button type="button" class="js-uploader__delete_image_uploaded btn btn--delete" data-imagename="' + imgname + '" data-id="' + id + '">Delete</button>' +
                            '<button type="button" class="btn btn--upload js-activate-crop-button js-activate-crop" style="display: none;">Action Crop</button>' +
                            '<button type="button" class="btn btn--upload js-cancel-crop hide" data-name="' + imgname + '">Cancel crop</button>' +
                        '</div>';

            return template;

            //                            '<button type="button" data-popup="true" class="js-crop btn btn--crop" data-imagename="' + imgname + '" data-id="' + id + '"><i class="fa fa-crop"></i> Crop</button>' +
		},

		get_new_image_uploadify: function( input_name, imgname, id ) {

			var template = '<div>' + 
	                            '<img src="' + window.site_path + 'assets/uploads/images/' + imgname + '" />' +
	                            '<button class="js-uploader__delete_image_uploadify btn btn--delete" data-id="' + id + '" data-imgname="' + imgname + '">Delete</button>' +
	                            '<input type="hidden" name="' + input_name + '" value="' + id + '" />' +
	                        '</div>';

	        return template;
		}
	}
});