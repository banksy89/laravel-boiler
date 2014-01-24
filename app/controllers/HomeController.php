<?php

class HomeController extends BaseController {

	/*
	|--------------------------------------------------------------------------
	| Default Home Controller
	|--------------------------------------------------------------------------
	|
	| You may wish to use controllers instead of, or in addition to, Closure
	| based routes. That's great! Here is an example controller method to
	| get you started. To route to this controller, just add the route:
	|
	|	Route::get('/', 'HomeController@showWelcome');
	|
	*/

	public function showWelcome()
	{
		return View::make('hello');
	}

	public function getIndex()
	{
		/*
		$user = User::find(1);

		$user->email = 'ash@stormcreative.co.uk';
		$user->password = sha1('password');
		$output = $user->save();
		*/

		echo (string)isset($_POST);

		$input = Input::all();

		print_r ( $input);

		$this->addStyle('banan');
		$this->addTag('title', "hello");
		
		return $this->render(null, true);
	}

}