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

// Home page route
//Route::get('/', 'HomeController@getIndex');
Route::get('/', 'HomeController@index');

// Pages routes
Route::get('invite-friend', 'PagesController@recommend_friend');
Route::get('contact', 'PagesController@contact');
Route::get('store-locator', 'PagesController@store_locator');
Route::get('delivery', 'PagesController@delivery');
Route::get('click-collect', 'PagesController@click_collect');
Route::get('returns', 'PagesController@returns');
Route::get('voucher-codes', 'PagesController@voucher_codes');
Route::get('payment-methods', 'PagesController@payment_methods');
Route::get('our-heritage', 'PagesController@our_heritage');
Route::get('faqs', 'PagesController@faqs');
Route::get('sitemap', 'PagesController@sitemap');

// Terms routes
Route::get('terms-and-conditions', 'TermsController@terms_and_conditions');
Route::get('privacy-policy', 'TermsController@privacy_policy');

// Sales pages routes
Route::get('/sales/item/{item}', 'SalesController@item');
Route::post('/sales/item/{item}', 'SalesController@item');
Route::get('/sales/view', 'SalesController@view');
Route::get('/sales/reminder', 'SalesController@reminder');

// Product view route
Route::get('/product/view/{item}', 'ProductController@view');

// Order pages routes
Route::get('/order/login', 'OrderController@login');
Route::get('/order/signup', 'OrderController@signup');
Route::post('/order/signup', 'OrderController@signup');
Route::get('/order/success', 'OrderController@success');
Route::get('/order/add', 'OrderController@add');

// Email marketing
Route::post('/ajax/email-marketing/add', 'EmailMarketingController@add');
Route::get('/ajax/email-marketing/add', 'EmailMarketingController@add');

// Chron Job
Route::get('/order/new-orders', 'OrderController@generateOrders');

// Account pages routes
Route::get('/account/login', 'AccountController@login');
Route::get('/account/forgotten-password', 'AccountController@forgotten_password');
Route::get('/account/details', 'AccountController@details');
Route::get('/account/delivery', 'AccountController@delivery');
Route::get('/account/orders', 'AccountController@orders');
Route::get('/account/signup', 'AccountController@signup');
Route::post('/account/signup', 'AccountController@signup');
Route::get('/account/thanks', 'AccountController@thanks');
Route::get('/account/login', 'AccountController@login');

Route::controller('password', 'RemindersController');
Route::get('/password/success', 'RemindersController@getSuccess');

Route::get('/user/logout', 'UserController@logout');

// Emails
Route::get('/emails/signup/{id}', 'EmailController@signup');

// Outlet pages
Route::get('/outlet/listing/{item}', 'OutletController@listing');
Route::post('/outlet/listing/{item}', 'OutletController@listing');
Route::get('/outlet/listing', 'OutletController@listing');

Route::get('/outlet/view/{item}', 'OutletController@view');

// AJAX calls
Route::get('/ajax/product/quantity/{id}', 'ProductController@ajaxGetProductQuantity');
Route::post('/ajax/sale/filter', 'SalesController@ajaxFilterOptions');
Route::post('/ajax/basket/add', 'BasketController@add');
Route::get('/ajax/basket/add', 'BasketController@add');
Route::get('/ajax/basket/get', 'BasketController@get');
Route::get('/ajax/basket/total_items', 'BasketController@totalBasketItems');
Route::post('/ajax/basket/quantity', 'BasketController@quantity');
Route::post('/ajax/basket/remove', 'BasketController@remove');
Route::post('/ajax/user/login', 'UserController@login');
Route::get('/ajax/user/login', 'UserController@login');
Route::get('/ajax/basket/remove', 'BasketController@remove');
Route::post('/ajax/user-exists', 'UserController@emailExists');
Route::post('/ajax/user/password-match', 'UserController@passwordMatch');
Route::post('/ajax/account/save', 'AccountController@ajaxSaveData');
Route::post('/ajax/reminders/save', 'SaleRemindersController@save');
Route::get('/ajax/reminders/save', 'SaleRemindersController@save');
Route::post('/ajax/reminders/share', 'EmailMarketingController@share');
Route::post('/ajax/update-delivery-address', 'DeliveryAddressController@updateAddress');

// Will be removing these two
Route::post('/ajax/add-address', 'AjaxController@addAddress');
Route::post('/ajax/remove-address', 'AjaxController@removeAddress');

Route::get('/ajax/add-delivery-address', 'DeliveryAddressController@addAddress');
Route::get('/ajax/remove-delivery-address', 'DeliveryAddressController@removeAddress');
Route::post('/ajax/add-delivery-address', 'DeliveryAddressController@addAddress');
Route::post('/ajax/remove-delivery-address', 'DeliveryAddressController@removeAddress');

// Styleguide Routes
Route::get('/styleguide', 'StyleguideController@index');
Route::get('/styleguide/buttons', 'StyleguideController@buttons');
Route::get('/styleguide/navigation', 'StyleguideController@navigation');
Route::get('/styleguide/filter', 'StyleguideController@filter');
Route::get('/styleguide/forms', 'StyleguideController@forms');
Route::get('/styleguide/headers', 'StyleguideController@headers');
Route::get('/styleguide/icons', 'StyleguideController@icons');
Route::get('/styleguide/products', 'StyleguideController@products');
Route::get('/styleguide/productview', 'StyleguideController@productview');
Route::get('/styleguide/basket', 'StyleguideController@basket');
Route::get('/styleguide/salespromotions', 'StyleguideController@salespromotions');
Route::get('/styleguide/titles', 'StyleguideController@titles');
Route::get('/styleguide/linksbanner', 'StyleguideController@linksbanner');
Route::get('/styleguide/errors', 'StyleguideController@errors');
Route::get('/styleguide/successmsg', 'StyleguideController@successmsg');
Route::get('/styleguide/breadcrumb', 'StyleguideController@breadcrumb');
Route::get('/styleguide/tabs', 'StyleguideController@tabs');
Route::get('/styleguide/steps', 'StyleguideController@steps');
Route::get('/styleguide/tables', 'StyleguideController@tables');
Route::get('/styleguide/themes', 'StyleguideController@themes');


// Routes locked behind user authentication
Route::group(array('before' => 'user_auth'), function()
{
	// Account area 
	Route::get('/account/details', 'AccountController@details');
	Route::get('/account/delivery', 'AccountController@delivery');
	Route::get('/account/orders', 'AccountController@orders');

	// Checkout area
	Route::get('/order/delivery', 'OrderController@delivery');
	Route::post('/order/delivery', 'OrderController@delivery');
	Route::get('/order/confirmation', 'OrderController@confirmation');
	Route::post('/order/confirmation', 'OrderController@confirmation');
	
});

Route::get('/404', 'ErrorController@index');

App::missing(function($exception)
{	

	Route::get('/404', 'ErrorController@index');
	// returns a page not found error
	//return Response::view('error.index', array(), 404);
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

// Pre authentication routes for Admin

Route::get('/admin/login', 'AdminHomeController@index');
Route::post('/admin/login/login', 'AdminLoginController@loginAction');
Route::post('/admin/login/forgotten', 'AdminLoginController@forgottenPasswordAction');

// Authenticated routes for Admin

Route::group(array('prefix' => 'admin', 'before' => 'admin_auth'), function()
{
	Route::get('/dashboard', 'AdminHomeController@dashboard');

	// Listing routes
	Route::get('/listing/{table}', 'AdminListingController@table');
	Route::get('/listing/t/{table}', 'AdminListingController@tabbed');

	// Product routes
	Route::resource('product', 'AdminProductController');
	Route::post('ajax/product_sub_categories', 'AdminProductCategoriesController@getSubCategories');
	Route::post('ajax/sub_categories', 'AdminCategoriesController@getSubCategories');

	// Product categories
	Route::resource('product_categories', 'AdminProductCategoriesController');

	Route::resource('home_carousel', 'AdminHomeCarouselController');

	Route::resource('hot_picks', 'AdminHotPicksController');

	// Sales routes
	Route::resource('sales', 'AdminSalesController');

	Route::resource('size_guides', 'AdminSizeGuideController');	

	Route::resource('promo_codes', 'AdminPromoCodesController');	

	Route::resource('store', 'AdminStoreController');

	Route::resource('colours', 'AdminColoursController');

	Route::resource('categories', 'AdminCategoriesController');

	// Routes for the order management
	Route::get('orders/pending/{id}', 'AdminOrdersController@pending');
	Route::get('orders/completed/{id}', 'AdminOrdersController@completed');
	Route::get('orders/item/{id}', 'AdminOrdersController@item');

	// Group AJAX routes from here
	Route::post('/ajax/delete', 'AdminAjaxController@delete');
	Route::post('/ajax/listing', 'AdminAjaxController@listing');
	Route::post('/ajax/image', 'AdminAjaxController@image');
	Route::post('/ajax/order-comment/add', 'AdminOrderCommentController@add');
});
