define( [ 'Backbone' ], function() {

    require(['../utils/uploadify/uploadify.min']);

    return Backbone.View.extend({

        site_path: window.site_path.replace( '_', '' ),

        image_container: '',

        clicked__multiple: '',
        clicked__name: '',
        clicked__field: '',
        clicked__type: '',
        clicked__controller: '',
        clicked__crop: '',

        total_files: 0,

        placeholder: '',
        placeholder_html: '',

        crop_height_default: 200,
        crop_width_default: 200,

        initialize: function() {

            //Initialise uploadify on any file input that needs it
            //Get the inputs ready to loop
            var inputs = $( '.js-uploader__container' ),
                l = inputs.length;

            for( var i = 0; i < l; i++ ) {

                var type = $( inputs[ i ] ).attr( 'data-type' ),
                    name = $( inputs[ i ] ).attr( 'data-name' ),
                    multiple = $( inputs[ i ] ).attr( 'data-multiple' ),
                    field = $( inputs[ i ] ).attr( 'data-field' ),
                    controller = $( inputs[ i ] ).attr( 'data-controller' ),
                    crop = $( inputs[ i ] ).attr( 'data-crop' );

                this.append_button( i, inputs[i], type, name, multiple, field, controller, crop );
            }

            this.load_uploadify();
        },
        
        el: $('body'),
        
        events: {
            'click .js-uploader__delete_image_uploaded'     : 'delete_image',
            'click .js-uploader__delete_document_uploadify' : 'delete_document',

            'click .js-fake-click'                          : 'trigger_click'
        },

        trigger_click: function( e ) {

            var target = e.target,
                type = $( target ).attr( 'data-name' );

            $( '#js-file-upload__' + type ).click();

            e.preventDefault();
        },

        append_button: function( i, input, type, name, multiple, field, controller, crop ) {

            var target_method = 'return_uploadify_' + type + '_container',
                button = base[ target_method ]( i, name, multiple, field, controller, crop );

            $( input ).append( button );

            return button;
        },

        load_uploadify: function() {

            var _this = this,
                buttons = $( '.js-bind-uploadify' );

            /**
             * Loop and apply the uploadify object to each file input
             */
            $( buttons ).each( function( e ) {

                var ele = $( this ),
                    type = ele.attr( 'data-type' ),
                    field = ele.attr( 'data-field' ),
                    multiple = ele.attr( 'data-multiple' ) == 'true' ? true : false,
                    name = ele.attr( 'data-name' ),
                    controller = ele.attr( 'data-controller' );
                    id = ele.attr( 'id' ),
                    crop = ele.attr( 'data-crop' );
  
                $( function() {

                    ele.uploadify({
                        'fileObjName'      : name,
                        'fileSizeLimit'    : '5mb',
                        'fileTypeDesc'     : base.get( type + '_extensions_description' ),
                        'fileTypeExts'     : base.get( type + '_extensions' ),
                        'formData'         : { 'type' : type, 'name' : name, 'multiple' : multiple, 'field' : field, 'controller' : controller },
                        'method'           : 'post',
                        'multi'            : multiple,
                        'swf'              : window.site_path + 'assets/scripts/utils/uploadify/uploadify.swf',
                        'uploader'         : window.site_path.replace( '_admin/', '' ) + 'uploadify',
                        'onUploadError'    : function( file, errorCode, errorMsg, errorString ) {
                            _this.uploadify_error( file, errorCode, errorMsg, errorString );
                        },
                        'onUploadSuccess'  : function( file, data, response ) {
                            $( '#js-uploadify-ajax' ).remove();
                            _this.uploadify_success( file, data, response );
                        },
                        onSelect: function() {
                            _this.image_container = $( this.button ).parent().parent().prev();

                            var container = $( this.button ).parent().parent().parent();

                            _this.clicked__multiple = $( container ).attr( 'data-multiple' );
                            _this.clicked__name = $( container ).attr( 'data-name' );
                            _this.clicked__field = $( container ).attr( 'data-field' );
                            _this.clicked__type = $( container ).attr( 'data-type' );
                            _this.clicked__controller = $( container ).attr( 'data-controller' );
                            _this.clicked__crop = $( container ).attr( 'data-crop' );

                            _this.placeholder = '#js-uploader__placeholder_' + _this.clicked__name;
                            _this.placeholder_html = $( _this.placeholder );
                        },
                        onUploadStart: function( file ) {

                            _this.image_container = $( this.button ).parent().parent().prev();

                            var container = $( this.button ).parent().parent().parent();
                            $( container ).append( '<img id="js-uploadify-ajax" src="' + window.site_path + 'assets/images/ajax-loader.gif" />' );
                        }
                    });
                });
            });
        },

        get_extensions: function( type ) {

            var result = { 'ext': this[ type + '_extensions' ],
                           'description' : this[ type + '_extensions_description' ] };

            return result;
        },

        uploadify_success: function( file, data, response ) {

            var data = $.parseJSON( data );

            if( !!response ) {

                if( this.clicked__type == 'image' ) {
                    this.append_new_image( data );
                }
                else if( this.clicked__type == 'file' ) {
                    this.append_new_document( data, file );
                }
            }
        },

        uploadify_error: function( file, errorCode, errorMsg, errorString ) {

            console.log( file );
            console.log( errorCode );
            console.log( errorMsg );
            console.log( errorString );
        },

        append_new_image: function( data ) {

            var id = data[ 'id' ],
                imgname = data[ 'imgname' ],
                container = this.image_container,
                input_name = this.clicked__controller + '[' + this.clicked__field + ']' + ( this.clicked__multiple == 'true' ? '[]' : '' ),
                crop = this.clicked__crop,
                image;

            /**
            if( typeof crop !== 'undefined' ) {

                var crop_dimensions = this.get_crop_dimensions( crop );

                image = 

                image = '<div class="js-saved-image">' +
                            '<input type="hidden" name="' + input_name + '" class="js-hidden-id" value="' + id + '" />' +

                            '<div class="js-draggable-area" style="position: relative;">' +
                                '<div class="js-draggable" style="width: ' + crop_dimensions.width + 'px; height: ' + crop_dimensions.height + 'px; border: 5px solid orange; position: absolute; display: none;"></div>' +
                                '<img src="' + window.site_path + '_admin/assets/uploads/images/' + imgname + '" alt="<?php echo $title; ?>" />' +
                            '</div>' +

                            '<button type="button" class="js-uploader__delete_image_uploaded btn btn--delete" data-imagename="' + imgname + '" data-id="' + id + '">Delete</button>' +
                            '<button type="button" class="btn btn--upload js-crop" data-imagename="' + imgname + '" data-id="' + id + '">Crop</button>' +
                            '<button type="button" class="btn btn--upload js-activate-crop-button js-activate-crop" style="display: none;">Action Crop</button>' +
                            '<button type="button" class="btn btn--upload js-cancel-crop hide" data-name="' + imgname + '">Cancel crop</button>' +
                        '</div>';
            }
            else {
                image = '<div>' + 
                            '<img src="' + window.site_path + 'assets/uploads/images/' + imgname + '" />' +
                            '<button class="js-uploader__delete_image_uploadify btn btn--delete" data-id="' + id + '" data-imgname="' + imgname + '">Delete</button>' +
                            '<input type="hidden" name="' + input_name + '" value="' + id + '" />' +
                        '</div>'
            }
            **/

            if( typeof crop !== 'undefined' ) {
                var crop_dimensions = this.get_crop_dimensions( crop );
                image = base.get_new_croppable_image_uploadify( input_name, crop_dimensions.width, crop_dimensions.height, imgname, id )
            }
            else {
                image = base.get_new_image_uploadify( input_name, imgname, id );
            }

            /**
             * If the user is uploading a single upload we will need to make sure the hidden
             * input for the existing image is removed so there is no chance of it being sent
             * to the server in the $_POST data
             */
            if( this.clicked__multiple == 'false' ) {
                $( 'form' ).find( 'input[name="' + this.clicked__controller + '[' + this.clicked__field + ']"]' ).parent().remove();
            }

            $( container ).prepend( image );
            this.handle_placeholder();
        },

        /**
         * We need to make sure the placeholder gets shown / hidden
         * depending on if there are any current uploads
         */
        handle_placeholder: function() {

            var contents = $( this.image_container ).html();

            if( !!contents ) {
                $( this.placeholder ).hide();
            }
            else {
                $( this.placeholder ).show();
            }

            return this;
        },

        /**
         * If the user is removing a image that has already been uploaded
         * it will need to work a bit differently because the image will not be
         * in the image container because that is appended on page load
         */
        handle_placeholder_uploaded: function( type ) {

            var container = $( '#js-container__' + type ),
                images = container.find( 'img' ),
                count = images.length;

            if( count > 0 ) {
                $( this.placeholder ).hide();
            }
            else {
                $( this.placeholder ).show();
            }
        },

        get_crop_dimensions: function( crop ) {

            var split = crop.split( ':' );
            return { width: ( !!split[0] ? split[0] : this.crop_width_default ), height: ( !!split[1] ? split[1] : this.crop_height_default ) };
        },

        append_new_document: function( data, file ) {

            this.total_files++;

            var id = data[ 'id' ],
                name = file.name,
                container = this.image_container,
                input_name = this.clicked__controller + '[' + this.clicked__field + ']' + ( this.clicked__multiple == 'true' ? '[]' : '' );

            /**
             * Like the images if the file upload is single we need to remove the previous
             * file display so the hidden ID will not be taken as the one we want to save
             */
             if( this.clicked__multiple == 'false' ) {
                $( 'form' ).find( 'input[name="' + this.clicked__controller + '[' + this.clicked__field + ']"]' ).parent().remove();
             }

            $( container ).append( '<div>' +
                                   '<input type="text" class="medium_input" name="' + this.clicked__controller + '[upload][' + id + '][title]" value="' + name + '" />' +
                                   '<input type="hidden" class="medium_input" name="' + this.clicked__controller + '[upload][' + id + '][id]" value="' + id + '" />' +
                                   '<input type="hidden" name="' + input_name + '" value="' + id + '" />' +
                                   '<button type="button" class="js-uploader__delete_document_uploaded" data-id="' + id + '">Remove</button>' +
                                   '</div>' );
        },

        delete_image: function( e ) {

            var target = e.target,
                id = $( target ).attr( 'data-id' );

            $.ajax({ url: this.site_path + 'admin/ajax/delete_image',
                     data: { id: id },
                     type: 'POST',
                     dataType: 'JSON',
                     success: function( data ) {
                        
                        if( data[ 'status' ] == 200 ) {
                            $( target ).parent().remove();
                        }
                     }
            });

            e.preventDefault();
        },

        delete_document: function( e ) {

            var target = e.target,
                id = $( target ).attr( 'data-id' );

            $.ajax({ url: this.site_path + 'admin/ajax/delete_document',
                     data: { id: id },
                     type: 'POST',
                     dataType: 'JSON',
                     success: function( data ) {

                        if( data[ 'status' ] == 200 ) {
                            $( target ).parent().remove();
                        }
                     }
            });

            e.preventDefault();
        }
    });
});