define(['../utils/hogan', '../modules/pagination', 'Backbone'], function( hogan, Pagination ){
    
    return Backbone.View.extend({

        site_path: window.site_path.replace( '_', '' ),

        /**
         * The name of the current database table
         * This will be grabbed from the DOM
         */
        table: '',

        /**
         * When the user selects a button with the js-delete class
         * on it the related ID will be stored here.
         *
         * If its a multiple delete then 'multi' will be stored
         * here so we can identify a multi delete later in the process
         */
        delete_id: '',

        params: {},

        /**
         * The element that will hold the error / success message container
         */
        error: $( '#js-message-to-user' ),

        pagination: '',

        initialize: function() {

            this.table = $( '#js-table' ).val();

            this.pagination = new Pagination();
            this.pagination.method_type = 'normal';
            this.pagination.element = 'tr';
            this.pagination.list = 'results-table';
            this.pagination.per_page = 25;

            this.pagination.setup();

            this.tabs_one = new Pagination();
            this.tabs_one.method_type = 'normal';
            this.tabs_one.element = 'tr';
            this.tabs_one.list = 'first-tab';
            this.tabs_one.per_page = 25;
            this.tabs_one.pagination_container = 'first-tab-pagination';

            this.tabs_one.setup();

            this.tabs_two = new Pagination();
            this.tabs_two.method_type = 'normal';
            this.tabs_two.element = 'tr';
            this.tabs_two.list = 'second-tab';
            this.tabs_two.per_page = 25;
            this.tabs_two.pagination_container = 'second-tab-pagination';

            this.tabs_two.setup();
        },

        el: $( 'body' ),

        events: {
            'click #js-filter'         : 'toggle_filter',
            'click .js-delete'         : 'show_popup',
            'click #js-close-popup'    : 'hide_popup',
            'click #js-action-delete'  : 'action_delete',
            'click #js-action-filter'  : 'action_filter',
            'click #js-reset'          : 'reset',
            'click .js-order-by'       : 'order_by',

            'click .js-pagination-nav' : 'paginate'
        },

        /**
         * Slide toggles the filter area
         *
         * @param object e
         */
        toggle_filter: function ( e ) {

            $( '#js-filter-container' ).slideToggle( 200 );
            e.preventDefault();
        },

        show_popup: function ( e ) {

            $( '#js-delete-popup' ).fadeIn( 'normal' );

            //We need to get what is being deleted
            //If it is a single entry this will be a ID
            //If it is the multiple delete button then we need to take note of this for later
            var target = e.target,
                id = $( target ).parent().attr( 'data-id' ),
                area = $( target ).attr( 'data-area' );
 
            //If the id isn't undefined use it otherwise set a identifier that more processing is needed at a later point
            if ( typeof id != 'undefined' ) {
                this.delete_id = id;
            }
            else {
                this.delete_id = 'multi';
            }

            e.preventDefault();
        },

        hide_popup: function( e ) {

            $( '#js-delete-popup' ).fadeOut( 'normal' );

            if( typeof e == 'object' ) {
                e.preventDefault();
            }
        },

        action_delete: function( e ) {

            var ids = [];

            if ( this.delete_id == 'multi' ) {
                //At this point we need to grab the id from every checkbox that is checked
                var checkboxes = $( '.js-delete-checkbox:checked' ),
                    count = checkboxes.length;

                for ( i = 0; i < count; i++ ) {
                    ids.push( $( checkboxes[i] ).val() );
                }
            }
            else {
                ids.push( this.delete_id );
            }

            $.ajax({ url: this.site_path + 'admin/ajax/delete',
                 data: { table: this.table, ids: ids },
                 type: 'POST',
                 dataType: 'JSON',
                 success: _.bind( function ( data ) {

                    this.hide_popup();

                    if ( data[ 'status' ] == 200 ) {
                        var id_count = ids.length;

                        for ( x = 0; x < id_count; x++ ) {
                            $( '#js-item-' + ids[ x ] ).remove();
                        }

                        /**
                         * If we have tabs we need to setup the correct pagination objects
                         */
                        this.pagination.setup();
                        this.tabs_one.setup();
                        this.tabs_two.setup();

                        this.error.html( '<p class="alert alert--success"><i class="fa fa-check-circle-o"></i> ' + id_count + ' item(s) have been deleted successfully <i class="fa fa-times js-fade-close alert__close"></i></p>' );
                    }
                    else {
                        this.error.html( '<p class="alert alert--error"><i class="fa fa-exclamation"></i> The item(s) could not be deleted at this time <i class="fa fa-times js-fade-close alert__close"></i></p>' );
                    }

                 }, this )
             });

            e.preventDefault();
        },

        /**
         * Filters the results by calling them again but with a where condition
         *
         *
         * @param object e
         */
        action_filter: function ( e ) {

            //Reset the parameters to empty by default
            this.params = {};

            var search_boxes = $( '.js-search-box' ),
                count = search_boxes.length,
                params = [],
                listing_error = $( '#js-listing-error' );

            for ( i = 0; i < count; i++ ) {
                var type = $( search_boxes[i] ).attr( 'data-type' );
                params.push({ type: type.trim(), value: $( search_boxes[i] ).val() });
            }

            this.params = params;

            $.ajax({ url: this.site_path + 'admin/ajax/listing',
                     data: { table: this.table, params: params },
                     type: 'POST',
                     dataType: 'JSON',
                     success: _.bind( function( data ) {
                        
                        if( data[ 'status' ] == 200 ) {

                            this.organise_filter_results( data[ 'results' ] );
                            listing_error.hide();
                        }
                        else {
                            /**
                             * If there are no results hide anything that is in the list
                             * and display a error message to the user
                             */
                             listing_error.show();
                             $( '[id*=js-item-]' ).hide();
                        }
                        
                     }, this )
            });

            e.preventDefault();
        },

        /**
         * I am going to show all the records first of all them loop through and hide any
         * that are not found in the results
         *
         * @param array data
         */
        organise_filter_results: function( results ) {

            var results_body = $( '.js-results-table' ),
                current_results = results_body.find( 'tr' ),
                current_results_count = current_results.length,
                results_count = results.length,
                ids = [];

            /**
             * Put the IDs into an array so we can use inArray later on
             */
            for( var i = 0; i < results_count; i++ ) {
                ids.push( results[i].id );
            }
            
            for( var x = 0; x < current_results_count; x++ ) {

                var c = $( current_results[x] ),
                    id = c.attr( 'id' ),
                    id = id.replace( 'js-item-', '' );
                
                if( $.inArray( id, ids ) === -1 ) {
                    c.hide();
                }
                else {
                    c.show();
                }
            } 
        },

        /**
         * If the user has clicked a button to order the results then we 
         *
         */
        organise_order_by_results: function() {

        },

        /**
         * Resetting the filter will just mean showing all the results again
         * So we can just loop through each row and show it
         *
         * @params object e
         */
        reset: function( e ) {

            var results_body = $( '.js-results-table' ),
                current_results = results_body.find( 'tr' ),
                current_results_count = current_results.length;

            for( var i = 0; i < current_results_count; i++ ) {
                $( current_results[i] ).show();
            }

            e.preventDefault();
        },

        paginate: function( e ) {

            var target = e.target,
                type = $( target ).attr( 'data-type' ),
                list = $( target ).closest( 'ul' ).attr( 'data-area' );

            if( type == 'next' ) {
                this[ list ].target_page = this[ list ].current_page + 1;
            }
            else if( type == 'back' ) {
                this[ list ].target_page = this[ list ].current_page - 1;
            }
            else {
                /**
                 * parseInt() the number so we can made additions and subtractions
                 * later on in the process
                 */
                this[ list ].target_page = parseInt( type );
            }

            this[ list ].move();

            e.preventDefault();
        },

        order_by: function( e ) {

            var target = e.target,
                column = $( target ).attr( 'data-column' ),
                order = $( target ).attr( 'data-order' ),
                target_column = $( target ).attr( 'data-col-num' ),
                table = $( target ).closest( 'table' ),
                tbody = $( table ).find( 'tbody' );

            /**
             * If the column is the create date, instead of doing another AJAX 
             * call we can just flip the order of the current list
             */
             if( column == 'create_date' ) {
                tbody.html( $( 'tr', tbody ).get().reverse() );
             }
             else {
                this.get_order_by_results( tbody, column, order, target_column );
             }

             //Change the order display and the attribute
             if( order == 'asc' ) {
                $( target ).attr( 'data-order', 'desc' );
                
                if( column == 'create_date' ) {
                    $( target ).removeClass( 'fa-sort-asc' ).addClass( 'fa-sort-desc' );
                }
                else {
                    $( target ).removeClass( 'fa-sort-alpha-asc' ).addClass( 'fa-sort-alpha-desc' );
                }
             }
             else if( order == 'desc' ) {
                $( target ).attr( 'data-order', 'asc' );

                if( column == 'create_date' ) {
                    $( target ).removeClass( 'fa-sort-desc' ).addClass( 'fa-sort-asc' );
                }
                else {
                    $( target ).removeClass( 'fa-sort-alpha-desc' ).addClass( 'fa-sort-alpha-asc' );
                }
             }

            e.preventDefault();
        },

        /**
         * If the column we are ordering is an association then a
         * query will not work because we will get a undefined column 
         * error.
         *
         * To be safe I an going to reorder the table as it is
         *
         * So I will need to get the cell data then order it and make sure any 
         * associations or dependencies are still on those cells
         */
        get_order_by_results: function( tbody, column, order, target_column ) {

            var trs = tbody.find( 'tr' ),
                l = trs.length,
                names = [],
                new_list = '';

            for( var i = 0; i < l; i++ ) {
                names.push({ item: i, word: $( trs[i] ).find( 'td:nth-child(' + target_column + ')' ).text() });
            }

            if( order == 'asc' ) {
                names = this.sort_asc( names, 'word' );
            }
            else {
                names = this.sort_desc( names, 'word' );
            }

            for( var i = 0; i < l; i++ ) {
               tbody.append( $( trs[names[i].item] ) );
            }
        },

        sort_asc: function( items, key ) {

            return items.sort(function(a, b){
                        if( a[ key ] < b[ key ] ) return -1;
                        if( a[ key ] > b[ key ] ) return 1;
                        return 0;
                    })
        },

        sort_desc: function( items, key ) {

            return items.sort(function(a, b){
                        if( a[ key ] > b[ key ] ) return -1;
                        if( a[ key ] < b[ key ] ) return 1;
                        return 0;
                    })
        }
    });
});