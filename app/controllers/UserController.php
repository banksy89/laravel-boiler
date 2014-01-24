<?php

class UserController extends \BaseController {

	public $restful = true;

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$this->addStyle('banan');

		$users = User::find(2);

		print_r ( $users->posts );

		return $this->render('home', true);
	}

	public function store()
	{
		$user = new User();
		//$user->email = Input::get('email');
		//$user->password = sha1(Input::get('password'));

		$output = $user->create(Input::all());

		die ( var_dump($output));
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		// 
	}

}