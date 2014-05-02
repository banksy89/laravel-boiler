<?php

class AdminHomeController extends \AdminController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$tags = array();

		if (Auth::access()->check()) {
			return Redirect::to('admin/dashboard');
		}

		return View::make('admin/home/login', $tags);
	}

	public function dashboard()
	{
		return $this->render('admin/dashboard/index', true);
	}
}