<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('products', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('title');
			$table->string('sizes');
			$table->string('sku_product_id');
			$table->string('colour');
			$table->string('gender');
			$table->string('product_category_id');
			$table->string('small_description');
			$table->string('description');
			$table->string('price_rrp');
			$table->decimal('price');
			$table->string('sale_id');
			$table->string('size_guide');
			$table->string('outlet');
			$table->string('outlet_category_id');
			$table->string('outlet_sub_category_id');
			$table->string('quantity');
			$table->string('seo_title');
			$table->string('seo_description');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('products');
	}

}
