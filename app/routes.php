<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::resource('users', 'UserController');
Route::resource('index', 'HomeController');


// Contain all admin routes within it's own group
// using the before -> auth - within filters, have set that before loading route 
// to run the auto function
// This auth can be replaced or added with what ever function we want

Route::get('/admin/login', function()
{
	return 'hi';
});

Route::group(array('prefix' => 'admin', 'before' => 'auth'), function()
{
	Route::get('/', function()
	{
		
	});
});

// Setup the 404 error if route not found 
App::missing(function($exception)
{
	// returns a page not found error
	return Response::view('404-error', array(), 404);
});