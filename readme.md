## Choice Application Framework

Choice is developed and built upon the Laravel Framework.

### Command Line Utitlies

For quicker use, it will be useful to throw the below aliases in your ~/.bash_profile.

```
	alias phpunit="vendor/bin/phpunit"

	alias phpcs="vendor/bin/phpcs -h"

	alias grunt="nocorrect grunt"

	alias artisan="php artisan"

	alias g:m="php artisan generate:model"
	alias g:c="php artisan generate:controller"
	alias g:v="php artisan generate:view"
	alias g:s="php artisan generate:seed"
	alias g:mig="php artisan generate:migration"
	alias g:r="php artisan generate:resource"
```

### Server

To run Laravel locally outside of referencing the 'public' folder, you will need to run the Artisan Server. To do this just type the command within your command line:

```
	artisan serve
```

This will make the application accessible via: http://localhost:8000

However, this will not work over an IP.

To get this to work over an IP (for testing external devices/browsers), you can set Artisan to run via a different host - such as the below, replacing with your own IP:

```
	artisan serve --port=8080 --host=192.168.0.49
```

Each command is what it says - either generates a model, controller, view etc. 

You just need to supply an argument of the name of the file you want to generate, for example:

```
	# Using a dot to seperate will create the view in the specified path - /path/to/viewfilename.blade.php
	$ g:v path.to.viewfilename
	
	# Will generate a view within the main view directory
	$ g:v viewfilename

	$ g:c ControllerName
	
	# The below code scaffolds all of the controller with it's methods
	$ artisan generate:scaffold controllername
```

### Routes

Within Laravel, each controller has to have it's route explicitly set to be made accessible. As Laravel is RESTFUL, each controller method will need to be specified as GET, POST or PUT - so this will have to bared in mind upon choosing the action of a controllers method. 

Further information can be found in Laravels documentation: http://laravel.com/docs/routing

Routes are broken down into the two entry points of the application; Main application and Admin.

#### Application routes

These are all routes that are associated to the front-end application, please ensure that only application routes are placed within here to remain tidy and manageable. 

#### Admin

All Admin routes are grouped within a prefix of admin - these are pre-set with a filter for authentication, preventing any of these pages being accessible outside of a valid login session.

Within the routes, the group to allocate new routes is within the below:

```php

Route::group(array('prefix' => 'admin', 'before' => 'admin_auth'), function()
{
	Route::get('/', function()
	{
		echo 'asdasd';
	});

	Route::get('/dashboard', 'AdminHomeController@dashboard');

	// Listing routes
	Route::get('/listing/{table}', 'AdminListingController@table');
	Route::get('/listing/t/{table}', 'AdminListingController@tabbed');

	// Group AJAX routes from here
	Route::post('/ajax/delete', 'AdminAjaxController@delete');
	Route::post('/ajax/listing', 'AdminAjaxController@listing');
});

```

### Authorisation / Login sessions

All authentication is handled by Laravels Authentication library. 

The Authentication library has been extended to be able to use multiple instances of tables.

These consist of both the athentication of the Admin user and Front-end user. These can be accessed like so:

```php

// Use access for anything to do with the Admin user
Auth::access()->{method name from authentication library}

// Use user for anything to do with the Front-end user
Auth::user()->method name from authentication library

```

### Migrations

Laravel runs on Migrations, this means no MYSQL schema is needed to share across multiple work stations.

Upon cloning the repostiory, you'll first need to create the database manually 'choice-discount' - then run the following artisan command:

```
	artisan migrate
```

When creating a new table migration use the below command, which will have boilerplate code for creating the table:

```
	artisan migrate:make create_the_name_of_table --create=table
```

If your just adding new columns to an existing use:

```
	artisan migrate:make add_column_to_table 
```

### Controllers

As explained in the above section, there are two entrances to the application - Front-end and Admin.

To ensure managability and to save on confusion, all Admin controllers **MUST** be prepended with Admin to seperate them from the front-end, for example: Products within the CMS will be AdminProductsController.php.

### Assets

There is only one Asset folder for the entire application. The Assets folder is split into holding the two areas of the applications assets.

All Admin assets are held within the sub-directory of Public/Assets/Admin. You'll notice that everything that's 'front' facing to the client will be held and stored within the 'public' directory.

### Coding Style

BE CONSISTENT!

There should not be any two way of coding styles throughout the application - use your surroundings to acknowledge what style already exists and follow that.

##### PHP

All PHP code *must* follow the PSR-2 standards of coding. This can be referenced from the following link: http://www.php-fig.org/psr/psr-2/

##### JavaScript

JavaScript code follows Google's StyleGuide: http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml

##### CSS/HTML

CSS and HTML will follow Storm Creative's front-end styleguide: https://github.com/StormCreative/frontend-styleguide

### StyleGuider

StyleGuider is the internal tool for generating styles and HTML elements to appear in the applications Styleguide. The Styleguides purpose is for easy access to any pre-existing elements, as well as a bible for styling towards.

To append any class or section of a stylesheet to the styleguide simply create a comment like the one below (it's important you take into account the format of this, including the semi-colon):

```css
	/**doc
		title: This is an example description;
		class: .example-class;
		html: <input type="button" class="example-class" value="Button" />
	*/
	.example-class {
		border: 1px solid red;
		width: 120px;
		height: 20px;
	}
``` 

If your creating a new component, there is a little more leg work - it will require creating a new view and adding the link within the aside navigation.

Full Readme is avaliable at: https://github.com/banksy89/styleguider

This will enable the Styleguide to be accessible and viewable from: domain.com/styleguide

### Repositories

The Repository Pattern is adopted within the Choice application, this is to decouple database logic from the controller aswell as avoiding bloating out the Models with logic that doesn't concern it.

THE MAIN use for a repository is for setting and manipulating data within a table.

Repositories are an interface between two things. Repository interfaces provide a promise that a set of methods will be avaliable to use - it doesn't care about the logic behind the methods it only cares that they are there. This means that in the future, the Repository the Interface is referencing can easily change without having to go around the controllers and models; it seperates the code to be managable.

Using Repositories allows us to test our controllers with mock classes, as the interfaces are not connecting to any logic or outside classes they will properly mock. See [Controller Testing](#testing-controllers) section.

To set-up a Repository, you will have two things. Take for example the Products table:

You will first need an interface.

```php

	interface InterfaceProduct {

		public function addProducts($id="");

		public function deleteAll();

	}
``` 

Then you will need your repository class that holds the actual logic

```php

	class ProductRepository implement InterfaceProduct {
	
		public function __construct(Product $product)
		{
			parent::__construct($product);
		}

		public function addProducts($id="")
		{
			if (!!$id) {
				// update
			} else {
				// Add
			}
		}

		public function deleteAll()
		{
			// Some other logic
		}

	}
```

InterfaceProduct is just an interface for the ProductRepository, it just says what methods are to be used and the ProductRepository holds the actual logic for those methods. 

In the Controller the InterfaceProduct can be used as an abstraction from the database layer.

To implement the Repository into a controller you will do like so:

```php

	use Choice\Repository\Product\InterfaceProduct as Product;

	class ProductController extends BaseController {

		public function __construct(Product $product)
		{
			$this->product = $product;
		}
		
		/**
		 * Display all sold out products
		 */
		public function store()
		{
			$this->product->addProducts();
		}

	}

```

#### Service Provider

Once you have created your Repository - you will need to register it in the RepositoryServiceProvider. Follow the same format at the other bindings.

##### Important Note: Run 'Composer dumpautoload' once you have set-up the server provider, to register the autoload files - otherwise the application will error.

##### Real world use case for Repository

The role's of our controller is to serve the application the correct resources and content, therefore we don't want to overload them with logic and additional methods that take away their true purpose - to serve!

Baring that in mind here's an example of why, how, when to use a repository:

```php

use Choice\Repository\Product\InterfaceProductRepository as Product;

class AdminProductController extends \BaseController {

	public function __Construct(Product $product)
	{
		$this->model = $product;
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
	
	}


	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{

	}


	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		// 
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


	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}


	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}


	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

}

```

Here we have a bare bone resourceful controller for the Products. To Create/Save a product, two different additional methods are used Update and Store - Update is fired once a product is updated and Store is fired when a product is created.

This potentially could lead to duplicate code, or even branching out into an additional method within the Products controller that shares the knowledge for handling both Update and Create. However by following either of those routes causes unneccessary logic in the controller!

Therefore, the logic for saving/editing a product will then be stored within the Repository and called within the controller. You could get round this by just dumping the logic within the Model, however the model only cares about communicating with the database with methods of how to do this communication - it doesn't need to know about image manipulation, hashing, URLtitles etc...the repository can handle that.

### Presenters

Presenters are exactly the same concept as Repositories - except they will hold logic for GETTING data from a table, and hold any logic that for *presenting* in the view. For example calculating the total amount of products and their total cost...

Just like Repositories, these will need to be binded within a Service Provider - there is one specifically for presenters under PresenterServiceProvider.

#### Facades

As presenters will be used for displaying data, or retrieving it - your not going to necessarily want to Inject it within the class you will want to call methods directly from within views - therefore you want to access the methods statically through a facade. For example:

```php

	print_r (ProductPresenter::allSoldProducts()); 

```

To set-up a Facade, follow the currenct Facades within Choice/Facades - and how they are binded within the PresenterServiceProvider.

Further reading: http://laravel.com/docs/facades

### Unit Testing

#### Testing controllers

*Controller tests are used to verify responses, ensure the correct database access methods are invoked and assert the appropriate instance variables are set within the view.*

It basically ensures the controllers are behaving to how we think they should, picking up any issues with unset routes or incorrect methods!

An example Controller test for the Admin Product is displayed below. As mentioned earlier regarding Repository Interfaces, this allows us to easily test our controller without having bloated out code. We use Mockery library to mock our Repository Interface, so we can assert the correct methods are being called within the controller.

```php
	class AdminProductControllerTest extends TestCase {

		public function setUp()
		{
			parent::setUp();

			$this->mock = $this->mock('Choice\Repository\Product\InterfaceProductRepository');
		}

		public function tearDown()
		{
			Mockery::close();
		}

		/**
		 * Test the create method within the controller
		 */
		public function testCreate()
		{
			$response = $this->call('GET', 'admin/product/create');

			$this->assertResponseOk();
		}

		/**
		 * Test the store method is successful
		 */
		public function testStoreSuccess()
		{	
			$input = 'product';

			Input::replace(['product' => ['title' => 'Test product title']]);

			$mock_class = $this->mock;
			$mock_class->id = 1;

			$this->mock->shouldReceive('saveProduct')
					   ->once()
					   ->andReturn($mock_class);

			$this->call('POST', 'admin/product');
			$this->assertRedirectedToRoute('admin.product.edit', 1);
			$this->assertSessionHas('success_message');
		}

	}
```

For a detailed insight into the subject you can view this tutorial: http://code.tutsplus.com/tutorials/testing-laravel-controllers--net-31456


