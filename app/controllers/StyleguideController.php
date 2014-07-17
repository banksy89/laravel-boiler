<?php
/**
 * Choice Interface Styleguide
 * 
 * Remember: 
 * When creating additional pages to assign a route
 * underneath the default styleguide - otherwise your
 * page will not work
 */
class StyleguideController extends \BaseController {

	public function __construct()
	{
		$pages = array(
				'buttons'
		);

		$this->addTag('pages', $pages);
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		return $this->renderStyleguide('Example Stylesheet');
	}


	/**
	 * Render the styleguide with attributes
	 * 
	 * @param string $header 
	 * @param string optional $stylesheet 
	 */
	protected function renderStyleguide($header, $stylesheet="layout", $sass="")
	{
		if (!!$sass) {
			$file = public_path().'/assets/styles/sass/'.$sass.'.scss';
		} else {
			$file = public_path().'/assets/styles/'.$stylesheet.'.css';
		}

		$styleguider = new Styleguider($file);
		$styles = $styleguider->getStyles();

		$this->addTag('stylesheet', $stylesheet);
		$this->addTag('header', ucwords($header));
		$this->addTag('styles', $styles);

		return $this->plain()->render('styleguider.index');	
	}

}
