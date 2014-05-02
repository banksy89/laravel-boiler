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

Route::get('/', 'HomeController@getIndex');

App::missing(function($exception)
{
	// returns a page not found error
	return Response::view('404-error', array(), 404);
});

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
|
| Admin routes are seperated, and also grouped with a filter for admin auth
| so access to any route outside of the login can not be accessed without
| authentication
|
*/

Route::get('/admin/login', 'AdminHomeController@index');
Route::post('/admin/login/login', 'AdminLoginController@loginAction');
Route::post('/admin/login/forgotten', 'AdminLoginController@forgottenPasswordAction');

Route::group(array('prefix' => 'admin', 'before' => 'admin_auth'), function()
{
	Route::get('/', function()
	{
		echo 'asdasd';
	});

	Route::get('/dashboard', 'AdminHomeController@dashboard');

	Route::get('/listing/{table}', 'AdminListingController@table');
	Route::get('/listing/t/{table}', 'AdminListingController@tabbed');

	Route::post('/ajax/delete', 'AdminAjaxController@delete');
	Route::post('/ajax/listing', 'AdminAjaxController@listing');
});

