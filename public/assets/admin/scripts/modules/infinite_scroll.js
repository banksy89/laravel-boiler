/**
 * If you pass in $ as a parameter for the function then 
 * the tests will break because for some reason it makes
 * jquery undefined.
 */
define( [ '../modules/templates', '../modules/helpers', '../utils/jquery' ], function( Templates, Helpers ) {

	/**
	 * This will accommodate two method of infinite scroll
	 *
	 * The first will be where all the list items are appended to the DOM but
	 * those that are suppose to be loaded are hidden.
	 *
	 * The second is using ajax to get the extra items from where ever they are stored
	 */
	function Infinity_scroll() {

		this.templates = new Templates();
		this.helpers = new Helpers();

		/**
		 * The page that the user is currently on
		 * On page load it will always default to 1
		 */
		this.current_page = 1;

		this.container = $( '#js-infinite-scroll' );

		/**
		 * The amount of items to load per page
		 */
		this.per_page = this.container.attr( 'data-per-page' );

		/**
		 * The type of infinite scroll
		 * Can either be normal or ajax
		 */
		this.method_type = 'normal';

		this.template = this.container.attr( 'data-template' );

		this.total_items = this.container.attr( 'data-total' );

		/**
		 * The total amount of pages that can be in the list
		 */
		this.total_pages = Math.ceil( this.total_items / this.per_page );

		/**
		 * The number of pixel from the bottom of the screen to
		 * trigger the next stage of results
		 */
		this.trigger = 300;

		$(window).scroll( function() {

            if( $(window).scrollTop() + $(window).height() > $(document).height() - this.trigger ) {
                if ( this.current_page < this.total_pages ) {
                    this[ 'more_' + this.method_type ]();
                }
            }

        });
	}

	/**
	 * This method will show any extra items in the list that need to be
	 * it will work out what items need to be shown by the current page and the
	 * items per page
	 */
	Infinity_scroll.prototype.more_normal = function() {

		var showing = ( this.current_page * this.per_page ) - 1,
			to_show = ( ( this.current_page + 1 ) * this.per_page ) -1,
			$items = $( this.container ).children();
		
		for( var i = 0; i < this.total_items; i++ ) {
			if( i > showing && i <= to_show ) {
				$( $items[ i ] ).show();
			}
		}

		this.current_page++;
	}

	/**
	 * This method will get the next data from the server,
	 * this will use the template library
	 */
	Infinity_scroll.prototype.more_ajax = function() {

		var _this = this;

		$.ajax({ url: window.site_path + 'ajax/infinity_scroll',
				 data: { model: this.model, page: this.current_page, per_page: this.per_page },
				 type: 'POST',
				 dataType: 'JSON',
				 success: function( data ) {

				 	if( data['status'] == 200 ) {

				 		var results = data[ 'results' ];
				 		_this.container.append( _this.templates.compile( _this.template, results ) );
				 	}
				 }
		});

	}

	return Infinity_scroll;
});