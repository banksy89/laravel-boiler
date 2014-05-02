define( [ 'Backbone' ], function() {

    return Backbone.View.extend({

        /**
         * We need to remove the underscore in the site path so we can
         * use it as a URL
         */
        site_path: window.site_path.replace( '_', '' ),

        /**
         * Holds any errors that the validation returns.
         * This is displayed all at once at the end of the process
         * so if a user uploads some files that pass the validation
         * these files will still be processed correctly
         */
        errors: [],

        /**
         * Holds the original image that was uploaded so if the user
         * chooses to crop the image we can show them the original size
         * and not that of the resized thumbnail.
         */
        original_images: [],

        /**
         * Holds the original image data that was returned from the FileReader API.
         * This is so if a image is deleted we can use the original data to set up
         * hidden inputs so the PHP will know what files have been flagged for deletion.
         */
        image_data: [],

        /**
         * Holds the original file data that was returned from the FileReader API
         */
        file_data: [],

        /**
         * The default height of the thumbnail
         */
        thumbnail_height: 0,

        /**
         * The default width of the thumbnail
         */
        thumbnail_width: 300,

        /**
         * Holds the input element that was clicked.
         * This is used to remove it and append a duplicate of it in its place.
         */
        clicked_input: '',

        /**
         * Holds the correct image container relative to the input button.
         */
        image_container: '',

        /**
         * Holds the correct file container relative to the input button.
         */
        file_container: '',

        /**
         * A count of total images so we can set a limit,
         * also used to delete a image because we need to use this
         * as a key for the image_data property
         */
        total_images: 0,

        /**
         * A count of the total files. Used in the same way as the image one
         */
        total_files: 0,

        /**
         * We need the upload name when uploading a document so we can use 
         * it in the title name attribute
         */
        upload_name : '',

        controller : '',

        multiple: false,

        /**
         * A count of the total files that are uploaded
         *
         *
         */
        total_files: 0,

        current_type: '',
        current_controller: '',
        current_name: '',
        current_field: '',
        current_multiple: '',

        allow_crop: true,
        current_crop: '',

        placeholder: '',
        placeholder_html: '',

        data_urls: [],

        /**
         * Crop area defaults
         *
         * If the crop area attribute is empty these
         * values will be used instead
         */
        crop_width_default: 200,
        crop_height_default: 200,

        /**
         * Initialize method
         *
         * This will grab the controller name and save it as a property
         */
        initialize: function() {

            //Somewhere down the line we will probably need the database table
            this.controller = $( '#js-uploader__controller' ).val();
        },
        
        el: $('body'),
        
        events: {

            //Fake click
            'click .js-fake-click'                       : 'trigger_fake_click',

            //Images
            'change .js-uploader__image_upload'          : 'handle_image',
            'click  .js-uploader__delete_image'          : 'delete_image',
            'click  .js-uploader__delete_image_uploaded' : 'delete_image_uploaded',

            //Files
            'change .js-uploader__file_upload'           : 'handle_file',
            'click  .js-uploader__delete_file'           : 'delete_file'
        },

        /**
         * To avoid having to use ugly input buttons everywhere we will be using fake clicks to 
         * make the DOM look nice and clean
         *
         * @param object e
         */
        trigger_fake_click: function( e ) {

            var target = e.target,
                type = $( target ).attr( 'data-type' );

            $( '#js-input__' + type ).click();

            e.preventDefault();
        },

        /**
         * Grabs the placeholder and saves it as a property
         *
         * @param string type
         *
         * @return object this
         */
        set_placeholder: function( type ) {
            this.placeholder = '#js-uploader__placeholder_' + type;
            this.placeholder_html = $( this.placeholder );

            return this;
        },

        /**
         * If the data crop attribute is set this function
         * will split and return it. If it is missing it will
         * return the default the values
         */
        get_crop_dimensions: function( crop ) {

            var split = crop.split( ':' );
            return { width: ( !!split[0] ? split[0] : 200 ), height: ( !!split[1] ? split[1] : 200 ) };
        },

        /**
         * This will handle everything related to displaying a image
         *
         * Save all relevant data attributes as properties 
         * Call the method to set the placeholder as a property
         * Set the clicked input as a property
         * Set the current image image container as a property
         * Loop through all the files and trigger the file to read
         * If there are any errors they will be handled
         * Calls the method to handle adding a new input to the DOM
         *
         * @param object e
         */
        handle_image: function( e ) {

            var target = e.target,
                parent = $( target ).parent(),
                crop = $( parent ).attr( 'data-crop' );

            if( typeof crop == 'undefined' ) {
                this.allow_crop = false;
            }
            else {
                this.current_crop = this.get_crop_dimensions( crop );
            }

            this.current_type = $( parent ).attr( 'data-type' );
            this.current_controller = $( parent ).attr( 'data-controller' );
            this.current_name = $( parent ).attr( 'data-name' );
            this.current_field = $( parent ).attr( 'data-field' );
            this.current_multiple = $( parent ).attr( 'data-multiple' );

            //Cache the image placeholder
            this.set_placeholder( this.current_name );
            
            this.clicked_input = $( target );

            //this.image_container = $( this.clicked_input ).parent().prev();
            this.image_container = $( this.clicked_input ).parent().find( '[class^="js-uploader__upload_container"]' );

            //For some reason firefox doesnt like using the ^= selector 
            //this.image_container = $( this.clicked_input ).parent().find( '.js-uploader__upload_container_0' );


            //Reset errors to a empty
            this.errors = [];

            if( this.current_multiple == 'true' ) {
                this.multiple = true;
            }

            var files = $( e )[0].target.files,
                file_count = files.length;

            for( var i = 0; i < file_count; i++ ) {

                if( !this.validate( files[i], 'image' ) ) {
                    this.image_data.push( files[i] );
                    this.read( files[i], 'image' );
                }
            }

            if( this.errors.length > 0 ) {
                error_handlers.display_error( this.errors );
            }
            else {
                this.handle_input();
            }

            e.preventDefault();
        },

        /**
         * This will handle everything related to displaying an image
         *
         * Setting the clicked input as property
         * Setting the file container as a property
         * Looping through each file and calling the method to show it
         * Calls the method to any errors if there are any
         * Calls the method to handle adding the new input
         */
        handle_file: function( e ) {

            var target = e.target;

            this.clicked_input = $( target );
            this.file_container = $( this.clicked_input ).parent().prev();
            
            var multiple = $( target ).attr( 'multiple' );

            if( multiple == 'true' ) {
                this.multiple = true;
            }

            //We need the name of the upload so we need to get the from the original container
            var container = $( this.clicked_input ).parent().parent(),
                upload_name = $( container ).attr( 'data-name' );

            this.upload_name = upload_name;

            //Reset errors to a empty
            this.errors = [];

            var files = $( e )[0].target.files,
                file_count = files.length;

            for( var i = 0; i < file_count; i++ ) {

                if( !this.validate( files[i], 'file' ) ) {
                    this.file_data.push( files[i] );
                    this.show_file( files[i] );
                }
            }

            if( this.errors.length > 0 ) {
                error_handlers.display_error( this.errors );
            }
            else {
                this.handle_input_file();
            }

            e.preventDefault();
        },

        /**
         * Responsible for calling the validation method and if
         * there is a error it adds it to the error property.
         * 
         * If there is a error the process will not be stopped.
         *
         * @param object file
         * @param string string
         *
         * @return bool error
         */
        validate: function( file, type ) {

            var error = false,
                errors = error_handlers.file_validation( file, type );

            if( errors.error === true ) {
                this.errors.push( errors );
                error = true;
            }

            return error;
        },

        /**
         * Instantiates a new FileReader object and loads
         * the file into it
         * If the file is a image it will call the resize method
         * and increment the total image count
         *
         * @param object file
         * @param string type
         */
        read: function( file, type ) {

            var reader = new FileReader();

            reader.onload = _.bind( function( e ) {
                
                if( type == 'image' ) {
                    this.total_images++;
                    this.resize( e, file );
                }

            }, this );

            reader.readAsDataURL( file );
        },

        /**
         * Handles resizing the image and adding it to the DOM
         * 
         * Appends the image to a hidden container to allow us to get the
         * height and width of the image
         * Calls a method to generate a the image to that height and width
         * Calls a method to get the template the image will be in. This will
         * be different depending on whether cropping is allowed.
         * The image will then be appended to the DOM.
         * The method will be called that decides if the placeholder should be shown
         * 
         * @param object e
         * @param object file
         */
        resize: function( e, file ) {

            var container = this.image_container,
                source = e.target.result,
                image = $( '<img style="display: block;" src="' + source + '" />' ),
                width,
                height,
                thumbnail,
                sub_container,
                file_name = file.name;

            /**
             * If the upload type of multiple is false we need to empty the upload container
             * Otherwise multiple images will be displayed
             *
             * We also need to make sure that if a image has already been uploaded then that
             * is removed
             */
            if( this.multiple == false ) {
                container.empty();
               $( 'form' ).find( 'input[name="' + this.current_controller + '[' + this.current_field + ']"]' ).parent().remove();
            }

            //Keep the original image just in case the user wants to crop it
            this.original_images.push( image );

            /**
             * We have to add the image to the DOM first before we can get its dimensions
             *
             * Append the temp image to the DOM, doing it to a temp container because I was getting weird results
             * when I appended it to the upload container
             */
            $( '#js-uploader__temp_container' ).append( image );

            width = $( '#js-uploader__temp_container img' ).width();
            height = $( '#js-uploader__temp_container img' ).height();

            thumbnail = this.thumbnail( image, width, height );
            $( '#js-uploader__temp_container img' ).remove();

            var image_display;

            if( this.allow_crop == true ) {
                image_display = base.get_new_croppable_image( thumbnail, this.current_name, this.current_crop, file_name, this.total_images )
            }
            else {
                image_display = base.get_new_image( thumbnail );
            }

            sub_container = $( '<div></div>' ).append( image_display );
            container.append( sub_container ).show();

            this.handle_placeholder();
        },

        /**
         * We need to make sure the placeholder gets shown / hidden
         * depending on if there are any current uploads
         */
        handle_placeholder: function() {

            var contents = this.image_container.html();

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

        /**
         * Works out what orientation the image is
         *
         * @param string  width
         * @param string  height
         *
         * @return string result
         */
        get_orienation: function( width, height ) {

            var result = 'square';

            if( width > height ) {
                result = 'landscape';
            }
            else if( height > width ) {
                result = 'portrait';
            }

            return result;
        },

        /**
         * Applies the height and width to the image that will be displayed
         * 
         * @param string image
         * @param int    width
         * @param int    height
         *
         * @return object
         */
        thumbnail: function( image, width, height ) {

            var orienation = this.get_orienation( width, height ),
                new_height,
                ratio = width / this.thumbnail_width;

            if( orienation != 'square' ) {
                new_height = Math.floor( height / ratio );
            }
            else if( orienation == 'square' ) {
                new_height = this.thumbnail_width;
            }

            return image.css({ "height" : new_height, "width" : this.thumbnail_width }); 
        },

        /**
         * In order for all of the uploads to appear in the $_FILES array and the user to
         * be able to open the upload dialog multiple times we need to hide the clicked files
         * input and show a empty one. Otherwise the uploads selected on the second+ click will
         * over write what is already there.
         */
        handle_input: function() {

            /**
             * Was getting unexpected results when appending a clone of this.clicked_input so I had
             * to make a string version of the button and append that before I hide the original
             * input.
             */
            var name = this.clicked_input.attr( 'name' ),
                multiple = this.clicked_input.attr( 'multiple' ) == 'multiple' ? 'multiple="multiple"' : '',
                button = '<input id="js-input__' + name + '" accept="image/*" type="file" name="' + name + '" class="js-uploader__image_upload hide" value="Upload Image" ' + multiple + ' />';

            this.clicked_input.after( button );
            this.clicked_input.hide();
        },

        /**
         * I order to have multiple files sent through the $_FILES array we need to
         * hide the current clicked input and append a new one to the container
         */
        handle_input_file: function() {

            //If it is a single uploader we need to remove the previous input other the deleted image will be sent
            if( this.multiple == false ) {
                this.clicked_input.prev().remove();

                var ele = this.file_container.parent(),
                    controller = $( ele ).attr( 'data-controller' ),
                    field = $( ele ).attr( 'data-field' );

               $( 'form' ).find( 'input[name="' + controller + '[' + field + ']"]' ).parent().remove();
            }

            /**
             * Was getting unexpected results when appending a clone of this.clicked_input so I had
             * to make a string version of the button and append that before I hide the original
             * input.
             */
            var multiple = this.clicked_input.attr( 'multiple' ) == 'multiple' ? 'multiple="multiple"' : '',
                button = '<input accept=".pdf,.doc,.docx,.ppt,.pptx" type="file" name="' + this.clicked_input.attr( 'name' ) + '" class="js-uploader__file_upload" value="Upload File" ' + multiple + ' />';

            this.clicked_input.after( button );
            this.clicked_input.hide();
        },

        /**
         * Deletes a image by removing it from the DOM
         * We also need to make sure that the delete file does not get sent through the $_FILES array
         * otherwise the PHP script will still attempt to save the deleted images.
         *
         * We can not achieve this on the client side because the files input is read only so we can not remove
         * a single upload from a multiple upload input.
         *
         * The only thing we can do is append a hidden input, or multiple, with the image info so we can check this
         * against the information in the $_FILES array.
         */
        delete_image: function( e, file ) {

            var target = e.target,
                count = $( target ).attr( 'data-count' ),
                hidden_name,
                info,
                hidden_size;

            console.log( 'Count: ' + count );

            if( typeof file == 'undefined' ) {
                info = this.image_data[ count - 1 ];
            }
            else {
                info = this.file_data[ count - 1 ];
            }

            //Need to add some hidden fields with the name / size of the deleted image
            hidden_name = '<input type="hidden" name="removed[name][]" value="' + info.name + '" />';
            hidden_size = '<input type="hidden" name="removed[size][]" value="' + info.size + '" />';

            $( 'form' ).append( hidden_name ).append( hidden_size );
            $( target ).parent().remove();


            this.handle_placeholder();
            e.preventDefault();
        },

        /**
         * Shows a file on the DOM.
         * Adds a text input so the user can change the name of the upload and a
         * delete button.
         *
         * If the file upload only allows single files then the file container will
         * be emptied before the new file is appended to the DOM
         *
         * @param object e
         */
        show_file: function( e ) {

            this.total_files++;

            var name = e.name,
                type = e.type,
                item = '<p>' +
                           '<input type="text" class="medium_input" name="document_title[' + this.upload_name + '][]" value="' + name + '" />' +
                           '<button type="button" class="js-uploader__delete_file" data-count="' + this.total_files + '">Remove</button>' +
                       '</p>';

            if( this.multiple == false ) {
                this.file_container.empty();
            }

            this.file_container.append( item ).show();
        },

        /**
         * Deletes a already uploaded image from the DOM
         *
         * This will delete the image then call the method
         * that works out if the placeholder should be shown
         *
         * The relationship is one to many so we need to delete the image
         * straight away
         *
         * @param object e
         */
        delete_image_uploaded: function( e ) {

            var target = e.target,
                type = $( target ).attr( 'data-type' ),
                id = $( target ).attr( 'data-id' ),
                _this = this;

            $.ajax({ url: this.site_path + 'admin/ajax/delete_image',
                     data: { id: id },
                     type: 'POST',
                     dataType: 'JSON',
                     success: function( data ) {

                        if( data[ 'status' ] == 200 ) {
                            $( target ).parent().remove();
                            _this.set_placeholder( type ).handle_placeholder_uploaded( type );
                        }
                        else {
                            _this.delete_image( e );
                        }
                     }
            });

            e.preventDefault();
        },

        /**
         * Removes a file from the DOM.
         *
         * If the uploader allows for multiple uploads we need
         * to call the method that adds the information to the DOM
         * so the file can be ignored by the server side script
         *
         * If the uploader only allows single uploads we need to add
         * a hidden input with a blank value so it will be reflected
         * as deleted in the database
         *
         * @param object e
         */
        delete_file: function( e ) {

            $( e.target ).parent().remove();

            //If we are deleting a file we need to make sure there is a empty upload_id hidden
            //input somewhere in the form so the upload_id get set to null
            if( this.multiple == 'true' ) {
                this.delete_image( e, true );
            }
            else {
                $( 'form' ).append( '<input type="hidden" name="' + this.controller + '[upload_id]" value="" />' );            
            }

            e.preventDefault();
        }
    });
});