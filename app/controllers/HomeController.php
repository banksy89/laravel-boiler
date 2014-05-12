<?php

use Intervention\Image\Image;

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
		// $posts = Post::all();

		$img = Image::make('public/assets/images/image-8.jpg');

		// now you are able to resize the instance
		$img->resize(800, null, true);

		// and insert a watermark for example
		//$img->insert('public/watermark.png');

		// finally we save the image as a new image
		$img->save('public/assets/images/image-resize.jpg');

		$posts = Cache::remember('users', 10, function() {
			return Post::all();
		});


		die('hi');

		die( print_r ( Cache::get('users')));

		$this->addTag('posts', $posts);

		return $this->render(null, true);
	}

	

}