<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBasketTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('basket', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('sku');
			$table->integer('product_id');
			$table->integer('order_id');
			$table->integer('quantity');
			$table->integer('refunded');
			$table->integer('shipped');
			$table->integer('invoiced');
			$table->integer('cancelled');
			$table->string('price');
			$table->decimal('total');
			$table->integer('product_size_id');
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
		//
	}

}
