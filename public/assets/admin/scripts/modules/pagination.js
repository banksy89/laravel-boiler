/**
 * If you pass in $ as a parameter for the function then 
 * the tests will break because for some reason it makes
 * jquery undefined.
 */
define( [ '../modules/templates', '../modules/helpers'], function( Templates, Helpers ) {

	function Pagination() {

		this.helpers = new Helpers();
		this.templates = new Templates();

		this.cache = [];
		this.current_page = 1;

		/**
		 * The element that will be a item in the list
		 */
		this.element = 'li';

		this.error = false;

		/**
		 * The ID of the list element
		 */
		this.list = 'pagination';

		/**
		 * The ID of the pagination container
		 * If there is a listing on a tabbed page then each tab will need
		 * to have its own pagination container
		 */
		this.pagination_container = 'pagination-navigation';

		/**
		 * The maximum number of pages to show before and after
		 * the current page in the pagination navigation
		 */
		this.limit = 3;

		/**
		 * Either normal or ajax
		 *
		 * Normal represents the technique where all items are
		 * added to the DOM then hid / shown depending on the page
		 *
		 * AJAX represents the technique where only the first page
		 * is shown then any additional pages are got with an AJAX
		 * call
		 */
		this.method_type = 'ajax';

		/**
		 * The number of results per page
		 */
		this.per_page = 1;

		/**
		 * The page we intend to move to
		 */
		this.target_page = 0;

		this.total_items;
		this.total_pages;

		/**
		 * This will be the template that the ajax method uses
		 */
		this.view;
		this.template;
	}

	Pagination.prototype.setter = function( key, value ) {
		this[ key ] = value;
	}

	/**
	 * If we are using the normal pagination we will need to hide
	 * all the items that are not suppose to to be shown
	 */
	Pagination.prototype.setup = function() {
		
		var cont = $( '#js-' + this.list );
			items = cont.find( this.element ),
			c = items.length;

		for( var i = 0; i < c; i++ ) {
			if( i >= this.per_page ) {
				$( items[i] ).hide();
			}
			else {
				$( items[i] ).show();
			}
		}

		this.total_items = c;
		this.total_pages = Math.ceil( c / this.per_page );

		if( this.total_pages > 1 ) {
			this.buttons();
		}
	}

	/**
	 * Create the pagination navigation buttons
	 *
	 * THIS HAS A RED COLOR APPLIED TO THE ACTIVE PAGE UNTIL I GET THE STYLES
	 */
	Pagination.prototype.buttons = function() {

		var container = $( '#js-' + this.pagination_container ),
			display = '';

		//Set some options here so things look neater down the line
		var lower_limit = this.current_page - this.limit,
			upper_limit = this.current_page + this.limit;

		/**
		 * If the current page is more than 1 show the back button
		 */
		if( this.current_page > 1 ) {
			display += '<li><a href="" class="pagination__link js-pagination-nav" data-type="back">&lt;</a></li>';
		}

		/**
		 * We are going to show a maximum of 3 before and three after the current page including
		 * the last page
		 */
		for( var i = lower_limit; i <= this.current_page; i++ ) {

			if( i > 0 ) {
				display += '<li><a href="" class="pagination__link js-pagination-nav ' + ( i == this.current_page ? ' pagination__link--active' : '' )  + '" data-type="' + i + '">' + i + '</a></li>';
			}
		}

		for( var x = this.current_page; x < upper_limit; x++ ) {

			if( x < this.total_pages && x != this.current_page ) {
				display += '<li><a href="" class="pagination__link js-pagination-nav ' + ( x == this.current_page ? 'pagination__link--active' : '' )  + '" data-type="' + x + '">' + x + '</a></li>';
			}
		}

		if( this.total_pages != this.current_page ) {

			if( ( this.current_page + 1 ) < this.total_pages && this.total_pages > 4 ) {
				display += '<li>...</li>';
			}

			display += '<li><a href="" class="pagination__link js-pagination-nav' + ( this.total_pages == this.current_page ? ' pagination__link--active' : '' ) + '" data-type="' + this.total_pages + '">' + this.total_pages + '</a></li>';
		}

		if( this.current_page < this.total_pages ) {
			display += '<li><a href="" class="pagination__link js-pagination-nav" data-type="next">&gt;</a></li>';
		}

		container.html( display );
	}

	/**
	 * Pagination can happen one of two ways.
	 * 
	 * We can load all the data to the DOM at once then hide / show the relevant
	 * chunks of data to simulate a pagination effect.
	 *
	 * Or
	 *
	 * We can load just the first page then use an AJAX call to load every successive
	 * page while caching pages that have already loaded.
	 *
	 * This library will accommodate for both techniques
	 *
	 * This method will call the appropriate method depending on
	 * the type
	 */
	Pagination.prototype.move = function( page ) {

		if( !!page ) {
			this.target_page = page;
		}
		
		this[ this.method_type + '_move' ]();
		this.buttons();
	}

	Pagination.prototype.ajax_move = function() {

		var _this = this;
		
		$.ajax({ url: window.site_path + 'ajax/pagination',
				 data: { target_page: this.target_page, per_page: this.per_page },
				 dataType: 'JSON',
				 type: 'POST',
				 success: function( data ) {
				 	 if( data[ 'status' ] == 200 ) {
				 	 	_this.display_ajax( data[ 'results' ] );
				 	 	_this.current_page = _this.target_page;
				 	 }
				 }
		});
	}

	Pagination.prototype.display_ajax = function( results ) {

		if( this.helpers.check_null( this.view ) ) {
			this.templates.template = this.template;
		}

		/**
		 * We need to clear the container first then add the new stuff
		 */
		$( '#js-' + this.list ).html();
		$( '#js-' + this.list ).html( this.templates.compile( this.view, results ) );
	}

	Pagination.prototype.normal_move = function() {
		
		//Work out the correct range of items to show
		var range = this.get_range(),
			list = $( '#js-' + this.list ),
			items = list.children(),
			l = items.length;

		this.total_items = l;
		this.check_range( range );

		if( this.error === false ) {

			items.hide();

			for( var i = 0; i < l; i++ ) {
				if( i >= range.start && i < range.end ) {
					$( items[ i ] ).show();
				}
			}
		}

		this.current_page = this.target_page;
	}

	/**
	 * Get the start and end of the items to show.
	 *
	 * @return object
	 */
	Pagination.prototype.get_range = function() {
		var showing = ( this.target_page - 1 ) * this.per_page;
		return { start: showing, end: this.target_page * this.per_page };
	}

	Pagination.prototype.check_range = function( data ) {

		if( data.start < 0 ) {
			this.error = true;
		}
	}

	return Pagination;
});