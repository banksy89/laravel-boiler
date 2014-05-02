define( [ 'Backbone', 'jqueryui' ], function() {
    
    return Backbone.View.extend({

        site_path: window.site_path.replace( "_admin", "admin" ),

        image_crop_width: 1000,

        width: 0,
        height: 0,
        top: 0,
        left: 0,
        name: '',

        image: '',

        draggable: '',
        draggable_area: '',
        crop_button: '',
        action_crop_button: '',
        target_image: '',
        upload_container: '',

        max_cropper_height: '',
        max_cropper_width: '',

        crop_action_popup: false,
        orginal_image_container: '',

        initialize: function () {

            //Hide the crop button if the image has already been cropped
            this.image = $( '.js-draggable-area' ).find( 'img' );

            if( $( this.image ).width() == this.width ) {
                $( '#js-crop' ).hide();
            }
        },

        el: $( 'body' ),

        events: {
            'click .js-crop'                : 'crop',
            'click .js-activate-crop'       : 'activate_crop',
            'click .js-activate-crop__ajax' : 'activate_crop_ajax',
            'click .js-cancel-crop'         : 'cancel_crop',
            'click #js-close-crop-popup'    : 'close_crop_popup'
        },

        crop: function ( e ) {

            var target = e.target,
                name = $( target ).attr( 'data-imagename' ),
                id = $( target ).attr( 'data-id' ),
                popup = $( target ).attr( 'data-popup' ),
                _this = this;

            this.crop_action_popup = false;
            this.name = name;

            //this.target_image = $( target ).parent().find( 'img' );
            var image = $( target ).parent().find( 'img' );
            this.draggable_area = image.parent();

            if( !!popup ) {
                this.orginal_image_container = $( target ).parent();
                this.popup_crop( target );
                return false;
            }

            //Do something to activate the cropper
            //Highlight the image
            this.target_image = $( target ).parent().find( 'img' );
            //this.target_image.css( 'border', '5px solid red' );

            //Set the elements that are associated to the current crop area
            this.crop_button = $( target );
            this.action_crop_button = $( target ).next( '.js-activate-crop-button' );
            this.draggable = this.target_image.prev( '.js-draggable' );
            this.draggable_area = this.target_image.parent();

            this.upload_container = this.crop_button.closest( '.js-uploader__container' );

            //Show the activate crop button
            this.action_crop_button.show();
            //Show the cancel crop button
            this.cancel_crop_button = $( target ).parent().find( '.js-cancel-crop' );
            this.cancel_crop_button.show();

            //Hide the crop button
            $( target ).hide();

            /**
             * Use outerWidth and outerHeight because width and height doesn't
             * take into account padding or borders
             *
             * This will need to moved and retrieved once the use presses the crop
             * buttons because the dimensions of the cropping area might change
             *
             */
            this.actual_width = this.draggable.outerWidth(),
            this.actual_height = this.draggable.outerHeight();

            //Activate the draggable box
            this.draggable
                .show()
                .resizable({ 
                    aspectRatio: true,
                    minHeight: _this.actual_height,
                    minWidth: _this.actual_width,
                    maxHeight: _this.max_cropper_height,
                    maxWidth: _this.max_cropper_width
                })
                .draggable({
                    containment: "parent",
                    drag: function( event, ui ) {

                        var coords = $(this).position(),
                            top = coords.top,
                            left = coords.left;

                        _this.top = top;
                        _this.left = left;

                        _this.form_max( top, left );
                    }
                });

            e.preventDefault();
        },

        /**
         * We need to make sure the user cannot scale the cropper area to something bigger than
         * the image container.
         *
         * This will depend on the position of the cropper area so every time the cropper area
         * is dragged we will need to regenerate a max height and width for the cropping area.
         *
         * Sets the maximum height and width as a property
         */
        form_max: function( top, left ) {

            var area = this.draggable_area,
                width = $( area ).outerWidth(),
                height = $( area ).outerHeight(),
                max_width = width - left,
                max_height = height - top,
                _this = this;

            this.max_cropper_height = max_height;
            this.max_cropper_width = max_width;
            
            /**
             * We need to re apply the resizable
             */
            this.draggable.resizable({ 
                                aspectRatio: true,
                                minHeight: _this.actual_height,
                                minWidth: _this.actual_width,
                                maxHeight: _this.max_cropper_height,
                                maxWidth: _this.max_cropper_width
                            });
        },

        do_crop: function() {

            var _this = this;

            this.width = this.draggable.outerWidth();
            this.height = this.draggable.outerHeight();
            
            $.ajax({ url: this.site_path + 'admin/ajax/crop',
                     data: { top: this.top,
                             left: this.left,
                             width: this.width,
                             height: this.height,
                             name: this.name,
                             actual_width: 518,
                             actual_height: 518 },
                     type: 'POST',
                     dataType: 'JSON',
                     beforeSend: function() {
                        $( '#js-ajax-loader-crop' ).show();
                     },
                     success: function( data ) {

                        if( data[ 'status' ] == 200 ) {

                            if( _this.crop_action_popup === false ) {
                                //Remove the old image in exchange for the new cropped version
                                var area = _this.draggable_area,
                                    source = window.site_path + '_admin/assets/uploads/images/thumbnails/' + _this.name,
                                    controller = _this.upload_container.attr( 'data-controller' ),
                                    multiple = _this.upload_container.attr( 'data-multiple' );

                                /**
                                 * As the images are now a one to many relationship we can no longer save the image
                                 * when it is being cropped. Instead we need to add a hidden input so when the 
                                 * item is saved we can loop through and save each image with the ID of the item that
                                 * it is related to
                                 */

                                area.empty();
                                //Add a query string so the browser will not display a cached version
                                area.append( '<img src="' + source + '?hello=world" />' );

                                //Remove the crop buttons
                                _this.crop_button.remove();
                                _this.action_crop_button.remove();
                                _this.cancel_crop_button.hide();
                            }
                            else {

                                _this.close_crop_popup();
                                _this.replace_original_image();
                            }   
                        }
                     }
            });
        },

        activate_crop: function( e ) {

            var target = e.target,
                popup = $( target ).attr( 'data-popup' );

            if( !!popup ) {
                this.crop_action_popup = true;
            }

            this.do_crop();

            e.preventDefault();
        },

        /**
         * We can use the formData object to send the file to the server so it can be 
         * uploaded and cropped correctly.
         *
         * We need to make sure we get the correct image, this could be problematic with
         * the multiple image upload because one button could have more than one image applied to it
         *
         * So I have added the name of the file as an attribute so when we loop through the files
         * we can grab the correct one.
         */
        activate_crop_ajax: function( e ) {

            var target = e.target,
                file_name = $( target ).attr( 'data-name' ),
                file_data = new FormData(),
                inputs = $( 'input[type="file"]' ),
                l = inputs.length,
                target_file,
                popup = $( target ).attr( 'data-popup' );

            if( !!popup ) {
                this.crop_action_popup = true;
            }

            this.width = this.draggable.outerWidth();
            this.height = this.draggable.outerHeight();

            /**
             * Separate the files from the crap and put it into the FormData
             */
            for( var i = 0; i < l; i++ ) {
                if( inputs[i].files.length > 0 ) {
                    $( inputs[i].files ).each( function( key, value ) {
                        if( value.name == file_name ) {
                            target_file = value;
                            file_data.append( 'images', value );
                        }
                    });
                }
            }

            file_data.append( 'width', this.width );
            file_data.append( 'height', this.height );
            file_data.append( 'top', this.top );
            file_data.append( 'left', this.left );

            file_data.append( 'actual_height', 518 );
            file_data.append( 'actual_width', 518 );

            var _this = this;

            $.ajax({ url: this.site_path + 'admin/ajax/ajax_crop',
                     type: 'POST',
                     dataType: 'JSON',
                     data: file_data,
                     cache: false,
                     processData: false,
                     contentType: false,
                     beforeSend: function() {
                        /**
                         * Display a ajax loader because the call takes a few seconds
                         * Disable the crop button
                         */
                        $( '#js-ajax-loader-crop' ).show();
                        $( target ).hide();
                     },
                     success: function( data ) {

                        /**
                         * If the crop was successful we need to swap the image source
                         * for the thumbnail image and remove the crop and action crop buttons.
                         *
                         * We also need to tweak the CSS to the cropped height and width and remove the
                         * border
                         *
                         * I think we will also need to add a hidden input with the image ID
                         * because that will need to be saved
                         *
                         * We also need to add the hidden inputs that will exclude the image from the
                         * server side processing because the image has already been uploaded so it will
                         * just need to be saved into the database
                         */
                        if( data[ 'status' ] == 200 ) {

                            var src = _this.site_path + '_admin/assets/uploads/images/thumbnails/' + data[ 'file_name' ];

                            if( _this.crop_action_popup === false ) {

                                _this.target_image.css({ border: 'none', width: _this.actual_width, height: _this.actual_height }).attr( 'src', src );
                                _this.draggable.hide();
                                _this.crop_button.hide();
                                _this.action_crop_button.hide();
                                _this.cancel_crop_button.hide();

                                var field = _this.upload_container.attr( 'data-field' ),
                                    controller = _this.upload_container.attr( 'data-controller' ),
                                    multiple = _this.upload_container.attr( 'data-multiple' );
                            }
                            else {

                                _this.close_crop_popup();
                                _this.replace_original_image( src );
                            }

                            var controller = 'product',
                                multiple = 'true';

                            /**
                             * As the images are now a one to many relationship we can no longer save the image
                             * when it is being cropped. Instead we need to add a hidden input so when the 
                             * item is saved we can loop through and save each image with the ID of the item that
                             * it is related to
                             *
                             * This needs to happen regardless of the type of crop
                             */
                            var hidden_id = '<input type="hidden" name="' + controller + '[cropped_images]' + ( multiple == 'true' ? '[]' : '' ) + '" value="' + data[ 'file_name' ] + '" />',
                                hidden_name = '<input type="hidden" name="removed[name][]" value="' + target_file.name + '" />',
                                hidden_size = '<input type="hidden" name="removed[size][]" value="' + target_file.size + '" />';

                            _this.draggable_area.append( hidden_id ).append( hidden_name ).append( hidden_size );
                        }

                        //Remove the disabled attribute from the button
                        $( target ).show();
                     }
            });

            e.preventDefault();
        },

        cancel_crop: function( e ) {

            var target = e.target,
                parent = $( target ).parent();

            //Hide red border
            var img = $( parent ).find( 'img' );
            $( img ).css( 'border', 'none' );
            //Hide action crop button
            $( parent ).find( '.js-activate-crop-button' ).hide();
            //Hide the draggable area
            $( parent ).find( '.js-draggable' ).hide();
            //Hide delete crop button
            $( target ).hide();
            //Show crop button
            $( parent ).find( '.js-crop' ).show();

            e.preventDefault();
        },

        popup_crop: function( target ) {

            //Hide the ajax loader just incase it is shown
            $( '#js-ajax-loader-crop' ).hide();

            var crop_popup = $( '#js-crop-popup' ),
                crop_image = $( '#js-crop-image' ),
                container = $( target ).parent(),
                img = container.find( 'img' ),
                image_source = img.attr( 'src' ),
                source,
                imgname,
                path = window.site_path + '_admin/assets/uploads/images/',
                ajax = $( target ).attr( 'data-ajax' ),
                image_name = $( target ).attr( 'data-name' );

            if( image_source.slice( 0, 4 ) == 'data' ) {
                imgname = image_source;
            }
            else {
                source = img.attr( 'src' ).split( '/' );
                imgname = path + source[ source.length - 1 ];
            }

            crop_image.attr( 'src', imgname ).width( this.image_crop_width );
            this.activate_cropper( crop_popup, ajax, image_name );
            crop_popup.show();
        },

        activate_cropper: function( container, ajax, image_name ) {

            var _this = this;

            //Do something to activate the cropper
            //Highlight the image
            this.target_image = $( container ).find( 'img' );
            //this.target_image.css( 'border', '5px solid red' );

            //Set the elements that are associated to the current crop area
            this.action_crop_button = $( container ).find( '.js-activate-crop-button' );
            this.action_crop_button.attr( 'data-name', image_name );

            if( !!ajax ) {
                this.action_crop_button.removeClass( 'js-activate-crop' ).addClass( 'js-activate-crop__ajax' );
            }
            else {
                this.action_crop_button.removeClass( 'js-activate-crop__ajax' ).addClass( 'js-activate-crop' );
            }

            this.draggable = this.target_image.prev( '.js-draggable' );
            this.draggable_area = this.target_image.parent();

            //Show the activate crop button
            this.action_crop_button.show();

            /**
             * Use outerWidth and outerHeight because width and height doesn't
             * take into account padding or borders
             *
             * This will need to moved and retrieved once the use presses the crop
             * buttons because the dimensions of the cropping area might change
             *
             */
            this.actual_width = this.draggable.outerWidth(),
            this.actual_height = this.draggable.outerHeight();

            //Activate the draggable box
            this.draggable
                .show()
                .resizable({ 
                    aspectRatio: true,
                    minHeight: _this.actual_height,
                    minWidth: _this.actual_width,
                    maxHeight: _this.max_cropper_height,
                    maxWidth: _this.max_cropper_width
                })
                .draggable({
                    containment: "parent",
                    drag: function( event, ui ) {

                        var coords = $(this).position(),
                            top = coords.top,
                            left = coords.left;

                        _this.top = top;
                        _this.left = left;

                        _this.form_max( top, left );
                    }
                });
        },

        close_crop_popup: function( e ) {

            $( '#js-crop-popup' ).hide();

            if( typeof e == 'object' ) {
                e.preventDefault();
            }
        },

        replace_original_image: function( src ) {

            var image = this.orginal_image_container.find( 'img' );

            //Remove the height and width just incase
            image.css({ width: '', height: '' });

            if( typeof src == 'undefined' ) {
                src = window.site_path + '_admin/assets/uploads/images/thumbnails/' + this.name;
            }

            image.attr( 'src', src + '?hello=' + Math.floor((Math.random()*5000)+1) );
        }
    });
});