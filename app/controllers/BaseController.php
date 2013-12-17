<?php

class BaseController extends Controller {

	/**
	 * Tags to past through to the view
	 * 
	 * @var array
	 */
	private $_tags = array();

	public function __Construct()
	{
		// Set the script and styles to nothing
		// Just in case they are not required and don't break the app
		$this->_tags['stylesheets'] = "";
		$this->_tags['script'] = "";

		$this->addTag('root', Request::root());
	}

	/**
     * Add a tag to the template tag array
     *
     * @param string $tag   - the title of the tag
     * @param string $value - the value to the tag
     *
     * @return $this;
     */
    protected function addTag($tag, $value = "")
    {
        if (is_array($tag) && !isset($value)) {

            foreach ($tag as $t => $t_v) {
                $this->_tags[$t] = $t_v;
            }

        } else {
            $this->_tags[$tag] = $value;
        }

        return $this;
    }

    /**
     * Set the script ( as we use AMD requireJS we only need to call one script )
     *
     * @param string $script - the title of that script
     *
     * @return $this;
     */
    protected function setScript($script)
    {
        $this->_tags['script'] = $script;

        return $this;
    }

    /**
     * Add the a style to the style sheet array
     * ( as we use SASS it isn't a neccessity, however if we add in a random plugin its good to have this )
     *
     * @param string $stylesheet - the title of the stylesheet
     */
    protected function addStyle($stylesheet, $raw = true)
    {
        $this->_tags['stylesheets'][] = ($raw == true ? 
        								 Request::root().'/assets/styles/'.$stylesheet.'.css' : 
        								 $stylesheet);

        return $this;
    }

    /**
     * A wrapper for the View::make command
     * Automatically or manually sets the view to load
     * 
     * @param string $view
     * 
     * @return view
     */
    protected function render($view="")
    {
    	if ($view == "") {
    		$url = str_replace(Request::root(), "", Request::url());
    		$url_segs = explode("/", $url);
    		$view = $url_segs[0];

    		// If it's empty again after that, it's the homepage
    		if ($view == '') {
    			$view = 'home';
    		}
    	}

    	$this->addTag('view_to_load', base_path().'/app/views/'.$view.'.php');

    	return View::make('base-view', $this->_tags);
    }

	/**
	 * Setup the layout used by the controller.
	 *
	 * @return void
	 */
	protected function setupLayout()
	{
		if ( ! is_null($this->layout)) {
			$this->layout = View::make($this->layout);
		}
	}

}