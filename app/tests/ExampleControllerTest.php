<?php

class ExampleControllerTest extends TestCase {

	public function setUp()
	{
		parent::setUp();

		$this->mock = $this->mock('Banksy\Repository\Example\InterfaceExampleRepository');
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
		$response = $this->call('GET', '/');

		$this->assertResponseOk();
	}

	/**
	 * Test the store method is successful
	 */
	public function testStoreSuccess()
	{	
		Input::replace(['product' => ['title' => 'Test product title']]);

		$mock_class = $this->mock;

		$mock_class->shouldReceive('saveItem')
				   ->with(null, array())
				   ->once()
				   ->andReturn($mock_class);


		$this->call('POST', 'admin/product');
		$this->assertRedirectedToRoute('/example/page', 1);
		$this->assertSessionHas('success_message');
	}

	public function testEdit()
	{
		$model = $this->mock;

		$model->shouldReceive('find')
			  ->once()
			  ->with('1')
			  ->andReturn($model);

		$model->id = 1;

		$product_category = $this->mock_3;

		$product_category->shouldReceive('find')
						 ->once()
						 ->with($model->product_category_id);

		$response = $this->call('GET', '/example/1/edit');
	}

}

?>