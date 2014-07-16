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
				'buttons',
				'navigation',
				'headers',
				'icons',
				'forms',
				'filter',
				'linksbanner',
				'products',
				'productview',
				'basket',
				'salespromotions',
				'titles',
				'tables',
				'errors',
				'successmsg',
				'breadcrumb',
				'tabs',
				'steps',
				'themes'
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

	public function buttons()
	{
		return $this->renderStyleguide('Buttons', 'layout', 'elements/_buttons');
	}

	public function navigation()
	{
		return $this->renderStyleguide('Navigation', 'layout', 'components/_navigation');
	}

	public function headers()
	{
		return $this->renderStyleguide('Headers', 'layout', 'components/_header');
	}

	public function icons()
	{
		return $this->renderStyleguide('Icons', 'layout', 'elements/_icons');
	}

	public function forms()
	{
		return $this->renderStyleguide('Forms', 'layout', 'elements/_forms');
	}

	public function filter()
	{
		return $this->renderStyleguide('Filter', 'layout', 'elements/_filter');
	}

	public function linksbanner()
	{
		return $this->renderStyleguide('Links banner', 'layout', 'elements/_links-banner');
	}

	public function products()
	{
		return $this->renderStyleguide('Products', 'layout', 'components/_products');
		$this->setScript('main');
	}

	public function productview()
	{
		return $this->renderStyleguide('Product view', 'layout', 'components/_product-view');
	}

	public function basket()
	{
		return $this->renderStyleguide('Product view', 'layout', 'components/_basket');
	}

	public function salespromotions()
	{
		return $this->renderStyleguide('Sales promotions', 'layout', 'components/_sales-promotions');
	}

	public function titles()
	{
		return $this->renderStyleguide('Titles', 'layout', 'elements/_titles');
	}

	public function tables()
	{
		return $this->renderStyleguide('Tables', 'layout', 'elements/_tables');
	}

	public function errors()
	{
		return $this->renderStyleguide('Errors', 'layout', 'elements/_errors');
	}

	public function successmsg()
	{
		return $this->renderStyleguide('Success messages', 'layout', 'elements/_success-msg');
	}

	public function breadcrumb()
	{
		return $this->renderStyleguide('Breadcrumb', 'layout', 'elements/_breadcrumb');
	}

	public function tabs()
	{
		return $this->renderStyleguide('Tabs', 'layout', 'elements/_tabs');
	}

	public function steps()
	{
		return $this->renderStyleguide('Steps - Timeline and Account buttons', 'layout', 'elements/_steps');
	}

	public function themes()
	{
		return $this->renderStyleguide('Themes with reminder popup', 'layout', 'elements/_themes');
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
