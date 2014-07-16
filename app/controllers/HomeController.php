<?php

class HomeController extends BaseController {

	public function index() 
	{	
		$hot_picks = ProductPresenter::exampleFunction();

		$this->setScript('main');
		$this->addStyle('layout');

		return $this->render('home.index', true);
	}
	

}