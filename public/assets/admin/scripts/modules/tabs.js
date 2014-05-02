/**
 * If you pass in $ as a parameter for the function then 
 * the tests will break because for some reason it makes
 * jquery undefined.
 */
define( [ '../modules/helpers', '../utils/jquery' ], function( Helpers ) {

	function Tabs() {

		this.helpers = new Helpers();
		this.current_tab = '';
		this.error = false;

		this.init();
	}

	/**
	 * This is mainly for the testing specs.
	 * This module relies on data from the window object and
	 * this will not be available during our tests so we will need to 
	 */
	Tabs.prototype.setter = function( key, value ) {
		this[ key ] = value;
	}

	/**
	 * This method acts as the constructor.
	 * 
	 * Its purpose if to check the URL to see if a hash is
	 * present. If it is we need to run the main tab change method
	 * to show the correct tab.
	 */
	Tabs.prototype.init = function() {

		this.current_tab = this.get_current_tab();
		this.change();
	}

	/**
	 * We need to get the name of the tab to display on page load.
	 * 
	 * This could come from the url, the current tab property or
	 * if both are empty we should get the first tab and display that
	 *
	 * @return string tab
	 */
	Tabs.prototype.get_current_tab = function() {

		var url_tab = window.location.hash.substring(1),
			tab = this.current_tab;

		if( this.helpers.check_null( url_tab ) === false ) {
			tab = url_tab;
		}
		else if( this.helpers.check_null( this.current_tab ) ) {
			var tabs = $( '.js-tabs' );
			tab = $( tabs[0] ).attr( 'data-area' );
		}

		return tab;
	}

	/**
	 * This method will handle changing the tabs
	 *
	 * As there will be a undisclosed number of tabs we
	 * will need to hide every tab then display the one that
	 * is the current tab property
	 * 
	 * If that tab does not exist on the DOM the error property will
	 * be set to true
	 */
	Tabs.prototype.change = function() {

		this.check_for_errors();

		if( this.error === false ) {
			$( '[id^="js-tab-"]' ).hide();
			$( '#js-tab-' + this.current_tab ).show();
		}
	}

	/**
	 * Do a bit of error handling to prevent console errors
	 */
	Tabs.prototype.check_for_errors = function() {

		if( this.helpers.check_null( this.current_tab ) || this.helpers.check_null( $( '#js-tab-' + this.current_tab ).length ) ) {
			this.error = true;
		}

		return this;
	}

	return Tabs;
});