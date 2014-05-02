<?php

class AdminController extends \BaseController {

	public function __Construct()
	{
		parent::__Construct();

		$this->base_path = 'admin/';

		$this->addStyle('layout');
		$this->setScript('main');
	}
}